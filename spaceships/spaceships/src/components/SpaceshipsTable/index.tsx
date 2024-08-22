import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Spaceship } from "@/utils/types";
import { FC } from "react";
import * as Styled from "./SpaceshipsTable.styled";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  rows: Spaceship[];
}

const SpaceshipsTable: FC<Props> = ({ rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Average Speed</TableCell>
            <TableCell>Colours</TableCell>
            <TableCell>Pulse Laser</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`${row.name}-${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.average_speed}</TableCell>
              <TableCell>
                <Styled.ColorTileContainer>
                  {row.colors.map((color) => (
                    <Styled.ColorTile key={color} $color={color} />
                  ))}
                </Styled.ColorTileContainer>
              </TableCell>
              <TableCell>{row.pulse_laser && <CheckIcon />}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SpaceshipsTable;
