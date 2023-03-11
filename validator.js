import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен содержать минимум 5 символов').isLength({
    min: 5,
  }),
  body('name', 'Имя должно содержать минимум 4 символа').isLength({
    min: 4,
  }),
];

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен содержать минимум 5 символов').isLength({
    min: 5,
  }),
];

export const productCreateValidation = [
  body('title', 'Введите название товара').isLength({ min: 3 }).isString(),
  body('price', 'Введите цену товара').isNumeric(),
  body('image', 'Введите название изображения').isString().isLength({ min: 5 }),
  body('count', 'Введите количество товара').isNumeric(),
];
