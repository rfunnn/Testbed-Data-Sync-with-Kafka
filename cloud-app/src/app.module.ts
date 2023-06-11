// app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MessageController } from './message/message.controller';
import { Message, MessageSchema } from './message/message.schema';
import { MessageService } from './message/message.service';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://arfan:1234@cluster0.gwemtwt.mongodb.net/cloudApp?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    KafkaModule, // <--- make sure to import KafkaModule here
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class AppModule {}
