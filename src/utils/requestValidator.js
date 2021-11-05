import { body, validationResult } from 'express-validator';

const userInfoValidateRequest = () => [
  body('firstName')
    .exists()
    .withMessage('First Name does not exists.')
    .notEmpty()
    .withMessage('First Name can not be empty.')
    .isString()
    .withMessage('First Name should be string'),
  body('address')
    .exists()
    .withMessage('Address does not exists.')
    .notEmpty()
    .withMessage('Address can not be empty.')
    .isString()
    .withMessage('Address should be string.'),
  body('children')
    .exists()
    .withMessage('Children does not exists.')
    .notEmpty()
    .withMessage('Children can not be empty.')
    .isString()
    .toLowerCase()
    .isIn(['yes', 'no'])
    .withMessage('Children can only be `Yes` or `No`.'),
  body('childrenNumber')
    .exists()
    .withMessage('Children Number does not exists.')
    .notEmpty()
    .withMessage('Children Number can not be empty.')
    .isInt()
    .withMessage('Children Number should be integer'),
  body('occupation')
    .exists()
    .withMessage('Occupation does not exists.')
    .notEmpty()
    .withMessage('Occupation can not be empty.')
    .isString()
    .withMessage('Occupation should be string.')
    .isIn(['Employed', 'Student', 'Self-employed'])
    .withMessage(
      'Occupation can only be `Employed`, `Student` or `Self-employed`'
    ),
  body('email')
    .exists()
    .withMessage('Email does not exists.')
    .notEmpty()
    .withMessage('Email can not be empty.')
    .isEmail()
    .withMessage('Not a valid email address.'),
];

const userInfoValidate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return next();
};

export { userInfoValidateRequest, userInfoValidate };
