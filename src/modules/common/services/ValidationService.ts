import { BadRequestException, Injectable } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export default class ValidationService {
  public async validate<T extends Record<string, any>>(
    target: T | Record<string, any>,
    targetClass?: ClassConstructor<T>
  ): Promise<void> {
    let cloneTarget = { ...target };
    if (targetClass) {
      cloneTarget = plainToClass(targetClass, cloneTarget);
    }

    const errors = await validate(cloneTarget, {
      skipMissingProperties: true,
      dismissDefaultMessages: true
    });
    if (errors.length > 0) {
      const error = errors[0];
      const constraints = Object.entries(error.constraints || {});
      if (constraints.length > 0) {
        const firstConstraint = constraints[0];

        throw new BadRequestException(firstConstraint[1]);
      }
    }
  }
}
