# Ex Board — Frontend

React application for Ex Board. Provides a filtered list of entries with income and outcome totals, and a categories management screen.

## Stack

- React + Vite + TypeScript
- Tailwind CSS
- TanStack Query
- Zustand
- React Router
- Axios
- Lucide React

## Requirements

- Node.js 18+
- Backend API running (see `backend/README.md`)

## Setup

```bash
npm install
cp .env.example .env
```

## Running

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Environment variables

| Variable       | Description          | Default                 |
| -------------- | -------------------- | ----------------------- |
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000` |

## Screens

### Entries (`/entries`)

- Custom date range filter
- Type filter pills (All, Income, Outcome)
- Category filter dropdown
- Income and outcome totals computed from the filtered list
- Create, edit, duplicate, and delete entries
- Credit purchases auto-generate monthly installments

### Categories (`/categories`)

- Create, edit, and delete categories
- Each category has a type (Income or Outcome)

## Feature structure

```
src/
├── features/
│   ├── entries/
│   │   ├── components/   ← EntriesPage, EntryList, EntryCard, EntryForm, EntryFilters
│   │   └── hooks/        ← useEntriesQuery, useEntriesPage
│   └── categories/
│       ├── components/   ← CategoriesPage, CategoryList, CategoryForm
│       └── hooks/        ← useCategoriesQuery, useCategoriesPage
├── services/             ← HTTP service, categories.service, entries.service
├── shared/
│   ├── interfaces/       ← IEntry, ICategory
│   └── types/            ← TType, TMethod
└── components/           ← shared UI components
```
