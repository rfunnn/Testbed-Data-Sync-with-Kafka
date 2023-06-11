// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaService } from './kafka/kafka.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3006);

  const kafkaService = app.get(KafkaService);
  await kafkaService.connect();
  console.log('Kafka connected');
}
bootstrap();
