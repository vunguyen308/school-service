import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { logger } from './common/middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(logger);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('School-Service')
    .setDescription('The School API description')
    .setVersion('1.0')
    .addTag('school-service')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT, process.env.HOST);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
