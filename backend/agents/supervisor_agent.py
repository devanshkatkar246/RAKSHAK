"""
Supervisor Agent (LangGraph Orchestrator)
─────────────────────────────────────────────────────────────────────────────
Responsibilities:
  • Classify incoming user intent / event type
  • Route to the correct specialist agent(s)
  • Support parallel agent execution (LangGraph fan-out)
  • Aggregate and synthesize multi-agent outputs
  • Escalate to emergency pipeline when required
  • Maintain confidence scoring across the agent pipeline
  • Produce final unified response to the frontend

Decision Rules:
  • Emergency keywords / critical vitals   → EmergencyAgent (highest priority)
  • Medication queries / schedule checks   → MedicationAgent
  • Health/vitals questions                → HealthMonitoringAgent
  • Wellness/lifestyle/mood queries        → WellnessAgent
  • General medical knowledge questions   → KnowledgeAgent
  • Family status update requests         → FamilyCommunicationAgent
  • Notification routing                  → NotificationAgent
  • Ambiguous / complex → multiple agents in parallel

LangGraph Node Graph:
  [START]
     │
     ▼
  classify_intent        ← LLM intent classifier
     │
     ├─── emergency       → emergency_agent_node
     ├─── medication      → medication_agent_node
     ├─── health          → health_monitoring_agent_node
     ├─── wellness        → wellness_agent_node
     ├─── knowledge       → knowledge_agent_node
     ├─── family          → family_communication_agent_node
     └─── general         → multi_agent_parallel_node
                                   │
                              synthesize_outputs
                                   │
                                [END]
"""
from __future__ import annotations

import json
from typing import TypedDict, Annotated, List, Optional
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import StateGraph, END, START
from langgraph.graph.message import add_messages
from langchain_core.messages import HumanMessage, SystemMessage

from core.config import settings
from core.logging import get_logger
from agents.base_agent import AgentInput, AgentOutput
from agents.health_monitoring_agent import HealthMonitoringAgent
from agents.medication_agent import MedicationAgent
from agents.emergency_agent import EmergencyAgent
from agents.wellness_agent import WellnessAgent
from agents.knowledge_agent import KnowledgeAgent
from agents.family_communication_agent import FamilyCommunicationAgent
from agents.notification_agent import NotificationAgent

logger = get_logger("supervisor_agent")


# ── LangGraph State ────────────────────────────────────────────────────────────

class SupervisorState(TypedDict):
    """Shared mutable state flowing through the agent graph."""
    user_id: str
    session_id: str
    messages: Annotated[list, add_messages]
    agent_input: AgentInput
    classified_intent: Optional[str]
    agent_outputs: List[AgentOutput]
    final_response: str
    emergency_flag: bool
    confidence_score: float
    reasoning_steps: List[str]
    suggested_actions: List[dict]
    rag_sources: List[dict]
    error: Optional[str]


# ── Intent Classifier Prompt ───────────────────────────────────────────────────

CLASSIFIER_PROMPT = """
You are RAKSHAK's AI Supervisor. Classify the user's intent into exactly ONE category.

Categories:
- "emergency"   : SOS trigger, fall alert, critical vital, help/danger words
- "medication"  : drug questions, schedule, dose, pill reminders, interactions
- "health"      : vitals, heart rate, blood pressure, SpO2, health report
- "wellness"    : sleep, steps, exercise, diet, mood, hydration, lifestyle
- "knowledge"   : general medical facts, disease info, govt health schemes
- "family"      : family update, digest, sharing status with family
- "general"     : conversation, greetings, unclear intent → use multiple agents

User message: "{message}"
Active vitals risk: "{vitals_risk}"

Respond with ONLY the category string (no quotes, no explanation).
"""


class SupervisorAgent:
    """
    LangGraph-powered multi-agent orchestration supervisor.
    Acts as the entry point for every user request or system event.
    """

    def __init__(self) -> None:
        self.llm = ChatGoogleGenerativeAI(
            model=settings.GEMINI_MODEL,
            google_api_key=settings.GEMINI_API_KEY,
            temperature=settings.GEMINI_TEMPERATURE,
            max_output_tokens=settings.GEMINI_MAX_OUTPUT_TOKENS,
        )

        # ── Instantiate all specialist agents ──────────────────────
        self.health_agent = HealthMonitoringAgent(self.llm)
        self.medication_agent = MedicationAgent(self.llm)
        self.emergency_agent = EmergencyAgent(self.llm)
        self.wellness_agent = WellnessAgent(self.llm)
        self.knowledge_agent = KnowledgeAgent(self.llm)
        self.family_agent = FamilyCommunicationAgent(self.llm)
        self.notification_agent = NotificationAgent(self.llm)

        # ── Build LangGraph ────────────────────────────────────────
        self._graph = self._build_graph()

    # ── LangGraph Node Functions ───────────────────────────────────

    async def _classify_intent_node(self, state: SupervisorState) -> SupervisorState:
        """Use Gemini to classify user intent."""
        agent_input = state["agent_input"]
        vitals_risk = agent_input.vitals_snapshot.get("overall_risk", "stable")

        prompt = CLASSIFIER_PROMPT.format(
            message=agent_input.message,
            vitals_risk=vitals_risk,
        )

        try:
            response = await self.llm.ainvoke([HumanMessage(content=prompt)])
            intent = response.content.strip().lower().replace('"', "")
        except Exception as e:
            logger.error("supervisor.classify_intent.error", error=str(e))
            intent = "general"

        logger.info("supervisor.intent_classified", intent=intent, user_id=state["user_id"])
        return {**state, "classified_intent": intent}

    async def _route_node(self, state: SupervisorState) -> str:
        """LangGraph conditional edge — route to correct agent node."""
        intent = state.get("classified_intent", "general")
        route_map = {
            "emergency": "emergency_node",
            "medication": "medication_node",
            "health": "health_node",
            "wellness": "wellness_node",
            "knowledge": "knowledge_node",
            "family": "family_node",
            "general": "parallel_node",
        }
        return route_map.get(intent, "parallel_node")

    async def _emergency_node(self, state: SupervisorState) -> SupervisorState:
        output = await self.emergency_agent.run(state["agent_input"])
        return {**state, "agent_outputs": [output], "emergency_flag": True}

    async def _medication_node(self, state: SupervisorState) -> SupervisorState:
        output = await self.medication_agent.run(state["agent_input"])
        return {**state, "agent_outputs": [output]}

    async def _health_node(self, state: SupervisorState) -> SupervisorState:
        output = await self.health_agent.run(state["agent_input"])
        if output.emergency_flag:
            state["emergency_flag"] = True
        return {**state, "agent_outputs": [output]}

    async def _wellness_node(self, state: SupervisorState) -> SupervisorState:
        output = await self.wellness_agent.run(state["agent_input"])
        return {**state, "agent_outputs": [output]}

    async def _knowledge_node(self, state: SupervisorState) -> SupervisorState:
        output = await self.knowledge_agent.run(state["agent_input"])
        return {**state, "agent_outputs": [output]}

    async def _family_node(self, state: SupervisorState) -> SupervisorState:
        output = await self.family_agent.run(state["agent_input"])
        return {**state, "agent_outputs": [output]}

    async def _parallel_node(self, state: SupervisorState) -> SupervisorState:
        """Run health + wellness + knowledge in parallel for general queries."""
        import asyncio
        results = await asyncio.gather(
            self.health_agent.run(state["agent_input"]),
            self.wellness_agent.run(state["agent_input"]),
            self.knowledge_agent.run(state["agent_input"]),
        )
        return {**state, "agent_outputs": list(results)}

    async def _synthesize_node(self, state: SupervisorState) -> SupervisorState:
        """Synthesize outputs from one or more agents into a unified final response."""
        outputs: list[AgentOutput] = state["agent_outputs"]

        if not outputs:
            return {**state, "final_response": "I am monitoring your health. How can I help you today?"}

        # Select highest-confidence response as primary
        primary = max(outputs, key=lambda o: o.confidence_score)

        # Aggregate reasoning and actions from all agents
        all_reasoning = []
        all_actions: list[dict] = []
        all_rag: list[dict] = []

        for o in outputs:
            all_reasoning.extend(o.reasoning_steps)
            all_actions.extend(o.suggested_actions)
            all_rag.extend(o.rag_sources)

        return {
            **state,
            "final_response": primary.response,
            "confidence_score": primary.confidence_score,
            "reasoning_steps": all_reasoning,
            "suggested_actions": all_actions[:5],   # Limit to 5 actions
            "rag_sources": all_rag[:3],
            "emergency_flag": any(o.emergency_flag for o in outputs),
        }

    # ── LangGraph Build ────────────────────────────────────────────

    def _build_graph(self) -> StateGraph:
        graph = StateGraph(SupervisorState)

        # Nodes
        graph.add_node("classify_intent", self._classify_intent_node)
        graph.add_node("emergency_node", self._emergency_node)
        graph.add_node("medication_node", self._medication_node)
        graph.add_node("health_node", self._health_node)
        graph.add_node("wellness_node", self._wellness_node)
        graph.add_node("knowledge_node", self._knowledge_node)
        graph.add_node("family_node", self._family_node)
        graph.add_node("parallel_node", self._parallel_node)
        graph.add_node("synthesize", self._synthesize_node)

        # Edges
        graph.add_edge(START, "classify_intent")
        graph.add_conditional_edges("classify_intent", self._route_node)

        for node in ["emergency_node", "medication_node", "health_node",
                     "wellness_node", "knowledge_node", "family_node", "parallel_node"]:
            graph.add_edge(node, "synthesize")

        graph.add_edge("synthesize", END)

        return graph.compile()

    # ── Public API ─────────────────────────────────────────────────

    async def process(self, agent_input: AgentInput) -> SupervisorState:
        """
        Main entry point: process an elder's message through the multi-agent
        graph and return the final synthesized state.
        """
        initial_state: SupervisorState = {
            "user_id": agent_input.user_id,
            "session_id": agent_input.session_id,
            "messages": [HumanMessage(content=agent_input.message)],
            "agent_input": agent_input,
            "classified_intent": None,
            "agent_outputs": [],
            "final_response": "",
            "emergency_flag": False,
            "confidence_score": 0.0,
            "reasoning_steps": [],
            "suggested_actions": [],
            "rag_sources": [],
            "error": None,
        }

        try:
            final_state = await self._graph.ainvoke(initial_state)
            logger.info(
                "supervisor.process_complete",
                user_id=agent_input.user_id,
                intent=final_state.get("classified_intent"),
                emergency=final_state.get("emergency_flag"),
                confidence=final_state.get("confidence_score"),
            )
            return final_state
        except Exception as e:
            logger.error("supervisor.process_error", error=str(e), user_id=agent_input.user_id)
            return {
                **initial_state,
                "final_response": "I am here with you. Please try again or press SOS if you need urgent help.",
                "error": str(e),
            }
