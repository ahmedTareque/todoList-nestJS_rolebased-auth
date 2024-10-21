// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from './roles/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('roles') roles: Role[] = [Role.User],
  ) {
    return this.authService.signUp(username, password, roles);
  }

  @Post('signin')
  async signIn(@Body('username') username: string, @Body('password') password: string) {
    const user = await this.authService.validateUser(username, password);
    if (user) {
      return this.authService.login(user);
    }
    return { message: 'Invalid credentials' };
  }
}
