import { Response } from 'express';
import Request from '@/types/Request';
import { User } from '@/db/User';
import * as bcrypt from 'bcrypt';
import { appDataSource } from '@/main';
import jwt from 'jsonwebtoken';
import { Subscription } from '@/db/Subscription';
import { UserRole } from '@/db/User';

export const login = async (req: Request, res: Response) => {
  try {
    if (!req.body || !req.body.email || !req.body.password)
      return res
        .status(400)
        .send({ message: 'Some of the required fields are missing' });

    const { email, password } = req.body;

    const user = await appDataSource.manager.findOne(User, { where: { email } });
    if (!user)
      return res.status(401).send({ message: 'Invalid username or password' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).send({ message: 'Invalid username or password' });

    const subscription = await appDataSource.manager.findOne(Subscription, { where: { user } });
    const hasSubscription = !!subscription;
    const admin = user.role == UserRole.ADMIN;

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, domain: user.domain },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );

    return res.status(200).send({ token, name: user.name, hasSubscription, admin });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};
