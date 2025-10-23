export interface ReceiptrailConfig {
  /**
   * Personal Access Token from Logto
   */
  accessToken: string;

  /**
   * Logto endpoint URL
   */
  logtoEndpoint?: string;

  /**
   * API base URL
   */
  baseUrl?: string;

  /**
   * Request timeout in milliseconds
   */
  timeout?: number;
}

export interface LogtoTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}
