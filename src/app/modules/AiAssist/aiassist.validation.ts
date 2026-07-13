import { z } from 'zod';

const createAiAssistSchema = z.object({
  body: z.object({
    // TODO: Define fields
    // name: z.string().min(1, 'Name is required'),
  }),
});

const updateAiAssistSchema = z.object({
  body: z.object({
    // TODO: Define update fields (all optional)
  }),
});

export const AiAssistValidation = {
  createAiAssistSchema,
  updateAiAssistSchema,
};
