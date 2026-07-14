import { z } from 'zod';

const createMessageSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    subject: z.string().optional(),
    message: z.string().min(1, 'Message is required'),
    originalMessage: z.string().optional(),
  }),
});

const updateMessageSchema = z.object({
  body: z.object({
    isRead: z.boolean().optional(),
  }),
});

export const MessageValidation = {
  createMessageSchema,
  updateMessageSchema,
};
