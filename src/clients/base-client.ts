import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { LogtoAuthClient } from '../auth/logto-client';

export class BaseClient {
  protected client: AxiosInstance;
  private authClient: LogtoAuthClient;

  constructor(authClient: LogtoAuthClient, baseUrl: string, timeout: number = 30000) {
    this.authClient = authClient;
    this.client = axios.create({
      baseURL: baseUrl,
      timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to inject auth token
    this.client.interceptors.request.use(async (config) => {
      const token = await this.authClient.getAccessToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  protected async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.client.request<T>(config);
    return response.data;
  }
}
