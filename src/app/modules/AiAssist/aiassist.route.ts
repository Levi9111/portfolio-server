import express from 'express';
import { AiAssistControllers } from './aiassist.controller';

import { aiRateLimiter } from '../../middlewares/rateLimiter.middleware';

const router = express.Router();

router.post('/', aiRateLimiter, AiAssistControllers.createAiAssist);

export const AiAssistRoutes = router;
