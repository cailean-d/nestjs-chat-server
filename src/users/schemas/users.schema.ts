import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique : 'email already exists' },
  password: { type: String, required: true },
  avatar: { type: String, default: '/assets/images/default-user.png' },
  gender: { type: String, default: null },
  birthday: { type: Date, default: null },
  phone: { type: String, default: null },
  website: { type: String, default: null },
  country: { type: String, default: null },
  city: { type: String, default: null },
  address: { type: String, default: null },
  language: { type: Array, default: null },
  favorite: { type: Array, default: null },
  rooms: { type: Array,  default: null },
  deleted: { type: Boolean, default: false },
  online: { type: String, default: null },
  active: { type: Boolean, default: false },
  date: { type: Date, required: true, default: Date.now },
});
