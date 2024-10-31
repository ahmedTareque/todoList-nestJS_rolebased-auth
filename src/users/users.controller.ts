import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':userId')
  async getUserById(@Param('userId', ParseIntPipe) userId: number): Promise<User> {
    return this.usersService.findById(userId);
  }

  @Put(':userId')
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number): Promise<void> {
    return this.usersService.delete(userId);
  }

  @Delete()
  async deleteAllUser(): Promise<{deletedCount: number}> {
    return this.usersService.deleteAllUser();
  }
}
