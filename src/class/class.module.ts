import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { DatabaseModule } from '../database/database.module';
import { classProviders } from './class.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ClassController],
  providers: [ClassService, ...classProviders],
})
export class ClassModule {}
