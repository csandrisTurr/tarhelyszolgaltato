import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn,  } from 'typeorm';
import { Package } from './Package';
import { User } from './User';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.subscription)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToOne(() => Package, (pkg) => pkg.subscription)
  @JoinColumn({ name: 'packageId' })
  package: Package;

  @Column()
  date: Date;
}
