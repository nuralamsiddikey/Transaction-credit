import mongoose from 'mongoose';
import Category from '../transaction/transaction.model.js';

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Fullname is required.'],
    },
    username: {
      type: String,
      required: [true, 'User name is required.'],
      unique: true,
      trim: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
