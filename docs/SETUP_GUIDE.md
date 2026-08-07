# RAKSHAK SETUP GUIDE

> **The AI Digital Guardian for Independent Senior Living**  
> *Developer Onboarding, Environment Configuration & Quick Start Guide*

---

## 1. Project Requirements

Ensure your system satisfies the following minimum requirements before setting up Rakshak:

- **Operating System**: Windows 11 (64-bit) / macOS / Linux
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v10.0.0 or higher (comes bundled with Node.js)
- **Python**: v3.11.0 or higher (ensure `python` is added to system PATH)
- **Git**: v2.40.0 or higher
- **VS Code**: Latest version
- **Chrome / Edge**: Modern Chromium browser with DevTools enabled
- **Android Studio**: (Optional for MVP; required for future Flutter mobile app development)

---

## 2. Recommended VS Code Extensions

For optimal developer experience and code formatting:

1. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) — Autocompletion for utility classes.
2. **ESLint** (`dbaeumer.vscode-eslint`) — Real-time JavaScript/TypeScript linting.
3. **Prettier - Code formatter** (`esbenp.prettier-vscode`) — Code formatting on save.
4. **Python** (`ms-python.python`) — IntelliSense, debugging, and venv selection.
5. **Docker** (`ms-azuretools.vscode-docker`) — Container management (for production phase).
6. **GitLens** (`eamodio.gitlens`) — Git blame annotations and repository history.
7. **Error Lens** (`usernamehw.errorlens`) — Inline highlighting of TypeScript and Python errors.
8. **Thunder Client** (`rangav.vscode-thunder-client`) — REST API testing inside VS Code.
9. **Markdown Preview Enhanced** (`shd101yyy.markdown-preview-enhanced`) — Rich docs preview.

---

## 3. Clone Repository & Directory Overview

### Clone Command
```bash
git clone https://github.com/your-org/rakshak-mvp.git
cd rakshak-mvp
```

### Folder Structure
```
rakshak-mvp/
├── docs/             # Design System, Architecture & Setup Documentation
├── src/              # React 19 Frontend Web Application
│   ├── components/   # UI Component Library (GlassCard, StatusBadge, Modal)
│   ├── pages/        # Main Application Screens (Dashboard, SOS, Chat, etc.)
│   ├── store/        # Zustand State Stores (Health, Emergency, Chat, User)
│   └── services/     # Axios API integrations
└── backend/          # FastAPI Multi-Agent Python Server
    ├── agents/       # 9 Specialist AI Agent definitions (LangGraph)
    └── api/          # REST Endpoints & Routers
```

---

## 4. Frontend Setup

The frontend is built using **React 19, TypeScript, Vite, Tailwind CSS, and Framer Motion**.

### Step 1: Install Dependencies
```bash
# Ensure you are in the project root directory
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```
The Vite development server will start instantly at `http://localhost:5173`. Hot Module Replacement (HMR) is enabled — any edits in `src/` will reflect immediately without page reloads.

### Step 3: Production Build & Preview
```bash
# Type check and compile production bundle
npm run build

# Preview local production build
npm run preview
```

---

## 5. Backend Setup

The backend is built using **FastAPI, Python 3.11, and Gemini 2.5 LLM APIs**.

### Step 1: Create & Activate Virtual Environment (Windows PowerShell)
```powershell
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1
```

*(For macOS/Linux: `source venv/bin/activate`)*

### Step 2: Install Python Requirements
```bash
pip install -r requirements.txt
```

### Step 3: Configure Environment Variables
Create a `.env` file inside `backend/`:
```env
PORT=8000
ENVIRONMENT=development
GEMINI_API_KEY=your_google_gemini_api_key_here
POSTGRES_URI=postgresql://postgres:postgres@localhost:5432/rakshak_db
JWT_SECRET=super_secret_jwt_key_rakshak_2026
```

### Step 4: Launch FastAPI Server
```bash
uvicorn api.main:app --reload --port 8000
```

### Step 5: Verify Backend Health & OpenAPI Swagger UI
- **Health Check Endpoint**: `http://localhost:8000/health`
- **Interactive Swagger Documentation**: `http://localhost:8000/docs`

---

## 6. Docker Desktop & Containerization

> ℹ️ **IMPORTANT NOTE**: Docker Desktop is **NOT required** for running or demonstrating the current MVP. The React frontend and FastAPI backend run natively on Node.js and Python.

### Future Container Deployment (Post-MVP Phase)
When deploying PostgreSQL (`pgvector`) and Redis containers:

1. **Start Docker Engine**: Launch Docker Desktop on Windows.
2. **Launch Services**:
   ```bash
   docker-compose up -d
   ```

---

## 7. Android Development & Future Mobile App

> ℹ️ **NOTE**: This MVP delivers a responsive, mobile-first React 19 Web App that runs on mobile browsers, tablets, and desktops.

### Future Flutter Mobile App Migration (Phase 2)
In Phase 2, a Flutter mobile app will consume the existing FastAPI backend.

- **Android Studio Installation**: Install Android Studio with Android SDK 34+.
- **Virtual Device Setup**: Create a Pixel 8 Pro AVD emulator in Android Device Manager.
- **Physical Device Debugging**: Enable *Developer Options* → *USB Debugging* on your Android smartphone.

---

## 8. Environment Variables Reference

### Frontend (`.env` in root)
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### Backend (`.env` in `backend/`)
```env
PORT=8000
ENVIRONMENT=development
GEMINI_API_KEY=your_google_gemini_api_key_here
POSTGRES_URI=postgresql://postgres:postgres@localhost:5432/rakshak_db
JWT_SECRET=super_secret_jwt_key_rakshak_2026
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

---

## 9. Running the Entire Project (Step-by-Step)

1. **Terminal 1 (Backend)**:
   ```bash
   cd backend
   .\venv\Scripts\Activate.ps1
   uvicorn api.main:app --reload --port 8000
   ```
2. **Terminal 2 (Frontend)**:
   ```bash
   npm run dev
   ```
3. **Open Browser**: Navigate to `http://localhost:5173`.
4. **Test Key Flows**:
   - Tap **"🎬 Demo Mode"** in the top navigation bar to trigger the automated 24-hour presentation simulation.
   - Navigate to **Emergency Center** (`/sos`) and launch an emergency simulation (e.g. *Fall Detected* or *Bank OTP Phishing*).
   - Navigate to **AI Guardian Operations Center** (`/chat`) to inspect the 9 agent nodes and reasoning pipeline.
   - Navigate to **Clinical Reports** (`/reports`) and test the PDF summary export.

---

## 10. Build & Linting Commands

| Task | Command |
| :--- | :--- |
| **Frontend Dev Server** | `npm run dev` |
| **TypeScript Linting** | `npm run lint` (`tsc --noEmit`) |
| **Production Build** | `npm run build` (`vite build`) |
| **Preview Local Build** | `npm run preview` |
| **Backend API Server** | `uvicorn api.main:app --reload --port 8000` |

---

## 11. Troubleshooting Guide

### Issue 1: Port `5173` or `8000` already in use
- **Fix**: Kill process occupying port 8000 on Windows:
  ```powershell
  Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess | Stop-Process -Force
  ```

### Issue 2: `python` not recognized in PowerShell
- **Fix**: Ensure Python 3.11 is added to your system `PATH` environment variable, or use `py -m venv venv`.

### Issue 3: `npm install` fails with peer dependency errors
- **Fix**: Clear npm cache and run install with legacy peer deps:
  ```bash
  npm cache clean --force
  npm install --legacy-peer-deps
  ```

### Issue 4: Gemini API return errors
- **Fix**: Verify your `GEMINI_API_KEY` inside `backend/.env`. Get a free API key from [Google AI Studio](https://aistudio.google.com/).

### Issue 5: Blank white screen on browser launch
- **Fix**: Check browser console (`F12`). Ensure all React Router paths match `ROUTES` constants in `src/constants/routes.ts`.

---

## 12. Future Cloud Deployment Targets

- **Frontend Hosting**: Vercel / Netlify / Firebase Hosting
- **FastAPI Server**: Render / Railway / AWS EC2 / Google Cloud Run
- **Database**: Supabase / Managed PostgreSQL (`pgvector`)
- **Mobile Distribution**: Google Play Store & Apple App Store (Flutter Build)

---

## 13. Recommended Developer Workflow

1. **Pull Latest Code**: `git pull origin main`
2. **Create Feature Branch**: `git checkout -b feature/your-feature-name`
3. **Develop & Test**: Run `npm run lint` to verify zero TypeScript errors.
4. **Commit & Push**:
   ```bash
   git add .
   git commit -m "feat: add proactive health notification card"
   git push origin feature/your-feature-name
   ```
5. **Open Pull Request**: Request code review before merging to `main`.

---

## 14. Quick Start Cheat Sheet

For quick startup, open two terminals and run:

### Terminal 1 — Backend
```powershell
cd backend
.\venv\Scripts\Activate.ps1
uvicorn api.main:app --reload --port 8000
```

### Terminal 2 — Frontend
```bash
npm run dev
```

🚀 **Open in browser**: `http://localhost:5173`
