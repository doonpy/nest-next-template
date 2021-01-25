import { HttpStatus, Injectable } from '@nestjs/common';

import GetManyUserQueriesModel from '../../../domain/models/user/GetManyUserQueriesModel';
import UserService from '../../../domain/services/user/UserService';
import { GetManyUserQueriesValidation } from '../../../domain/validations/user/GetManyUserQueriesValidation';
import GetManyUserPresenter from '../../../presentation/user/GetManyUserPresenter';

@Injectable()
export default class GetManyUsersUseCase {
  private queryModel!: GetManyUserQueriesModel;

  constructor(
    private readonly userService: UserService,
    private readonly getManyValidation: GetManyUserQueriesValidation
  ) {}

  public setQueries(queries: GetManyUserQueries): void {
    this.getManyValidation.validate(queries);
    this.queryModel = new GetManyUserQueriesModel(queries);
  }

  public async execute(): Promise<GetManyUsers> {
    const users = await this.userService.getMany(this.queryModel);
    const presenter = new GetManyUserPresenter(users);
    presenter.setStatusCode(HttpStatus.OK);

    return presenter.getPresent();
  }
}
