import { HttpStatus, Injectable } from '@nestjs/common';

import UserListItemConverter from '../../../converter/UserListItemConverter';
import GetManyUserQueriesModel from '../../../domain/models/user/GetManyUserQueriesModel';
import UserService from '../../../domain/services/user/UserService';
import { GetManyUserQueriesValidation } from '../../../domain/validations/user/GetManyUserQueriesValidation';
import AbstractUseCase from '../AbstractUseCase';

@Injectable()
export default class GetManyUsersUseCase extends AbstractUseCase<GetManyUsersResponse> {
  private queryModel!: GetManyUserQueriesModel;

  constructor(
    private readonly userService: UserService,
    private readonly getManyValidation: GetManyUserQueriesValidation
  ) {
    super();
  }

  public setQueries(queries: GetManyUserQueries): void {
    this.getManyValidation.validate(queries);
    this.queryModel = new GetManyUserQueriesModel(queries);
  }

  protected async prepareResponse(): Promise<void> {
    const users = (await this.userService.getMany(this.queryModel)).map((user) =>
      new UserListItemConverter(user).convert()
    );
    this.setData({ users });
    this.setStatusCode(HttpStatus.OK);
  }
}
