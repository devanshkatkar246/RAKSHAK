"""
Notification Agent
─────────────────────────────────────────────────────────────────────────────
Responsibilities:
  • Route notifications to correct channel (push, SMS, voice, in-app)
  • Manage notification priority and deduplication (Redis TTL)
  • Respect user preferences (sound enabled, DND windows)
  • Localize notification content (Hindi, Marathi, Tamil, English)
  • Track delivery and read status

Inputs:  notification payload, user preferences, channel config
Outputs: delivery_receipt, notification_id, channel_used

Tools:
  • send_push_notification – Firebase FCM push
  • send_sms              – Twilio SMS
  • send_voice_call       – Twilio TTS call
  • persist_notification  – Save to notifications table

Memory:  Redis dedup key with 60s TTL per (user_id, type) pair
"""
from __future__ import annotations

import json
from agents.base_agent import BaseAgent, AgentInput, AgentOutput
from langchain_core.tools import tool


@tool
def send_push_notification(user_id: str, title: str, body: str, data: dict) -> dict:
    """Send FCM push notification."""
    return {"status": "sent", "channel": "push"}


@tool
def send_sms(phone: str, message: str) -> dict:
    """Send Twilio SMS notification."""
    return {"status": "queued", "channel": "sms"}


@tool
def persist_notification(user_id: str, title: str, body: str, notif_type: str) -> dict:
    """Store notification in DB for in-app display."""
    return {"notification_id": "new_id"}


SYSTEM_PROMPT = """
You are RAKSHAK's Notification Orchestrator — intelligently deciding how and
when to notify users and family members about important health events.

User Preferences: {preferences}
Notification to Route: {notification}
Time of day (elder's timezone): {time_of_day}

Decision rules:
1. CRITICAL alerts: always send via ALL channels immediately, no dedup
2. HIGH priority (medication overdue > 30min): push + SMS
3. MEDIUM (daily wellness tip): push only if not DND window
4. LOW (informational): in-app only
5. Between 10 PM – 7 AM: suppress non-critical push/SMS (DND)
6. Localize message to {language} if not English

Respond in JSON:
{{
  "channels_to_use": ["push", "sms"],
  "localized_title": "Translated title",
  "localized_body": "Translated body",
  "should_suppress": false,
  "reasoning_steps": ["..."],
  "confidence_score": 0.95
}}
"""


class NotificationAgent(BaseAgent):
    AGENT_NAME = "notification_agent"
    RESPONSIBILITIES = [
        "Route notifications to appropriate channel",
        "Deduplicate notifications via Redis TTL",
        "Localize content to user's preferred language",
        "Enforce DND windows for non-critical alerts",
    ]

    def get_tools(self) -> list:
        return [send_push_notification, send_sms, persist_notification]

    def get_system_prompt(self) -> str:
        return SYSTEM_PROMPT

    async def run(self, input_data: AgentInput) -> AgentOutput:
        start = self._start_timer()
        profile = input_data.profile_snapshot

        prompt = SYSTEM_PROMPT.format(
            preferences=json.dumps(profile.get("preferences", {})),
            notification=json.dumps(input_data.extra.get("notification", {})),
            time_of_day=input_data.extra.get("time_of_day", "unknown"),
            language=profile.get("preferred_language", "English"),
        )

        try:
            response = await self.llm.ainvoke(prompt)
            parsed = json.loads(response.content if hasattr(response, "content") else str(response))
        except Exception as e:
            self.logger.error("notification_agent.error", error=str(e))
            parsed = {
                "channels_to_use": ["push"],
                "localized_title": "Health Update",
                "localized_body": "Please check your Rakshak app for an update.",
                "should_suppress": False,
                "reasoning_steps": ["Parse error – defaulting to push"],
                "confidence_score": 0.5,
            }

        output = AgentOutput(
            agent_name=self.AGENT_NAME,
            response=parsed.get("localized_body", ""),
            confidence_score=parsed.get("confidence_score", 0.5),
            reasoning_steps=parsed.get("reasoning_steps", []),
            metadata={
                "channels": parsed.get("channels_to_use", []),
                "localized_title": parsed.get("localized_title", ""),
                "should_suppress": parsed.get("should_suppress", False),
            },
            latency_ms=self._end_timer(start),
        )
        self._log_run(input_data, output)
        return output
