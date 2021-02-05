import { HttpStatus, Injectable } from '@nestjs/common';

import UserService from '../../../domain/services/user/UserService';
import CreateUserValidation from '../../../domain/validations/user/CreateUserValidation';
import AbstractUseCase from '../AbstractUseCase';

@Injectable()
export default class CreateUserUseCase extends AbstractUseCase<CreateUserResponse> {
  private input!: CreateUserInput;

  constructor(
    private readonly userService: UserService,
    private readonly createUserValidation: CreateUserValidation
  ) {
    super();
  }

  public setInput(value: CreateUserInput): void {
    this.createUserValidation.validate(value);
    this.input = value;
  }

  public getInput(): CreateUserInput {
    return this.input;
  }

  protected async prepareResponse(): Promise<void> {
    const createdUser = await this.userService.create(this.getInput());
    this.setData({ user: createdUser });
    this.setStatusCode(HttpStatus.CREATED);
  }
}
