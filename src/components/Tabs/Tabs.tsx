"use client";

import {
  Tabs as CegidTabs,
  TabsProps as CegidTabsProps,
  styled,
} from "@cegid/cds-react";
import React from "react";

export interface TabsProps extends CegidTabsProps {
  fullwidth?: boolean;
  bottomLine?: boolean;
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
  const { children, fullwidth = false, bottomLine = true, ...otherProps } = props;

  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        hideBottomLine: !bottomLine,
      });
    }
    return child;
  });

  return (
    <StyledTabs fullwidth={fullwidth} {...otherProps}>
      {modifiedChildren}
    </StyledTabs>
  );
};

export default Tabs;
