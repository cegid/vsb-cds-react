"use client";

import React from "react";

import { OverridableComponent, SvgIconTypeMap } from "@cegid/cds-react";

import colorPalettes, { PaletteNames, white, neutral } from "../../theme/colors";
import spacing from "../../theme/spacing";
import Typography from "../Typography/Typography";
import Box from "../Box";
import Icon from "../Icon";
import Avatar from "../Avatar";
export type StatusColor = PaletteNames | "white";
export type StatusVariant = "dark" | "light" | "link";
export interface StatusProps {
  /**
   * The text content displayed inside the status badge.
   * Text is rendered with ellipsis overflow handling for long content.
   */
  label?: string;

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
  color?: StatusColor;

  /**
   * Controls the visual style of the status badge.
   * @default 'light'
   */
  variant?: StatusVariant;

  /**
   * Optional icon to display before the label text.
   * Can be either:
   * - A string representing the icon name (will be wrapped in Icon component)
   * - A React element of type Icon (will have its size prop overridden)
   * Icon size automatically adjusts based on the size prop (12px for small, 14px for medium).
   * Includes proper spacing between icon and text.
   * @example "user" // String icon name
   * @example "check-circle" // String icon name
   * @example <Icon>settings</Icon> // React element
   */
  icon?: string | React.ReactElement<typeof Icon>;

  /**
   * Optional avatar component to display before the label text.
   * Takes priority over icon if both are provided.
   * Avatar size automatically adjusts based on the size prop (20px for small, 24px for medium).
   * Includes proper spacing between avatar and text.
   * @example <Avatar size="small" color="primary" trigram="JD" />
   */
  avatar?: React.ReactElement<typeof Avatar>;

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
  variant = "light",
  icon,
  sx,
  className,
  avatar,
}) => {
  const isWhiteColor = color === "white";

  if (!isWhiteColor && !colorPalettes[color as PaletteNames]) {
    color = "primary";
  }

  const palette = !isWhiteColor ? colorPalettes[color as PaletteNames] : colorPalettes.primary;

  const height = size === "small" ? 20 : 24;
  const paddingLeft = size === "small" ? 6 : 8;
  let paddingRight;
  if (size === "small") {
    paddingRight = icon ? 6 : 8;
  } else {
    paddingRight = icon ? 10 : 8;
  }
  const iconSize = size === "small" ? 12 : 14;

  const darkStyle = {
    backgroundColor: palette[50],
    color: white,
    border: "1px solid",
    borderColor: `${palette[30]}4D`,
  };

  const linkStyle = {
    backgroundColor: white,
    color: palette[60],
    border: "1px solid",
    borderColor: `${palette[40]}4D`,
  };

  const whiteStyle = {
    backgroundColor: white,
    color: neutral[10],
    border: "1px solid",
    borderColor: "#636C774D",
  };

  const getLightStyle = () => {
    switch (color) {
      case "success":
        return {
          backgroundColor: palette[99],
          color: palette[50],
          border: "1px solid",
          borderColor: `${palette[30]}4D`,
        };
      case "info":
        return {
          backgroundColor: palette[99],
          color: palette[30],
          border: "1px solid",
          borderColor: palette[80],
        };
      default:
        return {
          backgroundColor: palette[99],
          color: palette[30],
          border: "1px solid",
          borderColor: `${palette[30]}4D`,
        };
    }
  };

  const getStyle = () => {
    if (color === "white") {
      return whiteStyle;
    }

    switch (variant) {
      case "dark":
        return darkStyle;
      case "link":
        return linkStyle;
      case "light":
        return getLightStyle();
      default:
        return darkStyle;
    }
  };

  const getIcon = () => {
    if (!icon) return undefined;

    return (
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          marginRight: label ? spacing(2) : 0,
        }}
      >
        {typeof icon === "string" ? <Icon size={iconSize}>{icon}</Icon> : icon}
      </Box>
    );
  };
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        height: height,
        borderRadius: 2,
        paddingLeft: `${paddingLeft}px`,
        paddingRight: `${paddingRight}px`,
        width: "fit-content",
        ...getStyle(),
        ...sx,
      }}
      className={className}
    >
      {avatar ? (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            marginRight: label ? spacing(2) : 0,
          }}
        >
          {avatar}
        </Box>
      ) : (
        getIcon()
      )}

      <Typography
        variant={size === "small" ? "captionRegular" : "bodySMedium"}
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
