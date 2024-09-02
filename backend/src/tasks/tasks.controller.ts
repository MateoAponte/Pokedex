import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/get-task')
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get('/')
  getIndex() {
    return 'Returning the index';
  }
}
