import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuestbookModule } from './guestbook/guestbook.module';// Ensure this line exists

@Module({
  imports: [GuestbookModule], // Ensure GuestbookModule is in this array
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}