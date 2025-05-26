'use client';

import { Tab as CegidTab, TabProps as CegidTabProps, styled } from "@cegid/cds-react";
import { neutral, primary } from "@vsb-cds/theme";
import React from "react";

const StyledCegidTab = styled(CegidTab)({
  color: neutral[50],
  maxHeight: "30px",
  minHeight: 'unset',
  padding: '4px 8px',
  '&.Mui-selected': {
    color: primary[55],
  },
});

const Tab = React.forwardRef<HTMLDivElement, CegidTabProps>((props, ref) => {
  return <StyledCegidTab ref={ref} {...props} />;
});

export default Tab;