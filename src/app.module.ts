import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Weather2Module } from './weather2/weather2.module';

@Module({
  imports: [Weather2Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
