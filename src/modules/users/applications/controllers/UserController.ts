import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import RenderService from '../../../render/RenderService';

const USER_VIEW_ROOT_PATH = 'user';

@Controller(USER_VIEW_ROOT_PATH)
export default class UserController {
  constructor(private readonly renderService: RenderService) {}

  @Get()
  public getMany(@Req() req: Request, @Res() res: Response) {
    return this.renderService.render(req, res);
  }
}
