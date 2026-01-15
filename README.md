# Gajkesari Webtech – Official Website Repository

This repository contains the official website for **Gajkesari Webtech**, a digital marketing and training company focused on:

- SEO and content strategy
- Social media and creative campaigns
- Google & Meta ads and analytics
- Web development and WordPress management
- Corporate training and internship‑driven courses

The site showcases our services, portfolio case studies, courses, blog content, tools, and lead‑generation flows.

---

## About Gajkesari Webtech

Gajkesari Webtech is a digital marketing agency working with:

- Heritage and hospitality brands
- NGOs and impact‑driven organisations
- High‑growth businesses and creators

We combine data‑driven performance marketing with storytelling, creative production, and structured training programs (via GKTech and GKInstitute) to help brands grow traffic, leads, and long‑term equity.

### Official Website

- Production site: **https://www.gajkesari.com**

--

## Contact Information

You can reach Gajkesari Webtech at:

- **Phone (India)**: `+91 99719 44676`
- **Phone (Netherlands)**: `+31 62050 8410`
- **Email**: `Gajkesriwebtech@gmail.com`
- **Postal Address**:  
  Tiwari Clinic, Mahatma Jyotiba Fule Circle,  
  Sch. No. 7, Alwar 301001, Rajasthan, India

Additional contact details and forms are available on the Contact section of the website.

---

## Project Structure

This repo is structured as a full‑stack app:

- `frontend/` – React + TypeScript + Vite single‑page application
  - Home sections: Hero, Services (GKTech & GKInstitute), About, Portfolio, Blog, FAQ, Contact
  - Static data for services, projects, courses, blogs and team in `data.ts`
  - Tailwind CSS for styling and React Router for routing

- `backend/` – Node.js + Express + MongoDB API
  - Handles contact/lead submissions and data models
  - Uses Mongoose for MongoDB access

For more detail:

- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)

---

## Local Development

Clone the repository and install dependencies for frontend and backend.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

- Runs a Vite dev server (typically at `http://localhost:5173/`).
- Uses the React SPA with sections for services, portfolio, blogs, tools and contact.

### Backend

```bash
cd backend
npm install
npm start
```

- Starts the Express API (default `http://localhost:4000/`).
- Make sure `backend/.env` has a valid `MONGODB_URI` and `FRONTEND_URL` (see backend README).

---

## Deployment Overview

The production site is deployed on a **Hostinger VPS** using **Dokploy OS with panel**:

- Frontend:
  - Built from `frontend/` using `npm run build`.
  - Served from the generated `dist/` directory behind Dokploy’s reverse proxy.
  - Domain `https://www.gajkesari.com` points to the Dokploy‑managed app.

- Backend:
  - Deployed from `backend/` as a Node app or Docker container.
  - Environment variables configured in Dokploy (MongoDB URI, PORT, FRONTEND_URL).
  - Exposes an API consumed by the frontend (e.g. `/api/contact`).

DNS records point to the Hostinger VPS, and Dokploy manages routing and SSL certificates.

