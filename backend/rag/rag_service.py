"""
RAG Pipeline for RAKSHAK Medical Knowledge Base
─────────────────────────────────────────────────────────────────────────────
Knowledge Sources:
  1. WHO Clinical Guidelines (PDFs)
  2. India MOHFW Healthcare Documents
  3. Medicine Database (drug monographs)
  4. Hospital Database & Protocols
  5. Ayushman Bharat / PMJAY Government Health Schemes
  6. Custom Medical FAQs for Elderly Care

Architecture:
  DocumentLoader → TextSplitter → Embedding → pgvector Store
  Query → Embed → pgvector similarity search → Context → LLM
"""
from __future__ import annotations

from pathlib import Path
from typing import List, Optional

from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_community.vectorstores import PGVector
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_core.documents import Document

from core.config import settings
from core.logging import get_logger

logger = get_logger("rag_service")

# ── Connection string for pgvector (sync) ─────────────────────────
PG_CONNECTION_STRING = settings.DATABASE_URL.replace("+asyncpg", "")


class RAGService:
    """
    Manages the RAKSHAK medical knowledge vector store.
    Provides document ingestion and semantic search capabilities.
    """

    def __init__(self) -> None:
        self.embeddings = GoogleGenerativeAIEmbeddings(
            model="models/text-embedding-004",
            google_api_key=settings.GEMINI_API_KEY,
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=150,
            separators=["\n\n", "\n", ".", "!", "?", " "],
        )
        self._vector_store: Optional[PGVector] = None

    @property
    def vector_store(self) -> PGVector:
        if self._vector_store is None:
            self._vector_store = PGVector(
                collection_name=settings.VECTOR_STORE_COLLECTION,
                connection_string=PG_CONNECTION_STRING,
                embedding_function=self.embeddings,
            )
        return self._vector_store

    # ── Document Ingestion ────────────────────────────────────────

    def ingest_pdf(self, file_path: str, source_tag: str = "general") -> int:
        """Load and ingest a PDF document into the vector store."""
        loader = PyPDFLoader(file_path)
        docs = loader.load()
        return self._ingest_documents(docs, source_tag)

    def ingest_text(self, file_path: str, source_tag: str = "general") -> int:
        """Load and ingest a plain text document."""
        loader = TextLoader(file_path, encoding="utf-8")
        docs = loader.load()
        return self._ingest_documents(docs, source_tag)

    def ingest_raw_text(self, text: str, metadata: dict) -> int:
        """Ingest raw text string directly."""
        doc = Document(page_content=text, metadata=metadata)
        return self._ingest_documents([doc], metadata.get("source", "manual"))

    def _ingest_documents(self, docs: List[Document], source_tag: str) -> int:
        """Split, embed, and store documents."""
        # Enrich metadata with source category
        for doc in docs:
            doc.metadata["source_tag"] = source_tag
            doc.metadata["platform"] = "rakshak"

        chunks = self.text_splitter.split_documents(docs)
        self.vector_store.add_documents(chunks)
        logger.info("rag.ingested", source=source_tag, chunks=len(chunks))
        return len(chunks)

    # ── Semantic Search ───────────────────────────────────────────

    def query(
        self,
        query: str,
        top_k: int = None,
        source_filter: Optional[str] = None,
    ) -> List[dict]:
        """
        Perform semantic similarity search and return ranked chunks.
        Returns list of {content, source, score} dicts.
        """
        k = top_k or settings.RAG_TOP_K

        if source_filter:
            docs_with_scores = self.vector_store.similarity_search_with_score(
                query,
                k=k,
                filter={"source_tag": source_filter},
            )
        else:
            docs_with_scores = self.vector_store.similarity_search_with_score(query, k=k)

        results = []
        for doc, score in docs_with_scores:
            if score >= settings.RAG_SIMILARITY_THRESHOLD:
                results.append({
                    "content": doc.page_content,
                    "source": doc.metadata.get("source", ""),
                    "source_tag": doc.metadata.get("source_tag", ""),
                    "page": doc.metadata.get("page"),
                    "score": round(float(score), 4),
                })

        logger.info("rag.query", query=query[:80], results=len(results))
        return results

    # ── Bulk Ingestion ────────────────────────────────────────────

    def ingest_directory(self, directory: str, source_tag: str = "general") -> int:
        """Ingest all PDFs and text files in a directory."""
        total = 0
        path = Path(directory)

        for pdf_file in path.glob("**/*.pdf"):
            total += self.ingest_pdf(str(pdf_file), source_tag)

        for txt_file in path.glob("**/*.txt"):
            total += self.ingest_text(str(txt_file), source_tag)

        logger.info("rag.bulk_ingest_complete", directory=directory, total_chunks=total)
        return total


# ── Singleton ─────────────────────────────────────────────────────
rag_service = RAGService()
