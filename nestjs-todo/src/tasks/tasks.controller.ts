import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() taskData: Partial<Task>) {
    return this.tasksService.create(taskData);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Task>) {
    return this.tasksService.update(+id, updateData);
  }

  @Patch(':id/complete')
  markAsCompleted(@Param('id') id: string) {
    return this.tasksService.markAsCompleted(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
