import { Injectable } from '@nestjs/common';

import UserEntity from '../../../domain/entities/user/UserEntity';
import UserService from '../../../domain/services/user/UserService';
import CreateUserValidation from '../../../domain/validations/user/CreateUserValidation';

@Injectable()
export default class CreateUserUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly createUserValidation: CreateUserValidation
  ) {}

  public async execute(value: CreateUser): Promise<UserEntity> {
    this.createUserValidation.validate(value);

    return this.userService.create(value);
  }
}
