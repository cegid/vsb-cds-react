import React from "react";
import Column from "../Column";
import { Popper } from "@cegid/cds-react";
import { ELEVATION_CSS, neutral } from "../../theme";
import Typography from "../Typography";
import Row from "../Row";

export type PeriodFilter = 3 | 6 | 12;

interface PeriodOption {
  value: PeriodFilter;
  label: string;
}

const periodOptions: PeriodOption[] = [
  { value: 3, label: "3 derniers mois" },
  { value: 6, label: "6 derniers mois" },
  { value: 12, label: "12 derniers mois" },
];
interface ChartPeriodPopperProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onPeriodSelect?: (period: PeriodFilter) => void;
  currentPeriod: PeriodFilter;
}

const ChartPeriodPopper: React.FC<ChartPeriodPopperProps> = ({
  open,
  anchorEl,
  onClose,
  onPeriodSelect,
  currentPeriod,
}) => {
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      style={{ zIndex: 9999 }}
    >
      <Column
        p={4}
        mt={2}
        borderRadius={4}
        backgroundColor="white"
        border={{ color: "neutral/60", opacity: 30 }}
        boxShadow={ELEVATION_CSS.LEVEL_6}
        gap={2}
      >
        {periodOptions.map((option) => (
          <Row
            key={option.value}
            py={2}
            px={4}
            borderRadius={4}
            backgroundColor={
              currentPeriod === option.value ? "primary/95" : "transparent"
            }
            style={{
              cursor: "pointer",
              transition: "background-color 0.2s ease"
            }}
            onMouseEnter={(e) => {
              if (currentPeriod !== option.value) {
                e.currentTarget.style.backgroundColor = neutral[95];
              }
            }}
            onMouseLeave={(e) => {
              if (currentPeriod !== option.value) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
            onClick={() => {
              onPeriodSelect && onPeriodSelect(option.value);
              onClose();
            }}
            alignItems="center"
            gap={4}
          >
            <Typography variant="bodySMedium" color="neutral/50">
              {option.label}
            </Typography>
          </Row>
        ))}
      </Column>
    </Popper>
  );
};

export default ChartPeriodPopper;
