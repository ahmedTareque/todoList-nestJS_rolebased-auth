// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/schemas/users.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { username, password, email, role } = signupDto;

    const user = new this.userModel({ username, password, email, roles: [role] });
    await user.save();

    return { message: 'User registered successfully' };
  }

  async login(loginDto: LoginDto) {
    const { username, password, email } = loginDto;

    const user = await this.userModel.findOne({
      $or: [{ username }, { email }],
      password,
    });

    if (!user) throw new Error('Invalid credentials');

    const payload = { username: user.username, email: user.email, roles: user.roles };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
