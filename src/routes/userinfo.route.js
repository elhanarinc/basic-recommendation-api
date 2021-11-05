import express from 'express';

import logger from '../utils/logger';
import updateUserInfoController from '../controllers/userinfo.controller';
import {
  userInfoValidateRequest,
  userInfoValidate,
} from '../utils/requestValidator';

const router = express.Router();

const allowedMethods = ['POST'];

router.use((req, res, next) => {
  if (!allowedMethods.includes(req.method)) {
    logger.error(`Method Not Allowed: ${req.method}`);
    res.writeHead(405, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': allowedMethods,
    });
    res.write('Method Not Allowed.');
    return res.end();
  }
  return next();
});

router.post(
  '/',
  userInfoValidateRequest(),
  userInfoValidate,
  updateUserInfoController
);

export default router;
