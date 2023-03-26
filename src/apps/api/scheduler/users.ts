import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  psw: String,
  exp: String,
  auth: String,
});

export const User = mongoose.model('users', userSchema);
