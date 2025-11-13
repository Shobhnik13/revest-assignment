import * as dotenv from 'dotenv'

dotenv.config()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const PORT = process.env.PORT
  await app.listen(PORT || "");
  console.log(`Order Service running on http://localhost:${PORT}`);
}
bootstrap();
