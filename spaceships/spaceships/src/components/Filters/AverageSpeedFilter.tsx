import { InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import * as Styled from "./Filters.styled";
import { FilterType } from "@/utils/constants";

interface Props {
  value: { type: FilterType; minValue: number; maxValue: number };
  onChange: (filter: { type: FilterType; minValue: number; maxValue: number }) => void;
}

const AverageSpeedFilter: FC<Props> = ({ value, onChange }) => {
  const [filterType, setFilterType] = useState<FilterType>(FilterType.None);
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);

  useEffect(() => {
    if (value) {
      setFilterType(value.type);
      setMinValue(value.minValue);
      setMaxValue(value.maxValue);
    }
  }, [value]);

  const handleTypeChange = (e: SelectChangeEvent<string>) => {
    const newType = e.target.value as FilterType;
    setFilterType(newType);

    // Notify parent component of the type change with current min and max values
    onChange({ type: newType, minValue, maxValue });
  };

  const handleMinValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinValue = Number(e.target.value);
    if (!isNaN(newMinValue)) {
      setMinValue(newMinValue);
      onChange({ type: filterType, minValue: newMinValue, maxValue });
    }
  };

  const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = Number(e.target.value);
    if (!isNaN(newMaxValue)) {
      setMaxValue(newMaxValue);
      onChange({ type: filterType, minValue, maxValue: newMaxValue });
    }
  };

  return (
    <Styled.FilterContainer>
      <InputLabel id="speed-filter-label">Average Speed</InputLabel>
      <Select
        labelId="speed-filter-label"
        sx={{ width: "200px" }}
        value={filterType}
        onChange={handleTypeChange}
      >
        <MenuItem value={FilterType.None}>None</MenuItem>
        <MenuItem value={FilterType.LessThan}>Less Than</MenuItem>
        <MenuItem value={FilterType.GreaterThan}>Greater Than</MenuItem>
        <MenuItem value={FilterType.Between}>Between</MenuItem>
      </Select>
      {filterType && (
        <>
          {filterType === FilterType.Between ? (
            <>
              <TextField
                label="Min Speed"
                type="number"
                value={minValue}
                onChange={handleMinValueChange}
              />
              <TextField
                label="Max Speed"
                type="number"
                value={maxValue}
                onChange={handleMaxValueChange}
              />
            </>
          ) : (
            <TextField
              label={filterType === FilterType.LessThan ? "Max Speed" : "Min Speed"}
              type="number"
              value={filterType === FilterType.LessThan ? maxValue : minValue}
              onChange={filterType === FilterType.LessThan ? handleMaxValueChange : handleMinValueChange}
            />
          )}
        </>
      )}
    </Styled.FilterContainer>
  );
};

export default AverageSpeedFilter;
