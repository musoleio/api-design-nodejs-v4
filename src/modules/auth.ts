import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export const createJWT = (user: User) => {
  const token = jwt.sign({
    id: user.id,
    username: user.username,
  }, process.env.JWT_SECRET as string);

  return token;
}

// authorisation middleware
export const authorise = (req, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.json({ message: 'Unauthorized' });
    return;
  }

  const [_, token] = bearer.split(' ');
  if (!token) {
    res.status(401);
    res.json({ message: 'Invalid token' });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string)
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    res.json({ message: 'Invalid token' });
    console.error(error);
  }
}

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
}