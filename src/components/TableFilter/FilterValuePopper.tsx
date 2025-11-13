import React, { useState, useEffect, useMemo } from "react";
import { Popper, ClickAwayListener, Paper, InputAdornment, MenuItem } from "@mui/material";
import Box from "../Box";
import Column from "../Column";
import Row from "../Row";
import TextField from "../TextField";
import Button from "../Button";
import Icon from "../Icon";
import DatePicker from "../DatePicker";
import Select from "../Select";
import Typography from "../Typography";
import Checkbox from "../Checkbox";
import Status, { StatusColor } from "../Status";
import InputSearch from "../InputSearch";
import { FilterInputType, SelectOption, LabelOption } from "./TableFilter";

interface FilterValuePopperProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  filterValue: string;
  inputType: FilterInputType;
  filterLabel: string;
  filterIcon?: React.ComponentType<any>;
  inputSuffix?: React.ReactNode;
  selectOptions?: SelectOption[];
  labelOptions?: LabelOption[];
  onFilterChange: (value: string) => void;
  onClickAway: () => void;
  onDelete: () => void;
  onReset: () => void;
}

const FilterValuePopper: React.FC<FilterValuePopperProps> = ({
  open,
  anchorEl,
  filterValue,
  inputType,
  filterLabel,
  filterIcon,
  inputSuffix,
  selectOptions,
  labelOptions,
  onFilterChange,
  onClickAway,
  onDelete,
  onReset,
}) => {
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [labelSearchQuery, setLabelSearchQuery] = useState("");

  const labelColors = useMemo<Map<string, StatusColor>>(() => {
    const colors: StatusColor[] = [
      "primary", "secondary", "success", "critical", "yellow", "info", "purple", "pink", "banana", "plum", "beige", "neutral"
    ];
    const colorMap = new Map<string, StatusColor>();
    let colorIndex = 0;

    labelOptions?.forEach((option) => {
      if (option.color) {
        colorMap.set(option.value, option.color);
      } else {
        colorMap.set(option.value, colors[colorIndex % colors.length]);
        colorIndex++;
      }
    });

    return colorMap;
  }, [labelOptions]);

  const filteredLabelOptions = useMemo(() => {
    if (!labelSearchQuery || !labelOptions) return labelOptions || [];
    return labelOptions.filter((option) =>
      option.label.toLowerCase().includes(labelSearchQuery.toLowerCase())
    );
  }, [labelOptions, labelSearchQuery]);

  useEffect(() => {
    if (inputType === "numberRange" && filterValue) {
      const parts = filterValue.split("-");
      if (parts.length === 2) {
        setRangeStart(parts[0]);
        setRangeEnd(parts[1]);
      }
    } else if (inputType !== "numberRange") {
      setRangeStart("");
      setRangeEnd("");
    }
  }, [filterValue, inputType]);

  useEffect(() => {
    if (inputType === "labels") {
      if (filterValue) {
        setSelectedLabels(filterValue.split(",").filter(Boolean));
      } else {
        setSelectedLabels([]);
      }
    } else {
      setSelectedLabels([]);
    }
  }, [filterValue, inputType]);

  const handleRangeChange = (start: string, end: string) => {
    if (start || end) {
      onFilterChange(`${start}-${end}`);
    } else {
      onFilterChange("");
    }
  };

  const handleLabelToggle = (value: string) => {
    const newSelected = selectedLabels.includes(value)
      ? selectedLabels.filter((v) => v !== value)
      : [...selectedLabels, value];

    setSelectedLabels(newSelected);
    onFilterChange(newSelected.join(","));
  };

  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
      <ClickAwayListener onClickAway={onClickAway} mouseEvent="onMouseDown">
        <Paper elevation={3} sx={{ mt: 2, minWidth: 340, maxWidth: 375 }}>
          <Box p={6}>
            <Column gap={4}>
              <Row gap={2} alignItems="center" justifyContent="space-between">
                <Row gap={2} alignItems="center">
                  <Typography variant="bodyMSemiBold" color="neutral/10">
                    {filterLabel}
                  </Typography>
                </Row>
                <Box
                  onClick={onDelete}
                  sx={{ cursor: "pointer" }}
                >
                  <Icon size={16} color="neutral/50">
                    delete-01
                  </Icon>
                </Box>
              </Row>
              {inputType === "numberRange" ? (
                <Row gap={2}>
                  <TextField
                    label="Début"
                    placeholder="Min"
                    type="number"
                    value={rangeStart}
                    onChange={(e) => {
                      setRangeStart(e.target.value);
                      handleRangeChange(e.target.value, rangeEnd);
                    }}
                    autoFocus
                    InputProps={
                      inputSuffix
                        ? {
                            endAdornment: (
                              <InputAdornment position="end">
                                {inputSuffix}
                              </InputAdornment>
                            ),
                          }
                        : undefined
                    }
                  />
                  <TextField
                    label="Fin"
                    placeholder="Max"
                    type="number"
                    value={rangeEnd}
                    onChange={(e) => {
                      setRangeEnd(e.target.value);
                      handleRangeChange(rangeStart, e.target.value);
                    }}
                    InputProps={
                      inputSuffix
                        ? {
                            endAdornment: (
                              <InputAdornment position="end">
                                {inputSuffix}
                              </InputAdornment>
                            ),
                          }
                        : undefined
                    }
                  />
                </Row>
              ) : inputType === "date" ? (
                <DatePicker
                  static
                  fullWidth
                  value={filterValue ? new Date(filterValue) : undefined}
                  onChange={(newValue) => {
                    if (newValue instanceof Date) {
                      onFilterChange(newValue.toISOString());
                    } else {
                      onFilterChange("");
                    }
                  }}
                />
              ) : inputType === "select" && selectOptions ? (
                <Select
                  value={filterValue}
                  placeholder="Sélectionnez une option"
                  onChange={(e) => onFilterChange(e.target.value as string)}
                  fullWidth
                  outlined={true}
                >
                  {selectOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              ) : inputType === "labels" && labelOptions ? (
                <Column gap={4}>
                  <InputSearch
                    value={labelSearchQuery}
                    onChange={(e) => setLabelSearchQuery(e.target.value)}
                    placeholder="Rechercher..."
                    defaultSize="long"
                    fullwidth={true}
                  />
                  <Column gap={4}>
                    {filteredLabelOptions.map((option) => (
                      <Row
                        key={option.value}
                        gap={4}
                        alignItems="center"
                        onClick={() => handleLabelToggle(option.value)}
                        sx={{ cursor: "pointer" }}
                      >
                        <Checkbox
                          name={option.value}
                          checked={selectedLabels.includes(option.value)}
                          onChange={() => handleLabelToggle(option.value)}
                        />
                        <Status
                          label={option.label}
                          color={labelColors.get(option.value) || "primary"}
                          size="small"
                        />
                      </Row>
                    ))}
                  </Column>
                </Column>
              ) : (
                <TextField
                  placeholder="Entrez une valeur"
                  type={inputType}
                  value={filterValue}
                  onChange={(e) => onFilterChange(e.target.value)}
                  fullWidth
                  autoFocus
                  InputProps={
                    inputSuffix
                      ? {
                          endAdornment: (
                            <InputAdornment position="end">
                              {inputSuffix}
                            </InputAdornment>
                          ),
                        }
                      : undefined
                  }
                />
              )}
              <Button
                variant="text"
                color="neutral"
                fullWidth
                onClick={onReset}
              >
                Réinitialiser
              </Button>
            </Column>
          </Box>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default FilterValuePopper;
