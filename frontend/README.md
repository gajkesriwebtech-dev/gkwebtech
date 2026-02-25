# GK Webtech – Digital Marketing Agency Website (Frontend)

This is the frontend for the GK Webtech website, built with React, TypeScript and Vite. It powers the marketing site, portfolio, blog, courses and lead‑generation flows.

The production site is deployed on a Hostinger VPS using **Dokploy OS with panel**.

---

## Tech Stack

- React + TypeScript
- Vite (bundler / dev server)
- Tailwind CSS
- React Router DOM

---

## Project Structure

Key frontend files and folders:

- `App.tsx` – main application shell and routing
- `components/` – UI components (home, services, portfolio, blog, etc.)
- `data.ts` – static data for services, projects, courses, blogs and team
- `types.ts` – TypeScript interfaces for shared types
- `public/` – static assets (images, sitemap, robots.txt)

> Note: The backend (Express + MongoDB API) lives in the root `backend/` folder and is documented separately.

---

## Run Locally (Frontend)

From the `frontend` directory:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Open the URL printed in the terminal (usually `http://localhost:5173/`).

---

## Build for Production

From the `frontend` directory:

```bash
npm run build
```

This generates the optimized static assets in the `dist/` folder, which are used by the production deployment.

---

## Deployment – Hostinger VPS with Dokploy OS Panel

The website is deployed on a **Hostinger VPS** using **Dokploy OS** (with its web panel) to manage the application.

### High‑level flow

1. Build the frontend locally or on the server with:

   ```bash
   npm install
   npm run build
   ```

   This creates the `dist/` directory containing the static frontend.

2. Serve the built frontend behind Dokploy:
   - Option A: Use a small Node/Vite preview or Express server that serves `dist/`.
   - Option B: Use a lightweight static file server (e.g. nginx or `serve`) configured in Dokploy.

3. Configure the app in the Dokploy OS panel:
   - Create a new app / container for the frontend.
   - Point the app’s **root directory** or **mount** to the built `dist/` folder.
   - Expose the port used by your frontend server (for example `3000` or `4173`).

4. Attach a domain in Dokploy:
   - Add your domain/subdomain (for example `www.gkwebtech.cloud`) in the panel.
   - Point DNS (A record) from your domain registrar to the Hostinger VPS IP.
   - In Dokploy, bind the domain to your frontend app.

5. Enable HTTPS:
   - Use Dokploy’s built‑in SSL / Let’s Encrypt support to issue and renew certificates.

Once configured, Dokploy handles running the container/app, restarting on failure, and reverse proxying your public domain to the frontend.

---

## Environment Notes

- Frontend is a pure client app; no secret keys should be embedded in the bundled code.
- API endpoints, if any, should be configured to point to the backend running on the same VPS (or another service) and exposed via Dokploy.

---

## Useful Scripts

From `frontend/`:

- `npm run dev` – start local dev server
- `npm run build` – build optimized production bundle
