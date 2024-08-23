import { FC, useMemo, useState } from "react";
import { Fields, FilterContainer, FormLabel, Input, MinMaxContainer, Select, Type } from "@/components/SearchFilters/AverageSpeedFilter/AverageSpeedFilter.styled";
import { AverageSpeedFilterValue, FilterType } from "@/components/SearchFilters/types";

interface AverageSpeedFilterProps {
  value: AverageSpeedFilterValue;
  onChange: (filter: AverageSpeedFilterValue) => void;
}

enum FilterField {
  Min = "minValue",
  Max = "maxValue",
}

export const AverageSpeedFilter: FC<AverageSpeedFilterProps> = ({ value, onChange }) => {
  const [filter, setFilter] = useState<AverageSpeedFilterValue>(value);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as FilterType;
    const updatedFilter = { ...filter, type: newType };
    setFilter(updatedFilter);
    onChange(updatedFilter);
  };

  const handleValueChange = (field: FilterField) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      const updatedFilter = { ...filter, [field]: newValue };
      setFilter(updatedFilter);
      onChange(updatedFilter);
    }
  };

  const renderMinMaxFields = useMemo(() => {
    if (filter.type === FilterType.Between) {
      return (
        <MinMaxContainer>
            <FormLabel htmlFor="minSpeed">Min</FormLabel>
            <Input
              id="minSpeed"
              type="number"
              value={filter.minValue}
              onChange={handleValueChange(FilterField.Min)}
            />
            <FormLabel htmlFor="maxSpeed">Max</FormLabel>
            <Input
              id="maxSpeed"
              type="number"
              value={filter.maxValue}
              onChange={handleValueChange(FilterField.Max)}
            />
        </MinMaxContainer>
      );
    }

    const isLessThan = filter.type === FilterType.LessThan;
    return (
      <>
        <FormLabel htmlFor={isLessThan ? "maxSpeed" : "minSpeed"}>
          {isLessThan ? "Max" : "Min"}
        </FormLabel>
        <Input
          id={isLessThan ? "maxSpeed" : "minSpeed"}
          type="number"
          value={isLessThan ? filter.maxValue : filter.minValue}
          onChange={handleValueChange(isLessThan ? FilterField.Max : FilterField.Min)}
        />
      </>
    );
  }, [filter.type, handleValueChange])

  return (
    <FilterContainer>
      <Type>
        <FormLabel>Average Speed</FormLabel>
        <Select
          id="speed-filter"
          value={filter.type}
          onChange={handleTypeChange}
        >
          <option hidden value={FilterType.None}></option>
          <option value={FilterType.None}>None</option>
          <option value={FilterType.LessThan}>Less Than</option>
          <option value={FilterType.GreaterThan}>Greater Than</option>
          <option value={FilterType.Between}>Between</option>
        </Select>
      </Type>
      {filter.type !== FilterType.None && <Fields>{renderMinMaxFields}</Fields>}
    </FilterContainer>
  );
};