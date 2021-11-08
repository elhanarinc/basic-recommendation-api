import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

import logger from './utils/logger';
import userRouter from './routes/userinfo.route';
import startDatabase from './db';

const startApplication = () =>
  new Promise((resolve) => {
    startDatabase(() => {
      const app = express();

      app.use(cors());
      app.use(morgan('combined'));
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use(cookieParser());

      app.get('/healthcheck', (req, res) => {
        res.status(200).json({ status: 'OK' });
      });

      app.use('/recommendations', userRouter);

      // error handler
      app.use((error, req, res, next) => {
        logger.error(`Error handler: ${JSON.stringify(error)}`);
        return res.status(400).json(error);
      });

      resolve(app);
    });
  });

export default startApplication;
