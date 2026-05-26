import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS disabled — single user local app
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  // Ensure unhandled promise rejections are logged and process exits
  // per lint rule: Promises must be awaited or handled
  // keep it minimal and explicit

  console.error(err);
  process.exit(1);
});
