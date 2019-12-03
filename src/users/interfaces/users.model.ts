import { Document } from 'mongoose';

export interface User extends Document {
  nickname: string;
  email: string;
  password: string;
  avatar: string;
  gender: string;
  birthday: Date;
  phone: string;
  website: string;
  country: string;
  city: string;
  address: string;
  language: string[];
  favorite: number[];
  rooms: number[];
  deleted: boolean;
  online: string;
  active: boolean;
  date: Date;
}
