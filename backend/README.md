# Ex Board — Backend

NestJS REST API for Ex Board. Handles categories and entries, including automatic generation of credit installments.

## Stack

- NestJS
- TypeORM
- PostgreSQL

## Requirements

- Node.js 18+
- PostgreSQL running (see root `docker-compose.yml`)

## Setup

```bash
npm install
cp .env.example .env
```

## Running

```bash
# Development
npm run start

# Watch mode (auto-restart on changes)
npm run start:dev
```

## Environment variables

| Variable      | Description       |
| ------------- | ----------------- |
| `DB_HOST`     | PostgreSQL host   |
| `DB_PORT`     | PostgreSQL port   |
| `DB_NAME`     | Database name     |
| `DB_USER`     | Database user     |
| `DB_PASSWORD` | Database password |

## API Endpoints

### Categories

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| GET    | `/categories`     | List all categories   |
| GET    | `/categories/:id` | Get a single category |
| POST   | `/categories`     | Create a category     |
| PUT    | `/categories/:id` | Update a category     |
| DELETE | `/categories/:id` | Delete a category     |

### Entries

| Method | Endpoint                         | Description                                            |
| ------ | -------------------------------- | ------------------------------------------------------ |
| GET    | `/entries`                       | List all entries                                       |
| GET    | `/entries/:id`                   | Get a single entry                                     |
| POST   | `/entries`                       | Create a debit entry                                   |
| POST   | `/entries/credit`                | Create a credit purchase (auto-generates installments) |
| PUT    | `/entries/:id`                   | Update an entry                                        |
| DELETE | `/entries/:id`                   | Delete a single entry                                  |
| DELETE | `/entries/credit/:creditGroupId` | Delete all installments of a credit purchase           |
