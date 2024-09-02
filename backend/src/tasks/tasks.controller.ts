import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/get-task')
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get('/')
  getTasks() {
    return 'Returning the index';
  }

  @Post('/')
  createTask() {
    return 'Crear tareas';
  }

  @Put('/')
  updateTask() {
    return 'Actualizar tarea';
  }

  @Patch('/')
  updateItemTask() {
    return 'Actualizar un item de la tarea';
  }

  @Delete('/')
  deleteTask() {
    return 'Eliminar tarea';
  }
}
