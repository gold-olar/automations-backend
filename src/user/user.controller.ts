import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizedRequest } from 'src/common/common.interface';
import { ApplyAccessCodeDTO } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  getUser(@Req() request: AuthorizedRequest) {
    const user = request.user;
    return this.userService.getUserById(user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/apply-code')
  applyAccessCode(
    @Req() request: AuthorizedRequest,
    @Body() payload: ApplyAccessCodeDTO,
  ) {
    const user = request.user;
    return this.userService.applyAccessCode(user.userId, payload.accessCode);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  createUser(@Req() request: AuthorizedRequest) {
    const user = request.user;
    return this.userService.createNewUser(user.userId, user.email);
  }
}
