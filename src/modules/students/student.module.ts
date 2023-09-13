import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { DatabaseModule } from '../../database/database.module';
import { classProviders } from './student.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [StudentController],
  providers: [StudentService, ...classProviders],
})
export class StudentModule {}
