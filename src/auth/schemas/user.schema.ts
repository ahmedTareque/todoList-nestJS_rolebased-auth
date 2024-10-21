// src/auth/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], enum: ['user', 'admin', 'super-admin'], default: ['user'] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
