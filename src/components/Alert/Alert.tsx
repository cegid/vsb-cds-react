import React from "react";
import { useMediaQuery } from "@mui/material";
import MobileAlert from "./MobileAlert";
import { useTheme } from "@mui/material/styles";
import DesktopAlert from "./DesktopAlert";

export type AlertVariants = "warning" | "error" | "info" | "success";
export type AlertImage = React.ReactElement | string;
export type AlertSize = "M" | "XS";

export interface AlertProps {
  /**
   * The semantic variant that determines the color scheme and visual style.
   * Each variant has predefined background and border colors for consistent messaging.
   * 'warning' uses yellow palette, 'error' uses critical palette,
   * 'info' uses info palette, 'success' uses success palette.
   * @default undefined
   */
  variant?: AlertVariants;

  /**
   * The main heading text displayed prominently at the top of the alert.
   * Should be concise and clearly communicate the purpose or message.
   */
  title: string;

  /**
   * The detailed description text that provides additional context or information.
   * Appears below the title with smaller typography.
   */
  description: string;

  /**
   * Optional text label for the action button.
   * When provided, displays a clickable button that triggers buttonActionClick.
   */
  buttonLabel?: string;

  /**
   * Optional visual element to enhance the alert message.
   * Can be either a React component/element or a string (typically image URL).
   * Positioning and styling may vary between mobile and desktop versions.
   */
  image?: AlertImage;

  /**
   * Optional callback function executed when the action button is clicked.
   * Only relevant when buttonLabel is also provided.
   */
  onActionClick?: () => void;

  /**
   * Optional callback function executed when the alert is dismissed/closed.
   * Typically used to remove the alert from the UI or update application state.
   */
  onClose?: () => void;

  /**
   * Controls the overall size and spacing of the alert component.
   * 'M' renders a medium-sized alert with standard spacing.
   * 'XS' renders a compact alert with reduced padding and spacing.
   * @default M
   */
  size?: AlertSize;
}

export const VARIANT_CONFIG = {
  warning: {
    background: "yellow/99",
    border: "yellow/30",
  },
  error: {
    background: "critical/99",
    border: "critical/30",
  },
  info: {
    background: "primary/99",
    border: "info/30",
  },
  success: {
    background: "success/99",
    border: "success/30",
  },
} as const;

export const getButtonColor = (variant: AlertVariants) => {
  switch (variant) {
    case "warning":
      return "neutral";
    case "info":
      return "primary";
    default:
      return variant;
  }
};

const Alert: React.FC<AlertProps> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!isMobile) {
    return <DesktopAlert {...props} />;
  }

  return <MobileAlert {...props} />;
};

export default Alert;
