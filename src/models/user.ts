import { Schema, model, Date } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  name: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
	password: {
		type:String,
		required: true
	},
	name: {
		type: String,
		required: true
	}
});

export const User = model<IUser>('User', userSchema);
