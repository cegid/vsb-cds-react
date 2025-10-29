"use client";

import React from "react";
import { styled, TabsProps as CegidTabsProps } from "@cegid/cds-react";
import { neutral } from "../../theme";
import Box from "../Box";

export interface TabsProps extends CegidTabsProps {
  /**
   * Callback fired when the value changes
   */
  onChange?: (event: React.SyntheticEvent, newValue: number) => void;
  /**
   * The content of the component (Tab elements)
   */
  children?: React.ReactNode;
  /**
   * If true, the tabs will take up the full width of its container
   */
  fullwidth?: boolean;
  /**
   * If true, displays a bottom line indicator under tabs
   */
  bottomLine?: boolean;
  /**
   * Centered tabs
   */
  centered?: boolean;
}

const TabsRoot = styled(Box)<{ fullwidth?: boolean }>(({ fullwidth }) => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  justifyContent: "flex-start",
  minHeight: "34px",
  gap: 8,
  ...(fullwidth && { width: "100%" }),
}));

const BottomLineContainer = styled(Box)({
  position: "relative",
  height: "1px",
  marginTop: "4px",
});

const BottomLine = styled(Box)<{ width: number }>(({ width }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: `${width}px`,
  height: "1px",
  backgroundColor: neutral[95],
}));

const ActiveBottomLine = styled(Box)<{ left: number; width: number }>(
  ({ left, width }) => ({
    position: "absolute",
    top: 0,
    left: `${left}px`,
    width: `${width}px`,
    height: "1px",
    backgroundColor: neutral[10],
    transition: "all 0.3s ease",
    borderRadius: "1px",
  })
);

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value = 0,
      onChange,
      children,
      fullwidth = false,
      bottomLine = true,
      centered = false,
      ...props
    },
    ref
  ) => {
    const [activeLinePosition, setActiveLinePosition] = React.useState({
      left: 0,
      width: 0,
    });
    const [tabsContainerWidth, setTabsContainerWidth] = React.useState(0);
    const tabRefs = React.useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const childArray = React.Children.toArray(children);
      let activeIndex = 0;

      childArray.forEach((child, index) => {
        if (React.isValidElement(child) && child.props.value !== undefined) {
          if (child.props.value === value) {
            activeIndex = index;
          }
        } else if (index === value) {
          activeIndex = index;
        }
      });

      const activeTab = tabRefs.current[activeIndex];
      const container = containerRef.current;

      if (activeTab && container) {
        const containerRect = container.getBoundingClientRect();
        const tabRect = activeTab.getBoundingClientRect();

        setActiveLinePosition({
          left: tabRect.left - containerRect.left,
          width: tabRect.width,
        });

        setTabsContainerWidth(containerRect.width);
      }
    }, [value, children]);

    const handleTabClick =
      (
        index: number,
        tabValue: any,
        tabOnClick?: (event: React.MouseEvent<HTMLDivElement>) => void
      ) =>
      (event: React.MouseEvent<HTMLDivElement>) => {
        const childArray = React.Children.toArray(children);
        const clickedTab = childArray[index];

        if (React.isValidElement(clickedTab) && clickedTab.props.disabled) {
          return;
        }

        const valueToPass = tabValue !== undefined ? tabValue : index;
        onChange?.(event, valueToPass);
        tabOnClick?.(event);
      };

    const modifiedChildren = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        const childValue = child.props.value;
        const isSelected =
          childValue !== undefined ? value === childValue : value === index;

        return React.cloneElement(child, {
          ...child.props,
          selected: isSelected,
          onClick: handleTabClick(index, childValue, child.props.onClick),
          hideBottomLine: !bottomLine,
          ref: (el: HTMLDivElement | null) => {
            tabRefs.current[index] = el;
          },
        } as any);
      }
      return child;
    });

    return (
      <Box ref={ref} {...props}>
        <TabsRoot ref={containerRef} fullwidth={fullwidth}>
          {modifiedChildren}
        </TabsRoot>
        {bottomLine && (
          <BottomLineContainer>
            <BottomLine width={tabsContainerWidth} />
            <ActiveBottomLine
              left={activeLinePosition.left}
              width={activeLinePosition.width}
            />
          </BottomLineContainer>
        )}
      </Box>
    );
  }
);

Tabs.displayName = "Tabs";

export default Tabs;
