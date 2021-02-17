import { BadRequestException } from '@nestjs/common';
import { AnySchema } from 'joi';

export default abstract class BaseValidation<T> {
  private readonly schema: AnySchema;

  protected constructor(schema: AnySchema) {
    this.schema = schema;
  }

  public validate(value: T): BadRequestException | undefined {
    const { error } = this.schema.validate(value);
    if (error) {
      return new BadRequestException(error.message);
    }
  }
}
