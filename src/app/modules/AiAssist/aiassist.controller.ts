import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { GoogleGenAI } from '@google/genai';
import config from '../../config';

const modeInstructions: Record<string, string> = {
  enhance:
    'Make this message more professional, clear, and grammatically perfect.',
  shorten: 'Make this message very short and concise. Remove all fluff.',
  lengthen: 'Expand this message into a detailed, thoughtful inquiry.',
  casual: 'Rewrite this in a friendly, relaxed, and conversational tone.',
  formal:
    'Rewrite this in a strict, business-formal tone with official language.',
  'generate-subject':
    'Generate a concise, professional email subject line (under 6 words) based on the message content. Return only the subject line text, nothing else (no quotes, no prefixes).',
};

const createAiAssist = catchAsync(async (req: Request, res: Response) => {
  const { userMessage, mode } = req.body;

  if (!userMessage || !mode) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Both userMessage and mode are required in request body.',
    });
  }

  const modeLower = String(mode).toLowerCase();
  const modeInstruction = modeInstructions[modeLower];
  if (!modeInstruction) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `Invalid mode. Allowed modes are: ${Object.keys(modeInstructions).join(', ')}`,
    });
  }

  const freelancerProfile =
    config.freelancer_profile || 'Freelancer portfolio profile';

  const prompt = `This is the freelancer's profile: ${freelancerProfile}. The client wrote this: ${userMessage}. Rewrite the client's message using this style: ${modeInstruction}. Return only the rewritten text, nothing else.`;

  if (!config.gemini_api_key) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'GEMINI_API_KEY is not configured on the server.',
    });
  }

  const ai = new GoogleGenAI({ apiKey: config.gemini_api_key });

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-lite',
    contents: prompt,
  });

  const rewrittenText = response.text || '';

  return res.status(StatusCodes.OK).json({
    success: true,
    improvedText: rewrittenText.trim(),
  });
});

export const AiAssistControllers = {
  createAiAssist,
};
