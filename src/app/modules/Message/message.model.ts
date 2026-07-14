import { Schema, model } from 'mongoose';
import { IMessage } from './message.interface';

const messageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, trim: true },
    message: { type: String, required: true },
    originalMessage: { type: String, trim: true },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const MessageModel = model<IMessage>('Message', messageSchema);
