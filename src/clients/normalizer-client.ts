import { BaseClient } from './base-client';
import {
  ProcessImageRequest,
  ProcessImageResponse,
  ProcessJsonRequest,
  NormalizedReceipt,
} from '../types/normalizer';

export class NormalizerClient extends BaseClient {
  async processImage(request: ProcessImageRequest): Promise<ProcessImageResponse> {
    return this.request<ProcessImageResponse>({
      method: 'POST',
      url: '/v1/normalizer/process/image',
      data: request,
    });
  }

  async processJson(request: ProcessJsonRequest): Promise<NormalizedReceipt> {
    return this.request<NormalizedReceipt>({
      method: 'POST',
      url: '/v1/normalizer/process/json',
      data: request,
    });
  }
}
