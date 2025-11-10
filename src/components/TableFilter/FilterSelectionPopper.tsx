import { Popper, ClickAwayListener, Paper } from "@mui/material";
import Box from "../Box";
import Column from "../Column";
import Typography from "../Typography";
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
            <Column gap={2}>
              {Object.entries(filterConfig)
                .filter(([key]) => !visibleFilters.has(key as keyof T))
                .map(([key, item]) => {
                  const filterItem = item as FilterConfigItem;
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
                      <Typography variant="bodySMedium" color="neutral/10">
                        {filterItem.label}
                      </Typography>
                    </Box>
                  );
                })}
            </Column>
          </Box>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default FilterSelectionPopper;
