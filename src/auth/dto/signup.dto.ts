// src/auth/dto/signup.dto.ts
import { IsString, IsNotEmpty, IsEnum, IsEmail } from 'class-validator';
import { Role } from '../../common/roles/role.enum';


export class SignupDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(Role)
  role: Role; // Required role during signup
}
