import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get('/get-task')
  getAllTasks() {
    return 'Getting all the tasks';
  }

  @Get('/')
  getIndex() {
    return 'Returning the index';
  }
}
