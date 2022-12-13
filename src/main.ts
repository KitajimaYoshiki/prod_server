import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://localhost:3000'
      ],
    },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true}));
  await app.listen(3001);
}
bootstrap();
