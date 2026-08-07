# 🛡️ RAKSHAK Backend — The AI Digital Guardian for Elders

Complete production-grade backend architecture for the **RAKSHAK** AI healthcare platform.

## Stack

| Layer | Technology |
|---|---|
| API | FastAPI 0.115+ |
| AI Orchestration | LangGraph + LangChain |
| AI Model | Gemini 2.5 Flash |
| Primary Database | PostgreSQL 16 + pgvector |
| Cache | Redis 7 |
| Auth | JWT (HS256 + Refresh Tokens) |
| ORM | SQLAlchemy 2 (Async) |
| Migrations | Alembic |
| Deployment | Docker + Docker Compose |

---

## Multi-Agent Architecture

```
SupervisorAgent (LangGraph)
├── HealthMonitoringAgent   → vitals anomaly detection + risk classification
├── MedicationAgent         → schedule, adherence, drug interactions
├── EmergencyAgent          → SOS dispatch, severity scoring, multi-channel alerts
├── WellnessAgent           → sleep/activity coaching, motivational nudges
├── FamilyCommunicationAgent→ daily digest, family alerts
├── KnowledgeAgent          → RAG over WHO/govt/medicine knowledge base
└── NotificationAgent       → channel routing, localization, DND enforcement
```

---

## REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login → JWT tokens |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| GET | `/api/v1/vitals/latest` | Latest vitals per type |
| POST | `/api/v1/vitals/` | Record single vital |
| POST | `/api/v1/vitals/batch` | Batch wearable sync |
| GET | `/api/v1/vitals/history/{type}` | Vital history N days |
| POST | `/api/v1/chat/message` | AI Guardian chat (LangGraph) |
| GET | `/api/v1/chat/history` | Conversation history |
| GET | `/api/v1/medications/` | List active medications |
| POST | `/api/v1/medications/` | Add medication |
| POST | `/api/v1/medications/log-dose` | Log dose event |
| POST | `/api/v1/emergency/sos` | Trigger SOS alert |
| GET | `/api/v1/emergency/events` | Emergency history |
| PATCH | `/api/v1/emergency/events/{id}/resolve` | Resolve emergency |
| GET | `/api/v1/family/` | List family guardians |
| POST | `/api/v1/family/` | Add family member |
| GET | `/api/v1/notifications/` | List notifications |
| PATCH | `/api/v1/notifications/{id}/read` | Mark read |
| GET | `/api/v1/reports/health-summary` | Health period report |
| GET | `/api/v1/reports/medication-adherence` | Adherence breakdown |

---

## Quick Start (Docker)

```bash
# 1. Clone and configure
cp .env.example .env
# Edit .env — add GEMINI_API_KEY, SECRET_KEY, ENCRYPTION_KEY

# 2. Start all services
docker compose up

# 3. Run migrations
docker compose exec api alembic upgrade head

# 4. Access API
open http://localhost:8000/docs
```

## Local Development (without Docker)

```bash
# Create Python virtualenv
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start DB + Redis via Docker
docker compose up db redis -d

# Run migrations
alembic upgrade head

# Start dev server
uvicorn main:app --reload --port 8000
```

## RAG Knowledge Base

Add medical documents to `rag/knowledge_base/`:
```
rag/knowledge_base/
├── who_guidelines/          ← WHO PDF clinical guidelines
├── medicine_database/       ← Drug monograph text files
├── hospital_protocols/      ← Hospital care protocols
├── govt_health_schemes/     ← Ayushman Bharat, PMJAY docs
└── medical_faqs/            ← Elder care FAQs
```

Ingest into vector store:
```bash
python -m rag.document_loaders
```

---

## Security

- **JWT**: HS256 access tokens (60 min) + refresh tokens (30 days)
- **RBAC**: `elderly`, `caregiver`, `family_member`, `doctor`, `admin` roles
- **PII Encryption**: Phone numbers and addresses encrypted with Fernet at application layer
- **Rate Limiting**: 60 req/min per IP via slowapi
- **CORS**: Allowlisted origins only
