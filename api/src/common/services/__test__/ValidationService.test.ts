import { BadRequestException } from '@nestjs/common';
import * as ClassTransformer from 'class-transformer';
import { IsString, ValidationError } from 'class-validator';
import * as ClassValidator from 'class-validator';

import ValidationService from '../ValidationService';

class MockClass {
  @IsString()
  public foo!: string;

  @IsString()
  public baz!: number;
}

describe('ValidationService', () => {
  let validationService: ValidationService;
  const mockValue = { foo: 'foo', baz: 1 };

  beforeEach(() => {
    validationService = new ValidationService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validate', () => {
    it('should called "plainToClass" function when targetClass is not undefined', async () => {
      const plainToClassSpy = jest.spyOn(ClassTransformer, 'plainToClass');
      plainToClassSpy.mockReturnValue(mockValue);

      await validationService.validate<MockClass>(mockValue, MockClass);

      expect(plainToClassSpy).toHaveBeenCalledWith(MockClass, mockValue);
    });

    it('should not called "plainToClass" function when targetClass is undefined', async () => {
      const plainToClassSpy = jest.spyOn(ClassTransformer, 'plainToClass');

      await validationService.validate(mockValue);

      expect(plainToClassSpy).not.toBeCalled();
    });

    it('should called "validate" function', async () => {
      const validateSpy = jest.spyOn(ClassValidator, 'validate');

      await validationService.validate<MockClass>(mockValue, MockClass);

      expect(validateSpy).toHaveBeenCalledWith(mockValue, {
        skipMissingProperties: true,
        dismissDefaultMessages: true
      });
    });

    it('should throw BadRequestException error when errors not empty', async () => {
      const errors: ValidationError[] = [
        { property: 'foo', constraints: { firstConstraint: 'Error message' } }
      ];
      jest.spyOn(ClassValidator, 'validate').mockReturnValue(Promise.resolve(errors));

      try {
        await validationService.validate<MockClass>(mockValue, MockClass);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
