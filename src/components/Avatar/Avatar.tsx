"use client";

import React from "react";
import Box, { BorderProps } from "../Box";
import Typography, { ExtendedVariant } from "../Typography";
import { CustomColorString, PaletteNames, RADIUS } from "../../theme";

export type CustomAvatarSize = "small" | "medium" | "large";

export interface CustomAvatarProps {
  /** Avatar size */
  size: CustomAvatarSize;

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

    if (trigram) {
      return (
        <Typography variant={getFontSize()} color={getCustomColor()}>
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

  return (
    <Box
      border={imageUrl ? undefined : getBorderColor()}
      backgroundColor={imageUrl ? undefined : getBackgroundColor()}
      borderRadius={RADIUS.FULL}
      width={getSize()}
      height={getSize()}
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
    >
      {renderContent()}
    </Box>
  );
};

export default Avatar;
