import { CustomColorString, PaletteNames } from "../../theme";
import Box, { BorderProps } from "../Box";

export type BadgeVariant = "tonal" | "outlined";
export type BadgeSize = "small" | "medium";

export interface BadgeProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  color?: PaletteNames;
  backgroundColor?: CustomColorString;
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
    >
      {size !== "small" && children}
    </Box>
  );
};

export default Badge;
