export interface AverageSpeedFilterValue {
  type: FilterTypeEnum;
  minValue: number;
  maxValue: number;
}

export interface Filters {
  colors: string[];
  pulseLaser?: boolean;
  averageSpeed: AverageSpeedFilterValue;
}

export enum FilterTypeEnum {
  None = "",
  LessThan = "lessThan",
  GreaterThan = "greaterThan",
  Between = "between",
}