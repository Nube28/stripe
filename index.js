import express from 'express';
import cors from 'cors';
import { globalErrorHandler, AppError } from './utils/appError.js';
import morgan from 'morgan';
import * as db from './config/db.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { router as paymentRouter } from './routes/paymentRoutes.js';


const app = express();

db.conectar();

app.use(express.json());
app.use(morgan('combined'));

app.use(cors());

app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//expongo todo lo que esta en la carpeta public
app.use(express.static(path.join(__dirname, '/public')));

//expongo todo el router, osea los metodos mediante esta api jijij
app.use('/api/payments', paymentRouter);

app.use((req, res, next) => {
  const error = new AppError(`No se pudo acceder a: ${req.originalUrl} en el servidor.`, 404);
  next(error);
})

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));
