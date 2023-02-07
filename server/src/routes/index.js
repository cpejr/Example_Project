import express from 'express';
import UsersRoutes from './UsersRoutes/UsersRoutes.js';
import FilesRoutes from './FilesRoutes/FilesRoutes.js';
import SessionsRoutes from './SessionsRoutes/SessionsRoutes.js';

const routes = express.Router();

routes.use('/users', UsersRoutes);
routes.use('/files', FilesRoutes);
routes.use('/', SessionsRoutes);

export default routes;
