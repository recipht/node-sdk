import { BaseClient } from './base-client';
import {
  ProcessImageRequest,
  ProcessImageResponse,
  ProcessJsonRequest,
  ProcessBulkJsonRequest,
  NormalizedReceipt,
} from '../types/normalizer';

export class NormalizerClient extends BaseClient {
  async processImage(request: ProcessImageRequest): Promise<ProcessImageResponse> {
    return this.request<ProcessImageResponse>({
      method: 'POST',
      url: '/normalizer/process/image',
      data: request,
    });
  }

  async processJson(request: ProcessJsonRequest): Promise<NormalizedReceipt> {
    return this.request<NormalizedReceipt>({
      method: 'POST',
      url: '/normalizer/process/json',
      data: request,
    });
  }

  async processBulkJson(request: ProcessBulkJsonRequest): Promise<NormalizedReceipt[]> {
    return this.request<NormalizedReceipt[]>({
      method: 'POST',
      url: '/normalizer/process/bulk-json',
      data: request,
    });
  }

  async listReceipts(skip?: number, limit?: number): Promise<NormalizedReceipt[]> {
    return this.request<NormalizedReceipt[]>({
      method: 'GET',
      url: '/normalizer/receipts',
      params: { skip, limit },
    });
  }

  async getReceipt(receiptId: string): Promise<NormalizedReceipt> {
    return this.request<NormalizedReceipt>({
      method: 'GET',
      url: `/normalizer/receipts/${receiptId}`,
    });
  }
}
