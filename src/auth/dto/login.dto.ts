// src/auth/dto/login.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsEmail } from 'class-validator';
import { Role } from '../../common/roles/role.enum';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsOptional()
  email?: string; // Optional

  @IsOptional()
  @IsEnum(Role)
  role?: Role; // Optional
}
