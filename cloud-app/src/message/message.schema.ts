import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Message {
  @Prop({ required: true })
  content: string;

  @Prop({
    default: () =>
      new Date(
        new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuching' }),
      ),
  })
  timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
