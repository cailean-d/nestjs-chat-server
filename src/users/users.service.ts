import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel('users') private readonly usersModel: Model<User>) {}

  async create(user: CreateUserDto) {
    return await new this.usersModel(user).save();
  }

  async count() {
    return await this.usersModel.countDocuments({}).exec();
  }

  async getById(id: string) {
    return await this.usersModel.findById(id).exec();
  }

  async findAll() {
    return await this.usersModel.find({}).exec();
  }

  async update(id: string, user: CreateUserDto) {
    return await this.usersModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async delete(id: string) {
    return await this.usersModel.findByIdAndDelete(id).exec();
  }

}
