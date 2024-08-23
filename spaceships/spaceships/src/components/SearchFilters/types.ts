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

  export enum FilterType {
    None = "",
    LessThan = "lessThan",
    GreaterThan = "greaterThan",
    Between = "between",
  }