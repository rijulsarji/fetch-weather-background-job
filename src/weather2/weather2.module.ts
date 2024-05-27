import { Module } from '@nestjs/common';
import { Weather2Controller } from './weather2.controller';
import { Weather2Service } from './weather2.service';
import { TriggerDevModule } from '@trigger.dev/nestjs';

@Module({
  controllers: [Weather2Controller],
  imports: [
    TriggerDevModule.register({
      id: 'trigger-dev',
      apiKey: 'tr_dev_hjNsDj23LtSYAaDMLLXg',
      apiUrl: 'https://cloud.trigger.dev',
    }),
  ],
  providers: [Weather2Service],
})
export class Weather2Module {}
