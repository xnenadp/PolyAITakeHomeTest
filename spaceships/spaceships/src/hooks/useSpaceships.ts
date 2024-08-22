import { useState } from "react";
import data from "@/assets/data.json";
import { Spaceship } from "@/utils/types";
import { FilterType, searchParamNames } from "@/utils/constants";
import { useRouter } from "next/router";

export interface Filters {
  colors: string[];
  pulseLaser?: boolean;
  averageSpeed: { type: FilterType; minValue: number; maxValue: number };
}

const defaultFilters: Filters = {
  colors: [],
  pulseLaser: undefined,
  averageSpeed: { type: FilterType.None, minValue: 0, maxValue: 0 },
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

    // Filter by colors
    newSpaceships = newSpaceships.filter((spaceship) => {
      return filters.colors.length
        ? spaceship.colors.some((color) => filters.colors.includes(color))
        : true;
    });

    // Filter by pulse laser
    newSpaceships = newSpaceships.filter((spaceship) => {
      return filters.pulseLaser !== undefined
        ? filters.pulseLaser === spaceship.pulse_laser
        : true;
    });

    // Filter by average speed
    if (filters.averageSpeed.type !== FilterType.None) {
      newSpaceships = newSpaceships.filter((spaceship) => {
        const speed = spaceship.average_speed;
        const { type, minValue, maxValue } = filters.averageSpeed;

        if (type === FilterType.LessThan) {
          return speed < maxValue;
        } else if (type === FilterType.GreaterThan) {
          return speed > minValue;
        } else if (type === FilterType.Between) {
          return speed >= minValue && speed <= maxValue;
        }

        return true;
      });
    }

    return newSpaceships;
  };

  const setQueryParams = (filters: Filters) => {
    let params = new URLSearchParams();

    if (filters.colors !== undefined) {
      params.set(searchParamNames.COLORS, filters.colors.join(","));
    }
    if (filters.pulseLaser !== undefined) {
      params.set(searchParamNames.PULSE_LASER, filters.pulseLaser.toString());
    }
    if (filters.averageSpeed.type !== FilterType.None) {
      const { type, minValue, maxValue } = filters.averageSpeed;
      params.set(searchParamNames.AVERAGE_SPEED_TYPE, type);
      if (type === FilterType.Between) {
        params.set(searchParamNames.AVERAGE_SPEED_MIN, minValue.toString());
        params.set(searchParamNames.AVERAGE_SPEED_MAX, maxValue.toString());
      } else if (type === FilterType.LessThan) {
        params.set(searchParamNames.AVERAGE_SPEED_MAX, maxValue.toString());
      } else if (type === FilterType.GreaterThan) {
        params.set(searchParamNames.AVERAGE_SPEED_MIN, minValue.toString());
      }
    }

    router.replace(`?${params.toString()}`);
  };

  const setColors = (colors: string[]) => {
    const newFilters = {
      ...filters,
      colors,
    };
    setFilters(newFilters);
    setSpaceships(filterSpaceships({ spaceships: data, filters: newFilters }));
    setQueryParams(newFilters);
  };

  const setPulseLaser = (pulseLaser?: boolean) => {
    const newFilters = {
      ...filters,
      pulseLaser,
    };
    setFilters(newFilters);
    setSpaceships(filterSpaceships({ spaceships: data, filters: newFilters }));
    setQueryParams(newFilters);
  };

  const setAverageSpeed = (averageSpeed: { type: FilterType; minValue: number; maxValue: number }) => {
    const newFilters = {
      ...filters,
      averageSpeed,
    };
    setFilters(newFilters);
    setSpaceships(filterSpaceships({ spaceships: data, filters: newFilters }));
    setQueryParams(newFilters);
  };

  return {
    spaceships,
    filters,
    setColors,
    setPulseLaser,
    setAverageSpeed,
  };
};

export default useSpaceships;
