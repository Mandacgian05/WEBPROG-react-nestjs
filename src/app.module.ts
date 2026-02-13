import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GuestbookModule } from './guestbook/guestbook.module';

@Module({
  imports: [
    // This tells NestJS to look for your index.html in the public folder
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    GuestbookModule,
  ],
  // AppController and AppService are removed to prevent "Hello World" or 404 errors
})
export class AppModule {}