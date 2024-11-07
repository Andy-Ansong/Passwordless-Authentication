import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
const app = express();
import cors from 'cors';
import db from '@db/db';
import seedDatabaseService from '@services/seedDatabaseService';
import swagger from './swagger';
import CustomError from './utils/customError';
import errorController from './controllers/errorController';
import limiter from '@middleware/rateLimiter';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 3000;

app.use('/api', limiter);
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'amalitech',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production'
    },
  })
);

// Import your routers (update paths if needed)
import authRouter from '@routes/authRouter';
// import eventRouter from '@routes/eventRouter';
// import employeeRouter from '@routes/employeeRouter';
// import userRouter from '@routes/userRouter';
// import imageRouter from '@routes/imageRouter';

// Use your routers
app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/events', eventRouter);
// app.use('/api/v1/employees', employeeRouter);
// app.use('/api/v1/users', userRouter);
// app.use('/image', imageRouter);

app.use('/api-docs', swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.specs, { explorer: true }));

app.get('/', (req: Request, res: Response) => {
  res.send(`<a href="${req.protocol}://${req.get('host')}/api-docs">Swagger docs</a>`);
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new CustomError(`Can't find ${req.originalUrl} on server!`, 404);
  next(err);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  errorController(error, req, res, next);  // Correct call to your error handler
});

app.listen(port, () => {
  console.log(`Visit http://localhost:${port}/`);
});

export default app;
