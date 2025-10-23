export type SourceType = 'api' | 'sftp';
export type FormatType = 'json' | 'xml' | 'csv' | 'html' | 'base64' | 'raw';

export interface ReceiptData {
  [key: string]: any;
}

export interface IngestReceiptRequest {
  merchant_code: string;
  location_id?: string;
  source_type?: SourceType;
  format_type?: FormatType;
  receipts: ReceiptData[];
}

export interface IngestReceiptResponse {
  ingestion_id: string;
  status: string;
  message: string;
  receipts_count: number;
}

export interface ReceiptValueResponse {
  total_value: number;
  currency: string;
  period: string;
}

export interface ReceiptCountResponse {
  total_count: number;
  period: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface ReceiptChartResponse {
  data: ChartDataPoint[];
  period: string;
}

export interface SuccessRateResponse {
  success_rate: number;
  total_attempts: number;
  successful: number;
  failed: number;
  period: string;
}
