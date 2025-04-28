import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  async getUserActiveByIdNumber(id_number: string) {
    const url = `${process.env.NEXT_PUBLIC_BONNA_HUB_BACKEND_URL}/users/getUserActiveByIdNumber/${id_number}`;

    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error.message);
      throw new Error('Failed to fetch user data');
    }
  }
}
