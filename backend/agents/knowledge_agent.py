"""
Knowledge Agent (RAG)
─────────────────────────────────────────────────────────────────────────────
Responsibilities:
  • Answer medical/health questions using RAG over curated knowledge base
  • Sources: WHO guidelines, Indian govt health schemes, medicine DB, medical PDFs
  • Cite sources for every answer to ensure clinical accuracy
  • Refuse and escalate if question requires real-time professional consultation
  • Translate complex medical terminology to elder-friendly language

Inputs:  user message, vitals_snapshot, profile_snapshot
Outputs: knowledge_response, citations, confidence_score, escalate_to_doctor

Tools:
  • search_medical_kb      – semantic search over pgvector store
  • search_drug_database   – lookup drug monographs
  • search_govt_schemes    – Ayushman Bharat, PMJAY lookup

Memory:  Stateless per query; conversation context from history
"""
from __future__ import annotations

import json
from agents.base_agent import BaseAgent, AgentInput, AgentOutput
from langchain_core.tools import tool


@tool
def search_medical_kb(query: str, top_k: int = 5) -> list:
    """Semantic search over the RAKSHAK medical knowledge vector store."""
    return []   # Real impl: call RAGService.query(query, top_k)


@tool
def search_drug_database(drug_name: str) -> dict:
    """Look up a drug monograph from the integrated medicine database."""
    return {"drug": drug_name, "found": False}


@tool
def search_govt_schemes(query: str) -> list:
    """Search Indian government health schemes for elder benefits."""
    return []


SYSTEM_PROMPT = """
You are RAKSHAK's Medical Knowledge Agent — a knowledgeable, trustworthy
health information specialist for elderly users in India.

Elder: {name}, Age: {age}
Medical Conditions: {conditions}
Question: {message}

Retrieved Knowledge:
{context}

Guidelines:
1. Answer ONLY from the retrieved knowledge — don't hallucinate facts
2. If no relevant knowledge found, say so clearly and suggest consulting a doctor
3. Use simple, elder-friendly language — avoid complex medical jargon
4. Always cite your sources when providing medical information
5. If question involves symptoms + urgency, escalate_to_doctor = true
6. Do NOT diagnose — only provide general health information

Respond in JSON:
{{
  "response": "Clear, simple answer for elder",
  "sources": [{{"title": "...", "source": "WHO/MOHFW/...", "relevance": 0.92}}],
  "escalate_to_doctor": false,
  "confidence_score": 0.88,
  "reasoning_steps": ["..."],
  "suggested_actions": [{{"label": "...", "action": "..."}}]
}}
"""


class KnowledgeAgent(BaseAgent):
    AGENT_NAME = "knowledge_agent"
    RESPONSIBILITIES = [
        "Answer medical questions using RAG over curated KB",
        "Cite WHO guidelines, drug databases, government schemes",
        "Convert medical jargon to elder-friendly language",
        "Escalate clinical queries to doctor recommendation",
    ]

    def get_tools(self) -> list:
        return [search_medical_kb, search_drug_database, search_govt_schemes]

    def get_system_prompt(self) -> str:
        return SYSTEM_PROMPT

    async def run(self, input_data: AgentInput) -> AgentOutput:
        start = self._start_timer()
        profile = input_data.profile_snapshot

        # In full impl, call RAGService.query() here
        retrieved_context = "No specific context retrieved. Answering from general medical knowledge."

        prompt = SYSTEM_PROMPT.format(
            name=profile.get("full_name", "Elder"),
            age=profile.get("age", "N/A"),
            conditions=", ".join(profile.get("primary_conditions", [])),
            message=input_data.message,
            context=retrieved_context,
        )

        try:
            response = await self.llm.ainvoke(prompt)
            parsed = json.loads(response.content if hasattr(response, "content") else str(response))
        except Exception as e:
            self.logger.error("knowledge_agent.error", error=str(e))
            parsed = {
                "response": "I'm unable to retrieve that information right now. Please consult your doctor for medical advice.",
                "sources": [],
                "escalate_to_doctor": True,
                "confidence_score": 0.4,
                "reasoning_steps": ["Parse error"],
                "suggested_actions": [{"label": "Call Dr. Patel", "action": "call_doctor"}],
            }

        output = AgentOutput(
            agent_name=self.AGENT_NAME,
            response=parsed.get("response", ""),
            confidence_score=parsed.get("confidence_score", 0.4),
            reasoning_steps=parsed.get("reasoning_steps", []),
            suggested_actions=parsed.get("suggested_actions", []),
            rag_sources=parsed.get("sources", []),
            metadata={"escalate_to_doctor": parsed.get("escalate_to_doctor", False)},
            latency_ms=self._end_timer(start),
        )
        self._log_run(input_data, output)
        return output
