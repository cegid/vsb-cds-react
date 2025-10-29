import React from "react";
import Column from "../Column";
import { Popper } from "@cegid/cds-react";
import { ClickAwayListener } from "@mui/material";
import { ELEVATION_CSS, neutral } from "../../theme";
import Icon from "../Icon";
import Typography from "../Typography";
import Row from "../Row";
import { ChartAction } from "./ChartHeader";

interface ChartMoreActionsPopperProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  actions: ChartAction[];
}

const ChartMoreActionsPopper: React.FC<ChartMoreActionsPopperProps> = ({
  open,
  anchorEl,
  onClose,
  actions,
}) => {
  if (!open) return null;

  return (
    <ClickAwayListener onClickAway={onClose}>
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
          {actions.map((action, index) => (
            <Row
              key={`${action.label}-${index}`}
              py={2}
              px={4}
              borderRadius={4}
              backgroundColor="transparent"
              style={{
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = neutral[95];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              onClick={() => {
                action.onClick();
                onClose();
              }}
              alignItems="center"
              gap={4}
            >
              {action.icon && (
                <Icon size={16} color="neutral/50">
                  {action.icon}
                </Icon>
              )}
              <Typography variant="bodySMedium" color="neutral/50">
                {action.label}
              </Typography>
            </Row>
          ))}
        </Column>
      </Popper>
    </ClickAwayListener>
  );
};

export default ChartMoreActionsPopper;
