import { Response } from 'express';
import Request from '@/types/Request';
import { User } from '@/db/User';
import { Subscription } from '@/db/Subscription';
import { Package } from '@/db/Package';
import { appDataSource, mailTransport } from '@/main';
import { v4 as uuidv4 } from 'uuid';
import * as ejs from 'ejs';

export const subscribe = async (req: Request, res: Response) => {
  try {
    const { packageId, userId } = req.body;

    if (!packageId || !userId) {
      return res
        .status(400)
        .send({ message: 'Package ID and User ID are required' });
    }

    const user = await appDataSource.manager.findOne(User, {
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const existingSubscription = appDataSource.manager.findOne(Subscription, {
      where: { user },
    });
    if (existingSubscription) {
      return res
        .status(400)
        .send({ message: 'You already have a subscription' });
    }

    const packageEntity = await appDataSource.manager.findOne(Package, {
      where: { id: packageId },
    });
    if (!packageEntity) {
      return res.status(404).send({ message: 'Package not found' });
    }

    const databaseName = user.domain;
    const databaseUser = user.domain;
    const databasePassword = uuidv4();

    const queryRunner = appDataSource.createQueryRunner();
    await queryRunner.query(`CREATE DATABASE ${databaseName}`);
    await queryRunner.query(
      `CREATE USER '${databaseUser}'@'%' IDENTIFIED BY '${databasePassword}'`
    );
    await queryRunner.query(
      `GRANT ALL PRIVILEGES ON ${databaseName}.* TO '${databaseUser}'@'%'`
    );

    const subscription = new Subscription();
    subscription.user = user;
    subscription.package = packageEntity;
    subscription.date = new Date();

    await appDataSource.manager.save(subscription);

  ejs.renderFile("templates/subscription.ejs", { content: { database: databaseName, username: databaseUser, password: databasePassword } }, (error, str) => {
    if (error) {
      console.error(error)
    }

    const info = mailTransport.sendMail({
      from: '"Turr" <vicces@turr.hu>', // sender address
      to: "myron78@ethereal.email", // list of receivers
      subject: "szia leszel a baratom", // Subject line
      html: str,
    });
  })

    return res
      .status(201)
      .send({ message: 'Subscription created successfully' });
  } catch (error) {
    console.error('Error subscribing user:', error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};
