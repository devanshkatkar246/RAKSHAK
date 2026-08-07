"""
Base Agent – Abstract foundation for all RAKSHAK AI agents.

Every concrete agent must:
  1. Define `AGENT_NAME` and `RESPONSIBILITIES`
  2. Implement `get_tools()` returning LangChain Tool list
  3. Implement `get_system_prompt()` returning a formatted string
  4. Implement `run(state: AgentState) -> AgentOutput`
"""
from __future__ import annotations

import abc
import time
import uuid
from dataclasses import dataclass, field
from typing import Any, Optional
from core.logging import get_logger


@dataclass
class AgentInput:
    """Normalized input passed into any agent."""
    user_id: str
    session_id: str
    message: str
    vitals_snapshot: dict = field(default_factory=dict)
    medication_snapshot: dict = field(default_factory=dict)
    profile_snapshot: dict = field(default_factory=dict)
    emergency_context: dict = field(default_factory=dict)
    history: list = field(default_factory=list)          # Last N chat turns
    extra: dict = field(default_factory=dict)


@dataclass
class AgentOutput:
    """Normalized output from any agent."""
    agent_name: str
    response: str
    confidence_score: float = 0.0
    reasoning_steps: list[str] = field(default_factory=list)
    suggested_actions: list[dict] = field(default_factory=list)
    should_escalate: bool = False
    escalation_reason: Optional[str] = None
    emergency_flag: bool = False
    rag_sources: list[dict] = field(default_factory=list)
    metadata: dict = field(default_factory=dict)
    tokens_used: int = 0
    latency_ms: float = 0.0


class BaseAgent(abc.ABC):
    """Abstract base for all Rakshak AI Agents."""

    AGENT_NAME: str = "base_agent"
    RESPONSIBILITIES: list[str] = []

    def __init__(self, llm: Any) -> None:
        self.llm = llm
        self.logger = get_logger(self.AGENT_NAME)

    @abc.abstractmethod
    def get_tools(self) -> list:
        """Return LangChain BaseTool list for this agent."""

    @abc.abstractmethod
    def get_system_prompt(self) -> str:
        """Return formatted system instruction string."""

    @abc.abstractmethod
    async def run(self, input_data: AgentInput) -> AgentOutput:
        """Execute agent logic and return output."""

    # ── Convenience Helpers ────────────────────────────────────────

    def _start_timer(self) -> float:
        return time.perf_counter()

    def _end_timer(self, start: float) -> float:
        return round((time.perf_counter() - start) * 1000, 2)

    def _make_session_id(self) -> str:
        return str(uuid.uuid4())

    def _log_run(self, input_data: AgentInput, output: AgentOutput) -> None:
        self.logger.info(
            "agent_run_complete",
            agent=self.AGENT_NAME,
            user_id=input_data.user_id,
            confidence=output.confidence_score,
            emergency_flag=output.emergency_flag,
            latency_ms=output.latency_ms,
            tokens=output.tokens_used,
        )
