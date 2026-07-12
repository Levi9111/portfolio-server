import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProfileService } from './profile.service';

const createProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.createProfile(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Profile created successfully',
    data: result,
  });
});

const getAllProfiles = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getAllProfiles();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profiles retrieved successfully',
    data: result,
  });
});

const getSingleProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getSingleProfile();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.updateProfile(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const deleteProfile = catchAsync(async (req: Request, res: Response) => {
  await ProfileService.deleteProfile(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile deleted successfully',
    data: null,
  });
});

export const ProfileControllers = {
  createProfile,
  getAllProfiles,
  getSingleProfile,
  updateProfile,
  deleteProfile,
};
