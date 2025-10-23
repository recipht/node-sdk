# Receiptrail Node.js SDK

Official Node.js SDK for the Receiptrail API - a digital receipt aggregation, normalization, and delivery platform.

## Features

- 🔐 **Authentication** - Secure authentication using Logto Personal Access Tokens (PAT)
- 📥 **Receipt Ingestion** - Ingest receipts from various sources with idempotency support
- 🔄 **Receipt Normalization** - Process and normalize receipt data from images or JSON
- 📦 **Type-Safe** - Full TypeScript support with detailed type definitions
- ⚡ **Token Caching** - Automatic access token caching and refresh

## Installation

```bash
npm install @receiptrail/sdk
```

## Quick Start

### 1. Get Your Personal Access Token

Create a Personal Access Token (PAT) from your [Logto Console](https://docs.logto.io/user-management/personal-access-token).

### 2. Initialize the Client

```typescript
import { ReceiptrailClient } from '@receiptrail/sdk';

const client = new ReceiptrailClient({
  accessToken: 'your-logto-personal-access-token',
});
```

### 3. Ingest Receipts

```typescript
const response = await client.ingestor.ingestReceipt(
  {
    merchant_code: 'SQUARE_US',
    location_id: 'LOC_123',
    source_type: 'api',
    format_type: 'json',
    receipts: [
      {
        transaction_id: 'txn_001',
        payload: {
          merchant_name: 'Coffee Shop',
          total_amount: 15.99,
          currency: 'USD',
          transaction_date: '2025-01-15T10:30:00Z',
          line_items: [
            {
              name: 'Latte',
              quantity: 1,
              unit_price: 5.99,
              total_price: 5.99,
            },
          ],
        },
      },
    ],
  },
  'unique-idempotency-key-123' // Required for duplicate prevention
);
```

### 4. Normalize Receipts

```typescript
// Process receipt from image
const normalized = await client.normalizer.processImage({
  image_url: 'https://example.com/receipt.jpg',
  merchant_code: 'MERCHANT_123',
});

// Process receipt from JSON
const jsonNormalized = await client.normalizer.processJson({
  merchant_code: 'MERCHANT_123',
  receipt_data: {
    total_amount: 15.99,
    currency: 'USD',
    // ... other receipt data
  },
});
```

## API Reference

### Ingestor Client (`client.ingestor`)

Ingest receipts from various sources.

#### Methods

- **`ingestReceipt(request, idempotencyKey)`** - Ingest receipts with duplicate prevention
  - `request`: Receipt data including merchant_code, location_id, source_type, format_type, and receipts array
  - `idempotencyKey` (required): Unique key to prevent duplicate ingestion

### Normalizer Client (`client.normalizer`)

Process and normalize receipt data from images or JSON.

#### Methods

- **`processImage(request)`** - Extract and normalize data from receipt images
  - `request`: { image_url, merchant_code }

- **`processJson(request)`** - Normalize structured JSON receipt data
  - `request`: { merchant_code, receipt_data }

## Configuration Options

```typescript
const client = new ReceiptrailClient({
  // Required: Your Logto Personal Access Token
  accessToken: 'your-pat-token',

  // Optional: Custom Logto endpoint
  // Default: 'https://dtoqr1.logto.app'
  logtoEndpoint: 'https://your-logto-instance.app',

  // Optional: Custom API base URL
  // Default: 'https://api.receiptrail.ai'
  baseUrl: 'https://api.receiptrail.ai',

  // Optional: Request timeout in milliseconds
  // Default: 30000 (30 seconds)
  timeout: 60000,
});
```

## Best Practices

### Idempotency Keys

Always use unique idempotency keys for receipt ingestion to prevent duplicate processing:

```typescript
// Use transaction ID + timestamp
const idempotencyKey = `${transactionId}-${Date.now()}`;

// Or use UUID
import { v4 as uuidv4 } from 'uuid';
const idempotencyKey = uuidv4();

await client.ingestor.ingestReceipt(receiptData, idempotencyKey);
```

### Error Handling

```typescript
try {
  const response = await client.ingestor.ingestReceipt(data, idempotencyKey);
  console.log('Success:', response);
} catch (error) {
  if (error.response) {
    // API error response
    console.error('API Error:', error.response.status, error.response.data);
  } else if (error.request) {
    // Network error
    console.error('Network Error:', error.message);
  } else {
    // Other errors
    console.error('Error:', error.message);
  }
}
```

### Token Caching

The SDK automatically caches access tokens and refreshes them before expiry. You don't need to manage token refresh manually.

## Development

```bash
# Install dependencies
npm install

# Build the SDK
npm run build

# Run tests
npm test
```

## Support

- **Documentation**: [Receiptrail API Docs](https://api.receiptrail.ai)
- **Issues**: [GitHub Issues](https://github.com/receiptrail/node-sdk/issues)
- **Email**: support@receiptrail.ai

## License

MIT
