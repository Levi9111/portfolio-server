import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ProjectRoutes } from '../modules/Project/project.route';
import { MessageRoutes } from '../modules/Message/message.route';
import { ProfileRoutes } from '../modules/Profile/profile.route';
// --- INJECT IMPORTS HERE ---

const router = Router();

const moduleRoutes = [
  { path: '/auth', route: AuthRoutes },
  { path: '/projects', route: ProjectRoutes },
  { path: '/messages', route: MessageRoutes },
  { path: '/profiles', route: ProfileRoutes },
  // --- INJECT ROUTES HERE ---
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
