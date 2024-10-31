import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { Role } from 'src/common/roles/role.enum';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
