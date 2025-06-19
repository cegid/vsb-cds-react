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
}

const StyledTab = styled(CegidTab)({
  color: neutral[50],
  opacity: 1,
  ...typography.bodySSemiBold,
  padding: "2px 8px",
  minHeight: "auto",
  position: "relative",
  overflow: "visible",
  flex: 1,
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-5px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    height: "1px",
    borderRadius: "1px",
    transition: "background-color 0.3s ease",
    backgroundColor: neutral[95],
  },
  "&.Mui-selected": {
    color: neutral[10],
    backgroundColor: neutral[99],
    border: `solid 1px ${neutral[95]}`,
    borderRadius: "8px",
    "&::after": {
      backgroundColor: neutral[10],
      bottom: "-6px",
    },
  },
  "&:hover": {
    backgroundColor: neutral[99],
    borderRadius: "8px",
  },
});

const TabContent = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const Tab: React.FC<TabProps> = ({ badge, label, children, ...props }) => {
  const tabContent = badge ? (
    <TabContent>
      {label || children}
      <Badge {...badge} />
    </TabContent>
  ) : (
    label || children
  );

  return <StyledTab {...props} label={tabContent} disableRipple />;
};

export default Tab;
