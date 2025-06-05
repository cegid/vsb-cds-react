"use client";

import React from "react";

import { Box, OverridableComponent, SvgIconTypeMap } from "@cegid/cds-react";

import colorPalettes, { PaletteNames, white } from "../../theme/colors";
import spacing from "../../theme/spacing";
import Typography from "../Typography/Typography";
import { RADIUS } from "../../theme";

export interface StatusProps {
  /**
   * The text content displayed inside the status badge.
   * Text is rendered with ellipsis overflow handling for long content.
   */
  label: string;

  /**
   * Controls the size of the status badge.
   * 'small' renders a 20px height badge with compact spacing and bodySRegular typography.
   * 'medium' renders a 24px height badge with standard spacing and bodyMRegular typography.
   * @default 'medium'
   */
  size?: "small" | "medium";

  /**
   * Determines the color palette used for the status badge.
   * Must be a valid palette name from the theme colors.
   * Falls back to 'primary' if an invalid color is provided.
   * @default 'primary'
   */
  color?: PaletteNames;

  /**
   * Controls the visual style of the status badge.
   * @default 'light'
   */
  variant?: "dark" | "light";

  /**
   * Optional icon to display before the label text.
   * Icon size automatically adjusts based on the size prop (12px for small, 14px for medium).
   * Includes proper spacing between icon and text.
   */
  icon?: SVGIconType;

  /**
   * Additional CSS styles to apply to the status badge container.
   * These styles will override the default component styles.
   */
  sx?: React.CSSProperties;

  /**
   * CSS class name to apply to the status badge container.
   * Useful for additional styling or testing selectors.
   */
  className?: string;
}

export type SVGIconType = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};

const Status: React.FC<StatusProps> = ({
  label,
  size = "medium",
  color = "primary",
  variant,
  icon,
  sx,
  className,
}) => {
  if (!colorPalettes[color]) {
    color = "primary";
  }

  const palette = colorPalettes[color];

  const height = size === "small" ? 20 : 24;
  const paddingLeft = size === "small" ? 6 : 8;
  const paddingRight = size === "small" ? 6 : 10;
  const iconSize = size === "small" ? 12 : 14;

  const darkStyle = {
    backgroundColor: palette[50],
    color: white,
    border: "1px solid",
    borderColor: `${palette[30]}4D`
  };

  const lightStyle = {
    backgroundColor: palette[99],
    color: palette[30],
    border: "1px solid",
    borderColor: `${palette[30]}4D`
  };

  const style = variant === "dark" ? darkStyle : lightStyle;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        height: height,
        borderRadius: RADIUS.S,
        paddingLeft: `${paddingLeft}px`,
        paddingRight: `${paddingRight}px`,
        width: "fit-content",
        ...style,
        ...sx,
      }}
      className={className}
    >
      {icon && (
        <Box
          component={icon}
          sx={{
            width: `${iconSize}px !important`,
            height: `${iconSize}px !important`,
            fontSize: `${iconSize}px !important`,
            minWidth: `${iconSize}px !important`,
            minHeight: `${iconSize}px !important`,
            marginRight: spacing(2),
          }}
        />
      )}
      <Typography
        variant={size === "small" ? "captionRegular" : "bodySRegular"}
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default Status;
