// message.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.schema';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    const savedMessage = await this.messageService.create(createMessageDto);
    return savedMessage;
  }

  @Get()
  async findAll(): Promise<Message[]> {
    const messages = await this.messageService.findAll();
    return messages;
  }
}
