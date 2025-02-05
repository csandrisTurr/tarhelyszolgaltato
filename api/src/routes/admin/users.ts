import { Response, Request } from 'express';
import { User } from '@/db/User';
import { appDataSource } from '@/main';

export const users = async (req: Request, res: Response) => {
  try {
    if (!req.query['page'] || !req.query['limit'])
      return res.status(400).send({ message: 'Some of the required fields are missing' });

    let page: number, limit: number;
    page = parseInt(req.query['page'] as string);
    limit = parseInt(req.query['limit'] as string);

    const offset = (page - 1) * limit;

    const users = await appDataSource.manager.find(User, {
      relations: ['subscription'],
      take: limit,
      skip: offset,
    });

    res.send(users);
  } catch (error) {
    console.error('Error listing users:', error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};
