import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GuestbookModule } from './guestbook/guestbook.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      exclude: ['/guestbook/:path*'], // ✅ FINAL FIX
    }),
    GuestbookModule,
  ],
})
export class AppModule {}
