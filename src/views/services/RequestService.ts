import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';

export const API_PREFIX = 'api/v1';

export default class RequestService {
  private configs: AxiosRequestConfig;
  private cancelSource!: CancelTokenSource;

  constructor() {
    this.configs = {
      baseURL: window.location.origin,
      timeout: 20000,
      headers: {
        Accept: 'applications/json',
        'Content-Type': 'applications/json'
      }
    };
  }

  public getConfigs(): AxiosRequestConfig {
    return this.configs;
  }

  public setConfigs(configs: AxiosRequestConfig): void {
    this.configs = { ...this.configs, ...configs };
  }

  public async send<T>(configs: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const res = await axios.request<T, AxiosResponse<ApiResponse<T>>>({
      ...this.configs,
      ...configs
    });
    if (/^[45].*/.test(res.data.statusCode.toString())) {
      throw res.data;
    }

    return res.data;
  }

  public cancelPreviousRequest(): void {
    this.cancelSource.cancel();
  }

  public bindCancelToken() {
    this.cancelSource = axios.CancelToken.source();
    this.setConfigs({ cancelToken: this.cancelSource.token });
  }
}
