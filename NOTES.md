## SupplySight Dashboard - Notes

### Architecture
- Feature-first structure: `dashboard` and `products` encapsulate UI, hooks, and services.
- SOLID: UI components are atomic and stateless; business logic lives in hooks; GraphQL access in `services`.
- Dependency inversion: UI depends on GraphQL via `@apollo/client` hooks, not server details.

### Mock GraphQL
- Apollo Server with executable schema and in-memory resolvers (seeded via `@faker-js/faker`).
- Queries: `kpis(range)`, `warehouses`, `products(search, warehouse, status, page, limit)`.
- Mutations: `updateDemand`, `transferStock` with persistence in memory.
- Latency/errors simulation via env: `MOCK_DELAY_MS`, `MOCK_FAIL_RATE`; headers per request: `x-delay-ms`, `x-fail`.
- Server auto-starts with the web via `npm run dev`.

### Trade-offs
- In-memory persistence resets on server restart; acceptable for local dev.
- Minimal routing via tabs to reduce dependencies; could adopt `react-router`.
- KPIs are global aggregates; trend is synthetic per range.

### Improvements
- Add GraphQL Codegen for strict types and fragment colocation.
- Add React Router and URL-driven filters/pagination.
- Persist mock data to disk/sqlite; seed deterministically for reproducible tests.
- Testing: Vitest + React Testing Library; component and hook coverage.
- Accessibility/keyboard navigation for Drawer and Table.


