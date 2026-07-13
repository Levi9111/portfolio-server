import { IAiAssist } from './aiassist.interface';

const createAiAssist = async (payload: IAiAssist) => {
  return payload;
};

const getAllAiAssists = async (_query: Record<string, unknown>) => {
  return [];
};

const getSingleAiAssist = async (_id: string) => {
  return null;
};

const updateAiAssist = async (_id: string, _payload: Partial<IAiAssist>) => {
  return null;
};

const deleteAiAssist = async (_id: string) => {
  return null;
};

export const AiAssistService = {
  createAiAssist,
  getAllAiAssists,
  getSingleAiAssist,
  updateAiAssist,
  deleteAiAssist,
};
