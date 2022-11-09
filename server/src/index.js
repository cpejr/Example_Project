import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

// Inicializando instância do servidor express
const port = process.env.PORT || 4000;
const app = express();
app.listen(port, () => console.log(`Server started at port ${port}`));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {});
