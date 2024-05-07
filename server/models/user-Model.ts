import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  role: string;
  password: string;
  profile: string;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
  },
  password: {
    type: String,
  },
  profile: {
    type: String,
  },
}, {
  timestamps: true,
});

const User = model<IUser>('users', userSchema);
export default User;
