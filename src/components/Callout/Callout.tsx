import React from "react";
import { useMediaQuery } from "@mui/material";
import MobileCallout from "./MobileCallout";
import { useTheme } from '@mui/material/styles';
import DesktopCallout from "./DesktopCallout";

export type CalloutVariants = "warning" | "error" | "info" | "success";
export type CalloutImage = React.ReactElement | string;
export type CalloutSize = "M" | "XS";

export interface CalloutProps {
  /**
   * The semantic variant that determines the color scheme and visual style.
   * Each variant has predefined background and border colors for consistent messaging.
   * 'warning' uses yellow palette, 'error' uses critical palette, 
   * 'info' uses info palette, 'success' uses success palette.
   * @default undefined
   */
  variant?: CalloutVariants;

  /**
   * The main heading text displayed prominently at the top of the callout.
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
   * Optional visual element to enhance the callout message.
   * Can be either a React component/element or a string (typically image URL).
   * Positioning and styling may vary between mobile and desktop versions.
   */
  image?: CalloutImage;

  /**
   * Optional callback function executed when the action button is clicked.
   * Only relevant when buttonLabel is also provided.
   */
  buttonActionClick?: () => void;

  /**
   * Optional callback function executed when the callout is dismissed/closed.
   * Typically used to remove the callout from the UI or update application state.
   */
  onClose?: () => void;

  /**
   * Controls the overall size and spacing of the callout component.
   * 'M' renders a medium-sized callout with standard spacing.
   * 'XS' renders a compact callout with reduced padding and spacing.
   * @default M
   */
  size?: CalloutSize;
}

export const VARIANT_CONFIG = {
  warning: {
    background: "yellow/99",
    border: "yellow/30"
  },
  error: {
    background: "critical/99",
    border: "critical/30"
  },
  info: {
    background: "info/99",
    border: "info/30"
  },
  success: {
    background: "success/99",
    border: "success/30"
  }
} as const;

const Callout: React.FC<CalloutProps> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!isMobile) {
    return <DesktopCallout {...props} />
  }

  return (
    <MobileCallout {...props} />
  );
};

export default Callout;
