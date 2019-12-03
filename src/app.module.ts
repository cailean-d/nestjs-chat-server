import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/nestjs_chat_app',
      { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
