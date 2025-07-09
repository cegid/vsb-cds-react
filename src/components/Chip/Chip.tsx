"use client";

import React from "react";

import { ChipProps as CegidChipProps, pink, plum } from "@cegid/cds-react";

import { Avatar, Badge, Box, Icon, Row, Typography } from "..";
import {
  neutral,
  white,
  primary,
  secondary,
  success,
  yellow,
  critical,
  CustomColorString,
  PaletteNames,
  banana,
  beige,
  info,
  purple,
} from "../../theme";

export interface ChipProps
  extends Omit<
    CegidChipProps,
    | "size"
    | "variant"
    | "color"
    | "avatar"
    | "icon"
    | "elevated"
    | "clickable"
    | "label"
  > {
  /**
   * Controls the size of the chip component.
   * 'small' renders a 24px height chip with compact padding and bodySSemiBold typography.
   * 'medium' renders a 32px height chip with standard padding and bodyMSemiBold typography.
   * Affects dimensions, padding, typography, and icon sizes throughout the component.
   * @default 'medium'
   */
  size?: "small" | "medium";
  /**
   * Icon component to display at the start of the chip
   * @deprecated Use `startIcon` instead. This prop will be removed in v2.0.0
   * @example <Icon>user</Icon>
   */
  icon?: React.ReactElement<typeof Icon>;
  /**
   * Icon component to display at the start of the chip
   * @example <Icon>user</Icon>
   */
  startIcon?:
    | React.ReactElement<typeof Icon>
    | React.ReactElement<typeof Avatar>;
  /**
   * Icon component to display at the end of the chip
   * @example <Icon>user</Icon>
   */
  endIcon?: React.ReactElement<typeof Icon>;
  /**
   * Badge component to display at the end of the chip
   */
  badge?: React.ReactElement<typeof Badge>;
  /**
   * Label component to display on the chip
   */
  label?: string | React.ReactElement<typeof Typography>;
  /**
   * Color theme for the clicked state. Affects background and border colors when chip is clicked.
   * @default 'primary'
   */
  color?: PaletteNames;
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  const {
    onClick,
    startIcon,
    label,
    endIcon,
    icon,
    badge,
    size = "small",
    disabled = false,
    color = "primary",
  } = props;
  const [clicked, setClicked] = React.useState(false);
  const clickable = onClick !== undefined;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      setClicked(!clicked);
      onClick(event);
    }
  };

  const getColorTheme = (): any => {
    switch (color) {
      case "secondary":
        return secondary;
      case "success":
        return success;
      case "yellow":
        return yellow;
      case "critical":
        return critical;
      case "banana":
        return banana;
      case "beige":
        return beige;
      case "info":
        return info;
      case "pink":
        return pink;
      case "plum":
        return plum;
      case "purple":
        return purple;
      default:
        return primary;
    }
  };

  const colorTheme = getColorTheme();

  const getBackgroundColor = () => {
    if (disabled) return `${neutral[99]} !important`;
    if (clicked) return colorTheme[99];
    return white;
  };

  const getBorderColor = () => {
    if (disabled) return "neutral/80";
    if (clicked) return `${color}/50`;
    return "neutral/90";
  };

  const isStartIconAnIcon = startIcon && startIcon.type === Icon;

  const renderLabel = () => {
    if (typeof label === "string") {
      return (
        <Typography color="neutral/10" variant="bodySSemiBold">
          {label}
        </Typography>
      );
    }
    return label;
  };

  return (
    <Row
      ref={ref}
      gap={2}
      px={size === "small" ? 2 : 4}
      py={size === "small" ? 1 : 3}
      borderRadius={2}
      {...props}
      onClick={handleClick}
      border={{
        color: getBorderColor() as CustomColorString,
        width: 1,
        style: "solid",
      }}
      width="fit-content"
      alignItems="center"
      sx={{
        cursor: clickable ? "pointer" : "auto",
        backgroundColor: getBackgroundColor(),
        "&:hover": {
          backgroundColor: clicked ? colorTheme[90] : neutral[99],
        },
        "&:active": {
          backgroundColor: clicked ? colorTheme[80] : neutral[90],
        },
      }}
    >
      {icon && (
        <Box pl={2} display="flex">
          {icon}
        </Box>
      )}
      {startIcon && (
        <Box pl={isStartIconAnIcon ? 2 : 0} display="flex">
          {startIcon}
        </Box>
      )}
      {renderLabel()}
      {endIcon}
      {badge}
    </Row>
  );
});

Chip.displayName = "Chip";

export default Chip;
