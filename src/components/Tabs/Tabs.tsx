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
});

const Tabs: React.FC<CegidTabsProps> = (props) => {
  const { children } = props;

  return <StyledTabs {...props}>{children}</StyledTabs>;
};

export default Tabs;
