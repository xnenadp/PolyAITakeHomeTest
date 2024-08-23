import { FC } from "react";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FilterContainer } from "@/components/SearchFilters";
import { colors } from "@/components/SearchFilters/ColorFilter/constants";

interface Props {
  value: string[];
  onChange: (colors: string[]) => void;
}

export const ColorFilter: FC<Props> = ({ value, onChange }) => {
  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const { value } = e.target;
    onChange(Array.isArray(value) ? value : value.split(","));
  };

  return (
    <FilterContainer>
      <InputLabel id="color-filter-label">Color</InputLabel>
      <Select
        labelId="color-filter-label"
        multiple
        value={value}
        onChange={handleChange}
        sx={{ width: "200px", height: "40px" }}
      >
        {colors.map(({ value, label }) => (
          <MenuItem
            key={value}
            value={value}
            sx={{ color: value }}
          >
            {label}
          </MenuItem>
        ))}
      </Select>
    </FilterContainer>
  );
};