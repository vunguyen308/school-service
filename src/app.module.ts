import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClassModule } from './modules/classes';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DatabaseModule } from './database/database.module';
import { StudentModule } from './modules/students';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
    }),
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ClassModule,
    StudentModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
