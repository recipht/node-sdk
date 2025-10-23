import { BaseClient } from './base-client';
import {
  DeliveriesSummaryResponse,
  DeliverySuccessRateResponse,
  DeliveryChartResponse,
} from '../types/delivery';

export class DeliveryClient extends BaseClient {
  async getDeliveriesSummary(startDate?: string, endDate?: string): Promise<DeliveriesSummaryResponse> {
    return this.request<DeliveriesSummaryResponse>({
      method: 'GET',
      url: '/delivery/analytics/deliveries/summary',
      params: { start_date: startDate, end_date: endDate },
    });
  }

  async getDeliverySuccessRate(startDate?: string, endDate?: string): Promise<DeliverySuccessRateResponse> {
    return this.request<DeliverySuccessRateResponse>({
      method: 'GET',
      url: '/delivery/analytics/deliveries/success-rate',
      params: { start_date: startDate, end_date: endDate },
    });
  }

  async getDeliveriesChart(startDate?: string, endDate?: string): Promise<DeliveryChartResponse> {
    return this.request<DeliveryChartResponse>({
      method: 'GET',
      url: '/delivery/analytics/deliveries/chart',
      params: { start_date: startDate, end_date: endDate },
    });
  }
}
