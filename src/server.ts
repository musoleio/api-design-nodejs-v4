import express from 'express';
import morgan from 'morgan';
import { createUser, signIn } from './handlers/user';
import { authorise } from './modules/auth';
import router from './router'
import { body } from 'express-validator';
import cors from 'cors';
import { handleInputErrors } from './modules/middleware';

const app = express();

app.use(cors())
app.use('/api', morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', authorise, router);

app.post(
  '/user',
  body('username').exists().isString().notEmpty(),
  body('password').exists().isString().notEmpty().isLength({ min: 8 }),
  handleInputErrors,
  createUser
);

app.post(
  '/signin',
  body('username').exists().isString().notEmpty(),
  body('password').exists().isString().notEmpty().isLength({ min: 8 }),
  signIn
);

app.use((err, req, res, next) => {

})


export default app;

