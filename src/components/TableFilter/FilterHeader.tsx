import React, { useState, forwardRef } from "react";
import Box from "../Box";
import Row from "../Row";
import Tabs from "../Tabs";
import Tab from "../Tab";
import { InputSearch } from "..";

interface FilterHeaderProps {
  onFilterClick: () => void;
}

const FilterHeader = forwardRef<HTMLButtonElement, FilterHeaderProps>(
  ({ onFilterClick }, ref) => {
    const [tabsValue, setTabsValue] = useState(0);
    const [searchValue, setSearchValue] = useState("");

    const handleTabsChange = (
      event: React.SyntheticEvent,
      newValue: number
    ) => {
      setTabsValue(newValue);
    };

    return (
      <Box py={4}>
        <Row gap={5}>
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
          <Box width={"100%"}>
            <InputSearch
              value={searchValue}
              defaultSize="short"
              onChange={(e) => setSearchValue(e.target.value)}
              onFilterClick={onFilterClick}
              filterButtonRef={ref as React.RefObject<HTMLButtonElement>}
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
