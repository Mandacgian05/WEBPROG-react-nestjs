import { Injectable } from '@nestjs/common';

@Injectable()
export class GuestbookService {
  // This array acts as your temporary database
  private posts = [
    { name: 'Gian', message: 'Welcome to my guestbook!' }
  ];

  // Logic to return all posts
  findAll() {
    return this.posts;
  }

  // Logic to add a new post
  create(newPost: { name: string; message: string }) {
    this.posts.push(newPost);
    return newPost;
  }
}