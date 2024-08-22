import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import * as Styled from "./Filters.styled";
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

const ColorFilter: FC<Props> = ({ value, onChange }) => {
  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = e;
    onChange(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Styled.FilterContainer>
      <InputLabel id="color-filter-label">Colour</InputLabel>
      <Select
        labelId="color-filter-label"
        sx={{ width: "200px" }}
        multiple
        value={value}
        onChange={handleChange}
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

export default ColorFilter;
