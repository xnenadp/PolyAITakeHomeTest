import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AverageSpeedFilterValue, Filters, FilterTypeEnum } from "@/components/SearchFilters/types";
import { SearchParamNamesEnum, Spaceship } from "@/components/SpaceshipsTable/types";
import data from "@/assets/data.json";

const defaultFilters: Filters = {
  colors: [],
  pulseLaser: undefined,
  averageSpeed: { type: FilterTypeEnum.None, minValue: 0, maxValue: 0 },
};

export const useSpaceships = () => {
  const [spaceships, setSpaceships] = useState<Spaceship[]>(data);
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const router = useRouter();

  const filterSpaceships = useCallback(({
    spaceships,
    filters,
  }: {
    spaceships: Spaceship[];
    filters: Filters;
  }) => {
    let newSpaceships = [...spaceships];

    newSpaceships = newSpaceships.filter((spaceship) => {
      return filters.colors.length
        ? spaceship.colors.some((color) => filters.colors.includes(color))
        : true;
    });

    newSpaceships = newSpaceships.filter((spaceship) => {
      return filters.pulseLaser !== undefined
        ? filters.pulseLaser === spaceship.pulse_laser
        : true;
    });

    if (filters.averageSpeed.type !== FilterTypeEnum.None) {
      newSpaceships = newSpaceships.filter((spaceship) => {
        const speed = spaceship.average_speed;
        const { type, minValue, maxValue } = filters.averageSpeed;

        if (type === FilterTypeEnum.LessThan) {
          return speed < maxValue;
        } else if (type === FilterTypeEnum.GreaterThan) {
          return speed > minValue;
        } else if (type === FilterTypeEnum.Between) {
          return speed >= minValue && speed <= maxValue;
        }

        return true;
      });
    }

    return newSpaceships;
  }, [spaceships, filters]);

  const setQueryParams = useCallback((filters: Filters) => {
    let params = new URLSearchParams();

    if (filters.colors.length) {
      params.set(SearchParamNamesEnum.Colors, filters.colors.join(","));
    }
    if (filters.pulseLaser !== undefined) {
      params.set(SearchParamNamesEnum.PulseLaser, filters.pulseLaser.toString());
    }
    if (filters.averageSpeed.type !== FilterTypeEnum.None) {
      const { type, minValue, maxValue } = filters.averageSpeed;
      params.set(SearchParamNamesEnum.AverageSpeedType, type);
      if (type === FilterTypeEnum.Between) {
        params.set(SearchParamNamesEnum.AverageSpeedMin, minValue.toString());
        params.set(SearchParamNamesEnum.AverageSpeedMax, maxValue.toString());
      } else if (type === FilterTypeEnum.LessThan) {
        params.set(SearchParamNamesEnum.AverageSpeedMax, maxValue.toString());
      } else if (type === FilterTypeEnum.GreaterThan) {
        params.set(SearchParamNamesEnum.AverageSpeedMin, minValue.toString());
      }
    }
    const paramsString = params.toString();
    router.replace(paramsString !== "" ? `?${paramsString}` : "");
  }, [router]);

  const setColors = useCallback((colors: string[]) => {
    const newFilters = {
      ...filters,
      colors,
    };
    setFilters(newFilters);
    setQueryParams(newFilters);
  }, [filters]);

  const setPulseLaser = useCallback((pulseLaser?: boolean) => {
    const newFilters = {
      ...filters,
      pulseLaser,
    };
    setFilters(newFilters);
    setQueryParams(newFilters);
  }, [filters]);

  const setAverageSpeed = useCallback((averageSpeed: AverageSpeedFilterValue) => {
    const newFilters = {
      ...filters,
      averageSpeed,
    };
    setFilters(newFilters);
    setQueryParams(newFilters);
  }, [filters]);

  useEffect(() => {
    const { colors, pulseLaser, averageSpeedType, averageSpeedMin, averageSpeedMax } = router.query;

    const newFilters: Filters = { ...defaultFilters };

    if (colors) {
      newFilters.colors = (colors as string).split(",");
    }
    if (pulseLaser) {
      newFilters.pulseLaser = pulseLaser === "true";
    }
    if (averageSpeedType) {
      newFilters.averageSpeed.type = averageSpeedType as FilterTypeEnum;
      if (averageSpeedType === FilterTypeEnum.Between) {
        newFilters.averageSpeed.minValue = parseFloat(averageSpeedMin as string);
        newFilters.averageSpeed.maxValue = parseFloat(averageSpeedMax as string);
      } else if (averageSpeedType === FilterTypeEnum.GreaterThan) {
        newFilters.averageSpeed.minValue = parseFloat(averageSpeedMin as string);
        newFilters.averageSpeed.type = FilterTypeEnum.GreaterThan;
      } else if (averageSpeedType === FilterTypeEnum.LessThan) {
        newFilters.averageSpeed.maxValue = parseFloat(averageSpeedMax as string);
        newFilters.averageSpeed.type = FilterTypeEnum.LessThan;
      }
    } else {
      newFilters.averageSpeed.type = FilterTypeEnum.None;
    }

    setFilters(newFilters);
    setSpaceships(filterSpaceships({ spaceships: data, filters: newFilters }));
  }, [router.query]);

  return {
    spaceships,
    filters,
    setColors,
    setPulseLaser,
    setAverageSpeed,
  };
};