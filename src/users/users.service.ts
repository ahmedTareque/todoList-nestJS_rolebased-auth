import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SequenceService } from 'src/sequence/sequence.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly sequenceService: SequenceService, // Inject SequenceService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userId = await this.sequenceService.getNextSequence('userId'); // Get the next userId
    console.log("createUserDto ==== ", createUserDto)
    debugger;
    const newUser = new this.userModel({
      ...createUserDto,
      userId, // Set the incremented userId
    });
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(userId: number): Promise<User | null> {
    return this.userModel.findOne({ userId }).exec();
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { userId },
      updateUserDto,
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return updatedUser;
  }

  async delete(userId: number): Promise<void> {
    const result = await this.userModel.findOneAndDelete({ userId }).exec();
    if (!result) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }
  
  async deleteAllUser(): Promise<{ deletedCount: number }> {
    const result = await this.userModel.deleteMany({}).exec();
    return { deletedCount: result.deletedCount || 0 };
  }
}

