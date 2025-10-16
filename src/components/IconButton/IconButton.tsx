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
import shadows from "../../theme/shadows";
import theme from "@cegid/cds-react/styles/defaultTheme";
import ProgressBar from "../ProgressBar";

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
export type IconButtonSize = "small" | "medium" | "large" | "auto";

interface IconButtonOwnProps {
  variant?: CustomVariant;
  color?: CustomColor;
  square?: boolean;
  size?: IconButtonSize;
  elevation?: number;
  /**
   * Shows a loading state and disables the button interaction.
   * @default false
   */
  isLoading?: boolean;
}

export type IconButtonProps = Omit<
  CegidIconButtonProps,
  "variant" | "color" | "brightness" | "size"
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
  boxShadow: `0px 0.3px 0.8px 0px ${color[40]}`,
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
    boxShadow: "none",
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

const getSizeStyles = (size: IconButtonSize, isContained = false) => {
  const heightReduction = isContained ? 4 : 0;

  switch (size) {
    case "small":
      return {
        height: `${24 - heightReduction}px`,
        width: `${24 - heightReduction}px`,
      };
    case "medium":
      return {
        height: `${32 - heightReduction}px`,
        width: `${32 - heightReduction}px`,
      };
    case "large":
      return {
        height: `${40 - heightReduction}px`,
        width: `${40 - heightReduction}px`,
      };
    case "auto":
    default:
      return {
        height: `${32 - heightReduction}px`,
        width: `${32 - heightReduction}px`,
        [theme.breakpoints.down("sm")]: {
          height: `${40 - heightReduction}px`,
          width: `${40 - heightReduction}px`,
        },
      };
  }
};

const getRadius = (square: boolean, isContained: boolean) => {
  if (isContained && square) {
    return 10;
  }
  if (square) {
    return 12;
  }
  return RADIUS.FULL;
};

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
    borderRadius: getRadius(ownerState?.square ?? false, isContained),
    boxShadow: "none",
    ...getSizeStyles(ownerState?.size ?? "auto", isContained),
    padding: "8px",
    display: "flex",
    "& .MuiSvgIcon-root": {
      width: "16px",
      height: "16px",
      fontSize: "16px",
    },
    [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
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
        boxShadow: `0px 0.3px 0.8px 0px ${neutral[90]}`,
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
        backgroundColor: white,
        color: neutral[10],
        "&:hover": {
          backgroundColor: neutral[99],
        },
        "&:active": {
          backgroundColor: white,
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
      size = "auto",
      elevation = 0,
      isLoading = false,
      onClick,
      ...restProps
    } = props;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isLoading) {
        return;
      }
      onClick?.(event);
    };

    const getProgressBarColor = () => {
      switch (color) {
        case "primary":
          return "primary";
        case "secondary":
          return "secondary";
        case "success":
          return "success";
        case "error":
          return "critical";
        case "warning":
          return "yellow";
        case "info":
          return "info";
        case "neutral":
          return "neutral";
        default:
          return "primary";
      }
    };

    const ownerState = {
      variant,
      color,
      square,
      size,
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
            onClick={handleClick}
            ref={ref}
            disableRipple={true}
          >
            {isLoading ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
              >
                <ProgressBar
                  shape="circle"
                  size={16}
                  color={getProgressBarColor()}
                />
              </Box>
            ) : (
              restProps.children
            )}
          </IconButtonRoot>
        </Box>
      );
    }

    return (
      <IconButtonRoot
        ownerState={ownerState}
        {...restProps}
        className={className}
        color={mapColor(color)}
        onClick={handleClick}
        ref={ref}
        disableRipple
        disableTouchRipple
        disableFocusRipple
        sx={{ boxShadow: shadows[elevation] }}
      >
        {isLoading ? (
          <ProgressBar shape="circle" size={16} color={getProgressBarColor()} />
        ) : (
          restProps.children
        )}
      </IconButtonRoot>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
