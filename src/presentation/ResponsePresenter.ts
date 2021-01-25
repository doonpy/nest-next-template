import { HttpStatus } from '@nestjs/common';

export default class ResponsePresenter {
  private statusCode: number = HttpStatus.OK;

  public setStatusCode(value: number): void {
    this.statusCode = value;
  }

  public getStatusCode(): number {
    return this.statusCode;
  }
}
