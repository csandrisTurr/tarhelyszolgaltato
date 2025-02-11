import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne,  } from 'typeorm';
import { Package } from './Package';
import { User } from './User';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.subscription)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Package, (pkg) => pkg.subscription)
  @JoinColumn({ name: 'packageId' })
  package: Package;

  @Column()
  date: Date;
}
