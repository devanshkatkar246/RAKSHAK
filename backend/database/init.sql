-- RAKSHAK PostgreSQL Initialization Script
-- Runs once on first Docker container startup

-- Enable pgvector extension for AI embedding storage
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the rakshak schema
CREATE SCHEMA IF NOT EXISTS rakshak;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE rakshak_db TO rakshak_user;
GRANT ALL ON SCHEMA public TO rakshak_user;

-- Log initialization
SELECT 'RAKSHAK Database initialized with pgvector support' AS status;
