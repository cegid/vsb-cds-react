"use client";

import React from "react";

import { OverridableComponent, SvgIconTypeMap } from "@cegid/cds-react";

import colorPalettes, { PaletteNames, white } from "../../theme/colors";
import spacing from "../../theme/spacing";
import Typography from "../Typography/Typography";
import typography from "../../theme/typography";
import Box from "../Box";
import Icon from "../Icon";
import Avatar from "../Avatar";

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
  color?: PaletteNames;

  /**
   * Controls the visual style of the status badge.
   * @default 'light'
   */
  variant?: StatusVariant;

  /**
   * Optional icon name to display before the label text.
   * Icon size automatically adjusts based on the size prop (12px for small, 14px for medium).
   * Includes proper spacing between icon and text.
   * @example "user"
   * @example "check-circle"
   */
  icon?: string;

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
  variant,
  icon,
  sx,
  className,
  avatar,
}) => {
  if (!colorPalettes[color]) {
    color = "primary";
  }

  const palette = colorPalettes[color];

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
    ...typography.bodySMedium,
    backgroundColor: palette[50],
    color: white,
    border: "1px solid",
    borderColor: `${palette[30]}4D`,
  };

  const lightStyle = {
    ...typography.bodySMedium,
    backgroundColor: palette[99],
    color: palette[50],
    border: "1px solid",
    borderColor: `${palette[30]}4D`,
  };

  const linkStyle = {
    ...typography.bodySMedium,
    backgroundColor: white,
    color: palette[60],
    border: "1px solid",
    borderColor: `${palette[40]}4D`,
  };

  const getStyle = () => {
    switch (variant) {
      case "dark":
        return darkStyle;
      case "link":
        return linkStyle;
      case "light":
      default:
        return lightStyle;
    }
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
      ) : icon ? (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            marginRight: label ? spacing(2) : 0,
          }}
        >
          <Icon size={iconSize}>{icon}</Icon>
        </Box>
      ) : null}

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
