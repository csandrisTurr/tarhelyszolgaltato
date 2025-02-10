import { Response } from 'express';
import Request from '@/types/Request';
import { User } from '@/db/User';
import * as bcrypt from 'bcrypt';
import { appDataSource } from '@/main';
import { emitWarning } from 'process';

export const register = async (req: Request, res: Response) => {
  try {
    if (!req.body || !req.body.name || req.body.email || !req.body.password || !req.body.domain) {
      return res.status(400).send({ message: 'Some of the required fields are missing' });
    }

    const { name, email, password, domain } = req.body;

    const existingUser = await appDataSource.manager.findOne(User, { where: { email } });
    if (existingUser)
      return res.status(400).send({ message: 'Name already in use' });

    const existingDomain = await appDataSource.manager.findOne(User, { where: { domain } });
    if (existingDomain)
      return res.status(400).send({ message: 'Domain already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.domain = domain;

    await appDataSource.manager.save(user);

    return res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};
