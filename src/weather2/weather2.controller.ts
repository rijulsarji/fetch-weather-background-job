import { Controller, Get } from '@nestjs/common';
import { Weather2Service } from './weather2.service';
import { InjectTriggerDevClient } from '@trigger.dev/nestjs';
import { TriggerClient, eventTrigger } from '@trigger.dev/sdk';

@Controller()
export class Weather2Controller {
  constructor(
    private weather2Service: Weather2Service,
    @InjectTriggerDevClient() private client: TriggerClient,
  ) {
    this.client.defineJob({
      id: 'my-weather-job',
      name: 'Weather Job',
      version: '0.0.1',
      trigger: eventTrigger({
        name: 'weather-job.event',
      }),
      run: async (payload, io, ctx) => {
        await io.logger.info('Hello Weather App!', { payload });

        const data = await io.backgroundFetch(
          'my-weather-job',
          'http://api.weatherapi.com/v1/current.json?q=Paris',
          {
            headers: {
              key: 'f2dbbd68d5204d3aa5d83229240105',
            },
          },
        );
        return {
          message: data,
        };
      },
    });
  }

  @Get('/trigger-dev')
  getHello(): string {
    return `Running trigger.dev with client id ${this.client.id}`;
  }

  @Get('/trigger-test')
  getTestHello() {
    return this.weather2Service.getHello();
  }
}
