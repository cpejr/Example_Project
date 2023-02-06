import { Router } from 'express';
import * as SessionsController from '../../controllers/SessionsController.js';

const SessionssRouter = Router();
SessionssRouter.post('/login', SessionsController.handleLogin);
SessionssRouter.post('/logout', SessionsController.handleLogout);
SessionssRouter.get('/refresh', SessionsController.handleRefreshToken);

export default SessionssRouter;
