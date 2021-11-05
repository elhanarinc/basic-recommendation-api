import mongoose from 'mongoose';
import dotenv from 'dotenv';

import logger from './utils/logger';

dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const DB_CONNECTION_STRING = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_CONNECTION_PATH}`;

const startDb = async (next) => {
  try {
    await mongoose.connect(DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info({ message: 'Mongoose Connected...' });
    next();
  } catch (error) {
    logger.error(`Mongoose Error: ${JSON.stringify(error)}`);
  }
};

export default startDb;
