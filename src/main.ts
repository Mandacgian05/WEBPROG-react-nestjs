import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Robust pathing for Vercel
  const publicPath = join(process.cwd(), 'public');
  app.useStaticAssets(publicPath);
  
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();