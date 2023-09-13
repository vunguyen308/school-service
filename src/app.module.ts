import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClassModule } from './class/class.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
    }),
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ClassModule,
  ],
})
export class AppModule {}
