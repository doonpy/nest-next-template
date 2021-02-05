import { HttpStatus } from '@nestjs/common';

export default abstract class AbstractUseCase<Data> {
  private statusCode: number;
  private data?: Data;

  protected constructor() {
    this.statusCode = HttpStatus.OK;
  }

  public setData(value: Data): void {
    this.data = value;
  }

  public getData(): Data | undefined {
    return this.data;
  }

  public setStatusCode(value: number): void {
    this.statusCode = value;
  }

  public getStatusCode(): number {
    return this.statusCode;
  }

  protected abstract prepareResponse(): Promise<void> | void;

  public async execute(): Promise<ApiResponse<Data>> {
    await this.prepareResponse();

    return {
      statusCode: this.getStatusCode(),
      data: this.getData()
    };
  }
}
