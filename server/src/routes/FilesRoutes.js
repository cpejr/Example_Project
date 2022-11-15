import { Router } from 'express';
import multer from 'multer';
import { multerConfig, multerFileName } from '../config/multer.js';
import * as FilesController from '../controllers/FilesContoller.js';

const FilesRoutes = Router();
FilesRoutes.get('/', FilesController.getAll);
FilesRoutes.post(
  '/',
  multer(multerConfig).single(multerFileName),
  FilesController.create
);
FilesRoutes.delete('/', FilesController.deleteAll);
FilesRoutes.delete('/:id', FilesController.deleteById);

export default FilesRoutes;
