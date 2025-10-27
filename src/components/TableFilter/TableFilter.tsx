"use client";

import React, { useState } from "react";
import { Popper, ClickAwayListener, Paper } from "@mui/material";
import Box from "../Box";
import Chip from "../Chip";
import Row from "../Row";
import Column from "../Column";
import Icon from "../Icon";
import TextField from "../TextField";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Typography from "../Typography";
import Tabs from "../Tabs";
import Tab from "../Tab";
import IconButton from "../IconButton";
import { InputSearch } from "..";

export type FilterInputType =
  | "text"
  | "number"
  | "date"
  | "datetime-local"
  | "email";

export interface FilterConfigItem {
  label: string;
  icon?: React.ComponentType<any>;
  type?: FilterInputType;
}

export interface TableFilterProps<T = any> {
  /**
   * Configuration mapping keys of type T to display labels, optional icons and input type
   */
  filterConfig: Partial<Record<keyof T, FilterConfigItem>>;
  /**
   * Callback fired when a filter is applied
   * @param attributeKey - The key of the attribute
   * @param value - The filter value entered by the user
   */
  onFilterApply?: (attributeKey: keyof T, value: string) => void;
  /**
   * Array of currently active filter keys
   */
  activeFilters?: (keyof T)[];
  /**
   * Sample object used to infer types at runtime
   */
  sampleData?: T;
}

const TableFilter = <T,>({
  filterConfig,
  onFilterApply,
  activeFilters = [],
  sampleData,
}: TableFilterProps<T>) => {
  const [popperAnchor, setPopperAnchor] = useState<HTMLElement | null>(null);
  const [selectedKey, setSelectedKey] = useState<keyof T | null>(null);
  const [filterValue, setFilterValue] = useState("");
  const [filterButtonAnchor, setFilterButtonAnchor] =
    useState<HTMLElement | null>(null);
  const [visibleFilters, setVisibleFilters] = useState<Set<keyof T>>(
    new Set(Object.keys(filterConfig) as (keyof T)[])
  );
  const [filterValues, setFilterValues] = useState<Map<keyof T, string>>(
    new Map()
  );

  const inferInputType = (key: keyof T): FilterInputType => {
    // First check if type is explicitly defined in filterConfig
    const configItem = filterConfig[key] as FilterConfigItem;
    if (configItem?.type) {
      return configItem.type;
    }

    // If sampleData is provided, infer from the value type
    if (sampleData && typeof sampleData === "object" && sampleData !== null) {
      const value = (sampleData as any)[key];
      const valueType = typeof value;

      if (valueType === "number") {
        return "number";
      }
      if (value instanceof Date) {
        return "date";
      }
      if (valueType === "string") {
        // Check if it looks like an email
        if (value.includes("@")) {
          return "email";
        }
        // Check if it looks like a date string
        if (!isNaN(Date.parse(value))) {
          return "date";
        }
      }
    }

    return "text";
  };

  const handleChipClick = (
    event: React.MouseEvent<HTMLElement>,
    key: keyof T
  ) => {
    event.stopPropagation();
    const target = event.currentTarget;

    if (popperAnchor && selectedKey === key) {
      // Close if clicking on the same chip
      setPopperAnchor(null);
      setSelectedKey(null);
      setFilterValue("");
    } else {
      // Open popper for this chip
      setPopperAnchor(target);
      setSelectedKey(key);
      // Load saved filter value if it exists
      setFilterValue(filterValues.get(key) || "");
    }
  };

  const [tabsValue, setTabsValue] = useState(0);

  const handleTabsChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
  };

  const handleClickAway = () => {
    setPopperAnchor(null);
    setSelectedKey(null);
    setFilterValue("");
  };

  const handleFilterApply = () => {
    if (onFilterApply && selectedKey) {
      onFilterApply(selectedKey, filterValue);
      // Save the filter value
      setFilterValues((prev) => {
        const newMap = new Map(prev);
        newMap.set(selectedKey, filterValue);
        return newMap;
      });
    }
    setPopperAnchor(null);
    setSelectedKey(null);
    setFilterValue("");
  };

  const handleFilterButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterButtonAnchor(filterButtonAnchor ? null : event.currentTarget);
  };

  const handleFilterButtonClickAway = () => {
    setFilterButtonAnchor(null);
  };

  const handleVisibilityToggle = (key: keyof T) => {
    setVisibleFilters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const [value, setValue] = useState("");

  return (
    <Box width="100%">
      <Box py={4}>
        <Row>
          <Tabs
            aria-label="Customer tabs"
            value={tabsValue}
            onChange={handleTabsChange}
            bottomLine={false}
          >
            <Tab
              aria-controls="simple-tabpanel-0"
              id="individual-tab"
              label="Particulier"
            />
            <Tab
              aria-controls="simple-tabpanel-1"
              id="company-tab"
              label="Professionnel"
            />
          </Tabs>
          <InputSearch
            value={value}
            defaultSize="short"
            onChange={(e) => setValue(e.target.value)}
            onFilterClick={() => {}}
            fullWidth={false}
            sx={{
              justifyContent: "flex-end",
              "& .MuiInputBase-input": {
                flex: 0,
              },
            }}
          />
        </Row>
      </Box>
      <Row
        gap={4}
        flexWrap="wrap"
        py={4}
        borderTop={{ color: "borderNeutral" }}
        alignItems="center"
      >
        {Object.entries(filterConfig).map(([key, item]) => {
          const filterItem = item as FilterConfigItem;
          const IconComponent = filterItem.icon;

          if (!visibleFilters.has(key as keyof T)) {
            return null;
          }

          return (
            <Chip
              key={String(key)}
              label={
                <Typography color="neutral/50" variant="captionSemiBold">
                  {filterItem.label}
                </Typography>
              }
              onClick={(e) => handleChipClick(e, key as keyof T)}
              clicked={activeFilters.includes(key as keyof T)}
              color={
                activeFilters.includes(key as keyof T) ? "primary" : "neutral"
              }
              startIcon={IconComponent ? <IconComponent /> : undefined}
              endIcon={<Icon size={12}>arrow-down-01</Icon>}
            />
          );
        })}
        <Button
          size="small"
          color="neutral"
          variant="text"
          startIcon={<Icon size={16}>add-01</Icon>}
          onClick={handleFilterButtonClick}
        >
          Filter
        </Button>
      </Row>

      <Popper
        open={Boolean(popperAnchor)}
        anchorEl={popperAnchor}
        placement="bottom-start"
        style={{ zIndex: 1300 }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper elevation={3} sx={{ mt: 1 }}>
            <Box p={6}>
              <Column gap={4}>
                <TextField
                  placeholder="Entrez une valeur"
                  type={selectedKey ? inferInputType(selectedKey) : "text"}
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  fullWidth
                  autoFocus
                />
                <Button onClick={handleFilterApply} fullWidth>
                  Filter
                </Button>
              </Column>
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>

      <Popper
        open={Boolean(filterButtonAnchor)}
        anchorEl={filterButtonAnchor}
        placement="bottom-start"
        style={{ zIndex: 1300 }}
      >
        <ClickAwayListener onClickAway={handleFilterButtonClickAway}>
          <Paper elevation={3} sx={{ mt: 1 }}>
            <Box p={6} minWidth={200}>
              <Column gap={2}>
                {Object.entries(filterConfig).map(([key, item]) => {
                  const filterItem = item as FilterConfigItem;
                  return (
                    <Row key={String(key)} alignItems="center" gap={2}>
                      <Checkbox
                        name={String(key)}
                        checked={visibleFilters.has(key as keyof T)}
                        onChange={() => handleVisibilityToggle(key as keyof T)}
                      />
                      <Typography variant="bodyMRegular">
                        {filterItem.label}
                      </Typography>
                    </Row>
                  );
                })}
              </Column>
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default TableFilter;
