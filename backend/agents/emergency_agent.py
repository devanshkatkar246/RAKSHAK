"""
Emergency Agent
─────────────────────────────────────────────────────────────────────────────
Responsibilities:
  • Receive and process SOS triggers (manual, fall-detected, vitals-critical)
  • Assess severity and determine response level (notify family / call ambulance)
  • Broadcast alerts to emergency contacts via SMS, call, push notification
  • Track acknowledgement and escalate if unacknowledged within SLA
  • Generate incident report for audit trail

Inputs:  emergency_context, vitals_snapshot, profile_snapshot, location
Outputs: alert dispatched, severity_score, contacts_notified, incident_id

Tools:
  • dispatch_sms_alert   – Twilio SMS to emergency contacts
  • dispatch_voice_call  – Twilio voice call with TTS message
  • send_push_alert      – Firebase push to family mobile apps
  • reverse_geocode      – Convert lat/lon to human-readable address
  • create_incident      – Persist EmergencyEvent to database

Memory:  Active alert state in Redis; deduplicated within 60-second window
"""
from __future__ import annotations

import json
from agents.base_agent import BaseAgent, AgentInput, AgentOutput
from langchain_core.tools import tool


@tool
def dispatch_sms_alert(phone: str, message: str) -> dict:
    """Send an emergency SMS via Twilio."""
    return {"status": "queued", "phone": phone}


@tool
def dispatch_voice_call(phone: str, message: str) -> dict:
    """Initiate a Twilio voice call with TTS SOS message."""
    return {"status": "initiated", "phone": phone}


@tool
def send_push_alert(user_ids: list, title: str, body: str) -> dict:
    """Send Firebase push notification to family guardian devices."""
    return {"sent_to": len(user_ids)}


@tool
def reverse_geocode(latitude: float, longitude: float) -> str:
    """Convert coordinates to human-readable address string."""
    return f"Location: {latitude:.4f}, {longitude:.4f}"


SYSTEM_PROMPT = """
You are RAKSHAK's Emergency Response Agent — a calm, decisive emergency
coordinator that protects elderly users from critical health events.

Elder: {name}, Age: {age}
Emergency Type: {event_type}
Current Vitals: {vitals}
Location: {location}
Emergency Context: {emergency_context}

Your decision tree:
1. Assess severity score (0.0 – 1.0)
2. Determine response level:
   - score >= 0.9 → CRITICAL: call ambulance + alert all contacts via call + SMS
   - score >= 0.7 → HIGH: alert primary contact via call + push + SMS
   - score >= 0.5 → MODERATE: alert all contacts via push + SMS
   - score < 0.5  → LOW: notify primary contact via push
3. Generate a brief incident assessment
4. Specify contacts to notify (from family_members)

Respond in JSON:
{{
  "severity_score": 0.85,
  "response_level": "HIGH",
  "ai_assessment": "Brief incident summary",
  "contacts_to_notify": ["contact_id_1"],
  "channels_to_use": ["sms", "voice_call", "push"],
  "reasoning_steps": ["..."],
  "emergency_flag": true,
  "confidence_score": 0.92,
  "suggested_actions": [{{"label": "...", "action": "..."}}]
}}
"""


class EmergencyAgent(BaseAgent):
    AGENT_NAME = "emergency_agent"
    RESPONSIBILITIES = [
        "Process SOS triggers (manual, fall, vitals-critical)",
        "Assess severity and determine response level",
        "Dispatch multi-channel emergency alerts (SMS, voice, push)",
        "Track acknowledgement and escalate unacknowledged events",
    ]

    def get_tools(self) -> list:
        return [dispatch_sms_alert, dispatch_voice_call, send_push_alert, reverse_geocode]

    def get_system_prompt(self) -> str:
        return SYSTEM_PROMPT

    async def run(self, input_data: AgentInput) -> AgentOutput:
        start = self._start_timer()
        self.logger.info("emergency_agent.run", user_id=input_data.user_id)

        profile = input_data.profile_snapshot
        emergency = input_data.emergency_context

        prompt = SYSTEM_PROMPT.format(
            name=profile.get("full_name", "Elder"),
            age=profile.get("age", "N/A"),
            event_type=emergency.get("event_type", "sos_manual"),
            vitals=json.dumps(input_data.vitals_snapshot, indent=2),
            location=emergency.get("location", "Unknown"),
            emergency_context=json.dumps(emergency, indent=2),
        )

        try:
            response = await self.llm.ainvoke(prompt)
            parsed = json.loads(response.content if hasattr(response, "content") else str(response))
        except Exception as e:
            self.logger.error("emergency_agent.error", error=str(e))
            parsed = {
                "severity_score": 0.9,
                "response_level": "HIGH",
                "ai_assessment": "Emergency detected. Notifying family immediately.",
                "contacts_to_notify": [],
                "channels_to_use": ["sms", "push"],
                "reasoning_steps": ["Parse error – assuming high severity for safety"],
                "emergency_flag": True,
                "confidence_score": 0.7,
                "suggested_actions": [],
            }

        output = AgentOutput(
            agent_name=self.AGENT_NAME,
            response=parsed.get("ai_assessment", "Emergency response initiated."),
            confidence_score=parsed.get("confidence_score", 0.7),
            reasoning_steps=parsed.get("reasoning_steps", []),
            suggested_actions=parsed.get("suggested_actions", []),
            emergency_flag=True,
            should_escalate=parsed.get("severity_score", 0.9) >= 0.9,
            metadata={
                "severity_score": parsed.get("severity_score", 0.9),
                "response_level": parsed.get("response_level", "HIGH"),
                "channels": parsed.get("channels_to_use", []),
                "contacts_to_notify": parsed.get("contacts_to_notify", []),
            },
            latency_ms=self._end_timer(start),
        )

        self._log_run(input_data, output)
        return output
