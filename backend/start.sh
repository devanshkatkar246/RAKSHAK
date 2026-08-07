#!/usr/bin/env bash
# ── RAKSHAK Backend Development Start Script ──────────────────────
set -e

echo "🛡️  RAKSHAK Backend — Starting Development Environment"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
  echo "⚠️  No .env file found. Copying from .env.example..."
  cp .env.example .env
  echo "✅ .env created. Please fill in GEMINI_API_KEY, SECRET_KEY, etc."
  exit 1
fi

# Start infrastructure
echo "🐘 Starting PostgreSQL + pgvector..."
echo "🔴 Starting Redis..."
docker compose up -d db redis

echo "⏳ Waiting for services to be healthy..."
sleep 5

# Run Alembic migrations
echo "🔄 Running database migrations..."
alembic upgrade head

# Start FastAPI dev server
echo ""
echo "🚀 Starting RAKSHAK API server at http://localhost:8000"
echo "📚 API Docs at http://localhost:8000/docs"
echo ""
uvicorn main:app --host 0.0.0.0 --port 8000 --reload --reload-dir .
