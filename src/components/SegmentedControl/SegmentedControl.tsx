import React, { useState, useRef, useEffect } from "react";
import Box from "../Box";
import { neutral } from "../../theme";
import typography from "../../theme/typography";

export interface SegmentedControlAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export interface SegmentedControlProps {
  actions: SegmentedControlAction[];
  defaultSelected?: number;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  actions,
  defaultSelected = 0,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);
  const [sliderStyle, setSliderStyle] = useState({});
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    setSelectedIndex(index);
    actions[index].onClick();
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    backgroundColor: neutral[99],
    borderRadius: "12px",
    padding: "2px",
    gap: "4px",
    width: "fit-content",
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
    gap: "8px",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "color 0.3s ease",
    color: selectedIndex === index ? neutral[10] : "#666",
    fontWeight: selectedIndex === index ? 600 : 400,
    border: "none",
    background: "none",
    fontSize: "14px",
  });

  const iconStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <div style={sliderBaseStyle} />

      {actions.map((action, index) => (
        <Box
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
              selectedIndex === index ? neutral[10] ?? "" : "#666";
          }}
        >
          <div style={iconStyle}>{action.icon}</div>
          <span>{action.label}</span>
        </Box>
      ))}
    </div>
  );
};

export default SegmentedControl;
