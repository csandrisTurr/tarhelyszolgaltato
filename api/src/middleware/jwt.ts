// src/middleware/auth.ts
import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import Request from '@/types/Request';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).send({ message: 'Please authenticate.' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).send({ message: 'Please authenticate.' });
  }
};

export default authenticate;
