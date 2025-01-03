import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { API_Response } from 'src/utils/Api_Reponse';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async registeration(authDto: AuthDto) {
    const existingUser: User | undefined = await this.userModel.findOne({
      email: authDto.email,
    });
    if (existingUser) {
      throw new BadRequestException('Email is used before!');
    }
    const hashedPassword = bcrypt.hashSync(authDto.password, 10);
    const newUser = await this.userModel.create({
      ...authDto,
      password: hashedPassword,
    });
    return new API_Response<User>(
      'The account has been created successfully.',
      newUser,
    );
  }
  async loggingIn(authDto: AuthDto) {
    const findUser = await this.userModel.findOne({ email: authDto.email });
    if (!findUser || !bcrypt.compareSync(authDto.password, findUser.password)) {
      throw new NotFoundException(`Invalid email or password`);
    }
    const token = this.jwtService.sign({
      userId: findUser._id,
      userRole: findUser.role,
    });
    return {
      message: 'You have successfully logged in',
      token,
    };
  }
}
