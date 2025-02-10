import express, { Express, Request, Response, application, json } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '@/db/User';
import { Subscription } from '@/db/Subscription';
import { Package } from '@/db/Package';
import { register } from '@/routes/auth/register';
import Req from '@/types/Request';
import ProcessEnv from '@/types/ProcessEnv';
import { login } from '@/routes/auth/login';
import isAdmin from '@/middleware/admin';
import { users } from '@/routes/admin/users';
import { subscribe } from '@/routes/subscriptions/subscribe';
import * as nodemailer from 'nodemailer';
import cors from 'cors';

declare const process: {
  env: ProcessEnv;
};

dotenv.config();

export const appDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  database: '13a_tarhely',
  port: process.env.DATABASE_PORT || 3306,
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  synchronize: true,
  logging: true,
  entities: [User, Subscription, Package],
  subscribers: [],
  migrations: [],
});

export const mailTransport = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'myron78@ethereal.email',
      pass: 'd8u7Y4bWt2nJFRwNvY'
  }
});

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, async () => {
  await appDataSource.initialize();
  console.log(`Server is running on port ${port}`);
});

const authRoutes = express.Router();
authRoutes.post('/register', register);
authRoutes.post('/login', login);

const adminRoutes = express.Router();
adminRoutes.use(isAdmin);
adminRoutes.get('/user', users);

const subscriptionsRoutes = express.Router();
adminRoutes.post('/subscribe', subscribe);

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/subscriptions', subscriptionsRoutes);
