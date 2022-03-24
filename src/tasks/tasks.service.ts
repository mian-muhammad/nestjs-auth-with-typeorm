import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto, user) {
    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.user = user;
    return this.tasksRepository.save(task);
  }

  findAll(user) {
    return this.tasksRepository.find({
      where: { user },
      // relations: { user: true },
    });
  }

  findOne(id: number, user) {
    return this.tasksRepository.findOne({ where: { id, user } });
  }

  update(id: number, updateTaskDto: UpdateTaskDto, user) {
    return this.tasksRepository.update({ id, user }, updateTaskDto);
  }

  async remove(id: number, user) {
    const task = await this.tasksRepository.findOneBy({ id, user });
    if (task === null) return;
    return this.tasksRepository.remove(task);
  }
}
