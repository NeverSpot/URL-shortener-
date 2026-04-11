# URL Shortener

A clean URL shortener API built with `TypeScript`, `Express`, `MongoDB`, and `Redis`.

It creates short codes for long URLs, stores them in MongoDB, and uses Redis to speed up repeated lookups.

## Live App

- App: `https://url-shortener-mhp8.onrender.com`
- Health: `https://url-shortener-mhp8.onrender.com/health`

> Deployed on Render. A 5-minute health ping keeps the service awake and avoids cold starts.

## What It Does

- Shortens valid URLs
- Serves a landing page at `/` with an integrated shortener form
- Redirects short codes to the original URL
- Exposes a `/health` endpoint for monitoring
- Uses Redis cache before falling back to MongoDB
- Follows a layered architecture with dependency injection

## Tech Stack

`Node.js` `TypeScript` `Express` `MongoDB` `Redis` `Zod` `tsyringe`

## API Overview

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/` | Landing page with built-in shortener form |
| `GET` | `/health` | Returns service status |
| `POST` | `/` | Creates a short URL |
| `GET` | `/:shortUrl` | Redirects to the original URL |

### Create Short URL

Request:

```json
{
  "longUrl": "https://example.com/some/long/path"
}
```

Success response:

```json
{
  "shortUrl": "aB3xZ"
}
```

Common status codes:

- `201` short URL created
- `422` invalid input
- `404` short URL not found
- `500` internal error

## Quick Start

### 1. Install

```bash
git clone https://github.com/NeverSpot/URL-shortener-.git
cd URL-shortener-
npm install
```

### 2. Add Environment Variables

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
npm run build
npm start
```

For a simple development run:

```bash
npm run dev
```

Local server: `http://localhost:3001`

## Example Requests

Check health:

```bash
curl https://url-shortener-mhp8.onrender.com/health
```

Create a short URL:

```bash
curl -X POST https://url-shortener-mhp8.onrender.com/ \
  -H "Content-Type: application/json" \
  -d '{"longUrl":"https://example.com"}'
```

## Project Structure

```text
Controllers/    Request handling and validation
Services/       Business logic
Repositories/   MongoDB and Redis access
Interfaces/     Contracts and abstractions
Models/         Data models
Routes/         Route definitions
config/         Database and cache setup
container.js    Dependency injection setup
index.ts        App entry point
```

## License

[ISC](https://opensource.org/licenses/ISC)
