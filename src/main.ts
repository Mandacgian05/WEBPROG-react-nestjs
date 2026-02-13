import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  // Use NestExpressApplication to access 'useStaticAssets'
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // This serves your public/index.html when you visit the root URL
  app.useStaticAssets(join(__dirname, '..', 'public'));
  
  app.enableCors(); // Vital for web communication
  await app.listen(3000);
}
bootstrap();