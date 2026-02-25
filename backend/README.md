# Backend – GKWebtech API

This folder contains the backend API for the GKWebtech website. It exposes endpoints used by the frontend to submit leads and (optionally) manage portfolio data.

Built with:

- Node.js
- Express
- MongoDB + Mongoose

---

## Project Structure

- `server.js` – Express app entry point
- `api/db.js` – MongoDB connection helper using environment variables
- `api/models.js` – Mongoose schemas and models (Lead, Project, Team, Testimonial, etc.)
- `api/contact.js` – `/api/contact` POST endpoint to capture leads from the website
- `api/projects.js` – helper script for seeding/working with project data
- `Dockerfile` – container definition for running the backend

---

## Environment Variables

Create a `.env` file in the `backend` folder with at least:

- `MONGODB_URI` or `MONGO_URI` – MongoDB connection string
- `PORT` – port for the backend server (defaults to `4000` if not set)
- `FRONTEND_URL` – allowed CORS origin (e.g. `https://www.gkwebtech.cloud`)

Example:

```env
MONGODB_URI=your-mongodb-connection-string
PORT=4000
FRONTEND_URL=https://www.gkwebtech.cloud
```

---

## Install and Run Locally

From the `backend` directory:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

3. The API will run on:

   ```text
   http://localhost:4000
   ```

   - Health check: `GET /`
   - Contact endpoint: `POST /api/contact`

---

## Docker Usage

The backend can be containerized using the provided `Dockerfile`.

Build the image:

```bash
docker build -t gkwebtech-backend .
```

Run the container:

```bash
docker run -d \
  -p 4000:4000 \
  -e MONGODB_URI=your-mongodb-uri \
  -e FRONTEND_URL=https://www.gkwebtech.cloud \
  --name gkwebtech-backend \
  gkwebtech-backend  
```

---

## Deployment – Hostinger VPS with Dokploy OS Panel

The backend can be deployed on the same Hostinger VPS where the frontend is hosted, managed via **Dokploy OS with panel**:

1. Ensure MongoDB is accessible from the VPS (cloud MongoDB or managed DB).
2. In Dokploy, create a new app/service for the backend.
3. Use either:
   - Node.js app mode, pointing to `backend/server.js`, or
   - A Docker deployment using the `backend/Dockerfile`.
4. Configure environment variables in the Dokploy panel:
   - `MONGODB_URI` / `MONGO_URI`
   - `PORT` (e.g. `4000`)
   - `FRONTEND_URL` (e.g. `https://www.gkwebtech.cloud`)
5. Expose the backend port internally (e.g. 4000) and, if needed, attach a subdomain (e.g. `api.gkwebtech.cloud`) through Dokploy and DNS.

The frontend should call this backend via the configured domain or internal URL within the VPS.
