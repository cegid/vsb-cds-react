import { CustomColorString, PaletteNames } from "../../theme";
import Box, { BorderProps } from "../Box";

/**
 * Visual style variants for the Badge component.
 * - "tonal": Filled background with low opacity color
 * - "outlined": Transparent background with colored border
 */
export type BadgeVariant = "tonal" | "outlined";

/**
 * Size variants for the Badge component.
 * - "small": 8x8px circular indicator (no content displayed)
 * - "medium": Rectangular badge with padding (displays content)
 */
export type BadgeSize = "small" | "medium";

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
  color?: PaletteNames;

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
      if (color === "neutral") {
        return `${color}/99`;
      }
      return `${color}/60`;
    }

    if (variant === "outlined") {
      return "transparent";
    }

    if (variant === "tonal") {
      return `${color}/99`;
    }

    return "transparent";
  };

  const getBorderProps = (): BorderProps => {
    if (border) {
      return border;
    }
    if (size === "small") {
      if (color === "neutral") {
        return { width: 1, color: "neutral/95", style: "solid" };
      }
      return { width: 1, color: "white", style: "solid" };
    }
    return { width: 1, color: `${color}/60`, style: "solid", opacity: 30 };
  };

  const getSizeProps = () => {
    if (size === "small") {
      return {
        width: "8px",
        height: "8px",
      };
    }

    return {
      px: "4px",
      py: "2px",
      minWidth: "25px",
      minHeight: "22px",
    };
  };

  return (
    <Box
      {...getSizeProps()}
      border={getBorderProps()}
      backgroundColor={getBackgroundColor()}
      borderRadius={2}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {size !== "small" && children}
    </Box>
  );
};

export default Badge;
