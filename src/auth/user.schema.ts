import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRoles } from 'src/utils/UserRoles.enum';

export type UserDocument = HydratedDocument<User>;
@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: [true, 'Email is Required'],
    unique: [true, 'Email is must be unique'],
  })
  email: string;

  @Prop({
    required: [true, 'Password is required'],
  })
  password: string;

  @Prop({
    default: 'user',
  })
  role: UserRoles;
}
export const userSchema = SchemaFactory.createForClass(User);
