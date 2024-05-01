import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TriggerDevModule } from '@trigger.dev/nestjs';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TriggerDevModule.registerAsync({
      inject: [ConfigService],
      useFactory: () => ({
        id: 'my-nest-app',
        apiKey: 'tr_dev_hjNsDj23LtSYAaDMLLXg',
        apiUrl: 'https://cloud.trigger.dev',
        verbose: false,
        ioLogLocalEnabled: true,
      }),
    }),
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
