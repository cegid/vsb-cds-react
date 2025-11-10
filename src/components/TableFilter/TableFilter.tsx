"use client";

import React, { useState, useRef, useEffect } from "react";
import Box from "../Box";
import Row from "../Row";
import Button from "../Button";
import Icon from "../Icon";
import FilterHeader from "./FilterHeader";
import FilterChip from "./FilterChip";
import FilterValuePopper from "./FilterValuePopper";
import FilterSelectionPopper from "./FilterSelectionPopper";
import { StatusColor } from "../Status";

export type FilterInputType =
  | "text"
  | "number"
  | "numberRange"
  | "date"
  | "email"
  | "select"
  | "labels";

export interface SelectOption {
  value: string;
  label: string;
}

export interface LabelOption {
  value: string;
  label: string;
  color?: StatusColor;
}

export interface FilterConfigItem {
  label: string;
  icon?: React.ComponentType<any>;
  type?: FilterInputType;
  inputSuffix?: React.ReactNode;
  selectOptions?: SelectOption[];
  labelOptions?: LabelOption[];
}

export interface TableFilterProps<T = any> {
  filterConfig: Partial<Record<keyof T, FilterConfigItem>>;
  onFilterApply?: (
    attributeKey: keyof T,
    value: string,
    activeFilters: (keyof T)[]
  ) => void;
  activeFilters?: (keyof T)[];
  sampleData?: T;
  leftContent?: React.ReactNode;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
  localStorageKey?: string;
}

const TableFilter = <T,>({
  filterConfig,
  onFilterApply,
  activeFilters = [],
  sampleData,
  leftContent,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  localStorageKey,
}: TableFilterProps<T>) => {
  const [popperAnchor, setPopperAnchor] = useState<HTMLElement | null>(null);
  const [selectedKey, setSelectedKey] = useState<keyof T | null>(null);
  const [filterValue, setFilterValue] = useState("");
  const [filterButtonAnchor, setFilterButtonAnchor] =
    useState<HTMLElement | null>(null);
  const [visibleFilters, setVisibleFilters] = useState<Set<keyof T>>(
    () => new Set(activeFilters)
  );
  const [filterValues, setFilterValues] = useState<Map<keyof T, string>>(
    new Map()
  );
  const [showAddFilterButton, setShowAddFilterButton] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  const inferInputType = (key: keyof T): FilterInputType => {
    const configItem = filterConfig[key] as FilterConfigItem;
    if (configItem?.type) {
      return configItem.type;
    }

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
        if (value.includes("@")) {
          return "email";
        }
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
      setPopperAnchor(null);
      setSelectedKey(null);
      setFilterValue("");
    } else {
      setPopperAnchor(target);
      setSelectedKey(key);
      setFilterValue(filterValues.get(key) || "");
    }
  };

  const handleClickAway = () => {
    setPopperAnchor(null);
    setSelectedKey(null);
    setFilterValue("");
  };

  const handleFilterChange = (newValue: string) => {
    setFilterValue(newValue);

    if (onFilterApply && selectedKey) {
      const updatedActiveFilters =
        newValue === ""
          ? activeFilters.filter((k) => k !== selectedKey)
          : activeFilters.includes(selectedKey)
            ? activeFilters
            : [...activeFilters, selectedKey];

      onFilterApply(selectedKey, newValue, updatedActiveFilters);
      setFilterValues((prev) => {
        const newMap = new Map(prev);
        newMap.set(selectedKey, newValue);
        return newMap;
      });
    }
  };

  const addFilterButtonRef = useRef<HTMLButtonElement>(null);

  const handleFilterButtonClick = () => {
    setFilterButtonAnchor(filterButtonAnchor ? null : filterButtonRef.current);
  };

  const handleAddFilterClick = () => {
    setFilterButtonAnchor(filterButtonAnchor ? null : addFilterButtonRef.current);
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
        // Hide add filter button once a filter is added
        setShowAddFilterButton(false);
      }

      const totalFilters = Object.keys(filterConfig).length;
      if (newSet.size === totalFilters) {
        setFilterButtonAnchor(null);
      }

      return newSet;
    });
  };

  const handleDeleteFilter = () => {
    if (selectedKey) {
      setVisibleFilters((prev) => {
        const newSet = new Set(prev);
        newSet.delete(selectedKey);
        return newSet;
      });
      setPopperAnchor(null);
      setSelectedKey(null);
      setFilterValue("");
    }
  };

  const handleResetFilter = () => {
    if (selectedKey) {
      setFilterValue("");
      if (onFilterApply) {
        const updatedActiveFilters = activeFilters.filter(
          (k) => k !== selectedKey
        );
        onFilterApply(selectedKey, "", updatedActiveFilters);
      }
      setFilterValues((prev) => {
        const newMap = new Map(prev);
        newMap.set(selectedKey, "");
        return newMap;
      });
    }
  };

  const handleResetAllFilters = () => {
    // Clear all visible filters
    setVisibleFilters(new Set());
    // Clear all filter values
    setFilterValues(new Map());
    // Show add filter button after reset
    setShowAddFilterButton(true);
    // Clear localStorage
    if (localStorageKey) {
      localStorage.removeItem(localStorageKey);
    }
    // Notify parent to clear active filters
    if (onFilterApply) {
      // Call onFilterApply for each active filter with empty value
      activeFilters.forEach((key) => {
        onFilterApply(key, "", []);
      });
    }
  };

  const handleSaveFilters = () => {
    if (localStorageKey) {
      const filtersToSave = {
        visibleFilters: Array.from(visibleFilters),
        filterValues: Object.fromEntries(filterValues),
      };
      localStorage.setItem(localStorageKey, JSON.stringify(filtersToSave));
    }
  };

  useEffect(() => {
    if (localStorageKey) {
      const savedFilters = localStorage.getItem(localStorageKey);
      if (savedFilters) {
        try {
          const {
            visibleFilters: savedVisibleFilters,
            filterValues: savedFilterValues,
          } = JSON.parse(savedFilters);

          if (savedVisibleFilters && Array.isArray(savedVisibleFilters)) {
            setVisibleFilters(new Set(savedVisibleFilters));
          }

          if (savedFilterValues && typeof savedFilterValues === "object") {
            const newMap = new Map(Object.entries(savedFilterValues)) as Map<
              keyof T,
              string
            >;
            setFilterValues(newMap);

            // Notify parent about active filters (those with values)
            if (onFilterApply) {
              const activeKeys = Object.entries(savedFilterValues)
                .filter(([_, value]) => value !== "")
                .map(([key]) => key as keyof T);

              // Call onFilterApply for each active filter to sync state
              activeKeys.forEach((key) => {
                const value = savedFilterValues[key as string];
                if (value) {
                  onFilterApply(key, value, activeKeys);
                }
              });
            }
          }
        } catch (e) {
          console.error("Failed to load filters from localStorage:", e);
        }
      }
    }
  }, [localStorageKey]);

  return (
    <Box width="100%">
      <FilterHeader
        ref={filterButtonRef}
        onFilterClick={handleFilterButtonClick}
        leftContent={leftContent}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        searchPlaceholder={searchPlaceholder}
      />

      <Row
        gap={4}
        flexWrap="wrap"
        py={4}
        borderTop={{ color: "borderNeutral" }}
        alignItems="center"
        justifyContent="flex-end"
      >
        <Row
          gap={4}
          flexWrap="wrap"
          alignItems="center"
          width={"auto"}
          flex={1}
        >
          {Object.entries(filterConfig).map(([key, item]) => {
            const filterItem = item as FilterConfigItem;

            if (!visibleFilters.has(key as keyof T)) {
              return null;
            }

            return (
              <FilterChip
                key={String(key)}
                filterKey={key as keyof T}
                filterItem={filterItem}
                isActive={activeFilters.includes(key as keyof T)}
                onClick={(e) => handleChipClick(e, key as keyof T)}
              />
            );
          })}
          {(visibleFilters.size > 0 || showAddFilterButton) && (
            <Button
              ref={addFilterButtonRef}
              variant="text"
              color="neutral"
              size="small"
              startIcon={<Icon size={14}>add-01</Icon>}
              onClick={handleAddFilterClick}
            >
              Filtrer
            </Button>
          )}
        </Row>
        {visibleFilters.size > 0 && (
          <Row gap={4} alignItems="center" width={"auto"}>
            <Button
              variant="text"
              color="neutral"
              size="small"
              onClick={handleResetAllFilters}
            >
              Réinitialiser
            </Button>
            {localStorageKey && (
              <Button
                variant="tonal"
                color="neutral"
                size="small"
                onClick={handleSaveFilters}
              >
                Enregistrer
              </Button>
            )}
          </Row>
        )}
      </Row>

      <FilterValuePopper
        open={Boolean(popperAnchor)}
        anchorEl={popperAnchor}
        filterValue={filterValue}
        inputType={selectedKey ? inferInputType(selectedKey) : "text"}
        filterLabel={
          selectedKey ? (filterConfig[selectedKey]?.label ?? "") : ""
        }
        filterIcon={selectedKey ? filterConfig[selectedKey]?.icon : undefined}
        inputSuffix={
          selectedKey ? filterConfig[selectedKey]?.inputSuffix : undefined
        }
        selectOptions={
          selectedKey ? filterConfig[selectedKey]?.selectOptions : undefined
        }
        labelOptions={
          selectedKey ? filterConfig[selectedKey]?.labelOptions : undefined
        }
        onFilterChange={handleFilterChange}
        onClickAway={handleClickAway}
        onDelete={handleDeleteFilter}
        onReset={handleResetFilter}
      />

      <FilterSelectionPopper
        open={Boolean(filterButtonAnchor)}
        anchorEl={filterButtonAnchor}
        filterConfig={filterConfig}
        visibleFilters={visibleFilters}
        onVisibilityToggle={handleVisibilityToggle}
        onClickAway={handleFilterButtonClickAway}
      />
    </Box>
  );
};

export default TableFilter;
