# Test Solar API

A mock API service for testing solar credit data integration. This API provides fake but realistic-looking solar credit data for development and testing purposes.

## Quick Links

- **Live API**: [https://test-api-seven-mauve.vercel.app](https://test-api-seven-mauve.vercel.app)
- **Test Endpoint**: [/api/test](https://test-api-seven-mauve.vercel.app/api/test)

## Local Setup

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

### Test Endpoint

- `GET /api/test` - Test endpoint
- `GET /api/solar-quote` - Mock solar credit quote
- `GET /api/registry/retirements` - Mock retirements endpoint
  - Query params: `for_address`, `date_gte`

Simple health check endpoint that returns a hello message.

**Response Example:**
```json
{
  "message": "Hello test!"
}
```

### Solar Credit Quote

Returns a mock solar credit quote with randomized pricing data.

**Response Example:**
```json
{
  "solar_credit_amount": "1",
  "total_cost": "34.52",
  "average_price": "28.16"
}
```

### Registry Retirements

Returns detailed mock data about solar credit retirements.

**Query Parameters:**
- `for_address` (string): Wallet address to query retirements for
- `date_gte` (string): Filter retirements after this date (YYYY-MM-DD format)

**Response Example:**
```json
{
  "total_count": 3,
  "count_exceeded": false,
  "total_amount_retired": 75.42,
  "wallet_address": "0x123...",
  "retirements": [
    {
      "issuance_date": "2024-03-15",
      "instrument_type": "Solar Credit",
      "vintage_start": "2023-01-01",
      "vintage_end": "2024-01-01",
      "total_vintage_quantity": 50000,
      "vcs_id": "1234",
      "vcs_name": "Solar Power Generation Project",
      "vcs_category": "Renewable Energy",
      "vcs_protocol": "SP001",
      "additional_certifications": "LEED Gold",
      "region": "North America",
      "country": "USA",
      "solar_credit_amount": 25.5,
      "serial_numbers": "123e4567-e89b-12d3-a456-426614174000",
      "retirement_date": "2024-02-01",
      "retirement_beneficiary": "Solar Beneficiary abc-123",
      "certificate_id": "123456",
      "beneficiary_wallet": "0x123..."
    }
    // ... more retirement records
  ]
}
```

## Testing Tips

1. The API generates random but realistic-looking data using Faker.js
2. Each request to `/api/registry/retirements` will generate 1-5 random retirement records
3. All dates are returned in ISO format (YYYY-MM-DD)
4. The API supports CORS for cross-origin requests
5. All monetary values are returned as strings with 2 decimal places

## Environment

- Default port: 3000 (local development)
- Live API: https://test-api-seven-mauve.vercel.app
- No authentication required for testing

## Rate Limits

This is a test API - please be mindful with request frequency. While there are no strict rate limits, excessive requests may be throttled.

## Contributing

Feel free to open issues or submit pull requests for improvements to the mock data structure or additional endpoints. 