import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';

import { AuthorizedRequest } from 'src/common/common.interface';
import { ApplyAccessCodeDTO } from './dto/user.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly firebase: FirebaseService,
  ) {}

  @Get('/')
  async getUser(@Req() request) {
    const { status, tokenData } = await this.firebase.verifyToken(
      request.headers.authorization,
    );

    if (!status) {
      throw new HttpException('Invalid access token', HttpStatus.UNAUTHORIZED);
    }
    return this.userService.getUserById(tokenData?.uid, tokenData?.email);
  }

  @Post('/apply-code')
  async applyAccessCode(@Req() request, @Body() payload: ApplyAccessCodeDTO) {
    const { status, tokenData } = await this.firebase.verifyToken(
      request.headers.authorization,
    );

    if (!status) {
      throw new HttpException('Invalid access token', HttpStatus.UNAUTHORIZED);
    }
    return this.userService.applyAccessCode(tokenData?.uid, payload.accessCode);
  }

  @Post('/create')
  async createUser(@Req() request: AuthorizedRequest) {
    const { status, tokenData } = await this.firebase.verifyToken(
      request.headers.authorization,
    );

    if (!status) {
      throw new HttpException('Invalid access token', HttpStatus.UNAUTHORIZED);
    }

    return this.userService.createNewUser(tokenData?.uid, tokenData?.email);
  }
}
