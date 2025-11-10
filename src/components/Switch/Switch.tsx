"use client";

import { useState } from "react";
import Box from "../Box";
import {
  neutral,
  PaletteNames,
  RADIUS,
  colorPalettes,
} from "../../theme";
import { borderNeutral } from "@cegid/vsb-cds-tokens";

export interface CustomSwitchProps {
  /**
   * Determines if the switch is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Initial active state of the switch (used only when controlled is false)
   * @default true
   */
  isActive?: boolean;
  /**
   * Controlled state value - when provided, the component becomes controlled
   * and ignores internal state management
   */
  value?: boolean;
  /**
   * Callback function called when the switch is clicked
   * For controlled components, you should update the value prop in this callback
   * For uncontrolled components, this is called before internal state change
   * @param newValue - The new state value after the toggle
   */
  onClick: (newValue?: boolean) => void;
  /**
   * Color theme for the switch when active
   * @default "primary"
   */
  color?: PaletteNames;
}

const Switch: React.FC<CustomSwitchProps> = ({
  disabled = false,
  isActive = true,
  value,
  onClick,
  color = "primary",
}) => {
  const [isSwitched, setisSwitched] = useState(isActive);
  
  // Determine if the component is controlled (value prop is provided)
  const isControlled = value !== undefined;
  
  // Use controlled value if provided, otherwise use internal state
  const currentState = isControlled ? value : isSwitched;

  const handleToggle = () => {
    if (!disabled) {
      const newValue = isControlled ? !value : !isSwitched;
      
      if (onClick) {
        onClick(newValue);
      }
      
      // Only update internal state if component is uncontrolled
      if (!isControlled) {
        setisSwitched(newValue);
      }
    }
  };

  const getBackgroundColor = () => {
    const selectedPalette = colorPalettes[color];
    if (disabled) {
      return currentState ? selectedPalette[60] : neutral[90];
    }
    return currentState ? selectedPalette[60] : neutral[80];
  };

  return (
    <Box
      onClick={handleToggle}
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        height: 20,
        width: 32,
        borderRadius: RADIUS.L,
        cursor: "pointer",
        backgroundColor: getBackgroundColor(),
        ...(!disabled && {
          "&:hover": {
            backgroundColor: currentState ? colorPalettes[color][50] : neutral[70],
          },
          "&:active": {
            backgroundColor: currentState ? colorPalettes[color][40] : neutral[60],
          },
        }),
      }}
    >
      <Box
        sx={{
          width: 20,
          height: 20,
          backgroundColor: "white",
          borderRadius: "50%",
          border: "1px solid",
          borderColor: currentState ? colorPalettes[color][60] : borderNeutral,
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          transform: currentState ? "translateX(12px)" : "translateX(0px)",
          transition: "transform 0.3s ease-in-out",
          ...(!disabled && {
            "&:hover": {
              borderColor: currentState ? colorPalettes[color][50] : borderNeutral,
            },
          }),
        }}
      />
    </Box>
  );
};

export default Switch;
