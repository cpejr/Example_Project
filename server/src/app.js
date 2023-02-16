import { fileURLToPath } from 'url';
import path from 'node:path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/errorHandler.js';
import corsOptions from './config/corsOptions.js';
import routes from './routes/index.js';
import { ERROR_CODES } from './errors/BaseErrors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDevEnvironment = process.env.NODE_ENV === 'development';

// Inicializando instância do servidor express
const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, '../../client/dist'))); // Não necessário para outros projetos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
if (isDevEnvironment) app.use(morgan('dev'));

// Principal routes
app.use('/api', (req, res) => {
  req.params;
});

// Auxiliary routes
app.use('/files', express.static(path.resolve(__dirname, '../temp/uploads')));
app.all('*', (req, res) => res.sendStatus(ERROR_CODES.NOT_FOUND));

// Needs to be after the routes
app.use(errorHandler);

// Serving Client Side
app.use(
  (req, res, next) =>
    res.sendFile(path.join(__dirname, '../../client/dist/index.html')) // Não necessário para outros projetos
);

export default app;
