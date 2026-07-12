import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MessageService } from './message.service';

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.createMessage(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Message created successfully',
    data: result,
  });
});

const getAllMessages = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.getAllMessages(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Messages retrieved successfully',
    data: result,
  });
});

const getSingleMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.getSingleMessage(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Message retrieved successfully',
    data: result,
  });
});

const updateMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.updateMessage(req.params.id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Message updated successfully',
    data: result,
  });
});

const deleteMessage = catchAsync(async (req: Request, res: Response) => {
  await MessageService.deleteMessage(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Message deleted successfully',
    data: null,
  });
});

export const MessageControllers = {
  createMessage,
  getAllMessages,
  getSingleMessage,
  updateMessage,
  deleteMessage,
};
