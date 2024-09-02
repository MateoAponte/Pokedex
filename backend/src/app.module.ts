import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { PaymentsResolver } from './payments/payments.resolver';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [TasksModule, ProjectsModule, PaymentsModule],
  controllers: [],
  providers: [PaymentsResolver],
})
export class AppModule {}
