// message.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KafkaService } from '../kafka/kafka.service';
import { Message, MessageDocument } from './message.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private kafkaService: KafkaService,
  ) {
    this.kafkaService
      .subscribe('my-topic', (message) => this.handleMessage(message))
      .catch((err) =>
        console.error(`Error subscribing to Kafka topic: ${err.message}`),
      );
  }

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = new this.messageModel(createMessageDto);
    const savedMessage = await message.save();

    try {
      await this.kafkaService.send('my-topic', JSON.stringify(savedMessage));
    } catch (e) {
      console.error(`Error sending message to Kafka: ${e.message}`);

      // Attempt to reconnect the producer and resend the message
      try {
        console.log('Attempting to reconnect Kafka producer...');
        await this.kafkaService.connect();
        console.log('Kafka producer reconnected, retrying message send...');
        await this.kafkaService.send('my-topic', JSON.stringify(savedMessage));
      } catch (err) {
        console.error(`Error resending message to Kafka: ${err.message}`);
      }
    }

    return savedMessage;
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async handleMessage(message: any): Promise<void> {
    try {
      const parsedMessage = JSON.parse(message.value.toString());
      const messageModel = new this.messageModel(parsedMessage);
      await messageModel.save();
      console.log(`Saved message from Kafka: ${JSON.stringify(parsedMessage)}`);
    } catch (err) {
      console.error(`Error processing message from Kafka: ${err.message}`);
    }
  }
}
