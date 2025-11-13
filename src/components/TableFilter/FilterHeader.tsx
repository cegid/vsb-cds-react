import React, { useState, forwardRef } from "react";
import Box from "../Box";
import Row from "../Row";
import { InputSearch } from "..";

interface FilterHeaderProps {
  onFilterClick: () => void;
  leftContent?: React.ReactNode;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
}

const FilterHeader = forwardRef<HTMLButtonElement, FilterHeaderProps>(
  ({ onFilterClick, leftContent, searchValue: externalSearchValue, onSearchChange, searchPlaceholder }, ref) => {
    const [internalSearchValue, setInternalSearchValue] = useState("");

    const searchValue = externalSearchValue !== undefined ? externalSearchValue : internalSearchValue;
    const handleSearchChange = onSearchChange || ((e) => setInternalSearchValue(e.target.value));

    return (
      <Box py={4}>
        <Row gap={5}>
          {leftContent}
          <Box width={"100%"}>
            <InputSearch
              value={searchValue}
              defaultSize="short"
              onChange={handleSearchChange}
              onFilterClick={onFilterClick}
              filterButtonRef={ref as React.RefObject<HTMLButtonElement>}
              placeholder={searchPlaceholder}
              fullWidth={false}
              sx={{
                justifyContent: "flex-end",
                "& .MuiInputBase-input": {
                  flex: 0,
                },
              }}
            />
          </Box>
        </Row>
      </Box>
    );
  }
);

FilterHeader.displayName = "FilterHeader";

export default FilterHeader;
