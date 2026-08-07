<div align="center">

# RAKSHAK

### *The AI Digital Guardian for Independent Senior Living*

An autonomous, multi-agent artificial intelligence operating system designed to protect, monitor, and assist elderly individuals living independently across **Health, Safety, Financial Security, and Emotional Wellbeing**.

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Gemini 2.5](https://img.shields.io/badge/Gemini-2.5_Flash-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![LangGraph](https://img.shields.io/badge/LangGraph-Multi_Agent-FF6F00?style=for-the-badge&logo=langchain&logoColor=white)](https://www.langchain.com/langgraph)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-22C55E?style=for-the-badge)](https://github.com/devanshkatkar246/RAKSHAK)
[![Mobile Responsive](https://img.shields.io/badge/Mobile-Responsive-0A0A0A?style=for-the-badge)](https://github.com/devanshkatkar246/RAKSHAK)

</div>

---

## 🖼️ Banner

![RAKSHAK Banner Placeholder](assets/banner.png)

> *“RAKSHAK is not another health tracker. It is an agentic guardian that continuously observes biometrics, predicts acute health risks, screens financial fraud, and coordinates emergency responses before crises escalate.”*

---

## 🚨 Problem Statement

Millions of senior citizens worldwide live independently. While independence brings dignity, it introduces severe vulnerabilities:

- **Fatal Falls**: Over 37.3 million falls require medical attention each year among seniors. In 60% of cases, elders remain helpless on the floor for over an hour ("the long lie"), drastically increasing mortality.
- **Medication Non-Adherence**: Up to 50% of chronic disease prescriptions are not taken as directed, causing 125,000 preventable deaths annually.
- **Financial Exploitation**: Seniors lose over **$28.3 billion annually** to telemarketer scams, banking OTP phishing, and fraudulent UPI links.
- **Social Isolation**: Over 43% of elders report feeling chronically lonely, accelerating cognitive decline and depression.
- **Delayed Emergency Response**: Fragmented SOS apps require manual button presses that incapacitated seniors cannot execute.

### Why Current Solutions Fail

| Solution Category | Key Deficiency |
| :--- | :--- |
| **Wearable Fitness Trackers** | Passive data loggers. They record heart rate spikes but lack reasoning or emergency dispatch capability. |
| **Pill Reminder Apps** | Static notifications. They do not cross-reference food interactions or check if a missed dose is dangerous. |
| **Emergency Panic Buttons** | Reactive only. If an elder loses consciousness during a fall or stroke, they cannot press the button. |
| **Generic AI Chatbots** | Reactive QA systems. They wait for prompts instead of proactively checking on elder wellbeing. |

---

## 🛡️ Why RAKSHAK?

RAKSHAK replaces fragmented apps with a **coordinated multi-agent artificial intelligence ecosystem**. Controlled by a central **Supervisor Agent**, Rakshak continuously ingests biometric streams, monitors environment sensors, screens financial communications, and orchestrates care.

### Traditional Healthcare Apps vs. RAKSHAK

| Dimension | Traditional Healthcare Apps | RAKSHAK AI Guardian |
| :--- | :--- | :--- |
| **Mode of Operation** | Reactive (User must open app & log data) | **Autonomous & Proactive** (24/7 continuous agentic monitoring) |
| **Intelligence** | Rule-based IF/ELSE scripts | **Gemini 2.5 + LangGraph Multi-Agent Reasoning** |
| **Protection Scope** | Single domain (Vitals OR Medicine) | **4 Pillars: Health, Safety, Financial & Emotional** |
| **Fall Handling** | Requires manual SOS tap | **Tri-axial Accelerometer Auto-Detection + Grace Window** |
| **Financial Security** | None | **Real-Time Telemarketer Scam Rejection & OTP Phishing Shield** |
| **Caregiver Link** | Manual PDF emailing | **Live Guardian Dashboard & Auto-Compiled Executive Digests** |
| **Emergency Protocol** | Single SMS to one contact | **Multi-Channel Dispatch (SMS, Push, Voice Call) + ER Routing** |

---

## ✨ Key Features

### 🫀 1. Health Guardian
- **Continuous Vitals Telemetry**: Real-time tracking of Resting Heart Rate (BPM), Blood Pressure (mmHg), Blood Oxygen (SpO2 %), and Sleep Quality.
- **JNC-8 Clinical Classification**: Instant risk classification of blood pressure (Optimal, Elevated, Stage-1, Stage-2, Crisis).
- **Biometric Anomaly Detection**: Cross-references live readings against 30-day personal baselines to detect acute degradation.

### 🛡️ 2. Safety Guardian
- **Tri-Axial Fall Detection**: Accelerometer impact monitoring (3.2g threshold) with a 5-second grace window to prevent false alarms.
- **Inactivity Guard**: Tracks motion quiet windows during active hours (e.g. 120min quiet threshold) and triggers soft audio check-ins.
- **Smart Home Security**: Validates smart door lock status and pathway obstacle safety.

### 🔒 3. Financial Security Guardian
- **Telemarketer Spam Rejection**: Automatically screens unknown incoming phone numbers against TRAI & Rakshak scam databases before the phone rings.
- **Bank OTP Phishing Shield**: Voice monitor detects OTP solicitation phrases during calls and plays an immediate warning alert.
- **Fake SMS Link Quarantine**: Scans incoming SMS payloads for unverified shortlinks (e.g. `bit.ly`) and quarantines phishing messages.

### 💬 4. Emotional Wellbeing Guardian
- **Social Connection Nudges**: Monitors frequency of family calls and prompts gentle outreach when 3+ days pass without contact.
- **Voice Sentiment Analysis**: Evaluates tone for early indicators of depression or loneliness.
- **Caring Audio Companion**: Voice-first AI companion providing empathetic daily conversation and wellness encouragement.

### 🤖 5. AI Guardian Operations Center
- **Interactive 9-Agent Network**: Visual node graph of all active specialist agents displaying real-time task status, confidence scores (91–100%), and last decisions.
- **Agent Inspector Modal**: Deep-dive inspector revealing agent responsibilities, inputs, outputs, and live **Reasoning Execution Traces**.
- **Sequential Pipeline Trace**: 8-step animated visual trace showing telemetry ingest → agent analysis → decision → multi-channel notification.

### 👨‍👩‍👧 6. Caregiver & Family Ecosystem
- **Remote Location Sync**: Real-time elder GPS location (`Bandra West, Mumbai • Last synced 2m ago`).
- **AI Executive Family Digest**: Auto-compiled daily morning summary for family members (*"Savitri ji slept 7.8 hours, BP is stable at 122/78 mmHg, 1 scam call auto-blocked"*).
- **Guardian Circle**: Designated primary contacts with 1-tap call controls.

### 🚨 7. Emergency Command Center & Simulation Studio
- **Pulsing SOS Hero Card**: 5-second cancel grace window with live GPS coordinate broadcast (`Lat: 19.0596, Lon: 72.8295`).
- **Paramedic Medical Summary**: Crucial emergency card displaying Blood Group (`O+`), Allergies (`Penicillin - Severe`), and Chronic Conditions (`Hypertension`, `Diabetes`).
- **Nearby Trauma Centers**: ER hospital distance, contact details, and readiness indicators (`Holy Family Hospital - 1.2 km`).
- **8 Interactive AI Simulations**: Test full agent workflows for *Fall Detected, Chest Pain, Dizziness, Inactivity, Manual SOS, Fake Call, OTP Scam, and Fake SMS*.

### 📈 8. Clinical Reports & Analytics
- **Granular Timeframe Views**: Toggle between Daily, Weekly, and Monthly analytics.
- **Recharts Analytics**: Bar charts for medication adherence rates and area charts for heart rate baselines.
- **Downloadable Doctor Reports**: Exportable PDF report cards for physician consultations.

---

## 🧠 Multi-Agent Architecture

The core of RAKSHAK is a **LangGraph-directed acyclic multi-agent system**. The **Supervisor Agent** acts as the central brain, classifying intents and routing requests to specialist sub-agents in parallel before synthesizing a response.

```mermaid
flowchart TD
    A[Telemetry Stream / Elder Voice Prompt] --> B[Supervisor Agent\nLangGraph Orchestrator]
    
    B --> C[Health AI Agent\nVitals & Baseline]
    B --> D[Safety AI Agent\nFall & Motion]
    B --> E[Financial AI Agent\nAnti-Scam & OTP]
    B --> F[Emotional AI Agent\nMood & Social]
    B --> G[Medication Agent\nDose & Schedule]
    B --> H[Prediction Agent\n48-Hr Forecast]
    
    C --> I[Knowledge Agent RAG\npgvector WHO Monograph]
    D --> I
    E --> I
    F --> I
    G --> I
    H --> I
    
    I --> J[Notification Agent\nTwilio / Push / Voice TTS]
    J --> K[Family Agent\nCaregiver Digest]
    
    K --> L[Updated Dashboard & Emergency Dispatch]
```

---

## 🏗️ System Architecture

```mermaid
sequenceDiagram
    autonumber
    actor Elder as Elder / Wearable
    participant React as React 19 UI
    participant FastAPI as FastAPI Server
    participant Supervisor as Supervisor Agent
    participant Gemini as Gemini 2.5 LLM
    participant DB as PostgreSQL + pgvector
    participant Notify as Notification Agent

    Elder->>React: Biometric Stream / Voice Input
    React->>FastAPI: POST /api/v1/telemetry
    FastAPI->>Supervisor: Ingest State Graph
    Supervisor->>Gemini: Classify Intent & Plan Agent Graph
    Gemini-->>Supervisor: Tool Call Directives
    Supervisor->>DB: RAG Vector Search (WHO Guidelines)
    DB-->>Supervisor: Retrieved Clinical Context
    Supervisor->>Notify: Dispatch Alerts (SMS / Push / TTS)
    Notify-->>React: Real-time UI State Refresh & Voice Synthesis
```

---

## 💻 Technology Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** | Core UI library for high-performance component rendering |
| **Language** | **TypeScript 5.7** | Type-safe enterprise code architecture across frontend & contracts |
| **Build Tool** | **Vite 6.4** | Ultra-fast HMR dev server & optimized production bundler |
| **Styling** | **Tailwind CSS 3.4** | Utility-first custom design system styling |
| **Animations** | **Framer Motion** | Spring physics micro-interactions and tab transitions |
| **Icons** | **Lucide React** | Monochrome, 1.75px stroke SVG technical icon set |
| **State Management** | **Zustand** | Lightweight, reactive state stores for Health, Emergency & Chat |
| **Charts** | **Recharts** | Responsive SVG charts for adherence & vitals baselines |
| **Backend Framework**| **FastAPI** | Async Python web framework for high-throughput AI endpoints |
| **LLM Engine** | **Gemini 2.5 Flash** | Multi-modal reasoner for intent classification & RAG synthesis |
| **Agent Orchestrator**| **LangGraph** | Stateful multi-agent graph DAG execution engine |
| **Vector Database** | **PostgreSQL + pgvector** | Vector storage for WHO guidelines & drug monographs |
| **Caching** | **Redis** | In-memory session state caching and pub/sub messaging |
| **Authentication** | **JWT (PyJWT)** | Secure role-based JSON Web Token authentication |

---

## 📸 Screenshots

<details>
<summary>Click to view application screens</summary>

### AI Guardian Command Center
`assets/screenshots/dashboard.png`

### AI Operations Center & Agent Inspector
`assets/screenshots/ai_guardian.png`

### Emergency Command Center & Simulation Studio
`assets/screenshots/emergency.png`

### Medication Adherence Tracker
`assets/screenshots/medication.png`

### Clinical Analytics Reports
`assets/screenshots/reports.png`

### Caregiver & Family Ecosystem
`assets/screenshots/family.png`

### Profile & Medical Settings
`assets/screenshots/settings.png`

</details>

---

## 🎬 Demo

- 🚀 **Live Application Demo**: [https://rakshak.ai](https://rakshak.ai) *(Placeholder)*
- 📦 **GitHub Repository**: [https://github.com/devanshkatkar246/RAKSHAK](https://github.com/devanshkatkar246/RAKSHAK)
- 📄 **Architecture Documentation**: [`docs/MVP_CONTEXT.md`](docs/MVP_CONTEXT.md)
- 🛠️ **Developer Setup Guide**: [`docs/SETUP_GUIDE.md`](docs/SETUP_GUIDE.md)
- 🎨 **Design System Blueprint**: [`docs/DESIGN.md`](docs/DESIGN.md)

---

## 📁 Folder Structure

```
RAKSHAK/
├── docs/                      # Single Source of Truth architecture & design guides
│   ├── MVP_CONTEXT.md         # Permanent project context & specifications
│   ├── SETUP_GUIDE.md         # Developer onboarding & setup instructions
│   ├── DESIGN.md              # Monochrome UI design system token specification
│   ├── tokens.json            # Design token JSON export
│   ├── variables.css          # CSS root custom properties
│   └── theme.css              # Global font bindings & base styles
├── backend/                   # FastAPI Python multi-agent server
│   ├── agents/                # 9 Specialist AI Agent definitions (LangGraph)
│   ├── api/                   # REST endpoints, routers & auth dependencies
│   ├── core/                  # Security, configuration, JWT handlers
│   ├── database/              # PostgreSQL & pgvector migration scripts
│   ├── models/                # SQLAlchemy ORM database models
│   ├── rag/                   # Medical RAG vector search handlers
│   └── schemas/               # Pydantic data validation contracts
├── src/                       # React 19 Frontend Web Application
│   ├── assets/                # Static brand images and icons
│   ├── components/            # Reusable UI component library
│   │   ├── layout/            # AppLayout, MobileShell, Sidebar, NavigationBar
│   │   └── ui/                # GlassCard, MetricCard, StatusBadge, Modal, DemoModeModal
│   ├── constants/             # Application routes and theme constants
│   ├── hooks/                 # Custom React hooks (useRakshakVoice, etc.)
│   ├── pages/                 # Full page views (Dashboard, SOS, Chat, Family, Reports, Profile)
│   ├── services/              # Axios API service integrations
│   ├── store/                 # Zustand state management stores
│   └── utils/                 # Utility functions (cn merge, animations, formatters)
├── .env.example               # Root frontend environment template
├── package.json               # Frontend dependencies & scripts
└── vite.config.ts             # Vite bundler configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher (v20+ recommended)
- **Python**: `v3.11.0` or higher
- **npm**: `v10.0.0` or higher
- **Git**: `v2.40.0` or higher

### 1. Clone Repository
```bash
git clone https://github.com/devanshkatkar246/RAKSHAK.git
cd RAKSHAK
```

### 2. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Launch Vite development server
npm run dev
```
The frontend will start at `http://localhost:5173`.

### 3. Backend Setup
```bash
# Open a new terminal and navigate to backend/
cd backend

# Create & activate virtual environment (Windows PowerShell)
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install backend dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn api.main:app --reload --port 8000
```
FastAPI Swagger documentation available at `http://localhost:8000/docs`.

---

## 🔑 Environment Variables

### Frontend (`.env` in project root)
```env
VITE_APP_NAME="RAKSHAK"
VITE_API_BASE_URL="http://localhost:8000/api/v1"
VITE_ENABLE_MOCK_DATA="true"
VITE_AI_VOICE_ENABLED="true"
```

### Backend (`backend/.env`)
```env
PORT=8000
ENVIRONMENT=development
GEMINI_API_KEY=your_google_gemini_api_key_here
POSTGRES_URI=postgresql://postgres:postgres@localhost:5432/rakshak_db
JWT_SECRET=super_secret_jwt_key_rakshak_2026
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
```

---

## 🤖 AI Agent Ecosystem

<details>
<summary>Click to view detailed specs for all 10 AI Agents</summary>

### 1. Supervisor Agent (LangGraph Orchestrator)
- **Responsibilities**: Intent classification, graph state execution, sub-agent fan-out, response synthesis.
- **Inputs**: User prompt / Wearable trigger, Agent state dictionary.
- **Outputs**: Synthesized response payload, confidence score, execution route.
- **Decision Logic**: Evaluates prompt sentiment and vitals risk. If severity > 0.85, triggers emergency agent immediately.

### 2. Health AI Agent
- **Responsibilities**: Continuous telemetry processing (HR, BP, SpO2), JNC-8 BP classification, anomaly detection.
- **Inputs**: Real-time BLE smartwatch stream, 30-day baseline stats.
- **Outputs**: Health risk level (Optimal / Elevated / Crisis), biometric commentary.

### 3. Safety AI Agent
- **Responsibilities**: Tri-axial accelerometer impact analysis (3.2g threshold), 120min inactivity window detection.
- **Inputs**: Wristband accelerometer data, smart home motion sensors.
- **Outputs**: Fall impact alert, inactivity warning, grace window trigger.

### 4. Financial AI Agent
- **Responsibilities**: Intercepts unverified incoming calls against TRAI registry, blocks OTP solicitation during calls, quarantines phishing SMS links.
- **Inputs**: Phone call logs, SMS message payloads, telecom spam DB.
- **Outputs**: Call rejection command, SMS quarantine action, security digest entry.

### 5. Emotional AI Agent
- **Responsibilities**: Tracks family call frequency, evaluates voice tone for loneliness, prompts social outreach cards.
- **Inputs**: Chat sentiment, call duration logs, activity steps.
- **Outputs**: Emotional wellness score, family nudge suggestion.

### 6. Medication Agent
- **Responsibilities**: Prescription schedule compliance, drug-drug interaction validation, refill warnings.
- **Inputs**: Medication dose logs, WHO drug interaction database.
- **Outputs**: Adherence score, contextual dose reminder, refill alert.

### 7. Prediction Agent
- **Responsibilities**: Time-series forecasting of vitals trends and 48-hour risk index calculation.
- **Inputs**: 7-day vitals trend, sleep quality index, local weather data.
- **Outputs**: 48-hour stability forecast score (0.0 – 1.0).

### 8. Knowledge Agent (RAG)
- **Responsibilities**: Vector search over WHO hypertension guidelines and pharmaceutical monographs.
- **Inputs**: Semantic medical query string, `pgvector` database.
- **Outputs**: Retrieved context chunks, clinical citations, simple elder explanations.

### 9. Notification Agent
- **Responsibilities**: Multi-channel alert dispatch (Push, SMS, Voice TTS) with DND window enforcement.
- **Inputs**: Notification payload, user priority rules.
- **Outputs**: Twilio SMS dispatch, Firebase FCM push, Web Speech TTS.

### 10. Family Agent
- **Responsibilities**: Auto-compiles daily executive health & security summaries for caregivers.
- **Inputs**: All 4 domain daily logs.
- **Outputs**: Executive daily digest markdown report.

</details>

---

## 🎬 Automated Hackathon Demo Flow

The top navigation bar contains a **"🎬 Demo Mode"** button that launches a 24-hour automated presentation simulation:

1. **07:00 AM** — *Good Morning Greeting & Sleep Ingest* (7.8 hrs sleep, 92% quality).
2. **08:00 AM** — *Morning Vitals Check & Pill Logged* (Amlodipine 5mg logged).
3. **10:15 AM** — *Financial Anti-Scam Shield Active* (+91 98201 02938 fake call auto-blocked).
4. **11:30 AM** — *Proactive AI Voice Check-in* (Post-walk audio greeting).
5. **01:30 PM** — *Afternoon Diabetes Dose Logged* (Metformin 500mg taken with lunch).
6. **03:30 PM** — *Family Connection Nudge* (Social prompt card for daughter Priya).
7. **05:45 PM** — *Simulated Fall Impact Event* (3.2g accelerometer force registered).
8. **05:46 PM** — *GPS Location Broadcasted* (`Lat: 19.0596, Lon: 72.8295` sent to family & doctor).
9. **05:47 PM** — *Nearest ER Hospital Identified* (Holy Family Hospital ER pre-notified).
10. **05:48 PM** — *Incident Audit Report Generated* (PDF report card compiled).
11. **06:00 PM** — *System Resolution & Dashboard Refresh* (Elder confirmed safe & vitals normalized).

---

## 🗺️ Future Technical Roadmap

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     PHASE 1     │    │     PHASE 2     │    │     PHASE 3     │
│   React 19 MVP  │───>│ Flutter Mobile  │───>│ BLE Wearables   │
│ & FastAPI Engine│    │ Native Apps     │    │ Hardware Drivers│
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
┌─────────────────┐    ┌─────────────────┐             │
│     PHASE 6     │    │     PHASE 5     │             │
│ Smart Home Hub  │<───│ Edge AI Models  │<────────────┘
│ Integration     │    │ TFLite On-Device│
└─────────────────┘    └─────────────────┘
```

- **Phase 1 (Current MVP)**: Complete React 19 simulation web platform, FastAPI backend, Gemini 2.5 multi-agent system.
- **Phase 2 (Mobile Apps)**: Flutter cross-platform iOS & Android companion apps for elders and family caregivers.
- **Phase 3 (Hardware Integration)**: Direct Bluetooth Low Energy (BLE) drivers for Apple Watch Series 9, Samsung Galaxy Watch, and smart door locks.
- **Phase 4 (Hospital APIs)**: Direct integration with hospital Emergency Rooms (ER) and ambulance dispatch APIs.
- **Phase 5 (Edge AI)**: On-device TensorFlow Lite models for sub-second fall detection without internet dependence.
- **Phase 6 (Smart Home Hub)**: Matter & Zigbee integration for smart home motion sensors and automated door unlock protocols.

---

## ⭐ Why RAKSHAK Stands Out

1. **True Agentic System**: Not a passive dashboard or chatbot — Rakshak acts autonomously to block financial fraud calls and dispatch emergency alerts.
2. **Coordinated Multi-Agent Architecture**: 10 specialist agents collaborating under a LangGraph Supervisor Agent rather than isolated scripts.
3. **4-Domain Comprehensive Guard**: Combines Health, Safety, Financial Security, and Emotional Wellbeing into one cohesive platform.
4. **Clinical Precision + RAG**: Grounded in WHO medical guidelines using `pgvector` semantic vector search.
5. **Investor & Hackathon Ready**: Built-in 24-hour automated presentation simulator and enterprise monochrome design language.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## 👥 Contributors

- **Devansh Katkar** ([@devanshkatkar246](https://github.com/devanshkatkar246)) — *Lead Software Engineer & Frontend Architect*

---

## 🙏 Acknowledgements

- **Google Gemini Team** for the multi-modal Gemini 2.5 API.
- **LangChain / LangGraph Team** for stateful multi-agent orchestration tools.
- **FastAPI & React Open Source Communities** for production-grade frameworks.
- **Hackathon Organizers & Judges** for feedback and evaluation.

---

<div align="center">

***

**RAKSHAK is more than a healthcare application.**  
*It is an AI Digital Guardian designed to help millions of senior citizens live independently, safely, and with dignity.*

***

</div>
