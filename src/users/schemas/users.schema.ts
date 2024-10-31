import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/common/roles/role.enum';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true }) // Ensure emails are unique
  email: string;

  @Prop({ type: [String], enum: Role, default: [Role.User] })
  roles: string[];
  
  @Prop({ unique: true }) // This will ensure userId is unique
  userId: number; // New field for the custom auto-incremented ID
}

export const UserSchema = SchemaFactory.createForClass(User);
