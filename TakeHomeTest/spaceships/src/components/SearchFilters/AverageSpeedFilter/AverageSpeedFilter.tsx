import { FC, useCallback, useMemo, useState } from "react";
import { Fields, FilterContainer, FormLabel, Input, MinMaxContainer, Select, Separator, Type } from "@/components/SearchFilters/AverageSpeedFilter/AverageSpeedFilter.styled";
import { AverageSpeedFilterValue, FilterTypeEnum } from "@/components/SearchFilters/types";

interface AverageSpeedFilterProps {
  value: AverageSpeedFilterValue;
  onChange: (filter: AverageSpeedFilterValue) => void;
}

enum FilterFieldEnum {
  Min = "minValue",
  Max = "maxValue",
}

export const AverageSpeedFilter: FC<AverageSpeedFilterProps> = ({
  value,
  onChange,
}) => {
  const [filter, setFilter] = useState<AverageSpeedFilterValue>(value);

  const handleTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newType = e.target.value as FilterTypeEnum;
      const updatedFilter = { type: newType, minValue: "", maxValue: "" };
      setFilter(updatedFilter);
      onChange(updatedFilter);
    },
    [onChange]
  );

  const handleValueChange = useCallback(
    (field: FilterFieldEnum) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      if (value === "" || !isNaN(Number(value))) {
        const newValue = value === "" ? "" : Number(value);
        const updatedFilter = { ...filter, [field]: newValue };
        setFilter(updatedFilter);
        onChange(updatedFilter);
      }
    },
    [filter, onChange]
  );

  const renderMinMaxFields = useMemo(() => {
    if (filter.type === FilterTypeEnum.Between) {
      return (
        <MinMaxContainer>
          <Input
            id="minSpeed"
            type="text"
            value={filter.minValue}
            onChange={handleValueChange(FilterFieldEnum.Min)}
          />
          <Separator>-</Separator>
          <Input
            id="maxSpeed"
            type="text"
            value={filter.maxValue}
            onChange={handleValueChange(FilterFieldEnum.Max)}
          />
        </MinMaxContainer>
      );
    }

    const isLessThan = filter.type === FilterTypeEnum.LessThan;
    return (
      <Input
        id={isLessThan ? "maxSpeed" : "minSpeed"}
        type="text"
        value={isLessThan ? filter.maxValue : filter.minValue}
        onChange={handleValueChange(
          isLessThan ? FilterFieldEnum.Max : FilterFieldEnum.Min
        )}
      />
    );
  }, [filter.maxValue, filter.minValue, filter.type, handleValueChange]);

  return (
    <FilterContainer>
      <Type>
        <FormLabel>Average Speed</FormLabel>
        <Select
          id="speed-filter"
          value={filter.type}
          onChange={handleTypeChange}
        >
          <option hidden value={FilterTypeEnum.None}></option>
          <option value={FilterTypeEnum.None}>None</option>
          <option value={FilterTypeEnum.LessThan}>Less Than</option>
          <option value={FilterTypeEnum.GreaterThan}>Greater Than</option>
          <option value={FilterTypeEnum.Between}>Between</option>
        </Select>
      </Type>
      {filter.type !== FilterTypeEnum.None && (
        <Fields>{renderMinMaxFields}</Fields>
      )}
    </FilterContainer>
  );
};
