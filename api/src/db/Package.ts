import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany,  } from 'typeorm';
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

  @OneToMany(() => Subscription, (subscription) => subscription.package)
  subscription: Subscription[];
}
