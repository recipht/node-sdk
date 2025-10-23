import { ReceiptrailConfig } from './types/config';
import { LogtoAuthClient } from './auth/logto-client';
import { IngestorClient } from './clients/ingestor-client';
import { NormalizerClient } from './clients/normalizer-client';
import { DeliveryClient } from './clients/delivery-client';

export class ReceiptrailClient {
  public readonly ingestor: IngestorClient;
  public readonly normalizer: NormalizerClient;
  public readonly delivery: DeliveryClient;

  private authClient: LogtoAuthClient;
  private config: Required<ReceiptrailConfig>;

  constructor(config: ReceiptrailConfig) {
    this.config = {
      accessToken: config.accessToken,
      logtoEndpoint: config.logtoEndpoint || 'https://dtoqr1.logto.app',
      baseUrl: config.baseUrl || 'https://api.receiptrail.ai',
      timeout: config.timeout || 30000,
    };

    this.authClient = new LogtoAuthClient(
      this.config.accessToken,
      this.config.logtoEndpoint
    );

    this.ingestor = new IngestorClient(
      this.authClient,
      this.config.baseUrl,
      this.config.timeout
    );

    this.normalizer = new NormalizerClient(
      this.authClient,
      this.config.baseUrl,
      this.config.timeout
    );

    this.delivery = new DeliveryClient(
      this.authClient,
      this.config.baseUrl,
      this.config.timeout
    );
  }
}
