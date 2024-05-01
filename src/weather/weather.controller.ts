import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { TriggerAutomationDTO } from './dto/triggerAutomation.dto';
import { Serialize } from 'src/serialiser/serialiser';
import { WeatherGetRequestDTO } from './dto/weatherGetRequest.dto';
import { InjectTriggerDevClient } from '@trigger.dev/nestjs';
import { TriggerClient, eventTrigger } from '@trigger.dev/sdk';

@Injectable()
@Controller('weather')
export class WeatherController {
  constructor(
    @InjectTriggerDevClient() private client: TriggerClient,
    private readonly weatherService: WeatherService,
  ) {
    {
      this.client.defineJob({
        id: 'test-job',
        name: 'Test Job 1',
        version: '0.0.1',
        trigger: eventTrigger({
          name: 'test.event',
        }),
        // enabled: false,
        run: async (payload, io, ctx) => {
          await io.logger.info('Hello World', { payload });
          console.log('I am running!');

          return {
            message: 'Hello World',
          };
        },
      });
    }
  }

  backgroundJob() {
    this.client.defineJob({
      id: 'test-job',
      name: 'Test Job 1',
      version: '0.0.1',
      trigger: eventTrigger({
        name: 'test-event',
      }),
      run: async (payload, io, ctx) => {
        await io.logger.info('Hello World', { payload });
        console.log('I am running!');

        return {
          message: 'Hello World',
        };
      },
    });
  }

  @Get('')
  @Serialize(WeatherGetRequestDTO)
  getWeatherReport() {
    return this.weatherService.fetchWeather();
  }

  @Post('')
  triggerAutomation(@Body() body: TriggerAutomationDTO) {
    this.backgroundJob();
    return `Running trigger dev ${this.client.id}`;
  }
}
