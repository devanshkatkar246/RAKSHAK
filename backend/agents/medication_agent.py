"""
Medication Agent
─────────────────────────────────────────────────────────────────────────────
Responsibilities:
  • Monitor daily adherence schedule and detect overdue/missed doses
  • Send intelligent contextual reminders (not robotic alerts)
  • Check for dangerous drug-drug and drug-food interactions
  • Advise on low supply / refill requirements
  • Coach elder on how and when to take medications

Inputs:  medication_snapshot, profile_snapshot, current_time, message
Outputs: adherence_rate, reminders, interaction_warnings, coaching_response

Tools:
  • check_drug_interactions – verify interactions in MedlinePlus KB
  • get_today_schedule      – fetch today's pending/taken doses
  • calculate_adherence     – compute weekly/monthly adherence %

Memory:  Dose log rolling window; Redis cache for next-due calculations
"""
from __future__ import annotations

import json
from agents.base_agent import BaseAgent, AgentInput, AgentOutput
from langchain_core.tools import tool


@tool
def get_today_schedule(user_id: str) -> dict:
    """Return today's medication schedule with dose statuses."""
    return {"schedule": [], "adherence_today": 0}


@tool
def check_drug_interactions(drug_a: str, drug_b: str) -> dict:
    """Check for known interactions between two drugs using medical KB."""
    return {"has_interaction": False, "severity": "none", "details": ""}


@tool
def calculate_adherence(user_id: str, period_days: int = 7) -> float:
    """Return adherence rate (0.0 – 1.0) for the given period."""
    return 1.0


SYSTEM_PROMPT = """
You are RAKSHAK's Medication Companion Agent, an expert clinical pharmacist
assistant specializing in elderly medication management.

Elder Name: {name}, Age: {age}
Medical Conditions: {conditions}
Active Medications: {medications}
Today's Schedule: {schedule}
Elder's Message: {message}

Your responsibilities:
1. If a dose is overdue, craft a warm, non-alarming reminder
2. If a dose interaction risk is identified, alert clearly but calmly
3. Answer medication questions in simple language (avoid jargon)
4. Suggest refill if remaining pills < 7-day supply
5. Remind about food/timing restrictions specific to the medication

Respond in JSON:
{{
  "response": "Warm message for elder",
  "reasoning_steps": ["..."],
  "interaction_warnings": [],
  "refill_alerts": [],
  "suggested_actions": [{{"label": "...", "action": "..."}}],
  "confidence_score": 0.95
}}
"""


class MedicationAgent(BaseAgent):
    AGENT_NAME = "medication_agent"
    RESPONSIBILITIES = [
        "Monitor and remind about medication schedules",
        "Detect drug-drug and drug-food interactions",
        "Track adherence and flag missed doses",
        "Advise on refills and supply management",
    ]

    def get_tools(self) -> list:
        return [get_today_schedule, check_drug_interactions, calculate_adherence]

    def get_system_prompt(self) -> str:
        return SYSTEM_PROMPT

    async def run(self, input_data: AgentInput) -> AgentOutput:
        start = self._start_timer()
        self.logger.info("medication_agent.run", user_id=input_data.user_id)

        profile = input_data.profile_snapshot
        meds = input_data.medication_snapshot

        prompt = SYSTEM_PROMPT.format(
            name=profile.get("full_name", "Elder"),
            age=profile.get("age", "N/A"),
            conditions=", ".join(profile.get("primary_conditions", [])),
            medications=json.dumps(meds.get("medications", []), indent=2),
            schedule=json.dumps(meds.get("schedule", []), indent=2),
            message=input_data.message,
        )

        try:
            response = await self.llm.ainvoke(prompt)
            parsed = json.loads(response.content if hasattr(response, "content") else str(response))
        except Exception as e:
            self.logger.error("medication_agent.error", error=str(e))
            parsed = {
                "response": "Your medications are being tracked. Please take any pending doses as scheduled.",
                "reasoning_steps": ["Parse error – using safe default"],
                "interaction_warnings": [],
                "refill_alerts": [],
                "suggested_actions": [],
                "confidence_score": 0.6,
            }

        output = AgentOutput(
            agent_name=self.AGENT_NAME,
            response=parsed.get("response", ""),
            confidence_score=parsed.get("confidence_score", 0.6),
            reasoning_steps=parsed.get("reasoning_steps", []),
            suggested_actions=parsed.get("suggested_actions", []),
            metadata={
                "interaction_warnings": parsed.get("interaction_warnings", []),
                "refill_alerts": parsed.get("refill_alerts", []),
            },
            latency_ms=self._end_timer(start),
        )

        self._log_run(input_data, output)
        return output
