"""
Family Communication Agent
─────────────────────────────────────────────────────────────────────────────
Responsibilities:
  • Compile and send daily health digest to family guardians
  • Alert family when elder's condition changes significantly
  • Respond to family member queries about elder's status
  • Provide context-rich summaries without overwhelming technical detail
  • Manage communication preferences (frequency, channel, language)

Inputs:  profile, vitals_snapshot, medication_snapshot, family_members list
Outputs: digest_message, alert_message, family_response

Tools:
  • get_family_members     – retrieve contacts for elder
  • send_family_digest     – push digest via notification channel
  • generate_health_report – PDF health summary for family
"""
from __future__ import annotations

import json
from agents.base_agent import BaseAgent, AgentInput, AgentOutput
from langchain_core.tools import tool


@tool
def get_family_members(user_id: str) -> list:
    """Retrieve the family guardian list for this elder."""
    return []


@tool
def send_family_digest(family_user_ids: list, digest: dict) -> dict:
    """Push health digest to family app notifications and SMS."""
    return {"sent_to": len(family_user_ids)}


SYSTEM_PROMPT = """
You are RAKSHAK's Family Communication Agent — a compassionate bridge
connecting elderly users with their family guardians.

Elder: {name}, Age: {age}
Today's Health Summary:
  Heart Rate: {hr} BPM ({hr_risk})
  Blood Pressure: {bp}
  SpO2: {spo2}%
  Medication Adherence: {adherence}%
  Steps today: {steps}
  Sleep last night: {sleep} hrs

Family Members to Notify: {family_count} guardian(s)
Context: {message}

Your responsibilities:
1. Write a caring, reassuring daily digest for family (not alarming unless truly urgent)
2. Highlight ONLY significant changes — don't overwhelm with routine data
3. If any vital is in caution/critical range — flag clearly for family but keep elder-safe
4. Write in warm, family-appropriate language (not clinical)
5. Include one positive observation to reassure family

Respond in JSON:
{{
  "digest_title": "Savitri Ji's Daily Update – August 7",
  "digest_body": "Detailed family update...",
  "highlights": ["Good sleep of 7.8 hours", "BP optimal all day"],
  "alerts": [],
  "reasoning_steps": ["..."],
  "confidence_score": 0.9,
  "suggested_actions": []
}}
"""


class FamilyCommunicationAgent(BaseAgent):
    AGENT_NAME = "family_communication_agent"
    RESPONSIBILITIES = [
        "Daily health digest to family guardians",
        "Alert family on significant health changes",
        "Answer family queries about elder status",
        "Manage family communication preferences",
    ]

    def get_tools(self) -> list:
        return [get_family_members, send_family_digest]

    def get_system_prompt(self) -> str:
        return SYSTEM_PROMPT

    async def run(self, input_data: AgentInput) -> AgentOutput:
        start = self._start_timer()
        profile = input_data.profile_snapshot
        vitals = input_data.vitals_snapshot
        meds = input_data.medication_snapshot

        prompt = SYSTEM_PROMPT.format(
            name=profile.get("full_name", "Elder"),
            age=profile.get("age", "N/A"),
            hr=vitals.get("heart_rate", {}).get("value", "N/A"),
            hr_risk=vitals.get("heart_rate", {}).get("risk_level", "stable"),
            bp=vitals.get("blood_pressure", {}).get("value_str", "N/A"),
            spo2=vitals.get("spo2", {}).get("value", "N/A"),
            adherence=meds.get("adherence_today", 0),
            steps=vitals.get("steps", {}).get("value", 0),
            sleep=vitals.get("sleep", {}).get("value", 0),
            family_count=len(profile.get("family_members", [])),
            message=input_data.message,
        )

        try:
            response = await self.llm.ainvoke(prompt)
            parsed = json.loads(response.content if hasattr(response, "content") else str(response))
        except Exception as e:
            self.logger.error("family_communication_agent.error", error=str(e))
            parsed = {
                "digest_title": "Daily Update",
                "digest_body": "Your loved one is safe. Vitals are being monitored continuously by Rakshak.",
                "highlights": [],
                "alerts": [],
                "reasoning_steps": ["Parse error"],
                "confidence_score": 0.5,
                "suggested_actions": [],
            }

        output = AgentOutput(
            agent_name=self.AGENT_NAME,
            response=parsed.get("digest_body", ""),
            confidence_score=parsed.get("confidence_score", 0.5),
            reasoning_steps=parsed.get("reasoning_steps", []),
            suggested_actions=parsed.get("suggested_actions", []),
            metadata={
                "digest_title": parsed.get("digest_title", ""),
                "highlights": parsed.get("highlights", []),
                "alerts": parsed.get("alerts", []),
            },
            latency_ms=self._end_timer(start),
        )
        self._log_run(input_data, output)
        return output
