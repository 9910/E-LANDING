## Quick orientation for AI coding agents

This repository is a small multi-app React + Express project with three main parts:

- `server/` — Express API and static host. Entry: `server/server.js`. Key routes live in `server/routes/` (e.g. `blogs`, `content`, `leads`, `admin`). DB connection is in `server/config/db.js` and environment variables are expected in `.env` at the repo root (server loads via ../.env).
- `client/` — public-facing Vite + React site (Tailwind). Entry scripts in `client/package.json` (use `npm run dev`, `npm run build`). API helper: `client/src/services/api.js`.
- `admin/` — Vite + React admin dashboard. Entry scripts in `admin/package.json` (use `npm run dev`, `npm run build`, `npm run serve`). The preview server for the admin dist is `admin/server.cjs`.

Why this structure matters:
- During development the client and admin run as independent Vite dev servers. The backend runs separately (nodemon) and proxies are not configured — frontends compute the API base URL at runtime (see service helpers below).
- For production the backend statically serves the built client (`server` serves `../client/dist`) and the admin has a small express server that serves `admin/dist` (see `admin/server.cjs`).

Important developer workflows (discoverable in package.json):

- Dev (local, typical):
  - Start backend: `cd server; npm run dev` (nodemon server.js).
  - Start client: `cd client; npm run dev` (Vite).
  - Start admin: `cd admin; npm run dev` (Vite).

- Production preview/build:
  - Build frontends: `cd client; npm run build` and `cd admin; npm run build`.
  - Start backend to serve client build: `cd server; npm run start` (will serve `../client/dist` when present).
  - Admin has `npm run serve` which runs `node server.cjs` inside `admin/` to serve `admin/dist`.

API and integration patterns (give examples):
- Backend exposes REST under `/api`:
  - `/api/leads` — public lead submission.
  - `/api/blogs` — blog list/detail.
  - `/api/content/*` — site content endpoints (programs, highlights, testimonials, home content).
  - `/api/admin/*` — admin-only operations (create/update/delete). See `server/routes/admin.js`.
- Frontend usage examples (exact files):
  - `client/src/services/api.js` builds base URL with VITE_API_URL or falls back to `http://localhost:5000` for development. Example call: `apiClient.get('/blogs')` which hits `${API_BASE_URL}/api/blogs`.
  - `admin/src/services/api.js` uses a similar pattern and sends admin actions to `/api/admin/...`. Admin endpoints require an `x-admin-key` header (see `makeRequest` in that file). Upload endpoints used by the admin include `/api/admin/programs/upload` and `/api/admin/home/upload` and expect multipart/form-data.

Project-specific conventions and gotchas:
- Environment file location: server uses `dotenv` with path resolved to `../.env` from `server/` — put `.env` at the repository root (not inside `server/`).
- Frontends try to compute a sensible API base URL at runtime. To avoid surprises, set `VITE_API_URL` in each app during preview or CI (recommended for deterministic calls).
- Static serving: the backend will serve `client/dist` if it exists. If you only build the client but not the admin, the server will still run (it warns in server.js when `client/dist` is missing).
- Admin package.json lists `react-router-dom` with a nonstandard `^7.9.6` version; if you encounter runtime routing issues, double-check installed versions.
- File uploads are stored under `uploads/` (server creates `server/uploads` if missing). Keep this in mind when writing tests or fixtures.

Where to look for code when changing behavior:
- Backend routes and controllers: `server/routes/` and `server/models/` (Mongoose schemas).
- DB connection: `server/config/db.js` (for connection strings and retry behavior).
- Client components: `client/src/pages/` and `client/src/components/`.
- Admin components: `admin/src/pages/` and `admin/src/components/`.
- API wrappers: `client/src/services/api.js` and `admin/src/services/api.js` — use these to keep request behavior consistent.

Quality / CI notes found in repo:
- There is a SonarQube configuration and helper instructions (see `sonar-project.properties` and `.cursor/rules/sonarqube_mcp_instructions.mdc`). If analysis is part of the task, follow those rules (they include mandatory analyze toggles and project-key lookup guidance).

Minimal contract for agent edits in this repo:
- Inputs: changes to files under `client/`, `admin/`, or `server/`.
- Outputs: keep package.json scripts unchanged unless intentionally improving scripts; update API wrappers when changing routes; ensure `.env` uses correct keys for DB and ports.
- Error modes: missing `client/dist` or `admin/dist` — server logs that and does not crash. Missing `.env` will break DB connection.

If anything here is unclear or you'd like me to expand a specific section (run commands for verification, add CI steps, or include example .env variable names), tell me which area to iterate on.
