import { Response } from 'express';
import Request from '@/types/Request';
import { User } from '@/db/User';
import * as bcrypt from 'bcrypt';
import { appDataSource } from '@/main';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    if (!name || !password)
      return res
        .status(400)
        .send({ message: 'Some of the required fields are missing' });

    const user = await appDataSource.manager.findOne(User, { where: { name } });
    if (!user)
      return res.status(401).send({ message: 'Invalid username or password' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).send({ message: 'Invalid username or password' });

    const token = jwt.sign(
      { userId: user.id, name: user.name, role: user.role, domain: user.domain },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );

    return res.status(200).send({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};
