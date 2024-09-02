import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [TasksModule, ProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
