import { useState, useEffect, useMemo } from "react";
import data from "@/assets/data.json";
import { Spaceship } from "@/utils/types";
import { searchParamNames } from "@/utils/constants";
import { useRouter } from "next/router";

export interface Filters {
  colors: string[];
  pulseLaser?: boolean;
}

const defaultFilters = {
  colors: [],
  pulseLaser: undefined,
};

const useSpaceships = () => {
  const [spaceships, setSpaceships] = useState<Spaceship[]>(data);
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const router = useRouter();

  const filterSpaceships = ({
    spaceships,
    filters,
  }: {
    spaceships: Spaceship[];
    filters: Filters;
  }) => {
    let newSpaceships = spaceships;

    newSpaceships = spaceships.filter((spaceship) => {
      return filters.colors.length
        ? spaceship.colors.some((color) => filters.colors.includes(color))
        : true;
    });

    newSpaceships = newSpaceships.filter((spaceship) => {
      return filters.pulseLaser !== undefined
        ? filters.pulseLaser === spaceship.pulse_laser
        : true;
    });

    return newSpaceships;
  };

  const setQueryParams = (filters: Filters) => {
    let params = new URLSearchParams();

    params.set(searchParamNames.COLORS, filters.colors.join(","));
    if (filters.pulseLaser !== undefined) {
      params.set(searchParamNames.PULSE_LASER, filters.pulseLaser.toString());
    }

    router.replace(`?${params.toString()}`);
  };

  const setColors = (colors: string[]) => {
    const newFilters = {
      ...filters,
      colors: colors,
    };
    setFilters(newFilters);
    setSpaceships(filterSpaceships({ spaceships: data, filters: newFilters }));
    setQueryParams(newFilters);
  };

  const setPulseLaser = (pulseLaser?: boolean) => {
    setFilters({
      ...filters,
      pulseLaser: pulseLaser,
    });
    setSpaceships(filterSpaceships({ spaceships: data, filters }));
    setQueryParams(filters);
  };

  return {
    spaceships,
    filters,
    setColors,
    setPulseLaser,
  };
};

export default useSpaceships;
