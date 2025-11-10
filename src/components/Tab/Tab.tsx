"use client";

import React from "react";
import { styled, TabProps as CegidTabProps } from "@cegid/cds-react";
import { neutral } from "../../theme";
import typography from "../../theme/typography";
import Badge, { BadgeProps } from "../Badge";
import Box from "../Box";

export interface TabProps extends Omit<CegidTabProps, 'children' | 'selected' | 'disabled' | 'onClick'> {
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
   * Internal prop set by Tabs component to hide bottom line
   */
  hideBottomLine?: boolean;
}

const TabRoot = styled(Box)<{ selected?: boolean; disabled?: boolean }>(
  ({ disabled }) => ({
    opacity: 1,
    minHeight: "auto",
    position: "relative",
    overflow: "visible",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
  })
);

const TabContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isHovered",
})<{
  selected?: boolean;
  disabled?: boolean;
  isHovered?: boolean;
}>(({ selected, disabled, isHovered }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  border: "solid 1px transparent",
  borderRadius: "8px",
  padding: "4px 8px",
  transition: "color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease",
  position: "relative",
  color: neutral[50],
  ...typography.bodyMRegular,
  ...(selected && {
    color: neutral[10],
    ...typography.bodyMSemiBold,
    backgroundColor: disabled ? "transparent" : neutral[99],
    border: disabled ? "solid 1px transparent" : `solid 1px ${neutral[95]}`,
  }),

  ...(isHovered && !selected && !disabled && {
    color: neutral[10],
    ...typography.bodyMMedium,
    border: `solid 1px ${neutral[95]}`,
  }),

  ...(disabled && {
    color: neutral[80],
  }),
}));

const TabLabel = styled("span")(() => ({
  position: "relative",
  display: "inline-block",

  "&::before": {
    content: "attr(data-text)",
    ...typography.bodyMSemiBold,
    height: 0,
    visibility: "hidden",
    overflow: "hidden",
    userSelect: "none",
    pointerEvents: "none",
    display: "block",
  },
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

    const textContent = label || children;
    const textString = typeof textContent === 'string' ? textContent : '';

    const tabContent = (
      <TabContent
        selected={selected}
        disabled={disabled}
        isHovered={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {startBadge && <Badge {...startBadge} />}
        {textString ? (
          <TabLabel data-text={textString}>
            {textContent}
          </TabLabel>
        ) : (
          textContent
        )}
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
