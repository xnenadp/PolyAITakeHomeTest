import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC, useMemo } from "react";
import * as Styled from "./Filters.styled";

interface Props {
  value?: boolean;
  onChange: (value?: boolean) => void;
}

const PulseLaserFilter: FC<Props> = ({ value, onChange }) => {
  const handleChange = (e: SelectChangeEvent) => {
    let val;
    if (e.target.value === "") {
      val = undefined;
    } else {
      val = e.target.value === "true";
    }
    onChange(val);
  };

  const val = useMemo(() => {
    if (value === undefined) {
      return "";
    } else {
      return value.toString();
    }
  }, [value]);

  return (
    <Styled.FilterContainer>
      <InputLabel id="pulse-laser-label">Pulse Laser</InputLabel>
      <Select
        labelId="pulse-laser-label"
        sx={{ width: "200px" }}
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

export default PulseLaserFilter;
