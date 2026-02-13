import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // This is the robust way to find the 'public' folder on Vercel
  app.useStaticAssets(join(process.cwd(), 'public'));
  
  app.enableCors();
  await app.listen(3000);
}
bootstrap();