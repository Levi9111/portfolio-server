import express from 'express';
import { ProjectControllers } from './project.controller';
import auth from '../../middlewares/auth.middleware';
import validateRequest from '../../utils/validateRequest';
import { ProjectValidation } from './project.validation';

const router = express.Router();

router.post(
  '/',
  auth('ADMIN'),
  validateRequest(ProjectValidation.createProjectSchema),
  ProjectControllers.createProject,
);

router.get('/', ProjectControllers.getAllProjects);

router.get('/:id', ProjectControllers.getSingleProject);

router.patch(
  '/:id',
  auth('ADMIN'),
  validateRequest(ProjectValidation.updateProjectSchema),
  ProjectControllers.updateProject,
);

router.delete('/:id', auth('ADMIN'), ProjectControllers.deleteProject);

export const ProjectRoutes = router;
