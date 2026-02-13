// backend/src/guestbook/guestbook.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get() // Handles listing messages
  async listPosts() {
    return await this.guestbookService.findAll();
  }

  @Post() // Handles adding new messages
  async addPost(@Body() body: { name: string; message: string }) {
    return await this.guestbookService.create(body);
  }
}
