import express from 'express';
import { ProfileControllers } from './profile.controller';
import auth from '../../middlewares/auth.middleware';
import validateRequest from '../../utils/validateRequest';
import { ProfileValidation } from './profile.validation';

const router = express.Router();

router.get('/', ProfileControllers.getSingleProfile);

router.put(
  '/',
  auth('ADMIN'),
  validateRequest(ProfileValidation.updateProfileSchema),
  ProfileControllers.updateProfile,
);

router.patch(
  '/',
  auth('ADMIN'),
  validateRequest(ProfileValidation.updateProfileSchema),
  ProfileControllers.updateProfile,
);

export const ProfileRoutes = router;
