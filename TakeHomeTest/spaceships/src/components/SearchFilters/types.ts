export interface AverageSpeedFilterValue {
  type: FilterTypeEnum;
  minValue: string;
  maxValue: string;
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