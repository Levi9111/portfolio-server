export interface IMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
