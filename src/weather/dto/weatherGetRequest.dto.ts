import { Expose, Transform, Type } from 'class-transformer';

export class LocationDTO {
  @Expose()
  localtime: string;
}

export class ConditionDTO {
  @Expose()
  text: string;
}

export class CurrentDTO {
  @Type(() => ConditionDTO)
  @Expose()
  condition: ConditionDTO;
}

export class DayDTO {
  @Expose()
  maxtemp_c: number;

  @Expose()
  mintemp_c: number;
}

export class ForecastDayDTO {
  @Type(() => DayDTO)
  @Expose()
  day: DayDTO;
}

export class ForecastDTO {
  @Type(() => ForecastDayDTO)
  @Expose()
  forecastday: ForecastDayDTO;
}

export class WeatherGetRequestDTO {
  @Type(() => LocationDTO)
  @Expose()
  location: LocationDTO;

  @Type(() => CurrentDTO)
  @Expose()
  current: CurrentDTO;

  @Type(() => ForecastDTO)
  @Expose()
  forecast: ForecastDTO;
}
