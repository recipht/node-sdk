export interface DeliveriesSummaryResponse {
  total_deliveries: number;
  successful_deliveries: number;
  failed_deliveries: number;
  pending_deliveries: number;
  period: string;
}

export interface DeliverySuccessRateResponse {
  success_rate: number;
  total_attempts: number;
  successful: number;
  failed: number;
  period: string;
}

export interface DeliveryChartResponse {
  data: DeliveryChartDataPoint[];
  period: string;
}

export interface DeliveryChartDataPoint {
  date: string;
  successful: number;
  failed: number;
  total: number;
}
