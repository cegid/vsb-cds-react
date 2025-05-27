"use client";

import React from "react";

import {
  Chip as CegidChip,
  ChipProps as CegidChipProps,
  styled,
} from "@cegid/cds-react";

import colorPalettes, { white } from "../../theme/colors";
import typography from "../../theme/typography";

export interface ChipProps
  extends Omit<CegidChipProps, "size" | "variant" | "color" | "avatar"> {
  /**
   * Controls the size of the chip component.
   * 'small' renders a 24px height chip with compact padding and bodySSemiBold typography.
   * 'medium' renders a 32px height chip with standard padding and bodyMSemiBold typography.
   * Affects dimensions, padding, typography, and icon sizes throughout the component.
   * @default 'medium'
   */
  size?: "small" | "medium";
}

const { primary, neutral } = colorPalettes;

const StyledChip = styled(CegidChip)<ChipProps>(({ size }) => ({
  backgroundColor: white,
  border: `1px solid ${neutral[90]}`,
  borderRadius: size === "small" ? "10px" : "12px",
  height: size === "small" ? 24 : 32,
  color: neutral[50],
  paddingLeft: size === "small" ? "4px" : "8px",
  paddingRight: size === "small" ? "4px" : "8px",
  ...((size === "small"
    ? typography.bodySSemiBold
    : typography.bodyMSemiBold) || {}),
  "& .MuiChip-label": {
    color: "inherit",
    paddingLeft: "4px",
    paddingRight: "4px",
  },
  "& .MuiChip-icon": {
    color: "inherit",
  },
  "& .MuiSvgIcon-root.MuiChip-deleteIcon": {
    margin: 0,
  },
  "& .MuiChip-deleteIcon": {
    color: "inherit",
    width: size === "small" ? "10px" : "12px",
    height: size === "small" ? "10px" : "12px",
  },
  "&:hover": {
    backgroundColor: neutral[99],
    color: primary[10],
  },
  "&:focus": {
    backgroundColor: white,
  },
  "&:active": {
    backgroundColor: neutral[90],
  },
  "& .MuiSvgIcon-root.MuiChip-icon": {
    margin: 0,
    width: size === "small" ? "16px" : "20px",
    height: size === "small" ? "16px" : "20px",
    backgroundColor: neutral[99],
    borderRadius: "6px",
  },
  "&.Mui-focused, &:focus:not(:active)": {
    borderRadius: "14px",
    outlineOffset: "1px",
    outline: `solid 2px ${primary[65]}`,
  },
  "&.Mui-disabled": {
    opacity: 1,
    backgroundColor: white,
    border: `1px solid ${neutral[80]}`,
    color: neutral[80],
    "& .MuiChip-label": {
      color: neutral[80],
    },
    "& .MuiChip-icon": {
      color: neutral[80],
    },
    "& .MuiChip-deleteIcon": {
      color: neutral[80],
    },
    "& .MuiSvgIcon-root.MuiChip-icon": {
      backgroundColor: neutral[95],
    },
  },
}));

const Chip = React.forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  const { size = "medium", ...otherProps } = props;

  return <StyledChip ref={ref} size={size} {...otherProps} />;
});

Chip.displayName = "Chip";

export default Chip;
