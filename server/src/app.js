import { fileURLToPath } from 'url';
import path from 'node:path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import errorHandling from './utils/errorHandling.js';
import FilesRoutes from './routes/FilesRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializando instância do servidor express
const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(errorHandling);

// Routes
app.use('/files', FilesRoutes);
app.use('/files', express.static(path.resolve(__dirname, '../temp/uploads')));

// Serving Client Side
app.use((req, res, next) =>
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
);

export default app;
