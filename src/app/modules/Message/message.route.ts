import express from 'express';
import { MessageControllers } from './message.controller';
import auth from '../../middlewares/auth.middleware';
import validateRequest from '../../utils/validateRequest';
import { MessageValidation } from './message.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(MessageValidation.createMessageSchema),
  MessageControllers.createMessage,
);

router.get('/', auth('ADMIN'), MessageControllers.getAllMessages);

router.get('/:id', auth('ADMIN'), MessageControllers.getSingleMessage);

router.patch(
  '/:id',
  auth('ADMIN'),
  validateRequest(MessageValidation.updateMessageSchema),
  MessageControllers.updateMessage,
);

router.delete('/:id', auth('ADMIN'), MessageControllers.deleteMessage);

export const MessageRoutes = router;
