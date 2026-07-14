import QueryBuilder from '../../utils/QueryBuilder';
import { IMessage } from './message.interface';
import { MessageModel } from './message.model';
import { sendNotification } from '../../utils/sendNotification';

const createMessage = async (payload: IMessage) => {
  const result = await MessageModel.create(payload);

  // Trigger notification asynchronously (non-blocking)
  sendNotification({
    name: payload.name,
    email: payload.email,
    subject: payload.subject,
    message: payload.message,
    originalMessage: payload.originalMessage,
  });

  return result;
};

const getAllMessages = async (query: Record<string, unknown>) => {
  const searchableFields = ['name', 'email', 'subject', 'message'];
  const messageQuery = new QueryBuilder(MessageModel.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await messageQuery.modelQuery;
  const meta = await messageQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleMessage = async (id: string) => {
  const result = await MessageModel.findById(id);
  return result;
};

const updateMessage = async (id: string, payload: Partial<IMessage>) => {
  const result = await MessageModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteMessage = async (id: string) => {
  const result = await MessageModel.findByIdAndDelete(id);
  return result;
};

export const MessageService = {
  createMessage,
  getAllMessages,
  getSingleMessage,
  updateMessage,
  deleteMessage,
};
