import { FC } from "react";
import { AverageSpeedFilterValue, Filters } from "@/components/SearchFilters/types";
import { AverageSpeedFilter, ColorFilter, PulseLaserFilter, FiltersContainer } from "@/components/SearchFilters";

interface SearchFiltersProps {
  filters: Filters;
  setPulseLaser: (value?: boolean) => void;
  setColors: (colors: string[]) => void;
  setAverageSpeed: (filter: AverageSpeedFilterValue) => void;
}

export const SearchFilters: FC<SearchFiltersProps> = ({ filters, setPulseLaser, setColors, setAverageSpeed }) => (
  <FiltersContainer>
    <ColorFilter value={filters.colors} onChange={setColors} />
    <PulseLaserFilter value={filters.pulseLaser} onChange={setPulseLaser} />
    <AverageSpeedFilter value={filters.averageSpeed} onChange={setAverageSpeed} />
  </FiltersContainer>
);
