"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme, useMediaQuery, Popper, ClickAwayListener, Paper } from "@mui/material";
import Box from "../Box";
import Typography from "../Typography";
import Icon from "../Icon";
import { neutral } from "../../theme";
import typography from "../../theme/typography";

/**
 * Configuration for a single action in the segmented control
 */
export interface SegmentedControlAction {
  /** Optional icon to display in the action */
  icon?: React.ReactNode;
  /** Optional label text to display in the action */
  label?: React.ReactNode;
  /** Callback function executed when the action is clicked */
  onClick: () => void;
  /** Whether this action is disabled (default: false) */
  disabled?: boolean;
}

/**
 * Props for the SegmentedControl component
 */
export interface SegmentedControlProps {
  /** Array of actions to display in the segmented control */
  actions: Array<SegmentedControlAction | SegmentedControlAction[]>;
  /** Index of the initially selected action (default: 0) */
  defaultSelected?: number;
  /** Whether the control should take the full width of its container */
  fullwidth?: boolean;
  /** Controlled selected index - when provided, overrides internal state */
  selectedIndex?: number;
  /** Color variant - light or dark theme (default: light) */
  color?: "light" | "dark";
  /** Size of the control - auto adapts to screen size, small is 32px, large is 40px (default: auto) */
  size?: "auto" | "small" | "large";
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  actions,
  defaultSelected = 0,
  fullwidth = false,
  selectedIndex: controlledSelectedIndex,
  color = "light",
  size = "auto",
}) => {
  const [internalSelectedIndex, setInternalSelectedIndex] =
    useState(defaultSelected);

  const selectedIndex =
    controlledSelectedIndex !== undefined
      ? controlledSelectedIndex
      : internalSelectedIndex;
  const [sliderTransform, setSliderTransform] = useState("translateX(0px)");
  const [sliderWidth, setSliderWidth] = useState("0px");
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedGroupActions, setSelectedGroupActions] = useState<Map<number, number>>(new Map());
  const [popperAnchor, setPopperAnchor] = useState<HTMLElement | null>(null);
  const [openPopperIndex, setOpenPopperIndex] = useState<number | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getHeight = () => {
    if (size === "small") return "32px";
    if (size === "large") return "40px";
    return isMobile ? "40px" : "32px";
  };

  const height = getHeight();

   const isActionGroup = (action: SegmentedControlAction | SegmentedControlAction[]): action is SegmentedControlAction[] => {
    return Array.isArray(action);
  };

  const getCurrentAction = (index: number): SegmentedControlAction => {
    const action = actions[index];
    if (isActionGroup(action)) {
      const selectedSubIndex = selectedGroupActions.get(index) ?? 0;
      return action[selectedSubIndex];
    }
    return action;
  };

  const displayActions = actions.map((_, index) => getCurrentAction(index));
  const isIconOnly = displayActions.every((action) => !action.label);

  useEffect(() => {
    updateSliderPosition();
  }, [selectedIndex]);
  
   useEffect(() => {
    const tooltipRenderTimer = setTimeout(updateSliderPosition, 200);
    return () => {
      clearTimeout(tooltipRenderTimer);
    };
  }, []);

  const updateSliderPosition = () => {
    if (containerRef.current && buttonRefs.current[selectedIndex]) {
      const container = containerRef.current;
      const selectedButton = buttonRefs.current[selectedIndex];

      if (selectedButton) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = selectedButton.getBoundingClientRect();

        const left = buttonRect.left - containerRect.left;
        const width = buttonRect.width;

        setSliderTransform(`translateX(${left}px)`);
        setSliderWidth(`${width}px`);
      }
    }
  };

  const handleActionClick = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    const action = actions[index];
    const currentAction = getCurrentAction(index);

    if (currentAction.disabled) {
      return;
    }

    if (isActionGroup(action)) {
      setPopperAnchor(event.currentTarget);
      setOpenPopperIndex(index);
    } else {
      setInternalSelectedIndex(index);
      currentAction.onClick();
    }
  };

  const handleGroupActionSelect = (groupIndex: number, actionIndex: number) => {
    const action = actions[groupIndex] as SegmentedControlAction[];
    const selectedAction = action[actionIndex];

    setSelectedGroupActions(prev => {
      const newMap = new Map(prev);
      newMap.set(groupIndex, actionIndex);
      return newMap;
    });

    setPopperAnchor(null);
    setOpenPopperIndex(null);

    setInternalSelectedIndex(groupIndex);
    selectedAction.onClick();

    setTimeout(updateSliderPosition, 0);
  };

  const handleClosePopper = () => {
    setPopperAnchor(null);
    setOpenPopperIndex(null);
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    backgroundColor: color === "dark" ? neutral[30] : neutral[99],
    borderRadius: "12px",
    padding: "2px",
    gap: "4px",
    width: fullwidth ? "100%" : "fit-content",
    height: height,
    ...typography.bodySSemiBold,
    "--slider-transform": sliderTransform,
    "--slider-width": sliderWidth,
  } as React.CSSProperties & Record<string, string>;

  const sliderBaseStyle: React.CSSProperties = {
    position: "absolute",
    top: "2px",
    left: "2px",
    height: "calc(100% - 4px)",
    width: "var(--slider-width)",
    backgroundColor: color === "dark" ? neutral[50] : "white",
    borderRadius: "10px",
    transform: "var(--slider-transform)",
    transition:
      "transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    zIndex: 1,
  };

  const getButtonStyle = (index: number): React.CSSProperties => {
    const currentAction = getCurrentAction(index);
    const isDisabled = currentAction.disabled || false;

    const buttonHeight = `calc(${height} - 4px)`;
    const buttonMinWidth = height === "40px" ? "36px" : "28px";

    return {
      position: "relative",
      zIndex: 2,
      display: "flex",
      alignItems: "center",
      gap: isIconOnly ? "0" : "8px",
      padding: isIconOnly ? "0 8px" : "0 16px",
      cursor: isDisabled ? "not-allowed" : "pointer",
      borderRadius: "8px",
      transition: "color 0.3s ease",
      border: "none",
      background: "none",
      fontSize: "14px",
      height: buttonHeight,
      minWidth: isIconOnly ? buttonMinWidth : "auto",
      justifyContent: "center",
      opacity: isDisabled ? 0.5 : 1,
    };
  };

  const iconStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
  };

  return (
    <>
      <Box ref={containerRef} style={containerStyle}>
        <Box style={sliderBaseStyle} />

        {actions.map((action, index) => {
          const currentAction = getCurrentAction(index);
          const isGroup = isActionGroup(action);

          return (
            <Box
              {...(fullwidth && { flex: 1 })}
              key={index}
              ref={(el) => (buttonRefs.current[index] = el)}
              onClick={(e) => handleActionClick(index, e)}
              style={getButtonStyle(index)}
            >
              {currentAction.icon && (
                <Box
                  style={iconStyle}
                  color={
                    color === "dark"
                      ? "white"
                      : selectedIndex === index
                        ? "neutral/10"
                        : "neutral/50"
                  }
                  onMouseEnter={(e) => {
                    if (!currentAction.disabled && selectedIndex !== index) {
                      e.currentTarget.style.color = (
                        color === "dark" ? "white" : neutral[10]
                      ) as string;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!currentAction.disabled && selectedIndex !== index) {
                      e.currentTarget.style.color =
                        color === "light" ? neutral[50] : "white";
                    }
                  }}
                >
                  {currentAction.icon}
                </Box>
              )}
              {currentAction.label && (
                <Typography
                  variant="bodySSemiBold"
                  color={
                    color === "dark"
                      ? "white"
                      : selectedIndex === index
                        ? "neutral/10"
                        : "neutral/50"
                  }
                  onMouseEnter={(e) => {
                    if (!currentAction.disabled && selectedIndex !== index) {
                      e.currentTarget.style.color = (
                        color === "dark" ? "white" : neutral[10]
                      ) as string;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!currentAction.disabled && selectedIndex !== index) {
                      e.currentTarget.style.color =
                        color === "light" ? neutral[50] : "white";
                    }
                  }}
                >
                  {currentAction.label}
                </Typography>
              )}
              {isGroup && (
                <Icon
                  size={16}
                  color={
                    color === "dark"
                      ? "white"
                      : selectedIndex === index
                        ? "neutral/10"
                        : "neutral/50"
                  }
                >
                  arrow-down-01
                </Icon>
              )}
            </Box>
          );
        })}
      </Box>

      <Popper
        open={Boolean(popperAnchor) && openPopperIndex !== null}
        anchorEl={popperAnchor}
        placement="bottom"
        style={{ zIndex: 1300 }}
      >
        <ClickAwayListener onClickAway={handleClosePopper}>
          <Paper
            elevation={3}
            style={{
              marginTop: "4px",
              borderRadius: "8px",
              overflow: "hidden",
              minWidth: popperAnchor?.offsetWidth || "auto",
            }}
          >
            {openPopperIndex !== null &&
              isActionGroup(actions[openPopperIndex]) &&
              (actions[openPopperIndex] as SegmentedControlAction[]).map(
                (groupAction, actionIndex) => (
                  <Box
                    key={actionIndex}
                    onClick={() =>
                      handleGroupActionSelect(openPopperIndex, actionIndex)
                    }
                    style={{
                      padding: "8px 16px",
                      cursor: groupAction.disabled ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      opacity: groupAction.disabled ? 0.5 : 1,
                      backgroundColor:
                        selectedGroupActions.get(openPopperIndex) === actionIndex
                          ? color === "dark"
                            ? neutral[30]
                            : neutral[95]
                          : "transparent",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!groupAction.disabled) {
                        e.currentTarget.style.backgroundColor =
                          color === "dark" ? neutral[40] : neutral[90];
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!groupAction.disabled) {
                        e.currentTarget.style.backgroundColor =
                          selectedGroupActions.get(openPopperIndex) === actionIndex
                            ? color === "dark"
                              ? neutral[30]
                              : neutral[95]
                            : "transparent";
                      }
                    }}
                  >
                    {groupAction.icon && (
                      <Box style={iconStyle}>{groupAction.icon}</Box>
                    )}
                    {groupAction.label && (
                      <Typography variant="bodySSemiBold" color="neutral/10">
                        {groupAction.label}
                      </Typography>
                    )}
                  </Box>
                )
              )}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default SegmentedControl;
