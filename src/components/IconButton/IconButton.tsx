"use client";

import React from "react";

import {
  IconButton as CegidIconButton,
  IconButtonProps as CegidIconButtonProps,
  pink,
  shouldForwardProp,
  styled,
} from "@cegid/cds-react";

import colorPalettes, {
  banana,
  beige,
  CustomColorString,
  info,
  purple,
  white,
} from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import Box from "../Box";

const { primary, secondary, success, critical, yellow, plum, neutral } =
  colorPalettes;

type CustomVariant =
  | "default"
  | "contained"
  | "outlined"
  | "tonal"
  | "iconOnly";
type CustomColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | "default"
  | "neutral";
type CustomSize = "small" | "medium" | "large";

interface IconButtonOwnProps {
  variant?: CustomVariant;
  color?: CustomColor;
  square?: boolean;
  size?: CustomSize;
}

type IconButtonProps = Omit<
  CegidIconButtonProps,
  "variant" | "color" | "brightness"
> &
  IconButtonOwnProps & { ref?: React.Ref<HTMLButtonElement> };

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

const getSizeStyles = (size: CustomSize) => {
  switch (size) {
    case "small":
      return {
        width: "30px",
        height: "30px",
        padding: "7px",
        "& .MuiSvgIcon-root": {
          width: "16px",
          height: "16px",
          fontSize: "16px",
        },
      };
    case "medium":
      return {
        width: "40px",
        height: "40px",
        padding: "12px",
        "& .MuiSvgIcon-root": {
          width: "16px",
          height: "16px",
          fontSize: "16px",
        },
      };
    case "large":
      return {
        width: "48px",
        height: "48px",
        padding: "16px",
        "& .MuiSvgIcon-root": {
          width: "16px",
          height: "16px",
          fontSize: "16px",
        },
      };
    default:
      return {};
  }
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
  const baseStyles = {
    borderRadius: ownerState.square ? "10px" : RADIUS.FULL,
    boxShadow: "none",
    padding: "8px",
    transition: "background-color 0.2s",
    "& .MuiSvgIcon-root": {
      width: "16px",
      height: "16px",
      fontSize: "16px",
    },
    [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
      padding: ownerState.size === "small" ? "8px" : "12px",
    },
    ...(ownerState.size ? getSizeStyles(ownerState.size) : {}),
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

const IconButton = React.forwardRef(function IconButton(
  inProps: IconButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const {
    variant = "default",
    color = "primary",
    className,
    square = false,
    size = "medium",
    ...props
  } = inProps;

  const ownerState = {
    variant,
    color,
    square,
    size,
    ...props,
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
    if (!props.disabled) {
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
          {...props}
          color={mapColor(color)}
          size={size}
          ref={ref}
          disableRipple={true}
        />
      </Box>
    );
  }

  return (
    <IconButtonRoot
      ownerState={ownerState}
      {...props}
      color={mapColor(color)}
      size={size}
      ref={ref}
      disableRipple={true}
    />
  );
});

export default IconButton;
