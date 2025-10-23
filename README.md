# Receiptrail SDK for Node.js

Official Node.js SDK for the Receiptrail API.

## Installation

```bash
npm install @receiptrail/sdk
```

## Usage

```typescript
import { ReceiptrailClient } from '@receiptrail/sdk';

// Initialize the client with your personal access token
const client = new ReceiptrailClient({
  accessToken: 'your-logto-personal-access-token',
});

// Ingest receipts
const response = await client.ingestor.ingestReceipt({
  merchant_code: 'MERCHANT_123',
  location_id: 'LOCATION_456',
  receipts: [
    {
      transaction_id: 'TXN_001',
      amount: 100.50,
      currency: 'USD',
    },
  ],
});

// Get receipt analytics
const receiptValue = await client.ingestor.getReceiptValue(
  '2025-01-01',
  '2025-01-31'
);

// Process receipt image
const normalized = await client.normalizer.processImage({
  image_url: 'https://example.com/receipt.jpg',
  merchant_code: 'MERCHANT_123',
});

// Get delivery analytics
const deliverySummary = await client.delivery.getDeliveriesSummary(
  '2025-01-01',
  '2025-01-31'
);
```

## API Clients

### Ingestor Client

- `ingestReceipt(request, idempotencyKey?)` - Ingest receipts
- `getReceiptValue(startDate?, endDate?)` - Get receipt value analytics
- `getReceiptCount(startDate?, endDate?)` - Get receipt count
- `getReceiptChart(startDate?, endDate?)` - Get receipt chart data
- `getIngestionSuccessRate(startDate?, endDate?)` - Get ingestion success rate

### Normalizer Client

- `processImage(request)` - Process receipt image
- `processJson(request)` - Process JSON receipt
- `processBulkJson(request)` - Process multiple JSON receipts
- `listReceipts(skip?, limit?)` - List receipts
- `getReceipt(receiptId)` - Get receipt by ID

### Delivery Client

- `getDeliveriesSummary(startDate?, endDate?)` - Get deliveries summary
- `getDeliverySuccessRate(startDate?, endDate?)` - Get delivery success rate
- `getDeliveriesChart(startDate?, endDate?)` - Get delivery chart data

## Configuration

```typescript
const client = new ReceiptrailClient({
  accessToken: 'your-token',        // Required
  logtoEndpoint: 'https://...',      // Optional, defaults to production
  baseUrl: 'https://...',            // Optional, defaults to production API
  timeout: 30000,                    // Optional, defaults to 30 seconds
});
```

## License

MIT
