"use client";

import {
  Tab as CegidTab,
  TabProps as CegidTabProps,
  styled,
} from "@cegid/cds-react";
import React from "react";
import { neutral } from "../../theme";
import typography from "../../theme/typography";

const StyledTab = styled(CegidTab)({
  color: neutral[50],
  opacity: 1,
  ...typography.bodySSemiBold,
  padding: "2px 8px",
  minHeight: "auto",
  position: "relative",
  overflow: "visible",
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

const Tab: React.FC<CegidTabProps> = (props) => {
  return <StyledTab {...props} disableRipple />;
};

export default Tab;
