export interface Spaceship {
  name: string;
  average_speed: number;
  colors: string[];
  pulse_laser: boolean;
}

export enum SearchParamNamesEnum {
  PulseLaser = "pulseLaser",
  Colors = "colors",
  AverageSpeedType = "averageSpeedType",
  AverageSpeedMax = "averageSpeedMax",
  AverageSpeedMin = "averageSpeedMin",
};