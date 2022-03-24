import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from 'src/tasks/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    console.log('Before Insert');
    this.password = await bcrypt.hash(this.password, 8);
  }
}
