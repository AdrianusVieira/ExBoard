# Ex Board

A personal finance tracker to record income and outcome entries, manage categories, and visualise totals over custom date ranges.

## Stack

- **Frontend** — React + Vite + TypeScript + Tailwind CSS
- **Backend** — NestJS + TypeORM + PostgreSQL
- **Database** — PostgreSQL running in Docker

## Project Structure

ex-board/
├── docker-compose.yml ← spins up PostgreSQL
├── .env ← root env (DB credentials for Docker)
├── frontend/ ← React app
└── backend/ ← NestJS API

## Getting started

### 1. Start the database

```bash
docker compose up -d
```

### 2. Start the backend

```bash
cd backend
npm install
npm run start
```

### 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Environment variables

Copy the example files and adjust as needed:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```
