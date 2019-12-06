import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  BeforeInsert,
  ObjectID,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

@Entity('User')
export class UserEntity {

  @ObjectIdColumn()
  @Transform((id: ObjectID) => id.toHexString(), { toPlainOnly: true })
  id: ObjectID;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
}
