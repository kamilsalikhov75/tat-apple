import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен содержать минимум 5 символов').isLength({
    min: 5,
  }),
  body('firstName', 'Имя должно содержать минимум 3 символа').isLength({
    min: 3,
  }),
  body('lastName', 'Фамилия должно содержать минимум 3 символа').isLength({
    min: 3,
  }),
  body('phone', 'Номер телефона неверный').isLength({
    min: 3,
  }),
];

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен содержать минимум 5 символов').isLength({
    min: 5,
  }),
];
