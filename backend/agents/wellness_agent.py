"""
Wellness Agent
─────────────────────────────────────────────────────────────────────────────
Responsibilities:
  • Provide daily wellness coaching (sleep quality, hydration, activity)
  • Deliver motivational, compassionate nudges in elder-friendly language
  • Generate weekly wellness digest summary for family
  • Correlate sleep, activity, and mood patterns over time
  • Suggest achievable lifestyle improvements

Inputs:  vitals_snapshot (sleep, steps), profile_snapshot, message
Outputs: wellness_score, coaching_response, weekly_digest, tips

Tools:
  • get_activity_summary  – retrieve weekly step & activity data
  • get_sleep_analysis    – analyse sleep pattern from wearable
  • suggest_wellness_tips – RAG-based WHO lifestyle recommendations

Memory:  7-day rolling wellness history in Redis
"""
from __future__ import annotations

import json
from agents.base_agent import BaseAgent, AgentInput, AgentOutput
from langchain_core.tools import tool


@tool
def get_activity_summary(user_id: str, days: int = 7) -> dict:
    """Return weekly activity summary (steps, active minutes)."""
    return {"average_steps": 0, "active_minutes": 0, "goal_achievement": 0.0}


@tool
def get_sleep_analysis(user_id: str, days: int = 7) -> dict:
    """Return sleep pattern analysis from wearable data."""
    return {"average_hours": 7.0, "quality_score": 0.75, "deep_sleep_pct": 0.20}


@tool
def suggest_wellness_tips(category: str, age: int) -> list:
    """Return WHO-backed wellness tips for elders."""
    return ["Stay hydrated with 8 glasses of water daily.", "Light walking for 30 minutes improves heart health."]


SYSTEM_PROMPT = """
You are RAKSHAK's Wellness Companion — a warm, encouraging wellness coach
dedicated to helping elderly users live their healthiest, most joyful lives.

Elder: {name}, Age: {age}
Today's Wellness Data:
  - Steps today: {steps}
  - Sleep last night: {sleep} hours
  - Heart Rate average: {hr} BPM
  - SpO2: {spo2}%

User's message: {message}

Your guidelines:
1. Be warm, encouraging, never judgmental — celebrate small wins!
2. Provide ONE achievable wellness tip for today
3. Comment on sleep and activity data in simple language
4. If sleep < 6 hours: gently suggest rest improvement
5. If steps < 2000: encourage a gentle 10-minute walk
6. Use culturally appropriate references (Indian elder context)

Respond in JSON:
{{
  "response": "Warm, encouraging wellness message",
  "wellness_score": 82,
  "reasoning_steps": ["..."],
  "today_tip": "One actionable tip",
  "mood_indicator": "positive|neutral|needs_attention",
  "suggested_actions": [{{"label": "...", "action": "..."}}],
  "confidence_score": 0.88
}}
"""


class WellnessAgent(BaseAgent):
    AGENT_NAME = "wellness_agent"
    RESPONSIBILITIES = [
        "Daily wellness coaching (sleep, hydration, activity)",
        "Motivational nudges with cultural sensitivity",
        "Weekly wellness digest for family",
        "Lifestyle improvement suggestions via RAG",
    ]

    def get_tools(self) -> list:
        return [get_activity_summary, get_sleep_analysis, suggest_wellness_tips]

    def get_system_prompt(self) -> str:
        return SYSTEM_PROMPT

    async def run(self, input_data: AgentInput) -> AgentOutput:
        start = self._start_timer()
        profile = input_data.profile_snapshot
        vitals = input_data.vitals_snapshot

        prompt = SYSTEM_PROMPT.format(
            name=profile.get("full_name", "Elder"),
            age=profile.get("age", "N/A"),
            steps=vitals.get("steps", {}).get("value", 0),
            sleep=vitals.get("sleep", {}).get("value", 0),
            hr=vitals.get("heart_rate", {}).get("value", 0),
            spo2=vitals.get("spo2", {}).get("value", 0),
            message=input_data.message,
        )

        try:
            response = await self.llm.ainvoke(prompt)
            parsed = json.loads(response.content if hasattr(response, "content") else str(response))
        except Exception as e:
            self.logger.error("wellness_agent.error", error=str(e))
            parsed = {
                "response": "You are doing wonderfully! Remember to drink water and take a short walk today.",
                "wellness_score": 70,
                "reasoning_steps": ["Parse error – using default"],
                "today_tip": "Stay hydrated with 8 glasses of water.",
                "mood_indicator": "neutral",
                "suggested_actions": [],
                "confidence_score": 0.5,
            }

        output = AgentOutput(
            agent_name=self.AGENT_NAME,
            response=parsed.get("response", ""),
            confidence_score=parsed.get("confidence_score", 0.5),
            reasoning_steps=parsed.get("reasoning_steps", []),
            suggested_actions=parsed.get("suggested_actions", []),
            metadata={
                "wellness_score": parsed.get("wellness_score", 70),
                "mood_indicator": parsed.get("mood_indicator", "neutral"),
                "today_tip": parsed.get("today_tip", ""),
            },
            latency_ms=self._end_timer(start),
        )
        self._log_run(input_data, output)
        return output
