import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GreetPipe } from './pipes/greet/greet.pipe';
import { GreetGuard } from './guards/greet/greet.guard';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/get-task')
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get('/')
  getTasks(@Query() query: any) {
    console.log(query);
  }

  @Get('task/:num')
  getTask(@Param('num', ParseIntPipe) num: string) {
    return num + 14;
  }

  @Get('/greet')
  @UseGuards(GreetGuard)
  Greet(@Query(GreetPipe) query: { name: string; age: number }) {
    return `Hello ${query.name}, you are ${query.age + 1}  years old`;
  }

  @Post('/')
  createTask(@Body() body: CreateTaskDto) {
    console.log(body);
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

  @Get('/not-found')
  @HttpCode(404)
  notFound() {
    return 'Not found';
  }
}
