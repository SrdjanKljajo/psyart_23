import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { code } = signUpDto;

    const user = await this.userModel.create({ code });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDto: SignUpDto): Promise<{ token: string }> {
    const { code } = loginDto;

    const user = await this.userModel.findOne({ code });

    if (!user) {
      throw new UnauthorizedException('Invalid access code');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}
