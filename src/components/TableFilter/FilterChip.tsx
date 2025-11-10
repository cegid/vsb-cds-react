import React from "react";
import Chip from "../Chip";
import Typography from "../Typography";
import Icon from "../Icon";
import { FilterConfigItem } from "./TableFilter";

interface FilterChipProps<T> {
  filterKey: keyof T;
  filterItem: FilterConfigItem;
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const FilterChip = <T,>({
  filterKey,
  filterItem,
  isActive,
  onClick,
}: FilterChipProps<T>) => {
  const IconComponent = filterItem.icon;

  return (
    <Chip
      label={
        <Typography color="neutral/50" variant="captionSemiBold">
          {filterItem.label}
        </Typography>
      }
      onClick={onClick}
      clicked={isActive}
      color={isActive ? "primary" : "neutral"}
      startIcon={IconComponent ? <IconComponent /> : undefined}
      endIcon={<Icon size={12}>arrow-down-01</Icon>}
    />
  );
};

export default FilterChip;
