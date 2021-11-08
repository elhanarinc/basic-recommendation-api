import dotenv from 'dotenv';

import startApplication from './app';
import logger from './utils/logger';

dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const port = process.env.PORT || 3000;

startApplication().then((app) => {
  app.listen(port, () => {
    logger.info(`Express server listening on port: ${port}`);
  });
});
