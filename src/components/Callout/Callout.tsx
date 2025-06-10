import React from "react";
import { useMediaQuery } from "@mui/material";
import MobileCallout from "./MobileCallout";
import { useTheme } from '@mui/material/styles';
import DesktopCallout from "./DesktopCallout";

export type CalloutVariants = "warning" | "error" | "info" | "success";
export type CalloutImage = React.ReactElement | string;
export type CalloutSize = "M" | "XS";

export interface CalloutProps {
  variant?: CalloutVariants;
  title: string;
  description: string;
  buttonLabel?: string;
  image?: CalloutImage;
  buttonActionClick?: () => void;
  onClose?: () => void;
  size?: CalloutSize;
}

export const VARIANT_CONFIG = {
  warning: {
    background: "yellow/99",
    border: "yellow/30"
  },
  error: {
    background: "critical/99",
    border: "critical/35"
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
