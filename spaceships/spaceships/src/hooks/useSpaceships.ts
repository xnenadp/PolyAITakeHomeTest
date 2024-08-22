import { useState } from "react";
import data from "@/assets/data.json";
import { Spaceship } from "@/utils/types";
import { searchParamNames } from "@/utils/constants";
import { useRouter } from "next/router";

export interface Filters {
  colors: string[];
  pulseLaser?: boolean;
  averageSpeed?: { type: string; value: number | [number, number] };
}

const defaultFilters = {
  colors: [],
  pulseLaser: undefined,
  averageSpeed: undefined,
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
    if (filters.averageSpeed) {
      newSpaceships = newSpaceships.filter((spaceship) => {
        const speed = spaceship.average_speed;
        const { type, value } = filters.averageSpeed;
        if (type === "lessThan") {
          return speed < value;
        } else if (type === "greaterThan") {
          return speed > value;
        } else if (type === "between" && Array.isArray(value)) {
          return speed >= value[0] && speed <= value[1];
        }
        return true;
      });
    }

    return newSpaceships;
  };

  const setQueryParams = (filters: Filters) => {
    let params = new URLSearchParams();

    params.set(searchParamNames.COLORS, filters.colors.join(","));
    if (filters.pulseLaser !== undefined) {
      params.set(searchParamNames.PULSE_LASER, filters.pulseLaser.toString());
    }
    if (filters.averageSpeed?.type) {
      const { type, value } = filters.averageSpeed;
      params.set(searchParamNames.AVERAGE_SPEED_TYPE, type);
      if (type === "between" && Array.isArray(value)) {
        params.set(searchParamNames.AVERAGE_SPEED_MIN, value[0].toString());
        params.set(searchParamNames.AVERAGE_SPEED_MAX, value[1].toString());
      } else {
        params.set(searchParamNames.AVERAGE_SPEED_VALUE, value.toString());
      }
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
    const newFilters = {
      ...filters,
      pulseLaser: pulseLaser,
    };
    setFilters(newFilters);
    setSpaceships(filterSpaceships({ spaceships: data, filters: newFilters }));
    setQueryParams(newFilters);
  };

  const setAverageSpeed = (averageSpeed?: { type: string; value: number | [number, number] }) => {
    const newFilters = {
      ...filters,
      averageSpeed: averageSpeed,
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
