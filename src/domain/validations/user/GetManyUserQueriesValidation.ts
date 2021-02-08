import { Injectable } from '@nestjs/common';
import Joi from 'joi';

import LimitNotIntegerException from '../../exceptions/LimitNotIntegerException';
import AbstractValidation from '../AbstractValidation';

@Injectable()
export class GetManyUserQueriesValidation extends AbstractValidation<GetManyUserQueries> {
  constructor() {
    super(
      Joi.object<GetManyUserQueries>({
        limit: Joi.number().optional().integer().min(0).messages({
          'number.integer': new LimitNotIntegerException().getMessage()
          // TODO: Another validation messages
        })
      })
    );
  }
}
