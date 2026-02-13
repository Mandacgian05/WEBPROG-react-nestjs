import { Controller, Get, Post, Body } from '@nestjs/common'; // Ensure Post and Body are here
import { GuestbookService } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get()
  listPosts() {
    return this.guestbookService.findAll();
  }

  @Post() // This is the part that handles your curl command
  addPost(@Body() body: { name: string; message: string }) {
    return this.guestbookService.create(body);
  }
}