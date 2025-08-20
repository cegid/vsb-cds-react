"use client";

import {
  Tab as CegidTab,
  TabProps as CegidTabProps,
  styled,
} from "@cegid/cds-react";
import React from "react";
import { neutral } from "../../theme";
import typography from "../../theme/typography";
import Badge, { BadgeProps } from "../Badge";
import Box from "../Box";

export interface TabProps extends CegidTabProps {
  /**
   * Optional badge configuration to display next to the tab label.
   * When provided, renders a Badge component with the specified props on the right side of the tab text.
   * Supports all Badge variants (tonal, outlined) and sizes (small, medium).
   */
  badge?: BadgeProps;
  /**
   * Optional badge configuration to display next to the tab label.
   * When provided, renders a Badge component with the specified props on the left side of the tab text.
   * Supports all Badge variants (tonal, outlined) and sizes (small, medium).
   */
  startBadge?: BadgeProps;
  /**
   * Controls whether the bottom line under the tab is displayed.
   * When false, hides the bottom line indicator.
   */
  hideBottomLine?: boolean;
  /**
   * Controls whether the tab is disabled.
   * When true, the tab text color becomes neutral/80 and onClick events are prevented.
   */
  disabled?: boolean;
}

const StyledTab = styled(CegidTab, {
  shouldForwardProp: (prop: string) => !['hideBottomLine', 'disabled'].includes(prop),
})<{ hideBottomLine?: boolean; disabled?: boolean }>(
  ({ hideBottomLine, disabled }) => ({
    color: disabled ? neutral[80] : neutral[50],
    opacity: 1,
    padding: "2px 8px",
    minHeight: "auto",
    position: "relative",
    overflow: "visible",
    flex: "0 0 auto",
    border: "solid 1px transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    ...(!hideBottomLine && {
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: "-4px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        height: "1px",
        borderRadius: "1px",
        transition: "background-color 0.3s ease",
        backgroundColor: neutral[95],
      },
    }),
    "&.MuiButtonBase-root": {
      ...typography.bodyMRegular,
    },
    "&.Mui-selected": {
      color: disabled ? neutral[80] : neutral[10],
      ...typography.bodyMSemiBold,
      backgroundColor: disabled ? "transparent" : neutral[99],
      border: disabled ? "solid 1px transparent" : `solid 1px ${neutral[95]}`,
      borderRadius: "8px",
      ...(!hideBottomLine && !disabled && {
        "&::after": {
          backgroundColor: neutral[10],
          bottom: "-4px",
        },
      }),
    },
    "&:hover": {
      backgroundColor: disabled ? "transparent" : neutral[99],
      borderRadius: 8,
      border: disabled ? "solid 1px transparent" : `solid 1px ${neutral[95]}`,
    },
  })
);

const TabContent = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 4,
});

const Tab: React.FC<TabProps> = ({
  badge,
  label,
  children,
  startBadge,
  hideBottomLine,
  disabled,
  onClick,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  };
  const tabContent = badge ? (
    <TabContent>
      {startBadge && <Badge {...startBadge} />}
      {label || children}
      {badge && <Badge {...badge} />}
    </TabContent>
  ) : (
    label || children
  );

  return (
    <StyledTab
      {...props}
      label={tabContent}
      hideBottomLine={hideBottomLine}
      disabled={disabled}
      onClick={handleClick}
      disableRipple
    />
  );
};

export default Tab;
