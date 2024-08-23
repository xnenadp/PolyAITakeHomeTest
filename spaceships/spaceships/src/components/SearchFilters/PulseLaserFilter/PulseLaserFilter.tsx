import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC } from "react";
import * as Styled from "../SearchFilters.styled";

interface Props {
  value?: boolean;
  onChange: (value?: boolean) => void;
}

export const PulseLaserFilter: FC<Props> = ({ value, onChange }) => {
  const handleChange = (e: SelectChangeEvent<string>) => {
    const newValue = e.target.value;
    onChange(newValue === "" ? undefined : newValue === "true");
  };

  const val = value === undefined ? "" : value.toString();

  return (
    <Styled.FilterContainer>
      <InputLabel id="pulse-laser-label">Pulse Laser</InputLabel>
      <Select
        labelId="pulse-laser-label"
        sx={{ width: "200px", height: "40px" }}
        onChange={handleChange}
        value={val}
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value="true">Yes</MenuItem>
        <MenuItem value="false">No</MenuItem>
      </Select>
    </Styled.FilterContainer>
  );
};