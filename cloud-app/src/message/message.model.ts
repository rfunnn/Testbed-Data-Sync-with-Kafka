// src/message/message.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  message: string;

  @Prop({ default: () => new Date() })
  timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
