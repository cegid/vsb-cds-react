"use client";

import {
  Tabs as CegidTabs,
  TabsProps as CegidTabsProps,
  styled,
} from "@cegid/cds-react";
import React from "react";

const StyledTabs = styled(CegidTabs)({
  "& .MuiTabs-indicator": {
    display: "none",
  },
  minHeight: "32px",
  "& .MuiTabs-root": {
    minHeight: "32px",
  },
});

const Tabs: React.FC<CegidTabsProps> = (props) => {
  const { children } = props;

  return <StyledTabs {...props}>{children}</StyledTabs>;
};

export default Tabs;
