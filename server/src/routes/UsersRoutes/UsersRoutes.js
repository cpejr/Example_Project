import { Router } from 'express';
import * as UserController from '../../controllers/UsersController.js';

const UsersRoutes = Router();
// UsersRoutes.get('/', FilesController.getAll);
UsersRoutes.post('/', UserController.create);
// UsersRoutes.delete('/', FilesController.deleteAll);
// UsersRoutes.delete('/:id', FilesController.deleteById);

export default UsersRoutes;
