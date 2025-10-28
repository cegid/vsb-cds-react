"use client";

import React from "react";
import Box, { BorderProps } from "../Box";
import Typography, { ExtendedVariant } from "../Typography";
import { CustomColorString, PaletteNames, RADIUS } from "../../theme";

export type CustomAvatarSize = "extraSmall" | "small" | "medium" | "large";
export type CustomAvatarShape =
  | "circle"
  | "square"
  | "starburst"
  | "flower"
  | "hexagon";

export interface CustomAvatarProps {
  /** Avatar size */
  size: CustomAvatarSize;

  /** Avatar shape */
  shape?: CustomAvatarShape;

  /** Icon component to display (Icon component instance) */
  icon?: React.ReactElement;

  /** Image URL for avatar photo */
  imageUrl?: string;

  /** Text trigram to display (usually 2-3 characters) */
  trigram?: string;

  /** Color palette for the avatar background and border */
  color: PaletteNames;
}

const Avatar: React.FC<CustomAvatarProps> = ({
  size = "medium",
  shape = "circle",
  icon,
  imageUrl,
  trigram,
  color,
}) => {
  const getFontSize = (): ExtendedVariant => {
    switch (size) {
      case "small":
        return "captionSemiBold";
      case "medium":
        return "captionSemiBold";
      case "large":
        return "bodySSemiBold";
      default:
        return "captionSemiBold";
    }
  };

  const getSize = (): number => {
    switch (size) {
      case "extraSmall":
        return 16;
      case "small":
        return 24;
      case "medium":
        return 32;
      case "large":
        return 40;
      default:
        return 32;
    }
  };

  const getIconSize = (): number => {
    switch (size) {
      case "extraSmall":
        return 10;
      case "small":
        return 12;
      case "medium":
        return 16;
      case "large":
        return 20;
      default:
        return 16;
    }
  };

  const getCustomColor = (): CustomColorString => {
    return `${color}/50` as CustomColorString;
  };

  const getBackgroundColor = (): CustomColorString => {
    return `${color}/95` as CustomColorString;
  };

  const getBorderColor = (): BorderProps => {
    return {
      color: `${color}/50` as CustomColorString,
      style: "solid",
      width: 1,
    };
  };

  const getRadiusBySize = (size: CustomAvatarSize): string => {
    switch (size) {
      case "extraSmall":
        return "6px";
      case "small":
        return "8px";
      case "medium":
        return "10x";
      case "large":
        return "12px";
      default:
        return "10px";
    }
  };

  const getShapeStyles = (): { borderRadius?: string | number; clipPath?: string } => {
    switch (shape) {
      case "circle":
        return { borderRadius: RADIUS.FULL };
      case "square":
        return { borderRadius: getRadiusBySize(size) };
      case "hexagon":
        return {
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        };
      case "starburst":
        return {
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        };
      case "flower":
        return {
          clipPath:
            "polygon(50% 0%, 69% 28%, 100% 25%, 78% 50%, 100% 75%, 69% 72%, 50% 100%, 31% 72%, 0% 75%, 22% 50%, 0% 25%, 31% 28%)",
        };
      default:
        return { borderRadius: RADIUS.FULL };
    }
  };

  const renderContent = () => {
    if (imageUrl) {
      return (
        <img
          src={imageUrl}
          alt="Avatar"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "inherit",
          }}
        />
      );
    }

    const getExtraSmallFont = () => {
      if (size === "extraSmall") {
        return {
          fontSize: "8px",
          lineHeight: "8px",
        };
      }
    };

    if (trigram) {
      return (
        <Typography
          variant={getFontSize()}
          color={getCustomColor()}
          sx={{ ...getExtraSmallFont() }}
        >
          {trigram}
        </Typography>
      );
    }

    if (icon) {
      return React.cloneElement(icon, {
        size: getIconSize(),
        color: getCustomColor(),
        ...icon.props,
      });
    }

    return null;
  };

  const shapeStyles = getShapeStyles();
  const hasClipPath = !!shapeStyles.clipPath;

  return (
    <Box
      border={imageUrl || hasClipPath ? undefined : getBorderColor()}
      backgroundColor={imageUrl ? undefined : getBackgroundColor()}
      borderRadius={shapeStyles.borderRadius}
      width={getSize()}
      height={getSize()}
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      sx={{
        clipPath: shapeStyles.clipPath,
      }}
    >
      {renderContent()}
    </Box>
  );
};

export default Avatar;
