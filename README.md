# Gajkesari Webtech – Digital Marketing Agency Website

This repository contains the full source code for the Gajkesari Webtech website – a digital marketing agency platform with portfolio, blog, courses and lead‑generation flows.

The project is split into:

- `frontend/` – React + TypeScript + Vite single‑page application
- `backend/` – Node.js + Express + MongoDB API

Production is deployed on a **Hostinger VPS** using **Dokploy OS with panel**.

---

## Folders Overview

- `frontend/`
  - SPA for marketing site, portfolio, blog, courses, tools
  - Uses React Router, Tailwind CSS and Vite
  - Static data for services, projects, blogs and team in `data.ts`
- `backend/`
  - Express REST API
  - MongoDB via Mongoose for leads and other data models
  - Exposes endpoints like `/api/contact`

See the detailed READMEs in each folder:

- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)

---

## Local Development – Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The dev server typically runs at `http://localhost:5173/`.

### Backend

```bash
cd backend
npm install
npm start
```

The API runs at `http://localhost:4000/` by default (configurable with `PORT`).

Ensure you have a valid MongoDB connection string in `backend/.env` (see the backend README).

---

## Deployment – Hostinger VPS with Dokploy OS Panel

The live site is hosted on a Hostinger VPS and managed via Dokploy OS:

1. **Frontend**
   - Build in `frontend/`:

     ```bash
     npm install
     npm run build
     ```

   - Serve the contents of `frontend/dist/` via a static server or small Node server configured as an app in the Dokploy panel.
   - Attach the main domain (for example `https://www.gajkesari.com`) to this frontend app in Dokploy and enable HTTPS (Let’s Encrypt).

2. **Backend**
   - Deploy the Node/Express API from `backend/` either:
     - Directly as a Node app pointing to `server.js`, or
     - As a Docker container using `backend/Dockerfile`.
   - Configure environment variables in Dokploy:
     - `MONGODB_URI` / `MONGO_URI`
     - `PORT` (e.g. 4000)
     - `FRONTEND_URL` (e.g. `https://www.gajkesari.com`)
   - Optionally attach a subdomain like `api.gajkesari.com`, or keep it internal and call via private networking from the frontend.

3. **DNS**
   - Point your domain’s A record to the Hostinger VPS IP.
   - Dokploy handles routing the domain to the correct app and issuing SSL certificates.

---

## Notes

- Frontend should not contain secrets in the built bundle.
- Backend is responsible for all sensitive operations and database access.

