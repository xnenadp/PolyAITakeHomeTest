import { Filters as FiltersType } from "@/hooks/useSpaceships";
import ColorFilter from "./ColorFilter";
import * as Styled from "./Filters.styled";
import PulseLaserFilter from "./PulseLaserFilter";
import { FC } from "react";

interface Props {
  filters: FiltersType;
  setPulseLaser: (value?: boolean) => void;
  setColors: (colors: string[]) => void;
}

const Filters: FC<Props> = ({ filters, setPulseLaser, setColors }) => {
  return (
    <Styled.FiltersContainer>
      <ColorFilter value={filters.colors} onChange={setColors} />
      <PulseLaserFilter value={filters.pulseLaser} onChange={setPulseLaser} />
    </Styled.FiltersContainer>
  );
};

export default Filters;
