// kafka.service.ts

import { Injectable } from '@nestjs/common';
import { Kafka, Producer, Consumer, KafkaMessage } from 'kafkajs';

@Injectable()
export class KafkaService {
  private producer: Producer;
  private consumer: Consumer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'local-app',
      brokers: ['192.168.0.157:9092'],
    });
    this.producer = kafka.producer();
    this.consumer = kafka.consumer({ groupId: 'local-group' });
  }

  async connect(): Promise<void> {
    await this.producer.connect();
    await this.consumer.connect();
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  async send(topic: string, message: string): Promise<void> {
    await this.producer.send({
      topic,
      messages: [{ value: message }],
    });
  }

  async subscribe(
    topic: string,
    callback: (message: KafkaMessage) => Promise<void>,
  ): Promise<void> {
    await this.consumer.subscribe({ topic });
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(
          `Received message from Kafka topic ${topic}, partition ${partition}, offset ${message.offset}: ${message.value}`,
        );
        await callback(message);
      },
    });
  }
}
