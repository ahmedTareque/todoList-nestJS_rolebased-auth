// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/users.schema';
import { SequenceModule } from 'src/sequence/sequence.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Ensure this matches your schema
    SequenceModule, // Add the SequenceModule here
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
