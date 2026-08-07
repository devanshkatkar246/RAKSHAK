# RAKSHAK MVP CONTEXT

> **The AI Digital Guardian for Independent Senior Living**  
> *Single Source of Truth & Master Context for Rakshak MVP*

---

## 1. Project Vision

RAKSHAK is an Agentic AI-powered Digital Guardian designed to protect elderly individuals living independently. Unlike traditional healthcare apps that rely on passive data logging or reactive chatbots, Rakshak combines multiple collaborating AI Guardians into a coordinated ecosystem capable of **continuous monitoring, early threat prediction, multi-agent reasoning, and autonomous protective action**.

Rakshak operates across **Four Core Protection Domains**:

1. 🫀 **Health Guardian**: Continuous vitals monitoring (HR, BP, SpO2, Sleep), JNC-8 risk classification, anomaly detection, and biometric baseline analysis.
2. 🛡️ **Safety Guardian**: Tri-axial accelerometer fall detection, motion inactivity monitoring, smart lock validation, and physical environment safety checks.
3. 🔒 **Financial Security Guardian**: Real-time telemarketer spam call screening, bank OTP phishing shield, and fake SMS link quarantine.
4. 💬 **Emotional Wellbeing Guardian**: Social interaction tracking, loneliness detection, voice sentiment analysis, and proactive family connection nudges.

---

## 2. Current MVP Goal

This MVP is built specifically for **Hackathon Round-1 Demonstrations and Investor Presentations**. It provides a complete, production-grade simulation of the Rakshak ecosystem.

- **Primary Goal**: Showcase multi-agent AI reasoning, proactive digital guardianship, and enterprise-grade UI/UX aesthetics.
- **Scope**: Complete interactive web platform simulating live BLE wearable telemetry streams, 9-agent LangGraph orchestrations, financial fraud call rejections, and 8 real-time emergency simulation modes.

---

## 3. Tech Stack

### Frontend Architecture
- **Framework**: React 19, TypeScript 5.7, Vite 6.4
- **Styling**: Tailwind CSS, Custom Design System (`variables.css`, `theme.css`, `tokens.json`)
- **UI & Icons**: Custom GlassCard / MetricCard / StatusBadge components, Lucide React icons
- **Animations**: Framer Motion (spring physics micro-interactions & tab transitions)
- **Routing**: React Router v7
- **State Management**: Zustand (Health, Emergency, Chat, User stores)
- **Charts & Data Viz**: Recharts (Resting HR Area charts, Medication Adherence Bar charts)
- **HTTP Client**: Axios

### Backend & AI Architecture
- **API Framework**: FastAPI, Python 3.11+
- **LLM Engine**: Gemini 2.5 (Flash / Pro) via Google GenAI SDK
- **Multi-Agent Orchestration**: LangGraph, LangChain
- **Vector Database**: PostgreSQL with `pgvector` extension for medical RAG guidelines
- **Caching & Pub/Sub**: Redis
- **Auth**: JWT Authentication with role-based permissions

---

## 4. Current Folder Structure

```
d:\AI Projects\Rakshak MVP\
├── docs/                      # Single Source of Truth design system & project context
│   ├── MVP_CONTEXT.md         # Permanent project context (THIS FILE)
│   ├── DESIGN.md              # Design system guidelines & typography rules
│   ├── tokens.json            # Design tokens (colors, radiuses, shadows)
│   ├── variables.css          # CSS custom properties
│   └── theme.css              # Global styles & font bindings
├── backend/                   # FastAPI Python multi-agent backend
│   ├── agents/                # 9 Specialist AI Agent definitions (LangGraph)
│   ├── api/                   # REST API routes and endpoints
│   ├── core/                  # Security, config, JWT authentication
│   ├── database/              # PostgreSQL & pgvector schema migrations
│   ├── models/                # SQLAlchemy ORM models
│   ├── rag/                   # Medical RAG vector search handlers
│   └── schemas/               # Pydantic data validation schemas
├── src/                       # React 19 Frontend Codebase
│   ├── assets/                # Images, brand assets, static icons
│   ├── components/            # Reusable UI component library
│   │   ├── layout/            # Sidebar, Header, Mobile Nav wrappers
│   │   └── ui/                # GlassCard, MetricCard, StatusBadge, Modal, DemoModeModal, etc.
│   ├── constants/             # Application constants and routes mapping
│   ├── hooks/                 # Custom React hooks (useRakshakVoice, etc.)
│   ├── pages/                 # Full page views (Dashboard, SOS, Chat, Family, Reports, Profile, Landing)
│   ├── services/              # Axios API service integrations
│   ├── store/                 # Zustand state stores (healthStore, emergencyStore, chatStore, userStore)
│   └── utils/                 # Classname merge (`cn`), animation variants, formatters
```

---

## 5. Design Language & Aesthetics

The application enforces a **Monochrome Enterprise Healthcare Design Language** inspired by Stripe Dashboard, Linear, Notion AI, Apple Health, and modern medical SaaS.

### Color Palette
- **Paper (Card Surface)**: `#ffffff`
- **Canvas (Background)**: `#f5f5f5`
- **Surface Alt**: `#fafafa`
- **Ink (Primary Text & Accents)**: `#0a0a0a`
- **Ink Soft**: `#171717`
- **Mid Gray (Secondary Text)**: `#737373`
- **Hairline (Borders)**: `#e5e5e5`
- **Ember (Emergency / Error Only)**: `#e7000b` (Strictly reserved for SOS emergency states & critical alerts)

### Typography & Spacing
- **Font**: `Geist`, `Geist Mono`
- **Border Radius**: `18px` (`rounded-buttons`), `24px` (`rounded-cards`)
- **Shadows**: `--shadow-subtle` (`0 1px 2px rgba(0,0,0,0.04)`)
- **Rules**: Zero colorful gradients, zero glassmorphism neon, zero dark mode clutter. Pure, minimal, calm, and trustworthy.

---

## 6. Application Pages

1. **Landing (`Landing.tsx`)**: High-converting product landing page introducing Rakshak's 4 protection domains, multi-agent architecture, and live CTA.
2. **AI Guardian Command Center (`Dashboard.tsx`)**: Central operational hub featuring the elder greeting, AI Daily Brief, Composite Guardian Score ring (`94/100`), 4 Domain Status cards, live telemetry streams, 24-hour Guardian Timeline, and Quick Controls.
3. **AI Operations Center & Companion (`Chat.tsx`)**: 3-in-1 tabbed view featuring:
   - **Caring Companion Console**: Voice-first AI assistant with TTS read-aloud support.
   - **Agent Network**: Interactive graph of 9 specialist agent nodes with status, confidence scores, and Inspector Modals.
   - **Reasoning Pipeline**: 8-step step-by-step animated execution trace.
4. **Emergency Command Center & Anti-Scam Shield (`SOS.tsx`)**: Features the large animated SOS button, nearby ER hospitals, paramedic medical summary, **Financial Anti-Scam Shield** log, and **AI Simulation Studio** with 8 real-time scenario simulations (Fall, Chest Pain, Dizziness, Inactivity, Manual SOS, Fake Call, OTP Scam, Fake SMS).
5. **Medications (`Medications.tsx`)**: Prescription schedule tracker, dose logs, adherence stats, and drug interaction safety checks.
6. **Clinical Reports (`Reports.tsx`)**: Timeframe analytics (Daily/Weekly/Monthly), Recharts adherence & resting HR charts, and downloadable doctor-ready PDF report cards.
7. **Caregiver & Family Ecosystem (`Family.tsx`)**: Remote elder location card, live wellness score, AI Family Executive Digest, connected guardian circle, and 24-hour activity timeline.
8. **Settings & Profile (`Profile.tsx`)**: Elder profile management, medical baseline configuration, device sync, and notification settings.

---

## 7. Multi-Agent System Architecture

```
                       ┌─────────────────────────┐
                       │    Supervisor Agent     │
                       │ (LangGraph Orchestrator)│
                       └────────────┬────────────┘
                                    │
    ┌──────────────┬──────────────┬─┴────────────┬──────────────┬──────────────┐
    │              │              │              │              │              │
┌───▼───┐      ┌───▼───┐      ┌───▼───┐      ┌───▼───┐      ┌───▼───┐      ┌───▼───┐
│Health │      │Safety │      │Financ.│      │Emot.  │      │Medic. │      │Predict│
│Agent  │      │Agent  │      │Agent  │      │Agent  │      │Agent  │      │Agent  │
└───┬───┘      └───┬───┘      └───┬───┘      └───┬───┘      └───┬───┘      └───┬───┘
    │              │              │              │              │              │
    └──────────────┴──────────────┼──────────────┴──────────────┴──────────────┘
                                  │
                       ┌──────────▼──────────┐
                       │ Knowledge Agent RAG │
                       │(pgvector WHO Monogr)│
                       └──────────┬──────────┘
                                  │
                       ┌──────────▼──────────┐
                       │ Notification Agent  │
                       │(Twilio / Push / TTS)│
                       └─────────────────────┘
```

1. **Supervisor Agent**: Central intent classifier and LangGraph router coordinating parallel specialist agent calls.
2. **Health AI Agent**: Ingests BLE vitals telemetry, calculates 30-day baselines, and flags anomalies.
3. **Safety AI Agent**: Analyzes watch accelerometer data for 3.2g fall impacts and 120min inactivity windows.
4. **Financial AI Agent**: Intercepts unverified incoming calls against TRAI database, blocks OTP phishing solicitations, and quarantines scam SMS links.
5. **Emotional AI Agent**: Tracks family call frequencies, evaluates audio voice sentiment, and generates social connection nudges.
6. **Medication Agent**: Manages daily dose schedules, checks drug-drug interactions, and tracks refill inventory.
7. **Prediction Agent**: Time-series forecasting model estimating 48-hour stability and early risk degradation.
8. **Knowledge Agent (RAG)**: `pgvector` semantic search over WHO medical guidelines and pharmaceutical monographs.
9. **Notification Agent**: Routes multi-channel alerts (Push, SMS, Voice TTS) while respecting DND windows.
10. **Family Agent**: Auto-compiles daily executive health digests for remote family caregivers.

---

## 8. Hackathon Demo Flow

The application includes an automated **Hackathon Presentation Studio (`DemoModeModal.tsx`)** accessible from the Top Navigation Bar (`"🎬 Demo Mode"`):

1. **07:00 AM** — Good Morning Greeting & Sleep Ingest (7.8 hrs, 92% quality score).
2. **08:00 AM** — Morning Vitals Check & Pill Taken (Amlodipine 5mg logged).
3. **10:15 AM** — Financial Anti-Scam Shield Active (+91 98201 02938 call auto-blocked).
4. **11:30 AM** — Proactive AI Voice Check-in (Post-walk audio greeting).
5. **01:30 PM** — Afternoon Diabetes Dose Logged (Metformin 500mg taken with lunch).
6. **03:30 PM** — Family Connection Nudge (Social prompt card for daughter Priya).
7. **05:45 PM** — Simulated Fall Impact Event (3.2g accelerometer force registered).
8. **05:46 PM** — GPS Location Broadcasted (`Lat: 19.0596, Lon: 72.8295` sent to family & doctor).
9. **05:47 PM** — Nearest ER Hospital Identified (Holy Family Hospital ER pre-notified).
10. **05:48 PM** — Incident Audit Report Generated (PDF report card compiled).
11. **06:00 PM** — System Resolution & Dashboard Refresh (Elder confirmed safe & vitals normalized).

---

## 9. Premium UX Principles

- **Spacious & Uncluttered**: Minimum `20px` card padding, `24px-48px` section gaps.
- **Calm Healthcare Tone**: Interfaces build trust and calm rather than medical anxiety.
- **Spring Micro-Interactions**: Subtle Framer Motion scale taps (`whileTap={{ scale: 0.97 }}`).
- **Accessibility**: High contrast black text (`#0a0a0a`) on paper white cards (`#ffffff`), readable 14px body text, and large 44px tap targets for elders.

---

## 10. Future Technical Roadmap

- **Flutter Cross-Platform App**: iOS & Android native companion apps for elders and caregivers.
- **Hardware & BLE Wearable Integration**: Native Bluetooth LE drivers for Apple Watch, Fitbit, and Smart Locks.
- **Voice AI Pipeline**: Local Whisper STT + ElevenLabs TTS voice streaming.
- **Edge AI Fall Detection**: On-device TensorFlow Lite model for zero-latency fall detection.
- **Physician Portal**: Multi-patient dashboard for geriatric clinics and hospital ER networks.

---

## 11. Development Rules & Conventions

- **Component Naming**: PascalCase (e.g., `GlassCard.tsx`, `DemoModeModal.tsx`).
- **Imports**: Never leave unused imports in `.tsx` files; verify compilation via `npm run lint` (`tsc --noEmit`).
- **Styling**: Always use tokens from `variables.css` and standard Tailwind classes. Avoid arbitrary inline pixel styles.
- **Single Source of Truth**: Always read `docs/MVP_CONTEXT.md` before making architectural modifications.
