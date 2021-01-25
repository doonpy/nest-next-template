import { Controller, Get, Render } from '@nestjs/common';

import { USER_VIEW_ROOT_PATH, UserTemplates, UserViewPaths } from './constants';

@Controller(USER_VIEW_ROOT_PATH)
export default class UserView {
  @Get()
  @Render(USER_VIEW_ROOT_PATH)
  public getMany(): void {
    return;
  }

  @Get(UserViewPaths.CREATE)
  @Render(UserTemplates.CREATE)
  public getCreate(): void {
    return;
  }
}
