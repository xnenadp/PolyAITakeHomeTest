import { FC, useEffect, useState } from "react";
import { FilterType } from "@/utils/constants";
import * as Styled from "./AverageSpeedFilter.styled";
import { AverageSpeedFilterValue } from "@/utils/types";

interface Props {
  value: AverageSpeedFilterValue;
  onChange: (filter: AverageSpeedFilterValue) => void;
}

enum FilterField {
  Min = "minValue",
  Max = "maxValue",
}

const AverageSpeedFilter: FC<Props> = ({ value, onChange }) => {
  const [filter, setFilter] = useState<AverageSpeedFilterValue>(value);

  useEffect(() => {
    setFilter(value);
  }, [value]);

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

  const renderMinMaxFields = () => {
    if (filter.type === FilterType.Between) {
      return (
        <Styled.MinMaxContainer>
            <Styled.FormLabel htmlFor="minSpeed">Min</Styled.FormLabel>
            <Styled.Input
              id="minSpeed"
              type="number"
              value={filter.minValue}
              onChange={handleValueChange(FilterField.Min)}
            />
            <Styled.FormLabel htmlFor="maxSpeed">Max</Styled.FormLabel>
            <Styled.Input
              id="maxSpeed"
              type="number"
              value={filter.maxValue}
              onChange={handleValueChange(FilterField.Max)}
            />
        </Styled.MinMaxContainer>
      );
    }

    const isLessThan = filter.type === FilterType.LessThan;
    return (
      <>
        <Styled.FormLabel htmlFor={isLessThan ? "maxSpeed" : "minSpeed"}>
          {isLessThan ? "Max" : "Min"}
        </Styled.FormLabel>
        <Styled.Input
          id={isLessThan ? "maxSpeed" : "minSpeed"}
          type="number"
          value={isLessThan ? filter.maxValue : filter.minValue}
          onChange={handleValueChange(isLessThan ? FilterField.Max : FilterField.Min)}
        />
      </>
    );
  };

  return (
    <Styled.FilterContainer>
      <Styled.Type>
        <Styled.FormLabel>Average Speed</Styled.FormLabel>
        <Styled.Select
          id="speed-filter"
          value={filter.type}
          onChange={handleTypeChange}
        >
          <option hidden value={FilterType.None}></option>
          <option value={FilterType.None}>None</option>
          <option value={FilterType.LessThan}>Less Than</option>
          <option value={FilterType.GreaterThan}>Greater Than</option>
          <option value={FilterType.Between}>Between</option>
        </Styled.Select>
      </Styled.Type>
      {filter.type !== FilterType.None && <Styled.Fields>{renderMinMaxFields()}</Styled.Fields>}
    </Styled.FilterContainer>
  );
};

export default AverageSpeedFilter;
