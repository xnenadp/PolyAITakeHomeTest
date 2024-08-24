import { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import { Spaceship } from "@/components/SpaceshipsTable/types";
import { ColorTileContainer, ColorTile, SpaceshipsTableContainer } from "@/components/SpaceshipsTable/SpaceshipsTable.styled";

interface SpaceshipsTableProps {
  rows: Spaceship[];
}

export const SpaceshipsTable: FC<SpaceshipsTableProps> = ({ rows }) => (
  <SpaceshipsTableContainer>
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
          {rows.map(({ name, average_speed, colors, pulse_laser }, index) => (
            <TableRow
              key={`spaceship-${name}-${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{name}</TableCell>
              <TableCell align="right">{average_speed}</TableCell>
              <TableCell>
                <ColorTileContainer>
                  {colors.map((color) => (
                    <ColorTile key={color} $color={color} />
                  ))}
                </ColorTileContainer>
              </TableCell>
              <TableCell>{pulse_laser && <CheckIcon />}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </SpaceshipsTableContainer>
);