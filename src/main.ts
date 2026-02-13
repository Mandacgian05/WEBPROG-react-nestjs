import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // process.cwd() is the most reliable way to find 'public' on Vercel
  const publicPath = join(process.cwd(), 'public');
  app.useStaticAssets(publicPath);
  
  app.enableCors();
  await app.listen(3000);
}
bootstrap();