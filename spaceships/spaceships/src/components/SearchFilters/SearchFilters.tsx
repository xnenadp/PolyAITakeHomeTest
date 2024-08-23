import ColorFilter from "./ColorFilter";
import * as Styled from "./Filters.styled";
import PulseLaserFilter from "./PulseLaserFilter";
import { FC } from "react";
import AverageSpeedFilter from "./AverageSpeedFilter";
import { AverageSpeedFilterValue, Filters } from "@/utils/types";

interface Props {
  filters: Filters;
  setPulseLaser: (value?: boolean) => void;
  setColors: (colors: string[]) => void;
  setAverageSpeed: (filter: AverageSpeedFilterValue) => void;
}

const SearchFilters: FC<Props> = ({ filters, setPulseLaser, setColors, setAverageSpeed }) => {
  return (
    <Styled.FiltersContainer>
      <ColorFilter value={filters.colors} onChange={setColors} />
      <PulseLaserFilter value={filters.pulseLaser} onChange={setPulseLaser} />
      <AverageSpeedFilter value={filters.averageSpeed} onChange={setAverageSpeed} />
    </Styled.FiltersContainer>
  );
};

export default SearchFilters;
