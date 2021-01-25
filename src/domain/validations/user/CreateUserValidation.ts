import { BadRequestException, Injectable } from '@nestjs/common';
import Joi, { ObjectSchema } from 'joi';

import RequiredNameException from '../../exceptions/user/RequiredNameException';

@Injectable()
export default class CreateUserValidation {
  private readonly schema: ObjectSchema;

  constructor() {
    this.schema = Joi.object<CreateUser>({
      name: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.base': new RequiredNameException().getMessage()
        // TODO: Another validation messages
      }),
      age: Joi.number().integer().min(1).required()
    });
  }

  public validate(value: CreateUser): void {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(error.message);
    }
  }
}
