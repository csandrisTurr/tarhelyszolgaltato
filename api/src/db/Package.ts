import { Entity, PrimaryGeneratedColumn, Column, OneToOne,  } from 'typeorm';
import { Subscription } from './Subscription';

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @OneToOne(() => Subscription, (subscription) => subscription.package)
  subscription: Subscription;
}
