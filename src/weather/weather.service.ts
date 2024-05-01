import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(private httpService: HttpService) {}
  async fetchWeather() {
    const { data } = await firstValueFrom(
      this.httpService
        .get('http://api.weatherapi.com/v1/forecast.json', {
          params: {
            key: 'f2dbbd68d5204d3aa5d83229240105',
            q: 'Bangalore',
          },
        })
        .pipe(),
    );

    return data;
  }
}
