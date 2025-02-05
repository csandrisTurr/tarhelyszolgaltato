import { NextFunction, Response } from 'express';
import Request from '@/types/Request';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).send({ message: 'Please authenticate.' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).send({ message: 'Only admins can access this route.' });
    }

    next();
  } catch (error) {
    console.error('Error checking admin role:', error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};

export default isAdmin;
