import express from 'express';
import { AiAssistControllers } from './aiassist.controller';

const router = express.Router();

router.post('/', AiAssistControllers.createAiAssist);

export const AiAssistRoutes = router;
