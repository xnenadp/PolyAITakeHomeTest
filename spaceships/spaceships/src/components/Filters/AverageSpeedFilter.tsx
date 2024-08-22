import { InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import * as Styled from "./Filters.styled";

interface Props {
  value?: { type: string; value: number | [number, number] };
  onChange: (filter: { type: string; value: number | [number, number] }) => void;
}

const AverageSpeedFilter: FC<Props> = ({ value, onChange }) => {
  const [filterType, setFilterType] = useState<string>("");
  const [filterValue, setFilterValue] = useState< number | [number, number]>(0);

  useEffect(() => {
    if (value) {
      setFilterType(value.type);
      setFilterValue(value.value);
    }
  }, [value]);

  const handleTypeChange = (e: SelectChangeEvent<string>) => {
    const newType = e.target.value;
    setFilterType(newType);
    setFilterValue(0); // Clear the value when filter type changes
    onChange({ type: newType, value: 0 });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (filterType === "between") {
      const [min, max] = newValue.split(",").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        setFilterValue([min, max]);
        onChange({ type: filterType, value: [min, max] });
      }
    } else {
      const numValue = Number(newValue);
      if (!isNaN(numValue)) {
        setFilterValue(numValue);
        onChange({ type: filterType, value: numValue });
      }
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
        <MenuItem value="">None</MenuItem>
        <MenuItem value="lessThan">Less Than</MenuItem>
        <MenuItem value="greaterThan">Greater Than</MenuItem>
        <MenuItem value="between">Between</MenuItem>
      </Select>
      {filterType && (
        <>
          {filterType === "between" ? (
            <TextField
              label="Speed Range"
              placeholder="e.g., 50,100"
              value={Array.isArray(filterValue) ? filterValue.join(",") : ""}
              onChange={handleValueChange}
            />
          ) : (
            <TextField
              label={filterType === "lessThan" ? "Max Speed" : "Min Speed"}
              type="number"
              value={typeof filterValue === "number" ? filterValue : ""}
              onChange={handleValueChange}
            />
          )}
        </>
      )}
    </Styled.FilterContainer>
  );
};

export default AverageSpeedFilter;
