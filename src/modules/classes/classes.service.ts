import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassesService {
  async list(userId: number) {
    // Logic to retrieve classes for the user
    return `Classes for user with ID: ${userId}`;
  }
}
