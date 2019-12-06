import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';

import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async create(user: CreateUserDto) {
    const createdUser = this.userRepository.create(user);
    await this.userRepository.save(createdUser);
    return createdUser;
  }

  async count() {
    return await this.userRepository.count();
  }

  async getById(id: string | ObjectID) {
    return await this.userRepository.findOne(id);
  }

  async getOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findAll() {
    return await this.userRepository.find({});
  }

  async update(id: string, user: UpdateUserDto) {
    await this.userRepository.update(id, user);
    return await this.userRepository.findOne(id);
  }

  async delete(id: string) {
    const deletedUser = await this.userRepository.findOne(id);
    await this.userRepository.delete(id);
    return deletedUser;
  }
}
