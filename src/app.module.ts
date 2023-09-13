import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClassModule } from './modules/classes';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DatabaseModule } from './database/database.module';
import { StudentModule } from './modules/students';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
    }),
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ClassModule,
    StudentModule,
  ],
})
export class AppModule {}
