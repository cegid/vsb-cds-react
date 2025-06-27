"use client";

import React from "react";

import {
  IconButton as CegidIconButton,
  IconButtonProps as CegidIconButtonProps,
  shouldForwardProp,
  styled,
} from "@cegid/cds-react";

import colorPalettes, {
  CustomColorString,
  info,
  white,
} from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import Box from "../Box";

const { primary, secondary, success, critical, yellow, neutral } =
  colorPalettes;

type CustomVariant =
  | "default"
  | "contained"
  | "outlined"
  | "tonal"
  | "iconOnly";
export type CustomColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | "default"
  | "neutral";

interface IconButtonOwnProps {
  variant?: CustomVariant;
  color?: CustomColor;
  square?: boolean;
}

type IconButtonProps = Omit<
  CegidIconButtonProps,
  "variant" | "color" | "brightness"
> &
  IconButtonOwnProps;

const createIconOnlyButtonStyle = (
  color: any,
  colorIndex = 60,
  hoverIndex = 95
) => ({
  color: color[colorIndex],
  "&:hover": {
    backgroundColor: color[hoverIndex],
    "&:before": {
      backgroundColor: "transparent",
    },
  },
  "&:active": {
    backgroundColor: neutral[99],
  },
  "&.Mui-disabled": {
    color: neutral[99],
  },
});

const createTonalIconButtonStyle = (
  color: any,
  colorIndex = 60,
  bgIndex = 99,
  hoverIndex = 95
) => ({
  color: color[colorIndex],
  backgroundColor: color[bgIndex],
  "&:hover": {
    backgroundColor: color[hoverIndex],
  },
  "&:active": {
    backgroundColor: color[bgIndex],
  },
  "&.Mui-disabled": {
    color: neutral[80],
    backgroundColor: neutral[99],
  },
});

const createContainedIconButtonStyle = (
  color: any,
  backgroundIndex = 60,
  hoverIndex = 50,
  activeIndex = 60
) => ({
  backgroundColor: color[backgroundIndex],
  boxShadow: "0px 0.3px 0.8px rgba(0, 0, 0, 0.1)",
  color: white,
  "&:hover": {
    backgroundColor: color[hoverIndex],
    "&:before": {
      backgroundColor: "transparent",
    },
  },
  "&:active": {
    backgroundColor: color[activeIndex],
  },
  "&.Mui-disabled": {
    backgroundColor: neutral[99],
    color: neutral[90],
    border: "1px solid",
    borderColor: neutral[90],
  },
});

const createOutlinedIconButtonStyle = (color: any, colorIndex = 50) => ({
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: neutral[90],
  backgroundColor: "transparent",
  color: color[colorIndex],
  "&:hover": {
    backgroundColor: color[95],
  },
  "&:active": {
    backgroundColor: color[95],
  },
  "&.Mui-disabled": {
    border: "none",
    color: neutral[80],
    backgroundColor: neutral[99],
  },
});

const IconButtonRoot = styled(CegidIconButton, {
  name: "CdsIconButton",
  slot: "root",
  shouldForwardProp: (prop) =>
    shouldForwardProp(prop) &&
    prop !== "square" &&
    prop !== "variant" &&
    prop !== "brightness",
})<{ ownerState: IconButtonProps }>(({ theme, ownerState }) => {
  const isContained = ownerState.variant === "contained";
  const baseStyles = {
    borderRadius: ownerState.square ? "10px" : RADIUS.FULL,
    boxShadow: "none",
    width: isContained ? "28px" : "32px",
    height: isContained ? "28px" : "32px",
    padding: "8px",
    display: "flex",
    "& .MuiSvgIcon-root": {
      width: "16px",
      height: "16px",
      fontSize: "16px",
    },
    [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
      width: isContained ? "36px" : "40px",
      height: isContained ? "36px" : "40px",
      padding: "12px",
    },
  };

  let colorPalette;
  const colorProp = ownerState.color ?? "primary";

  const isErrorColor = colorProp === "error";
  const isNeutralColor = colorProp === "neutral";

  switch (colorProp) {
    case "primary":
      colorPalette = primary;
      break;
    case "secondary":
      colorPalette = secondary;
      break;
    case "success":
      colorPalette = success;
      break;
    case "error":
      colorPalette = critical;
      break;
    case "warning":
      colorPalette = yellow;
      break;
    case "info":
      colorPalette = info;
      break;
    case "neutral":
      colorPalette = neutral;
      break;
    default:
      colorPalette = primary;
  }

  let variantStyles = {};
  const variantProp = ownerState.variant ?? "default";

  if (variantProp === "default") {
    if (isErrorColor) {
      variantStyles = createContainedIconButtonStyle(colorPalette);
    } else if (isNeutralColor) {
      variantStyles = {
        border: "1px solid",
        borderColor: neutral[90],
        backgroundColor: white,
        color: neutral[50],
        boxShadow: "0px 0.3px 0.8px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          backgroundColor: neutral[99],
        },
        "&:active": {
          backgroundColor: neutral[95],
        },
        "&.Mui-disabled": {
          backgroundColor: neutral[99],
          color: neutral[90],
          border: "1px solid",
          borderColor: neutral[90],
        },
      };
    } else {
      variantStyles = createContainedIconButtonStyle(colorPalette);
    }
  } else if (variantProp === "iconOnly") {
    const colorIndex = isErrorColor ? 50 : isNeutralColor ? 10 : 60;
    variantStyles = createIconOnlyButtonStyle(colorPalette, colorIndex, 95);
  } else if (variantProp === "contained") {
    if (isErrorColor) {
      variantStyles = createContainedIconButtonStyle(colorPalette);
    } else if (isNeutralColor) {
      variantStyles = {
        backgroundColor: neutral[50],
        color: white,
        "&:hover": {
          backgroundColor: neutral[40],
        },
        "&:active": {
          backgroundColor: neutral[30],
        },
        "&.Mui-disabled": {
          backgroundColor: neutral[99],
          color: neutral[90],
          border: "1px solid",
          borderColor: neutral[99],
        },
      };
    } else {
      variantStyles = createContainedIconButtonStyle(colorPalette);
    }
  } else if (variantProp === "outlined") {
    const colorIndex = isErrorColor ? 40 : 50;
    variantStyles = createOutlinedIconButtonStyle(colorPalette, colorIndex);
  } else if (variantProp === "tonal") {
    const colorIndex = isErrorColor ? 40 : isNeutralColor ? 40 : 50;

    if (isNeutralColor) {
      variantStyles = {
        border: "none",
        color: neutral[10],
        backgroundColor: neutral[99],
        "&:hover": {
          backgroundColor: neutral[95],
        },
        "&:active": {
          backgroundColor: neutral[99],
        },
        "&.Mui-disabled": {
          color: neutral[80],
          backgroundColor: neutral[99],
        },
      };
    } else {
      variantStyles = createTonalIconButtonStyle(colorPalette, colorIndex);
    }
  }

  return {
    ...baseStyles,
    ...variantStyles,
  };
});

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const {
      variant = "default",
      color = "primary",
      className,
      square = false,
      ...restProps
    } = props;

    const ownerState = {
      variant,
      color,
      square,
      ...restProps,
    };

    const mapColor = (customColor: CustomColor) => {
      if (
        customColor === "error" ||
        customColor === "default" ||
        customColor === "neutral"
      )
        return "inherit";
      return customColor;
    };

    const getContainedBackgroundColor = () => {
      if (!restProps.disabled) {
        switch (color) {
          case "primary":
            return "#236BF0";
          case "secondary":
            return secondary[50];
          case "neutral":
            return neutral[99];
          case "success":
            return success[50];
          case "warning":
            return yellow[50];
          case "info":
            return info[50];
          case "error":
            return critical[50];
          default:
            return "#236BF0";
        }
      }
    };

    if (variant === "contained") {
      return (
        <Box
          maxWidth="fit-content"
          p={1}
          backgroundColor={getContainedBackgroundColor() as CustomColorString}
          borderRadius={square ? 3 : RADIUS.FULL}
        >
          <IconButtonRoot
            ownerState={ownerState}
            {...restProps}
            color={mapColor(color)}
            ref={ref}
            disableRipple={true}
          />
        </Box>
      );
    }

    return (
      <IconButtonRoot
        ownerState={ownerState}
        {...restProps}
        className={className}
        color={mapColor(color)}
        ref={ref}
        disableRipple={true}
      />
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
