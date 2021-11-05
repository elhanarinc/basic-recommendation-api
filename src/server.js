import dotenv from 'dotenv';

import app from './app';
import startDatabase from './db';
import logger from './utils/logger';

dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const port = process.env.PORT || 4000;

startDatabase(() => {
  app.listen(port, () => {
    logger.info(`Express server listening on port: ${port}`);
  });
});
