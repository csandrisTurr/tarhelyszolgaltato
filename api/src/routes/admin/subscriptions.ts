import { Response } from 'express';
import Request from '@/types/Request';
import { Subscription } from '@/db/Subscription';
import { appDataSource } from '@/main';

export const listSubscriptions = async (req: Request, res: Response) => {
  try {
    if (!req.query['page'] || !req.query['limit'])
      return res.status(400).send({ message: 'Some of the required fields are missing' });

    let page: number, limit: number;
    page = parseInt(req.query['page'] as string);
    limit = parseInt(req.query['limit'] as string);

    const offset = (page - 1) * limit;

    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).send({ message: 'Only admins can access this route' });
    }

    const subscriptions = await appDataSource.manager.find(Subscription, {
      relations: ['user', 'package'],
      take: limit,
      skip: offset,
    });

    return res.status(200).send(subscriptions);
  } catch (error) {
    console.error('Error listing subscriptions:', error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};