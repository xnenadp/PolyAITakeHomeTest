import { FilterType } from "./constants";

export interface Spaceship {
  name: string;
  average_speed: number;
  colors: string[];
  pulse_laser: boolean;
}

export interface AverageSpeedFilterValue {
  type: FilterType;
  minValue: number;
  maxValue: number;
}

export interface Filters {
  colors: string[];
  pulseLaser?: boolean;
  averageSpeed: AverageSpeedFilterValue;
}