import { Filters as FiltersType } from "@/hooks/useSpaceships";
import ColorFilter from "./ColorFilter";
import * as Styled from "./Filters.styled";
import PulseLaserFilter from "./PulseLaserFilter";
import { FC } from "react";
import AverageSpeedFilter from "./AverageSpeedFilter";
import { FilterType } from "@/utils/constants";

interface Props {
  filters: FiltersType;
  setPulseLaser: (value?: boolean) => void;
  setColors: (colors: string[]) => void;
  setAverageSpeed: (filter: { type: FilterType; minValue: number; maxValue: number }) => void;
}

const Filters: FC<Props> = ({ filters, setPulseLaser, setColors, setAverageSpeed}) => {
  return (
    <Styled.FiltersContainer>
      <ColorFilter value={filters.colors} onChange={setColors} />
      <PulseLaserFilter value={filters.pulseLaser} onChange={setPulseLaser} />
      <AverageSpeedFilter value={filters.averageSpeed} onChange={setAverageSpeed} />
    </Styled.FiltersContainer>
  );
};

export default Filters;
