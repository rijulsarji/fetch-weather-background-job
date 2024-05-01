import { Body, Controller, Get, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { TriggerAutomationDTO } from './dto/triggerAutomation.dto';
import { Serialize } from 'src/serialiser/serialiser';
import { WeatherGetRequestDTO } from './dto/weatherGetRequest.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('')
  @Serialize(WeatherGetRequestDTO)
  getWeatherReport() {
    return this.weatherService.fetchWeather();
  }

  @Post('')
  triggerAutomation(@Body() body: TriggerAutomationDTO) {}
}
