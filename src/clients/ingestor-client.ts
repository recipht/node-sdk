import { BaseClient } from './base-client';
import {
  IngestReceiptRequest,
  IngestReceiptResponse,
  ReceiptValueResponse,
  ReceiptCountResponse,
  ReceiptChartResponse,
  SuccessRateResponse,
} from '../types/ingestor';

export class IngestorClient extends BaseClient {
  async ingestReceipt(request: IngestReceiptRequest, idempotencyKey?: string): Promise<IngestReceiptResponse> {
    return this.request<IngestReceiptResponse>({
      method: 'POST',
      url: '/ingestor/receipts/ingest',
      data: request,
      headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
    });
  }

  async getReceiptValue(startDate?: string, endDate?: string): Promise<ReceiptValueResponse> {
    return this.request<ReceiptValueResponse>({
      method: 'GET',
      url: '/ingestor/analytics/receipts/value',
      params: { start_date: startDate, end_date: endDate },
    });
  }

  async getReceiptCount(startDate?: string, endDate?: string): Promise<ReceiptCountResponse> {
    return this.request<ReceiptCountResponse>({
      method: 'GET',
      url: '/ingestor/analytics/receipts/count',
      params: { start_date: startDate, end_date: endDate },
    });
  }

  async getReceiptChart(startDate?: string, endDate?: string): Promise<ReceiptChartResponse> {
    return this.request<ReceiptChartResponse>({
      method: 'GET',
      url: '/ingestor/analytics/receipts/chart',
      params: { start_date: startDate, end_date: endDate },
    });
  }

  async getIngestionSuccessRate(startDate?: string, endDate?: string): Promise<SuccessRateResponse> {
    return this.request<SuccessRateResponse>({
      method: 'GET',
      url: '/ingestor/analytics/ingestion/success-rate',
      params: { start_date: startDate, end_date: endDate },
    });
  }
}
