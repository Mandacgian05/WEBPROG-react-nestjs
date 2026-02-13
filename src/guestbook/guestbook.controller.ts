import { Controller, Get, Post, Body } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get() // Handles listing messages
  listPosts() {
    return this.guestbookService.findAll();
  }

  @Post() // Handles adding new messages
  addPost(@Body() body: { name: string; message: string }) {
    return this.guestbookService.create(body);
  }
}