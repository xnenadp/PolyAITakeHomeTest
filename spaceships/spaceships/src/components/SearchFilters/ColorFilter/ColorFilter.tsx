import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import * as Styled from "../SearchFilters.styled";
import { FC } from "react";

const colors = [
  { label: "Blue", value: "blue" },
  { label: "Silver", value: "silver" },
  { label: "Red", value: "red" },
  { label: "Black", value: "black" },
  { label: "Green", value: "green" },
  { label: "Yellow", value: "yellow" },
  { label: "Purple", value: "purple" },
  { label: "Gray", value: "gray" },
  { label: "Orange", value: "orange" },
];

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
    <Styled.FilterContainer>
      <InputLabel id="color-filter-label">Color</InputLabel>
      <Select
        labelId="color-filter-label"
        multiple
        value={value}
        onChange={handleChange}
        sx={{ width: "200px", height: "40px" }}
      >
        {colors.map((color) => (
          <MenuItem
            key={color.value}
            value={color.value}
            sx={{ color: color.value }}
          >
            {color.label}
          </MenuItem>
        ))}
      </Select>
    </Styled.FilterContainer>
  );
};