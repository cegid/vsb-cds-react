"use client";

import { styled } from "@mui/material/styles";
import React from "react";

import { Button as CegidButton } from "@cegid/cds-react";
import type { ButtonProps as CegidButtonProps } from "@cegid/cds-react";

import colorPalettes, { CustomColorString, white } from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import Box from "../Box";
import typography from "../../theme/typography";

export type ButtonVariant = NonNullable<CegidButtonProps["variant"]>;
export type ButtonColor = NonNullable<CegidButtonProps["color"]>;
export type ButtonSize = "small" | "medium" | "large" | "auto";

export interface ExtendedButtonProps extends Omit<CegidButtonProps, "size"> {
  /**
   * The size of the button.
   * @default "auto"
   * - `small`: 24px height with captionSemiBold typography
   * - `medium`: 32px height with bodySSemiBold typography
   * - `large`: 40px height with bodySSemiBold typography
   * - `auto`: Responsive size (32px on desktop, 40px on mobile)
   */
  size?: ButtonSize;
}

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
  bgIndex = 99,
  hoverIndex = 95,
  activeIndex = 99
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
  boxShadow: `0px 0.3px 0.8px ${color[40]}`,
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

const getSizeStyles = (size: ButtonSize, isContained = false) => {
  const heightReduction = isContained ? 4 : 0;

  switch (size) {
    case "small":
      return {
        height: `${24 - heightReduction}px`,
        padding: "0px 12px",
        ...typography.captionSemiBold,
        "& .MuiSvgIcon-root": {
          fontSize: "16px",
        },
        "& .MuiButton-startIcon": {
          marginRight: 0,
          "& > *:first-of-type": {
            fontSize: "16px",
          },
        },
        "& .MuiButton-endIcon": {
          marginLeft: 0,
          "& > *:first-of-type": {
            fontSize: "16px",
          },
        },
      };
    case "medium":
      return {
        height: `${32 - heightReduction}px`,
        padding: "0px 16px",
        ...typography.bodySSemiBold,
        "& .MuiSvgIcon-root": {
          fontSize: "16px",
        },
        "& .MuiButton-startIcon": {
          marginRight: 0,
          "& > *:first-of-type": {
            fontSize: "16px",
          },
        },
        "& .MuiButton-endIcon": {
          marginLeft: 0,
          "& > *:first-of-type": {
            fontSize: "16px",
          },
        },
      };
    case "large":
      return {
        height: `${40 - heightReduction}px`,
        padding: "0px 16px",
        ...typography.bodySSemiBold,
        "& .MuiSvgIcon-root": {
          fontSize: "16px",
        },
        "& .MuiButton-startIcon": {
          marginRight: 0,
          "& > *:first-of-type": {
            fontSize: "16px",
          },
        },
        "& .MuiButton-endIcon": {
          marginLeft: 0,
          "& > *:first-of-type": {
            fontSize: "16px",
          },
        },
      };
    case "auto":
    default:
      return {
        height: `${32 - heightReduction}px`,
        padding: "0px 16px",
        "@media (max-width: 600px)": {
          height: `${40 - heightReduction}px`,
          padding: "1px 16px",
        },
        ...typography.bodySSemiBold,
        "& .MuiSvgIcon-root": {
          fontSize: "16px",
        },
        "& .MuiButton-startIcon": {
          marginRight: 0,
          "& > *:first-of-type": {
            fontSize: "16px",
          },
        },
        "& .MuiButton-endIcon": {
          marginLeft: 0,
          "& > *:first-of-type": {
            fontSize: "16px",
          },
        },
      };
  }
};

const buttonBaseStyles = {
  letterSpacing: "0px",
  textTransform: "none" as const,
  gap: "4px",
  borderRadius: RADIUS.M,
  transition: "background-color 0.2s",
  display: "flex",
  whiteSpace: "nowrap",
  "& .MuiTouchRipple-root": {
    display: "none",
  },
};

const StyledButton = styled(CegidButton)<{ buttonsize?: ButtonSize }>(
  ({ theme, buttonsize = "auto" }) => ({
    ...buttonBaseStyles,
    ...getSizeStyles(buttonsize),
    "&.MuiButton-contained": {
      ...containedButtonBase,
      ...getSizeStyles(buttonsize, true),
      ...(buttonsize === "auto" && {
        "@media (max-width: 600px)": {
          height: "40px",
          padding: "1px 16px",
        },
      }),
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
      boxShadow: `0px 0.3px 0.8px ${neutral[90]}`,
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
  })
);

const Button = React.forwardRef<HTMLButtonElement, ExtendedButtonProps>(
  (props, ref) => {
    const { size = "auto", ...restProps } = props;

    const getContainedBackgroundColor = () => {
      if (!props.disabled) {
        switch (props.color) {
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

    if (props.variant === "contained") {
      return (
        <Box
          width={props.fullWidth ? "100%" : "fit-content"}
          p={1}
          backgroundColor={getContainedBackgroundColor() as CustomColorString}
          borderRadius={3}
        >
          <StyledButton
            {...{ disableRipple: true, disableElevation: true, ...restProps }}
            buttonsize={size}
            ref={ref}
          />
        </Box>
      );
    } else {
      return (
        <StyledButton
          {...{ disableRipple: true, disableElevation: true, ...restProps }}
          buttonsize={size}
          ref={ref}
        />
      );
    }
  }
);

Button.displayName = "Button";

export default Button;
