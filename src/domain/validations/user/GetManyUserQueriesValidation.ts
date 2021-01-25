import { BadRequestException, Injectable } from '@nestjs/common';
import Joi, { ObjectSchema } from 'joi';

import LimitNotIntegerException from '../../exceptions/LimitNotIntegerException';

@Injectable()
export class GetManyUserQueriesValidation {
  private readonly schema: ObjectSchema;

  constructor() {
    this.schema = Joi.object<GetManyUserQueries>({
      limit: Joi.number().optional().integer().min(0).messages({
        'number.integer': new LimitNotIntegerException().getMessage()
        // TODO: Another validation messages
      })
    });
  }

  public validate(value: GetManyUserQueries): void {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(error.message);
    }
  }
}
