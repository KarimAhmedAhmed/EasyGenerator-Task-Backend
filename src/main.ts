import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import cors from 'cors';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.use(
    cors({
      origin: '*',
      methods: 'GET,POST',
      optionsSuccessStatus: 201,
    }),
  );

  await app.listen(3001);
}
bootstrap();
