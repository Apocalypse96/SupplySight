# SupplySight Dashboard

SupplySight Dashboard is a React + Vite + TypeScript + TailwindCSS application that visualizes supply KPIs and products, backed by a mock Apollo GraphQL API with in-memory persistence.

## Features

- KPI cards (Total Stock, Total Demand, Fill Rate)
- Stock vs Demand line chart with 7d/14d/30d range
- Products table with live filters (search, warehouse, status) and pagination (10/pg)
- Status pills and critical row tinting
- Drawer on row click with Update Demand and Transfer Stock mutations
- Mock server with seeded data, filtering, pagination, and persistence
- Optional latency and error simulation for robustness testing

## Tech Stack

- React 18, TypeScript, Vite
- TailwindCSS
- Apollo Client, Apollo Server (mock), GraphQL
- Recharts

## Getting Started

1) Install dependencies
```bash
npm install
```

2) Run dev servers (web + mock API)
```bash
npm run dev
```

By default:
- Web: http://localhost:5173
- GraphQL: http://localhost:4000/graphql

3) Optional: simulate latency and failures
```bash
MOCK_DELAY_MS=500 MOCK_FAIL_RATE=0.1 npm run dev
```
Or per-request headers:
- `x-delay-ms: 500`
- `x-fail: 1`

## Scripts

- `npm run dev` – start mock server and Vite together
- `npm run build` – typecheck and build for production
- `npm run preview` – preview production build

## Project Structure

```
src/
  apollo/            # Apollo client setup
  components/        # UI primitives (Button, Card, Table, Drawer, etc.)
  features/
    dashboard/       # KPI, Chart, range handling
    products/        # Table, filters, drawer, mutations
  layouts/           # AppShell + Topbar
  lib/               # Utilities (status, debounce)
  mocks/             # Schema, server, seeded data
  types/             # Shared types
```

## Architecture Notes

- Feature-first structure; SOLID principles
- UI components stateless; business logic in hooks; API calls in services
- Strong typing; type-only imports to avoid runtime issues in Vite

## Roadmap / Improvements

- GraphQL Codegen for typed operations
- React Router + deep-linking filters
- Persist mock data to disk or sqlite
- Unit/integration tests (Vitest + RTL)
- Accessibility polish (focus traps, ARIA)

## License

MIT
