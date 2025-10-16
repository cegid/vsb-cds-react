"use client";

import React from "react";
import { styled } from "@cegid/cds-react";
import { neutral } from "../../theme";
import typography from "../../theme/typography";
import Badge, { BadgeProps } from "../Badge";
import Box from "../Box";

export interface TabProps {
  /**
   * The label content for the tab
   */
  label?: React.ReactNode;
  /**
   * Alternative to label, can use children
   */
  children?: React.ReactNode;
  /**
   * Optional badge configuration to display next to the tab label.
   * When provided, renders a Badge component with the specified props on the right side of the tab text.
   */
  badge?: BadgeProps;
  /**
   * Optional badge configuration to display next to the tab label.
   * When provided, renders a Badge component with the specified props on the left side of the tab text.
   */
  startBadge?: BadgeProps;
  /**
   * Controls whether the tab is disabled.
   * When true, the tab text color becomes neutral/80 and onClick events are prevented.
   */
  disabled?: boolean;
  /**
   * Whether this tab is currently selected
   */
  selected?: boolean;
  /**
   * Click handler for the tab
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Value associated with this tab (used by parent Tabs component)
   */
  value?: any;
  /**
   * Internal prop set by Tabs component to hide bottom line
   */
  hideBottomLine?: boolean;
}

const TabRoot = styled(Box)<{ selected?: boolean; disabled?: boolean }>(
  ({ selected, disabled }) => ({
    color: disabled ? neutral[80] : selected ? neutral[10] : neutral[50],
    opacity: 1,
    minHeight: "auto",
    position: "relative",
    overflow: "visible",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    userSelect: "none",
    ...typography.bodyMRegular,
    ...(selected && {
      ...typography.bodyMSemiBold,
    }),
  })
);

const TabContent = styled(Box)<{
  selected?: boolean;
  disabled?: boolean;
  isHovered?: boolean;
}>(({ selected, disabled, isHovered }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  border: "solid 1px transparent",
  borderRadius: "8px",
  padding: "4px 8px",
  transition: "all 0.2s ease",
  ...(selected && {
    backgroundColor: disabled ? "transparent" : neutral[99],
    border: disabled ? "solid 1px transparent" : `solid 1px ${neutral[95]}`,
  }),
  ...(isHovered &&
    !selected && {
      border: disabled ? "solid 1px transparent" : `solid 1px ${neutral[95]}`,
    }),
}));

const Tab = React.forwardRef<HTMLDivElement, TabProps>(
  (
    {
      badge,
      label,
      children,
      startBadge,
      disabled = false,
      selected = false,
      onClick,
      value,
      hideBottomLine,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    };

    const tabContent = (
      <TabContent
        selected={selected}
        disabled={disabled}
        isHovered={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {startBadge && <Badge {...startBadge} />}
        {label || children}
        {badge && <Badge {...badge} />}
      </TabContent>
    );

    return (
      <TabRoot
        ref={ref}
        selected={selected}
        disabled={disabled}
        onClick={handleClick}
        {...props}
      >
        {tabContent}
      </TabRoot>
    );
  }
);

Tab.displayName = "Tab";

export default Tab;
