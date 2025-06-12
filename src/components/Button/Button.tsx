"use client";

import { styled } from "@mui/material/styles";
import React from "react";

import { Button as CegidButton } from "@cegid/cds-react";
import type { ButtonProps as CegidButtonProps } from "@cegid/cds-react";

import colorPalettes, {
  banana,
  beige,
  CustomColorString,
  pink,
  purple,
  white,
} from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import Box from "../Box";

const { primary, secondary, success, critical, yellow, plum, neutral, info } =
  colorPalettes;

const createTextButtonStyle = (
  color: any,
  colorIndex = 60,
  hoverIndex = 95,
  activeIndex = 99
) => ({
  color: color[colorIndex],
  "&:hover": {
    backgroundColor: color[hoverIndex],
    "&:before": {
      backgroundColor: "transparent",
    },
  },
  "&:active": {
    backgroundColor: color[activeIndex],
  },
});

const createOutlinedButtonStyle = (
  color: any,
  colorIndex = 60,
  hoverIndex = 95,
  activeIndex = 99
) => ({
  color: color[colorIndex],
  background: "transparent",
  borderWidth: "1px",
  borderStyle: "solid",
  "&:hover": {
    backgroundColor: color[hoverIndex],
    "&:before": {
      backgroundColor: "transparent",
    },
  },
  "&:active": {
    backgroundColor: color[activeIndex],
  },
});

const createTonalButtonStyle = (
  color: any,
  colorIndex = 60,
  bgIndex = 95,
  hoverIndex = 90,
  activeIndex = 95
) => ({
  color: color[colorIndex],
  backgroundColor: color[bgIndex],
  "&:hover": {
    backgroundColor: color[hoverIndex],
  },
  "&:active": {
    backgroundColor: color[activeIndex],
  },
});

const containedButtonBase = {
  borderRadius: "10px",
  color: white,
  border: "none",
  boxShadow: "none",
  "&.Mui-disabled": {
    backgroundColor: neutral[90],
    color: neutral[60],
    border: "none",
    outline: "none",
  },
  "&.Mui-focused, &:focus:not(:active)": {
    boxShadow: "none",
  },
};

const createContainedButtonStyle = (
  color: any,
  backgroundIndex = 60,
  hoverIndex = 50,
  activeIndex = 60
) => ({
  backgroundColor: color[backgroundIndex],
  boxShadow: "0px 0.3px 0.8px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: color[hoverIndex],
    "&:before": {
      backgroundColor: "transparent",
    },
  },
  "&:active": {
    backgroundColor: color[activeIndex],
  },
});

const buttonBaseStyles = {
  letterSpacing: "0px",
  textTransform: "none" as const,
  gap: "4px",
  borderRadius: RADIUS.M,
  height: "32px",
  padding: "0px 16px",
  transition: "background-color 0.2s",
  "@media (max-width: 600px)": {
    height: "40px",
    padding: "1px 16px",
  },
  "& .MuiTouchRipple-root": {
    display: "none",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
  "& .MuiButton-startIcon, & .MuiButton-endIcon": {
    "& > *:first-of-type": {
      fontSize: "16px",
    },
  },
};

const StyledButton = styled(CegidButton)(({ theme }) => ({
  ...buttonBaseStyles,
  "&.MuiButton-contained": {
    ...containedButtonBase,
  },
  "&.MuiButton-containedPrimary": {
    ...createContainedButtonStyle(primary),
  },
  "&.MuiButton-containedSecondary": {
    ...createContainedButtonStyle(secondary),
  },
  "&.MuiButton-containedError": {
    ...createContainedButtonStyle(critical),
  },
  "&.MuiButton-containedSuccess": {
    ...createContainedButtonStyle(success),
  },
  "&.MuiButton-containedWarning": {
    ...createContainedButtonStyle(yellow),
  },
  "&.MuiButton-containedInfo": {
    ...createContainedButtonStyle(info),
    "&.Mui-focused, &:focus:not(:active)": {
      boxShadow: "none",
    },
  },
  "&.MuiButton-containedNeutral": {
    color: neutral[10],
    backgroundColor: white,
    outlineWidth: "2px",
    outlineStyle: "solid",
    outlineColor: neutral[99],
    border: "none",
    "&:hover": {
      backgroundColor: neutral[99],
      "&:before": {
        backgroundColor: "transparent",
      },
    },
    "&:active": {
      backgroundColor: neutral[99],
    },
  },

  "&.MuiButton-outlined": {
    ...createOutlinedButtonStyle(primary),
    "&.Mui-disabled": {
      borderColor: neutral[90],
      color: neutral[90],
    },
    "&.Mui-focused, &:focus:not(:active)": {
      boxShadow: "none",
    },
  },
  "&.MuiButton-outlinedNeutral": {
    borderColor: neutral[90],
    ...createOutlinedButtonStyle(neutral, 10),
  },
  "&.MuiButton-outlinedSecondary": {
    ...createOutlinedButtonStyle(secondary),
    borderColor: neutral[90],
  },
  "&.MuiButton-outlinedError": {
    ...createOutlinedButtonStyle(critical, 50),
    borderColor: critical[80],
  },
  "&.MuiButton-outlinedWarning": {
    ...createOutlinedButtonStyle(yellow),
    borderColor: yellow[80],
  },
  "&.MuiButton-outlinedSuccess": {
    ...createOutlinedButtonStyle(success),
    borderColor: success[80],
  },
  "&.MuiButton-outlinedInfo": {
    ...createOutlinedButtonStyle(info),
    borderColor: info[80],
  },

  "&.MuiButton-text": {
    ...createTextButtonStyle(primary),
    "&.Mui-disabled": {
      borderColor: neutral[90],
      color: neutral[90],
    },
    "&.Mui-focused, &:focus:not(:active)": {
      boxShadow: "none",
    },
  },
  "&.MuiButton-textError": {
    ...createTextButtonStyle(critical, 50),
  },
  "&.MuiButton-textWarning": {
    ...createTextButtonStyle(yellow, 50),
  },
  "&.MuiButton-textSuccess": {
    ...createTextButtonStyle(success, 50),
  },
  "&.MuiButton-textInfo": {
    ...createTextButtonStyle(plum, 50),
  },
  "&.MuiButton-textSecondary": {
    ...createTextButtonStyle(secondary, 50),
  },
  "&.MuiButton-textNeutral": {
    ...createTextButtonStyle(neutral, 10),
  },

  "&.MuiButton-tonal": {
    ...createTonalButtonStyle(primary),
    "&.Mui-disabled": {
      borderColor: neutral[90],
      color: neutral[80],
      backgroundColor: neutral[95],
    },
    "&.Mui-focused, &:focus:not(:active)": {
      boxShadow: "none",
    },
  },
  "&.MuiButton-tonalError": {
    ...createTonalButtonStyle(critical),
  },
  "&.MuiButton-tonalWarning": {
    ...createTonalButtonStyle(yellow),
  },
  "&.MuiButton-tonalSuccess": {
    ...createTonalButtonStyle(success),
  },
  "&.MuiButton-tonalInfo": {
    ...createTonalButtonStyle(plum),
  },
  "&.MuiButton-tonalSecondary": {
    ...createTonalButtonStyle(secondary),
  },
  "&.MuiButton-tonalNeutral": {
    ...createTonalButtonStyle(neutral, 10),
  },
}));

const Button = React.forwardRef<HTMLButtonElement, CegidButtonProps>(
  (props, ref) => {
    const getContainedBackgroundColor = () => {
      if (props.variant === "contained" && !props.disabled) {
        switch (props.color) {
          case "primary":
            return "#236BF0";
          case "secondary":
            return secondary[50];
          case "neutral":
            return neutral[99];
          case "success":
            return success[50];
          case "yellow":
            return yellow[50];
          case "warning":
            return yellow[50];
          case "banana":
            return banana[50];
          case "critical":
            return critical[50];
          case "pink":
            return pink[50];
          case "purple":
            return purple[50];
          case "plum":
            return plum[50];
          case "beige":
            return beige[50];
          case "info":
            return info[50];
          case "error":
            return critical[50];
          default:
            return "#236BF0";
        }
      }
    };

    return (
      <Box
        p={1}
        backgroundColor={getContainedBackgroundColor() as CustomColorString}
        borderRadius={3}
      >
        <StyledButton
          {...{ disableRipple: true, disableElevation: true, ...props }}
          ref={ref}
        />
      </Box>
    );
  }
);

export default Button;
