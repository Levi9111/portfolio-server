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

let totalAiRequestsToday = 0;
let currentAiDay = new Date().toDateString();

const createAiAssist = catchAsync(async (req: Request, res: Response) => {
  const today = new Date().toDateString();
  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const origin = req.headers.origin || 'No Origin Header';

  console.log(`[AI Assist Request] IP: ${clientIp}, Origin: ${origin}, Time: ${new Date().toISOString()}`);

  if (today !== currentAiDay) {
    console.log(`[AI Assist] Day rolled over from ${currentAiDay} to ${today}. Resetting request count from ${totalAiRequestsToday} to 0.`);
    currentAiDay = today;
    totalAiRequestsToday = 0;
  }

  console.log(`[AI Assist] Current daily AI request count: ${totalAiRequestsToday}/400`);

  if (totalAiRequestsToday >= 400) {
    console.warn(`[AI Assist] Global limit reached (400 requests). Blocking request.`);
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      error: 'Daily global AI usage limit reached. Please try again tomorrow.',
    });
  }

  const { userMessage, mode } = req.body;
  console.log(`[AI Assist] Request body: { mode: "${mode}", userMessageLength: ${userMessage ? userMessage.length : 0} }`);

  if (!userMessage || !mode) {
    console.warn(`[AI Assist] Missing userMessage or mode in request.`);
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Both userMessage and mode are required in request body.',
    });
  }

  const modeLower = String(mode).toLowerCase();
  const modeInstruction = modeInstructions[modeLower];
  if (!modeInstruction) {
    console.warn(`[AI Assist] Invalid mode requested: "${modeLower}"`);
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `Invalid mode. Allowed modes are: ${Object.keys(modeInstructions).join(', ')}`,
    });
  }

  const freelancerProfile =
    config.freelancer_profile || 'Freelancer portfolio profile';

  const prompt = `This is the freelancer's profile: ${freelancerProfile}. The client wrote this: ${userMessage}. Rewrite the client's message using this style: ${modeInstruction}. Return only the rewritten text, nothing else.`;

  console.log(`[AI Assist] Checking GEMINI_API_KEY...`);
  if (!config.gemini_api_key) {
    console.error(`[AI Assist Error] GEMINI_API_KEY is not defined in config/env variables.`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'GEMINI_API_KEY is not configured on the server.',
    });
  }
  console.log(`[AI Assist] GEMINI_API_KEY is present (length: ${config.gemini_api_key.length}). Initializing SDK...`);

  try {
    const ai = new GoogleGenAI({ apiKey: config.gemini_api_key });
    console.log(`[AI Assist] Calling Google GenAI model: gemini-3.1-flash-lite...`);
    const start = Date.now();
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: prompt,
    });
    const duration = Date.now() - start;
    console.log(`[AI Assist] Google GenAI call succeeded in ${duration}ms.`);

    const rewrittenText = response.text || '';
    console.log(`[AI Assist] Received text response length: ${rewrittenText.length}`);

    totalAiRequestsToday++;

    return res.status(StatusCodes.OK).json({
      success: true,
      improvedText: rewrittenText.trim(),
    });
  } catch (error) {
    console.error(`[AI Assist Exception] Error calling Gemini API:`, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error calling Gemini API',
    });
  }
});

export const AiAssistControllers = {
  createAiAssist,
};
