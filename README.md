# URL Shortener

A high-performance URL shortener service built with **TypeScript**, **Express**, **MongoDB**, and **Redis**. Features a clean architecture with dependency injection, repository pattern, and Base62 encoding for generating short URLs.

---

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express
- **Database:** MongoDB
- **Cache:** Redis
- **DI Container:** tsyringe
- **Validation:** Zod

---

## 🏗 Architecture

```
Controllers/        → Request handling & validation
Services/           → Business logic (URL shortening, Base62 encoding)
Repositories/       → Data access (MongoDB, Redis cache)
Interfaces/         → Contracts (IUrlService, IUrlRepository, IUrlEncoder)
Models/             → Data models
config/             → Database & cache client configuration
Routes/             → Express route definitions
container.js        → Dependency injection setup
```

---

## 📡 API Endpoints

### Health Check

```
GET /health
```

**Response:** `200 OK`
```json
{ "status": "ok" }
```

### Shorten a URL

```
POST /
Content-Type: application/json

{ "longUrl": "https://example.com/some/long/path" }
```

**Response:** `201 Created`
```json
{ "shortUrl": "aB3xZ" }
```

**Error:** `422 Unprocessable Entity` — Invalid URL format

### Redirect to Original URL

```
GET /:shortUrl
```

**Response:** `200` → Redirects to the original long URL  
**Error:** `404 Not Found` — Short URL does not exist

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
# Server
PORT=3001

# MongoDB
MONGO_URI=mongodb://localhost:27017
DB_NAME=url_shortener

# Redis
REDIS_USERNAME=
REDIS_PASSWORD=
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Redis** instance (local or [Upstash](https://upstash.com))

### Installation

```bash
git clone https://github.com/NeverSpot/URL-shortener-.git
cd URL-shortener-
npm install
```

### Build & Run

```bash
npm run build    # Compile TypeScript
npm start        # Start the server
```

Or in one step:

```bash
npm run dev      # Build + Start
```

---

## 🌐 Deployment

This project is deployment-ready for platforms like **Render**, **Railway**, or **Fly.io**.

1. Set up a free **MongoDB Atlas** cluster for the database
2. Set up a free **Upstash** or **Redis Cloud** instance for caching
3. Configure the environment variables on your hosting platform
4. Deploy — the `npm start` script runs the compiled server

---

## 📄 License

[ISC](https://opensource.org/licenses/ISC)
