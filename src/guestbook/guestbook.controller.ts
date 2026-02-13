import { Controller, Get } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('guestbook') // <--- If this is empty, the URL won't work
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get()
  listPosts() {
    return this.guestbookService.findAll();
  }
}