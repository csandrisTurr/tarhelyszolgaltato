import { Response } from 'express';
import Request from '@/types/Request';
import { Subscription } from '@/db/Subscription';
import { appDataSource } from '@/main';

export const getActiveSubscription = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;

    const subscription = await appDataSource.manager.findOne(Subscription, {
      where: { user: { id: userId } },
      relations: ['package'],
    });

    if (!subscription) {
      return res.status(404).send({ message: 'No active subscription found' });
    }

    return res.status(200).send(subscription);
  } catch (error) {
    console.error('Error getting active subscription:', error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};
