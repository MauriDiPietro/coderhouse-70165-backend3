import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { RequestUser } from './types/user';
import { UsersGuard } from './users.guard';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    // return await this.usersService.register(createUserDto)
    try {
      const response = await this.usersService.register(createUserDto);
      res.status(HttpStatus.CREATED).json(response);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  }

  @Post('/login')
  async login(@Body() user: LoginUserDto, @Res() res: Response): Promise<void> {
    try {
      const response = await this.usersService.login(user);
      res
        .status(HttpStatus.OK)
        .cookie('token', response, { httpOnly: true })
        .json({ response: 'Login OK', token: response });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  }

  @Get('/profile')
  @UseGuards(UsersGuard)
  profile(@Request() req: RequestUser){
    return this.usersService.profile(req)
  }
}
