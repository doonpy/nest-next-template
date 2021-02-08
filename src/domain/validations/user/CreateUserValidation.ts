import { Injectable } from '@nestjs/common';
import Joi from 'joi';

import RequiredNameException from '../../exceptions/user/RequiredNameException';
import AbstractValidation from '../AbstractValidation';

@Injectable()
export default class CreateUserValidation extends AbstractValidation<CreateUserInput> {
  constructor() {
    super(
      Joi.object<CreateUserInput>({
        name: Joi.string().min(3).max(30).required().messages({
          'string.base': new RequiredNameException().getMessage()
          // TODO: Another validation messages
        }),
        age: Joi.number().integer().min(1).required()
      })
    );
  }
}
