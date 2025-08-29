"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import Box from "../Box";
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
}

/**
 * Props for the SegmentedControl component
 */
export interface SegmentedControlProps {
  /** Array of actions to display in the segmented control */
  actions: SegmentedControlAction[];
  /** Index of the initially selected action (default: 0) */
  defaultSelected?: number;
  /** Whether the control should take the full width of its container */
  fullwidth?: boolean;
  /** Controlled selected index - when provided, overrides internal state */
  selectedIndex?: number;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  actions,
  defaultSelected = 0,
  fullwidth = false,
  selectedIndex: controlledSelectedIndex,
}) => {
  const [internalSelectedIndex, setInternalSelectedIndex] =
    useState(defaultSelected);

  const selectedIndex = controlledSelectedIndex !== undefined ? controlledSelectedIndex : internalSelectedIndex;
  const [sliderStyle, setSliderStyle] = useState({});
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isIconOnly = actions.every((action) => !action.label);

  useEffect(() => {
    updateSliderPosition();
  }, [selectedIndex]);

  const updateSliderPosition = () => {
    if (containerRef.current && buttonRefs.current[selectedIndex]) {
      const container = containerRef.current;
      const selectedButton = buttonRefs.current[selectedIndex];

      if (selectedButton) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = selectedButton.getBoundingClientRect();

        const left = buttonRect.left - containerRect.left;
        const width = buttonRect.width;

        setSliderStyle({
          left: `${left}px`,
          width: `${width}px`,
        });
      }
    }
  };

  const handleActionClick = (index: number) => {
    setInternalSelectedIndex(index);
    actions[index].onClick();
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    backgroundColor: neutral[99],
    borderRadius: "12px",
    padding: "2px",
    gap: "4px",
    width: fullwidth ? "100%" : "fit-content",
    height: isMobile ? "40px" : "32px",
    ...typography.bodySSemiBold,
  };

  const sliderBaseStyle: React.CSSProperties = {
    position: "absolute",
    top: "2px",
    height: "calc(100% - 4px)",
    backgroundColor: "white",
    borderRadius: "10px",
    transition: "all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    zIndex: 1,
    ...sliderStyle,
  };

  const getButtonStyle = (index: number): React.CSSProperties => ({
    position: "relative",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    gap: isIconOnly ? "0" : "8px",
    padding: isIconOnly ? "0 8px" : "0 16px",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "color 0.3s ease",
    color: selectedIndex === index ? neutral[10] : "#666",
    fontWeight: selectedIndex === index ? 600 : 400,
    border: "none",
    background: "none",
    fontSize: "14px",
    height: isMobile ? "36px" : "28px",
    minWidth: isIconOnly ? (isMobile ? "36px" : "28px") : "auto",
    justifyContent: "center",
  });

  const iconStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
  };

  return (
    <Box ref={containerRef} style={containerStyle}>
      <Box style={sliderBaseStyle} />

      {actions.map((action, index) => (
        <Box
          {...(fullwidth && { flex: 1 })}
          key={index}
          ref={(el) => (buttonRefs.current[index] = el)}
          onClick={() => handleActionClick(index)}
          style={getButtonStyle(index)}
          onMouseEnter={(e) => {
            if (selectedIndex !== index) {
              e.currentTarget.style.color = "#333";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color =
              selectedIndex === index ? (neutral[10] ?? "") : "#666";
          }}
        >
          {action.icon && <Box style={iconStyle}>{action.icon}</Box>}
          {action.label && <span>{action.label}</span>}
        </Box>
      ))}
    </Box>
  );
};

export default SegmentedControl;
