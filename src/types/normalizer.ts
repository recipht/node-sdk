export interface ProcessImageRequest {
  image_url?: string;
  image_base64?: string;
  merchant_code?: string;
}

export interface ProcessImageResponse {
  receipt_id: string;
  status: string;
  normalized_data: NormalizedReceipt;
}

export interface ProcessJsonRequest {
  receipt_data: Record<string, any>;
  merchant_code?: string;
}

export interface ProcessBulkJsonRequest {
  receipts: Record<string, any>[];
  merchant_code?: string;
}

export interface NormalizedReceipt {
  receipt_id: string;
  merchant_name?: string;
  merchant_address?: string;
  transaction_date?: string;
  total_amount?: number;
  currency?: string;
  tax_amount?: number;
  items?: LineItem[];
  payment_method?: string;
  metadata?: Record<string, any>;
}

export interface LineItem {
  name: string;
  quantity?: number;
  unit_price?: number;
  total_price?: number;
  category?: string;
}
