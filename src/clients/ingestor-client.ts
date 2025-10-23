import { BaseClient } from './base-client';
import {
  IngestReceiptRequest,
  IngestReceiptResponse,
} from '../types/ingestor';

export class IngestorClient extends BaseClient {
  async ingestReceipt(request: IngestReceiptRequest, idempotencyKey: string): Promise<IngestReceiptResponse> {
    return this.request<IngestReceiptResponse>({
      method: 'POST',
      url: '/v1/ingestor/receipts/ingest',
      data: request,
      headers: { 'Idempotency-Key': idempotencyKey },
    });
  }
}
