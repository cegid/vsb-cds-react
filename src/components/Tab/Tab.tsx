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
}

const StyledTab = styled(CegidTab, {
  shouldForwardProp: (prop: string) => prop !== 'hideBottomLine',
})<{ hideBottomLine?: boolean }>(
  ({ hideBottomLine }) => ({
    color: neutral[50],
    opacity: 1,
    padding: "2px 8px",
    minHeight: "auto",
    position: "relative",
    overflow: "visible",
    flex: "0 0 auto",
    border: "solid 1px transparent",
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
      color: neutral[10],
      ...typography.bodyMSemiBold,
      backgroundColor: neutral[99],
      border: `solid 1px ${neutral[95]}`,
      borderRadius: "8px",
      ...(!hideBottomLine && {
        "&::after": {
          backgroundColor: neutral[10],
          bottom: "-4px",
        },
      }),
    },
    "&:hover": {
      backgroundColor: neutral[99],
      borderRadius: 8,
      border: `solid 1px ${neutral[95]}`,
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
  ...props
}) => {
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
      disableRipple
    />
  );
};

export default Tab;
