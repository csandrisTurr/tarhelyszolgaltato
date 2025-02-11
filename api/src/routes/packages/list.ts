import { Response } from 'express';
import Request from '@/types/Request';
import { Package } from '@/db/Package';
import { appDataSource } from '@/main';

export const listPackages = async (req: Request, res: Response) => {
  try {
    const packages = await appDataSource.manager.find(Package);
    res.send(packages);
  } catch (error) {
    console.error('Error listing packages:', error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};