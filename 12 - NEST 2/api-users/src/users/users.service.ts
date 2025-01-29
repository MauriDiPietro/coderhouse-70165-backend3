import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { createHash, isValidPassword } from './utils/utils';
import { LoginUserDto } from './dto/login-user.dto';
import { RequestUser } from './types/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private JwtService: JwtService,
  ) {}

  async getByEmail(email: string): Promise<UserDocument | null> {
    try {
      return await this.UserModel.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  }

  async register(user: CreateUserDto): Promise<UserDocument | null> {
    try {
      const { email, password } = user;
      const existUser = await this.getByEmail(email);
      if (existUser) throw new BadRequestException('User already registered');
      return await this.UserModel.create({
        ...user,
        password: createHash(password),
      });
    } catch (error) {
      throw error;
    }
  }

  generateToken(user: UserDocument) {
    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    };
    return this.JwtService.sign(payload);
  }

  async login(user: LoginUserDto) {
    try {
      const { email, password } = user;
      const existUser = await this.getByEmail(email);
      if (!existUser) throw new ForbiddenException('Invalid credentials');
      const passValid = isValidPassword(password, existUser.password);
      if (!passValid) throw new ForbiddenException('Invalid credentials');
      return this.generateToken(existUser);
    } catch (error) {
      throw error;
    }
  }

  profile(req: RequestUser) {
    try {
      return req.user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
