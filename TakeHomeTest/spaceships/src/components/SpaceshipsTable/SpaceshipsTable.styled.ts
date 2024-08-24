import styled from "styled-components";

export const SpaceshipsTableContainer = styled.div`
  padding: 32px;
`;

export const ColorTileContainer = styled.div`
  display: flex;
  gap: 2px;
`;

export const ColorTile = styled.div<{ $color: string }>`
  background-color: ${({ $color }) => $color};
  width: 16px;
  height: 16px;
  border: 1px solid black;
`;
