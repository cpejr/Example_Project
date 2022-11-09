import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializando instância do servidor express
const port = process.env.PORT || 4000;
const app = express();
app.listen(port, () => console.log(`Server started at port ${port}`));

// Middlewares
app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use((req, res, next) =>
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
);

// Routes
app.get('/', (req, res) => res.status(200).json({ message: 'Hello World!' }));
