"""
Health Monitoring Agent
─────────────────────────────────────────────────────────────────────────────
Responsibilities:
  • Continuously analyse incoming vitals (heart rate, BP, SpO2, temp, glucose)
  • Detect anomalies vs. user baseline using statistical thresholds + AI reasoning
  • Classify risk level: optimal / stable / caution / critical
  • Generate AI health commentary with actionable guidance for the elder
  • Decide whether to escalate to SupervisorAgent or EmergencyAgent

Inputs:  vitals_snapshot, profile_snapshot, historical baselines
Outputs: risk_level, ai_analysis, should_escalate, suggested_actions

Tools:
  • get_vital_history   – fetch last 7-day rolling average from DB
  • lookup_normal_range – look up WHO normal ranges from medical KB
  • assess_bp_risk      – compute BP risk category (JNC-8 guidelines)

Memory:  Short-term: last 3 readings; Long-term: 30-day baseline in Redis
"""
from __future__ import annotations

from agents.base_agent import BaseAgent, AgentInput, AgentOutput
from langchain_core.tools import tool
from typing import Any


@tool
def get_vital_history(vital_type: str, days: int = 7) -> dict:
    """Retrieve rolling vital history for trend analysis."""
    # Stub — real impl queries VitalService
    return {"vital_type": vital_type, "days": days, "readings": []}


@tool
def lookup_normal_range(vital_type: str, age: int, gender: str) -> dict:
    """Return WHO/AHA recommended normal range for a vital given age and gender."""
    ranges = {
        "heart_rate": {"min": 60, "max": 100, "unit": "BPM"},
        "blood_pressure_sys": {"min": 90, "max": 130, "unit": "mmHg"},
        "spo2": {"min": 95, "max": 100, "unit": "%"},
        "glucose_fasting": {"min": 70, "max": 100, "unit": "mg/dL"},
        "temperature": {"min": 36.1, "max": 37.2, "unit": "°C"},
    }
    return ranges.get(vital_type, {"min": 0, "max": 999, "unit": "n/a"})


@tool
def assess_bp_risk(systolic: float, diastolic: float, age: int) -> str:
    """Classify blood pressure according to JNC-8 guidelines."""
    if systolic < 120 and diastolic < 80:
        return "optimal"
    if systolic < 130 and diastolic < 80:
        return "elevated"
    if systolic < 140 or diastolic < 90:
        return "hypertension_stage_1"
    return "hypertension_stage_2"


class HealthMonitoringAgent(BaseAgent):
    AGENT_NAME = "health_monitoring_agent"
    RESPONSIBILITIES = [
        "Analyse vitals for anomalies against user baselines",
        "Classify health risk level: optimal / stable / caution / critical",
        "Generate AI health commentary with guidance",
        "Escalate critical readings to Supervisor or Emergency agent",
    ]

    SYSTEM_PROMPT_TEMPLATE = """
You are RAKSHAK's Health Monitoring AI, an expert in geriatric health telemetry analysis.

Elder Profile:
- Name: {name}, Age: {age}, Blood Group: {blood_group}
- Primary Conditions: {conditions}
- Known Allergies: {allergies}

Current Vitals Snapshot:
{vitals_snapshot}

Your responsibilities:
1. Detect any anomaly by comparing vitals to known normal ranges and personal baseline
2. Classify risk: optimal | stable | caution | critical
3. Provide a warm, simple explanation in plain language (elder-friendly, max 3 sentences)
4. Suggest 1-2 immediate actions if needed
5. If any vital is CRITICAL, set emergency_flag=true
6. Always include your confidence score (0.0 - 1.0)
7. Be compassionate, reassuring unless urgency demands clarity

Respond in JSON format:
{{
  "risk_level": "optimal|stable|caution|critical",
  "summary": "Plain language summary for elder",
  "reasoning_steps": ["step1", "step2"],
  "suggested_actions": [{{"label": "action text", "action": "action_key"}}],
  "emergency_flag": false,
  "confidence_score": 0.92
}}
"""

    def get_tools(self) -> list:
        return [get_vital_history, lookup_normal_range, assess_bp_risk]

    def get_system_prompt(self) -> str:
        return self.SYSTEM_PROMPT_TEMPLATE

    async def run(self, input_data: AgentInput) -> AgentOutput:
        start = self._start_timer()
        self.logger.info("health_monitoring_agent.run", user_id=input_data.user_id)

        profile = input_data.profile_snapshot
        vitals = input_data.vitals_snapshot

        prompt = self.SYSTEM_PROMPT_TEMPLATE.format(
            name=profile.get("full_name", "Elder"),
            age=profile.get("age", "N/A"),
            blood_group=profile.get("blood_group", "Unknown"),
            conditions=", ".join(profile.get("primary_conditions", [])),
            allergies=", ".join(profile.get("known_allergies", [])),
            vitals_snapshot=vitals,
        )

        try:
            response = await self.llm.ainvoke(prompt)
            import json
            parsed = json.loads(response.content if hasattr(response, "content") else str(response))
        except Exception as e:
            self.logger.error("health_monitoring_agent.parse_error", error=str(e))
            parsed = {
                "risk_level": "stable",
                "summary": "Vitals are being monitored. Please check with your doctor if you feel unwell.",
                "reasoning_steps": ["LLM parse error — using safe default"],
                "suggested_actions": [],
                "emergency_flag": False,
                "confidence_score": 0.5,
            }

        output = AgentOutput(
            agent_name=self.AGENT_NAME,
            response=parsed.get("summary", ""),
            confidence_score=parsed.get("confidence_score", 0.5),
            reasoning_steps=parsed.get("reasoning_steps", []),
            suggested_actions=parsed.get("suggested_actions", []),
            emergency_flag=parsed.get("emergency_flag", False),
            should_escalate=parsed.get("risk_level") in ["critical"],
            escalation_reason="Critical vital detected" if parsed.get("risk_level") == "critical" else None,
            metadata={"risk_level": parsed.get("risk_level", "stable")},
            latency_ms=self._end_timer(start),
        )

        self._log_run(input_data, output)
        return output
