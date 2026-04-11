# URL Shortener

A URL shortener backend built with TypeScript, Express, MongoDB, and Redis. It exposes a minimal HTTP API for creating short URLs and redirecting them back to the original destination, with Redis used to reduce database lookups on repeated reads.

## Live Deployment

- Base URL: `https://url-shortener-mhp8.onrender.com`
- Health check: `https://url-shortener-mhp8.onrender.com/health`

The service is deployed on Render. A `5` minute health-status ping keeps the instance warm so the server does not idle down.

## Features

- Create short URLs from valid long URLs
- Redirect short codes to their original destination
- Health check endpoint for uptime monitoring
- Redis-backed caching for faster lookups
- MongoDB persistence for URL mappings
- Dependency injection with `tsyringe`
- Clear separation between controller, service, and repository layers

## Tech Stack

- Node.js
- TypeScript
- Express
- MongoDB
- Redis
- Zod
- tsyringe

## Project Structure

```text
Controllers/    HTTP request handling and input validation
Services/       Core business logic
Repositories/   MongoDB and Redis data access
Interfaces/     Service and repository contracts
Models/         Data models
Routes/         Express route registration
config/         Database and cache client setup
container.js    Dependency injection wiring
index.ts        Application entry point
```

## API

### `GET /health`

Returns service health status.

Example response:

```json
{
  "status": "ok"
}
```

### `POST /`

Creates a short URL.

Request body:

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

Possible responses:

- `201 Created` when the short URL is generated
- `422 Unprocessable Entity` when `longUrl` is invalid
- `500 Internal Server Error` when persistence fails

### `GET /:shortUrl`

Redirects to the original URL for the given short code.

Possible responses:

- `302 Found` style browser redirect to the original URL
- `404 Not Found` when the short code does not exist
- `422 Unprocessable Entity` when the parameter is invalid

## Quick Start

### Prerequisites

- Node.js `18+`
- A MongoDB instance
- A Redis instance

### Installation

```bash
git clone https://github.com/NeverSpot/URL-shortener-.git
cd URL-shortener-
npm install
```

### Environment Variables

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

### Run Locally

Build the TypeScript project:

```bash
npm run build
```

Start the compiled server:

```bash
npm start
```

For a simple local development flow:

```bash
npm run dev
```

By default, the app runs on `http://localhost:3001`.

## Example Requests

Create a short URL:

```bash
curl -X POST https://url-shortener-mhp8.onrender.com/ ^
  -H "Content-Type: application/json" ^
  -d "{\"longUrl\":\"https://example.com\"}"
```

Check health:

```bash
curl https://url-shortener-mhp8.onrender.com/health
```

## Deployment Notes

- The production app is hosted on Render
- MongoDB stores canonical URL mappings
- Redis is used as a read cache and helper store
- The `/health` endpoint is suitable for Render uptime checks and external monitoring

## License

Licensed under the [ISC License](https://opensource.org/licenses/ISC).
