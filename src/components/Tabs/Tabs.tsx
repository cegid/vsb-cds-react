"use client";

import {
  Tabs as CegidTabs,
  TabsProps as CegidTabsProps,
  styled,
} from "@cegid/cds-react";
import React from "react";

export interface TabsProps extends CegidTabsProps {
  fullwidth?: boolean;
}

const StyledTabs = styled(CegidTabs)<{ fullwidth: boolean }>(
  ({ fullwidth }) => ({
    "& .MuiTabs-indicator": {
      display: "none",
    },
    minHeight: "32px",
    ...(fullwidth && { width: "100%" }),
    "& .MuiTabs-root": {
      minHeight: "32px",
    },
  })
);

const Tabs: React.FC<TabsProps> = (props) => {
  const { children, fullwidth = false, ...otherProps } = props;

  return (
    <StyledTabs fullwidth={fullwidth} {...otherProps}>
      {children}
    </StyledTabs>
  );
};

export default Tabs;
