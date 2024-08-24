import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AverageSpeedFilterValue, Filters, FilterTypeEnum } from "@/components/SearchFilters/types";
import { SearchParamNamesEnum, Spaceship } from "@/components/SpaceshipsTable/types";
import data from "@/assets/data.json";

const defaultFilters: Filters = {
  colors: [],
  pulseLaser: undefined,
  averageSpeed: { type: FilterTypeEnum.None, minValue: "", maxValue: "" },
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
      const { type, minValue, maxValue } = filters.averageSpeed;
      newSpaceships = newSpaceships.filter((spaceship) => {
        const speed = Number(spaceship.average_speed);
        if (type === FilterTypeEnum.LessThan) {
          return maxValue === "" ? true : speed < Number(maxValue);
        } else if (type === FilterTypeEnum.GreaterThan) {
          return minValue === "" ? true : speed > Number(minValue);
        } else if (type === FilterTypeEnum.Between) {
          return (maxValue === "" ? true : speed < Number(maxValue)) && (minValue === "" ? true : speed > Number(minValue));
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
        params.set(SearchParamNamesEnum.AverageSpeedMin, minValue);
        params.set(SearchParamNamesEnum.AverageSpeedMax, maxValue);
      } else if (type === FilterTypeEnum.LessThan) {
        params.set(SearchParamNamesEnum.AverageSpeedMax, maxValue);
      } else if (type === FilterTypeEnum.GreaterThan) {
        params.set(SearchParamNamesEnum.AverageSpeedMin, minValue);
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
    const {
      colors,
      pulseLaser,
      averageSpeedType,
      averageSpeedMin,
      averageSpeedMax,
    } = router.query;

    const newFilters: Filters = { ...defaultFilters };

    const parseValue = (value: string, fallback: string = "") =>
      value === "" || !isNaN(Number(value)) ? value : fallback;

    if (colors) {
      newFilters.colors = (colors as string).split(",");
    }

    if (pulseLaser) {
      newFilters.pulseLaser = pulseLaser === "true";
    }

    if (averageSpeedType) {
      newFilters.averageSpeed.type = averageSpeedType as FilterTypeEnum;

      switch (averageSpeedType) {
        case FilterTypeEnum.Between:
          newFilters.averageSpeed.minValue = parseValue(
            averageSpeedMin as string
          );
          newFilters.averageSpeed.maxValue = parseValue(
            averageSpeedMax as string
          );
          break;
        case FilterTypeEnum.GreaterThan:
          newFilters.averageSpeed.minValue = parseValue(
            averageSpeedMin as string
          );
          break;
        case FilterTypeEnum.LessThan:
          newFilters.averageSpeed.maxValue = parseValue(
            averageSpeedMax as string
          );
          break;
        default:
          newFilters.averageSpeed.type = FilterTypeEnum.None;
          break;
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