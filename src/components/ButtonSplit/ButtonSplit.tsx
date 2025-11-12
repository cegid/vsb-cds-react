"use client";

import { styled } from "@mui/material/styles";
import React from "react";
import { Menu, MenuItem } from "@mui/material";

import colorPalettes, {
  white,
  CustomColorString,
  borderNeutral,
} from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import Box from "../Box";
import typography from "../../theme/typography";
import Icon from "../Icon";
import ProgressBar from "../ProgressBar";

export type ButtonSplitVariant = "contained" | "outlined" | "text" | "tonal";
export type ButtonSplitColor = "primary" | "neutral";
export type ButtonSplitSize = "small" | "medium" | "large" | "auto";

export interface ButtonSplitMenuItem {
  /**
   * The label displayed in the menu item
   */
  label: string;
  /**
   * Optional icon name to display before the label
   */
  icon?: string;
  /**
   * Callback function when the menu item is clicked
   */
  onClick: () => void;
  /**
   * Whether the menu item is disabled
   * @default false
   */
  disabled?: boolean;
}

export interface ButtonSplitProps {
  /**
   * The content of the main button
   */
  children: React.ReactNode;
  /**
   * The variant of the button
   * @default "contained"
   */
  variant?: ButtonSplitVariant;
  /**
   * The color of the button
   * @default "primary"
   */
  color?: ButtonSplitColor;
  /**
   * The size of the button
   * @default "auto"
   */
  size?: ButtonSplitSize;
  /**
   * Optional icon name to display at the start of the main button
   */
  startIcon?: string;
  /**
   * Array of menu items to display in the dropdown
   */
  menuItems: ButtonSplitMenuItem[];
  /**
   * Callback when the main button is clicked
   */
  onClick?: () => void;
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows a loading state and disables the button interaction
   * @default false
   */
  isLoading?: boolean;
  /**
   * Whether the button should take the full width of its container
   * @default false
   */
  fullWidth?: boolean;
}

const { primary, neutral } = colorPalettes;

const getSizeStyles = (size: ButtonSplitSize, isContained = false) => {
  const heightReduction = isContained ? 4 : 0;

  switch (size) {
    case "small":
      return {
        height: `${24 - heightReduction}px`,
        ...typography.captionSemiBold,
        iconSize: 16,
        splitButtonSize: `${24 - heightReduction}px`,
      };
    case "medium":
      return {
        height: `${32 - heightReduction}px`,
        ...typography.bodySSemiBold,
        iconSize: 16,
        splitButtonSize: `${32 - heightReduction}px`,
      };
    case "large":
      return {
        height: `${40 - heightReduction}px`,
        ...typography.bodySSemiBold,
        iconSize: 16,
        splitButtonSize: `${40 - heightReduction}px`,
      };
    case "auto":
    default:
      return {
        height: `${32 - heightReduction}px`,
        ...typography.bodySSemiBold,
        iconSize: 16,
        splitButtonSize: `${32 - heightReduction}px`,
        "@media (max-width: 600px)": {
          height: `${40 - heightReduction}px`,
          splitButtonSize: `${40 - heightReduction}px`,
        },
      };
  }
};


const getColorStyles = (
  color: ButtonSplitColor,
  variant: ButtonSplitVariant
) => {
  const isPrimary = color === "primary";
  const isNeutral = color === "neutral";

  if (isPrimary) {
    if (variant === "contained") {
      return {
        backgroundColor: primary[60],
        color: white,
        boxShadow: `0px 0.3px 0.8px ${primary[40]}`,
        "&:active": {
          backgroundColor: primary[60],
        },
        "&:disabled": {
          backgroundColor: neutral[99],
          color: neutral[80],
          boxShadow: `0px 0.3px 0.8px ${neutral[90]}`,
        },
      };
    }

    if (variant === "outlined") {
      return {
        backgroundColor: "transparent",
        color: primary[60],
        border: `1px solid ${borderNeutral}`,
        "&:active": {
          backgroundColor: primary[99],
        },
        "&:disabled": {
          backgroundColor: "transparent",
          color: neutral[80],
          borderColor: borderNeutral,
        },
      };
    }

    if (variant === "tonal") {
      return {
        backgroundColor: primary[99],
        color: primary[60],
        border: "none",
        "&:active": {
          backgroundColor: primary[99],
        },
        "&:disabled": {
          backgroundColor: neutral[99],
          color: neutral[80],
        },
      };
    }

    if (variant === "text") {
      return {
        backgroundColor: "transparent",
        color: primary[60],
        border: "none",
        "&:hover": {
          backgroundColor: primary[99],
        },
        "&:active": {
          backgroundColor: primary[99],
        },
        "&:disabled": {
          backgroundColor: "transparent",
          color: neutral[80],
        },
      };
    }
  }

  if (isNeutral) {
    if (variant === "contained") {
      return {
        backgroundColor: white,
        color: neutral[10],
        boxShadow: `0px 0.3px 0.8px ${neutral[90]}`,
        "&:active": {
          backgroundColor: neutral[99],
        },
        "&:disabled": {
          backgroundColor: neutral[99],
          color: neutral[80],
          boxShadow: `0px 0.3px 0.8px ${neutral[90]}`,
        },
      };
    }

    if (variant === "outlined") {
      return {
        backgroundColor: "transparent",
        color: neutral[10],
        border: `1px solid ${borderNeutral}`,
        "&:active": {
          backgroundColor: neutral[90],
        },
        "&:disabled": {
          backgroundColor: "transparent",
          color: neutral[80],
          borderColor: borderNeutral,
        },
      };
    }

    if (variant === "tonal") {
      return {
        backgroundColor: neutral[99],
        color: neutral[10],
        border: "none",
        "&:active": {
          backgroundColor: neutral[99],
        },
        "&:disabled": {
          backgroundColor: neutral[99],
          color: neutral[80],
        },
      };
    }

    if (variant === "text") {
      return {
        backgroundColor: "transparent",
        color: neutral[10],
        border: "none",
        "&:hover": {
          backgroundColor: neutral[99],
        },
        "&:active": {
          backgroundColor: neutral[90],
        },
        "&:disabled": {
          backgroundColor: "transparent",
          color: neutral[80],
        },
      };
    }
  }

  return {};
};

const StyledButtonContainer = styled("div")<{
  buttoncolor: ButtonSplitColor;
  buttonvariant: ButtonSplitVariant;
  buttonsize: ButtonSplitSize;
  fullwidth: boolean;
}>(({ buttoncolor, buttonvariant, buttonsize, fullwidth }) => {
  const sizeStyles = getSizeStyles(buttonsize, buttonvariant === "contained");
  const isPrimary = buttoncolor === "primary";
  const isNeutral = buttoncolor === "neutral";

  const getContainerStyles = () => {
    if (buttonvariant === "contained") {
      if (isPrimary) {
        return {
          backgroundColor: primary[60],
          "&:hover": {
            backgroundColor: primary[70],
          },
        };
      }
      if (isNeutral) {
        return {
          backgroundColor: white,
          "&:hover": {
            backgroundColor: neutral[99],
          },
        };
      }
    }
    return {
      backgroundColor: "transparent",
    };
  };

  return {
    display: "flex",
    width: fullwidth ? "100%" : "fit-content",
    borderRadius: RADIUS.M,
    padding: buttonvariant === "contained" ? "2px" : "0px",
    ...getContainerStyles(),
  };
});

const StyledMainButton = styled("button")<{
  buttoncolor: ButtonSplitColor;
  buttonvariant: ButtonSplitVariant;
  buttonsize: ButtonSplitSize;
}>(({ buttoncolor, buttonvariant, buttonsize }) => {
  const sizeStyles = getSizeStyles(buttonsize, buttonvariant === "contained");
  const colorStyles = getColorStyles(buttoncolor, buttonvariant);

  return {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    paddingLeft: "5px",
    paddingRight: "8px",
    height: sizeStyles.height,
    border: "none",
    borderRadius: `10px 0 0 10px`,
    cursor: "pointer",
    transition: "background-color 0.2s",
    flex: 1,
    whiteSpace: "nowrap",
    ...colorStyles,
    ...(buttonvariant === "contained" && {
      "@media (max-width: 600px)": {
        height:
          buttonsize === "auto"
            ? getSizeStyles("large", true).height
            : undefined,
      },
    }),
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.6,
    },
  };
});

const StyledSplitButton = styled("button")<{
  buttoncolor: ButtonSplitColor;
  buttonvariant: ButtonSplitVariant;
  buttonsize: ButtonSplitSize;
}>(({ buttoncolor, buttonvariant, buttonsize }) => {
  const sizeStyles = getSizeStyles(buttonsize, buttonvariant === "contained");
  const colorStyles = getColorStyles(buttoncolor, buttonvariant);

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: sizeStyles.splitButtonSize,
    height: sizeStyles.height,
    border: "none",
    borderRadius: `0 10px 10px 0`,
    cursor: "pointer",
    transition: "background-color 0.2s",
    ...colorStyles,
    ...(buttonvariant === "contained" && {
      "@media (max-width: 600px)": {
        width:
          buttonsize === "auto"
            ? getSizeStyles("large", true).splitButtonSize
            : undefined,
        height:
          buttonsize === "auto"
            ? getSizeStyles("large", true).height
            : undefined,
      },
    }),
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.6,
    },
  };
});

const ButtonSplit = React.forwardRef<HTMLDivElement, ButtonSplitProps>(
  (props, ref) => {
    const {
      children,
      variant = "contained",
      color = "primary",
      size = "auto",
      startIcon,
      menuItems = [],
      onClick,
      disabled = false,
      isLoading = false,
      fullWidth = false,
    } = props;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleSplitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !isLoading) {
        setAnchorEl(event.currentTarget);
      }
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleMenuItemClick = (menuItem: ButtonSplitMenuItem) => {
      if (!menuItem.disabled) {
        menuItem.onClick();
        handleClose();
      }
    };

    const handleMainClick = () => {
      if (!disabled && !isLoading && onClick) {
        onClick();
      }
    };

    const sizeStyles = getSizeStyles(size, variant === "contained");

    const getProgressBarColor = () => {
      switch (color) {
        case "primary":
          return "primary";
        case "neutral":
          return "neutral";
        default:
          return "primary";
      }
    };

    const getContainedBackgroundColor = () => {
      if (!disabled) {
        switch (color) {
          case "primary":
            return primary[60];
          case "neutral":
            return white;
          default:
            return primary[60];
        }
      } else {
        return neutral[99];
      }
    };

    const buttonContent = (
      <StyledButtonContainer
        ref={ref}
        buttoncolor={color}
        buttonvariant={variant}
        buttonsize={size}
        fullwidth={fullWidth}
      >
        <StyledMainButton
          buttoncolor={color}
          buttonvariant={variant}
          buttonsize={size}
          disabled={disabled || isLoading}
          onClick={handleMainClick}
        >
          {isLoading ? (
            <ProgressBar
              shape="circle"
              size={16}
              color={getProgressBarColor()}
            />
          ) : (
            <>
              {startIcon && (
                <Icon size={sizeStyles.iconSize} color={white}>
                  {startIcon}
                </Icon>
              )}
              <span>{children}</span>
            </>
          )}
        </StyledMainButton>
        <StyledSplitButton
          buttoncolor={color}
          buttonvariant={variant}
          buttonsize={size}
          disabled={disabled || isLoading}
          onClick={handleSplitClick}
          aria-haspopup="true"
          aria-expanded={open}
        >
          <Icon size={sizeStyles.iconSize} color={white}>
            chevron-down
          </Icon>
        </StyledSplitButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => handleMenuItemClick(item)}
              disabled={item.disabled}
            >
              {item.icon && (
                <Icon size={16} color={neutral[10]} style={{ marginRight: 8 }}>
                  {item.icon}
                </Icon>
              )}
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </StyledButtonContainer>
    );

    if (variant === "contained") {
      return (
        <Box
          width={fullWidth ? "100%" : "fit-content"}
          p={1}
          backgroundColor={
            getContainedBackgroundColor() as CustomColorString
          }
          borderRadius={3}
        >
          {buttonContent}
        </Box>
      );
    }

    return buttonContent;
  }
);

ButtonSplit.displayName = "ButtonSplit";

export default ButtonSplit;
