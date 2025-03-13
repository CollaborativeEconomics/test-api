# Test Solar API

A test API service for solar credit data using Fastify.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/test` - Test endpoint
- `GET /api/solar-quote` - Mock solar credit quote
- `GET /api/registry/retirements` - Mock retirements endpoint
  - Query params: `for_address`, `date_gte`

## Environment

The server runs on port 3000 by default. 