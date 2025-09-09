"use client";

import { useState } from "react";
import Box from "../Box";
import {
  neutral,
  PaletteNames,
  RADIUS,
  colorPalettes,
} from "../../theme";

export interface CustomSwitchProps {
  /**
   * Determines if the switch is disabled
   * @default false
   */
  disabled: boolean;
  /**
   * Initial active state of the switch
   * @default true
   */
  isActive: boolean;
  /**
   * Callback function called when the switch is clicked
   * Triggered before the internal state change of the component
   */
  onClick: () => void;
  /**
   * Color theme for the switch when active
   * @default "primary"
   */
  color?: PaletteNames;
}

const Switch: React.FC<CustomSwitchProps> = ({
  disabled = false,
  isActive = true,
  onClick,
  color = "primary",
}) => {
  const [isSwitched, setisSwitched] = useState(isActive);

  const handleToggle = () => {
    if (!disabled) {
      if (onClick) {
        onClick();
      }
      setisSwitched(!isSwitched);
    }
  };

  const getBackgroundColor = () => {
    const selectedPalette = colorPalettes[color];
    if (disabled) {
      return isSwitched ? selectedPalette[60] : neutral[90];
    }
    return isSwitched ? selectedPalette[60] : neutral[80];
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
            backgroundColor: isSwitched ? colorPalettes[color][50] : neutral[70],
          },
          "&:active": {
            backgroundColor: isSwitched ? colorPalettes[color][40] : neutral[60],
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
          borderColor: isSwitched ? colorPalettes[color][60] : neutral[90],
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          transform: isSwitched ? "translateX(12px)" : "translateX(0px)",
          transition: "transform 0.3s ease-in-out",
        }}
      />
    </Box>
  );
};

export default Switch;
