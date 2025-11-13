import { Popper, ClickAwayListener, Paper } from "@mui/material";
import { useState, useMemo } from "react";
import Box from "../Box";
import Column from "../Column";
import Row from "../Row";
import Typography from "../Typography";
import InputSearch from "../InputSearch";
import { FilterConfigItem } from "./TableFilter";
import { neutral } from "@cegid/vsb-cds-tokens";

interface FilterSelectionPopperProps<T> {
  open: boolean;
  anchorEl: HTMLElement | null;
  filterConfig: Partial<Record<keyof T, FilterConfigItem>>;
  visibleFilters: Set<keyof T>;
  onVisibilityToggle: (key: keyof T) => void;
  onClickAway: () => void;
}

const FilterSelectionPopper = <T,>({
  open,
  anchorEl,
  filterConfig,
  visibleFilters,
  onVisibilityToggle,
  onClickAway,
}: FilterSelectionPopperProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("");

  const availableFilters = useMemo(() => {
    return Object.entries(filterConfig).filter(
      ([key]) => !visibleFilters.has(key as keyof T)
    );
  }, [filterConfig, visibleFilters]);

  const filteredFilters = useMemo(() => {
    if (!searchQuery) return availableFilters;
    return availableFilters.filter(([, item]) => {
      const filterItem = item as FilterConfigItem;
      return filterItem.label.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [availableFilters, searchQuery]);

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      style={{ zIndex: 1300 }}
    >
      <ClickAwayListener onClickAway={onClickAway}>
        <Paper elevation={3} sx={{ mt: 1 }}>
          <Box p={4} minWidth={200}>
            <Column gap={4}>
              <InputSearch
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un filtre..."
                defaultSize="long"
                fullwidth={true}
              />
              <Column gap={2}>
                {filteredFilters.map(([key, item]) => {
                  const filterItem = item as FilterConfigItem;
                  const FilterIcon = filterItem.icon;
                  return (
                    <Box
                      key={String(key)}
                      onClick={() => onVisibilityToggle(key as keyof T)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: neutral[95],
                        },
                      }}
                      px={4}
                      py={2}
                      borderRadius={2}
                    >
                      <Row gap={2} alignItems="center">
                        {FilterIcon && <FilterIcon />}
                        <Typography variant="bodySMedium" color="neutral/10">
                          {filterItem.label}
                        </Typography>
                      </Row>
                    </Box>
                  );
                })}
              </Column>
            </Column>
          </Box>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default FilterSelectionPopper;
