import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';

export const API_PREFIX = 'api/v1';

export default class RequestService {
  private configs: AxiosRequestConfig;
  private cancelSource!: CancelTokenSource;

  constructor() {
    this.configs = {
      baseURL: window.location.origin,
      timeout: 20000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
  }

  public getConfigs(): AxiosRequestConfig {
    return this.configs;
  }

  public setConfigs(configs: AxiosRequestConfig): void {
    this.configs = { ...this.configs, ...configs };
  }

  public async send<T = any>(configs: AxiosRequestConfig): Promise<T> {
    try {
      const res = await axios.request<T>({ ...this.configs, ...configs });

      return res.data;
    } catch (error) {
      return error.response;
    }
  }

  public cancelPreviousRequest(): void {
    this.cancelSource.cancel();
  }

  public bindCancelToken() {
    this.cancelSource = axios.CancelToken.source();
    this.setConfigs({ cancelToken: this.cancelSource.token });
  }
}
