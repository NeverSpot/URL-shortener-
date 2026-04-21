# 🔗 URL Shortener

<p align="center">
  <a href="https://url-shortener-mhp8.onrender.com/health"><img src="https://img.shields.io/badge/status-live-brightgreen" alt="Live" /></a>
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/stack-Express%20%7C%20MongoDB%20%7C%20Redis-informational" alt="Stack" />
  <img src="https://img.shields.io/badge/deploy-Render-purple" alt="Render" />
  <a href="https://opensource.org/licenses/ISC"><img src="https://img.shields.io/badge/license-ISC-blue" alt="ISC License" /></a>
</p>

A production-ready URL shortener API written in TypeScript. Short codes are generated and persisted in MongoDB; Redis sits in front for cache-first lookups. The project follows a layered architecture with dependency injection via `tsyringe`.

**Live:** https://url-shortener-mhp8.onrender.com

---

## Features

- Shorten any valid URL to a 5-character code
- Cache-first reads: Redis checked before hitting MongoDB
- Input validation with [Zod](https://github.com/colinhacks/zod)
- Dependency injection via [tsyringe](https://github.com/microsoft/tsyringe)
- `/health` endpoint for uptime monitoring
- Landing page with a built-in shortener form at `/`
- Self-healing: a 5-minute health ping prevents Render cold starts

---

## API

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/` | Landing page with shortener form |
| `GET` | `/health` | Service health check |
| `POST` | `/` | Create a short URL |
| `GET` | `/:shortCode` | Redirect to the original URL |

### Create a short URL

**Request:**
```json
POST /
Content-Type: application/json

{
  "longUrl": "https://example.com/some/very/long/path"
}
```

**Response `201`:**
```json
{
  "shortUrl": "aB3xZ"
}
```

**Status codes:**

| Code | Meaning |
|------|---------|
| `201` | Short URL created |
| `422` | Validation failed (invalid URL) |
| `404` | Short code not found |
| `500` | Internal server error |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript |
| Framework | Express |
| Database | MongoDB (persistent store) |
| Cache | Redis (cache-first lookup) |
| Validation | Zod |
| DI Container | tsyringe |
| Deploy | Render |

### Request flow

```
Client
  │
  ├─ POST / ──────────────► Controller → Service → Repository
  │                                                    │
  │                                               [Redis hit?]
  │                                                Yes │ No
  │                                                    │  └─► MongoDB → cache in Redis
  │                                                    │
  └─ GET /:code ──────────► Redirect to longUrl ◄──────┘
```

---

## Project Structure

```
Controllers/    Request handling and input validation
Services/       Business logic
Repositories/   MongoDB and Redis data access
Interfaces/     Contracts and type definitions
Models/         Mongoose schemas
Routes/         Express route definitions
config/         Database and cache initialization
container.js    tsyringe dependency injection setup
index.ts        App entry point
```

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/NeverSpot/URL-shortener-.git
cd URL-shortener-
npm install
```

### 2. Configure Environment

Create a `.env` file in the project root:

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017
DB_NAME=url_shortener
REDIS_USERNAME=
REDIS_PASSWORD=
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

### 3. Run

```bash
# Build and start
npm run build
npm start

# Development (ts-node / nodemon)
npm run dev
```

Server runs at `http://localhost:3001`.

---

## Try It

Check health:
```bash
curl https://url-shortener-mhp8.onrender.com/health
```

Shorten a URL:
```bash
curl -X POST https://url-shortener-mhp8.onrender.com/ \
  -H "Content-Type: application/json" \
  -d '{"longUrl": "https://example.com/some/long/path"}'
```

Visit `https://url-shortener-mhp8.onrender.com/<shortCode>` to be redirected.

---

## License

[ISC](https://opensource.org/licenses/ISC)
