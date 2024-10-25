// src/users/dto/create-user.dto.ts
import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { Role } from 'src/common/roles/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  @IsEnum(Role)
  role: Role;
}
