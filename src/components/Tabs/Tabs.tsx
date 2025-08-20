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

const StyledTabs = styled(CegidTabs, {
  shouldForwardProp: (prop: string) => prop !== 'fullwidth',
})<{ fullwidth: boolean }>(
  ({ fullwidth }) => ({
    "& .MuiTabs-indicator": {
      display: "none",
    },
    minHeight: "34px",
    ...(fullwidth && { width: "100%" }),
    "& .MuiTabs-root": {
      minHeight: "34px",
    },
  })
);

const Tabs: React.FC<TabsProps> = (props) => {
  const { children, fullwidth = false, bottomLine = true, onChange, ...otherProps } = props;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // Vérifier si le tab sélectionné est disabled
    const tabElements = React.Children.toArray(children);
    const selectedTab = tabElements[newValue];
    
    if (React.isValidElement(selectedTab) && selectedTab.props.disabled) {
      // Empêcher la sélection d'un tab disabled
      return;
    }
    
    onChange?.(event, newValue);
  };

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
    <StyledTabs fullwidth={fullwidth} onChange={handleChange} {...otherProps}>
      {modifiedChildren}
    </StyledTabs>
  );
};

export default Tabs;
