"""
Document loader registry for all RAKSHAK medical knowledge sources.

Directory layout expected under backend/rag/knowledge_base/:
  who_guidelines/        ← WHO PDF clinical guidelines
  medicine_database/     ← Drug monograph text files
  hospital_protocols/    ← Hospital care protocols
  govt_health_schemes/   ← Ayushman Bharat, PMJAY documents
  medical_faqs/          ← Curated elder care FAQs

Run this script once during setup to populate the vector store:
  python -m rag.document_loaders
"""
import asyncio
from pathlib import Path
from rag.rag_service import rag_service
from core.logging import get_logger

logger = get_logger("document_loaders")

KNOWLEDGE_SOURCES = {
    "who_guidelines": "WHO Clinical Guidelines",
    "medicine_database": "Medicine Database",
    "hospital_protocols": "Hospital Protocols",
    "govt_health_schemes": "Government Health Schemes (India)",
    "medical_faqs": "Rakshak Elder Care FAQs",
}

BASE_DIR = Path(__file__).parent / "knowledge_base"


def ingest_all_sources() -> None:
    """Ingest all knowledge source directories into the vector store."""
    total_chunks = 0
    for folder, tag in KNOWLEDGE_SOURCES.items():
        source_dir = BASE_DIR / folder
        if source_dir.exists():
            count = rag_service.ingest_directory(str(source_dir), source_tag=tag)
            total_chunks += count
            logger.info(f"Ingested: {tag} — {count} chunks")
        else:
            logger.warning(f"Source directory not found, skipping: {source_dir}")

    logger.info(f"Total chunks ingested: {total_chunks}")


if __name__ == "__main__":
    ingest_all_sources()
