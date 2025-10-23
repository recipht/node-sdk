import axios from 'axios';
import { LogtoTokenResponse } from '../types/config';

export class LogtoAuthClient {
  private static readonly APP_ID = '9cj6p1ckpbunagyu1b4f4';

  private logtoEndpoint: string;
  private personalAccessToken: string;
  private cachedToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(personalAccessToken: string, logtoEndpoint: string = 'https://dtoqr1.logto.app') {
    this.personalAccessToken = personalAccessToken;
    this.logtoEndpoint = logtoEndpoint;
  }

  async getAccessToken(): Promise<string> {
    // Return cached token if still valid
    if (this.cachedToken && Date.now() < this.tokenExpiry) {
      return this.cachedToken;
    }

    // Exchange personal access token for API access token
    const params = new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
      subject_token: this.personalAccessToken,
      subject_token_type: 'urn:logto:token-type:personal_access_token',
      client_id: LogtoAuthClient.APP_ID,
      resource: 'https://api.receiptrail.ai',
    });

    const response = await axios.post<LogtoTokenResponse>(
      `${this.logtoEndpoint}/oidc/token`,
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    this.cachedToken = response.data.access_token;
    this.tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000; // Refresh 1 min before expiry

    return this.cachedToken;
  }
}
