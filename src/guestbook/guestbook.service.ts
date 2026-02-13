import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase = createClient(
    'https://ycpebsjzvrbtzwdrfadk.supabase.co', 
    'sb_publishable_s3YlqnbXqt3An2G9U-NH5w_yTC-nh5n'
  );

  async findAll() {
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('id', { ascending: false });

    if (error) return [];
    return data;
  }

  async create(newPost: { name: string; message: string }) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([newPost])
      .select();

    if (error) throw error;
    return data[0];
  }
}