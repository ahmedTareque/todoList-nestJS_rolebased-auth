import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/schemas/users.schema';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestJS_todoList_mongoDB_auth'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule, UsersModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
