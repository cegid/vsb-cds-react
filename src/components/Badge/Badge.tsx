"use client";

import { CustomColorString, PaletteNames, RADIUS } from "../../theme";
import Box, { BorderProps } from "../Box";
import Typography from "../Typography";

/**
 * Visual style variants for the Badge component.
 * - "tonal": Filled background with low opacity color
 * - "outlined": Transparent background with colored border
 */
export type BadgeVariant = "tonal" | "outlined";

/**
 * Size variants for the Badge component.
 * - "dot": Circular badge with optional content
 * - "medium": Badge with full radius and 4px/3px padding
 * - "large": Badge with 8px radius and 4px/2px padding
 */
export type BadgeSize = "small" | "medium" | "large";

export interface BadgeProps {
  /**
   * The content to be displayed inside the badge.
   * Note: Content is only rendered for medium-sized badges, not small ones.
   */
  children?: React.ReactNode;

  /**
   * The visual style variant of the badge.
   * - "tonal": Badge with a colored background using the specified color with low opacity
   * - "outlined": Badge with a transparent background and colored border
   * @default "outlined"
   */
  variant?: BadgeVariant;

  /**
   * The size of the badge.
   * - "small": 8x8px circular badge, typically used as a status indicator
   * - "medium": Rectangular badge with padding, used to display content
   * @default "medium"
   */
  size?: BadgeSize;

  /**
   * The color theme to apply to the badge.
   * This affects the border color and background color based on the variant.
   * @default "primary"
   */
  color?: PaletteNames | "white";

  /**
   * Custom background color that overrides the default color theme.
   * When provided, this takes precedence over the variant and color props.
   */
  backgroundColor?: CustomColorString;

  /**
   * Custom border configuration that overrides the default border styles.
   * When provided, this takes precedence over the default border based on size and color.
   */
  border?: BorderProps;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  color = "primary",
  variant = "outlined",
  size = "medium",
  backgroundColor,
  border,
}) => {
  const getBackgroundColor = (): CustomColorString => {
    if (backgroundColor) {
      return backgroundColor;
    }

    if (size === "small") {
      if (!children) {
        if (color === "primary") {
          return "primary/50" as CustomColorString;
        }
        if (color === "neutral") {
          return "neutral/70" as CustomColorString;
        }
      }
      return `${color}/60` as CustomColorString;
    }

    if (color === "white") {
      return "transparent";
    }

    if (variant === "outlined") {
      return "transparent";
    }

    if (variant === "tonal") {
      return `${color}/99` as CustomColorString;
    }

    return "transparent";
  };

  const getdotBorderColor = (): CustomColorString => {
    switch (color) {
      case "white":
      case "neutral":
        return "borderNeutral";
      default:
        return "white";
    }
  };

  const getBorderProps = (): BorderProps | undefined => {
    if (border) {
      return border;
    }

    if (size === "small" && !children) {
      return { width: 1, color: getdotBorderColor(), style: "solid" };
    }

    if (size === "medium" || size === "large") {
      if (color === "neutral") {
        return {
          width: 1,
          color: "borderNeutral",
          style: "solid",
        };
      }
      return {
        width: 1,
        color: color === "white" ? "white" : `${color}/90`,
        style: "solid",
      };
    }

    return undefined;
  };

  const getSizeProps = () => {
    if (size === "small") {
      return {
        borderRadius: RADIUS.FULL,
        width: children ? "16px" : "8px",
        height: children ? "16px" : "8px",
      };
    }

    if (size === "medium") {
      return {
        borderRadius: RADIUS.FULL,
        px: "4px",
      };
    }

    if (size === "large") {
      return {
        borderRadius: "8px",
        px: "4px",
        py: "1px",
      };
    }

    return {};
  };

  const renderContent = () => {
    if (!children) {
      return null;
    }

    if (typeof children !== "string" && typeof children !== "number") {
      return children;
    }

    if (size === "small") {
      return (
        <Typography
          variant="captionRegular"
          color={color === "white" ? "neutral/50" : "white"}
        >
          {children}
        </Typography>
      );
    }

    return (
      <Typography
        variant="captionRegular"
        color={color === "white" ? "neutral/50" : `${color}/60`}
      >
        {children}
      </Typography>
    );
  };

  return (
    <Box
      {...getSizeProps()}
      border={getBorderProps()}
      backgroundColor={getBackgroundColor()}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {renderContent()}
    </Box>
  );
};

export default Badge;
