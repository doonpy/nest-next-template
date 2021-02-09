import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import RenderService from '../../../infrastructure/modules/render/RenderService';
import { USER_VIEW_ROOT_PATH } from './constants';

@Controller(USER_VIEW_ROOT_PATH)
export default class UserView {
  constructor(private readonly renderService: RenderService) {}

  @Get()
  public getMany(@Req() req: Request, @Res() res: Response) {
    return this.renderService.render(req, res);
  }
}
