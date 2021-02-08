import { BadRequestException } from '@nestjs/common';
import { AnySchema } from 'joi';

export default abstract class AbstractValidation<T> {
  private readonly schema: AnySchema;

  protected constructor(schema: AnySchema) {
    this.schema = schema;
  }

  public validate(value: T): void {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(error.message);
    }
  }
}
