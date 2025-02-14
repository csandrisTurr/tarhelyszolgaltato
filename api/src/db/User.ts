import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Subscription } from './Subscription';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  domain: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToOne(() => Subscription, (subscription) => subscription.user)
  subscription: Subscription;
}
