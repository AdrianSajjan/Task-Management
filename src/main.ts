import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

async function bootstrap() {
  const logger = new Logger();
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  logger.log(`Application running on PORT ${PORT}`, 'Bootstrap');
}

bootstrap();
