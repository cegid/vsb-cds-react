"use client";

import { useCallback, useRef } from "react";
import {
  styled,
  Select as CegidSelect,
  SelectProps as CegidSelectProps,
} from "@cegid/cds-react";

import { borderNeutral, colorPalettes } from "../../theme/colors";
import typography from "../../theme/typography";
import Row from "../Row";
import Icon, { IconProps } from "../Icon";
import Typography from "../Typography";

function SelectIcon(props: IconProps) {
  return (
    <Icon size={16} {...props}>
      arrow-down-01
    </Icon>
  );
}

const { primary, neutral, critical } = colorPalettes;

const repositionMenuIfNeeded = (paperElement: HTMLElement) => {
  const rect = paperElement.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  if (rect.bottom > viewportHeight) {
    const overflow = rect.bottom - viewportHeight;
    const currentTop = parseFloat(paperElement.style.top) || rect.top;
    const newTop = currentTop - overflow - 8;

    if (newTop >= 8) {
      paperElement.style.top = `${newTop}px`;
    }
  }
};

interface StyledSelectProps {
  outlined?: boolean;
}

const StyledSelect = styled(CegidSelect)<StyledSelectProps>(
  ({ theme, outlined = true }) => ({
    "& .MuiInputBase-root": {
      caretColor: "transparent",
      padding: "8px 8px 8px 16px",
      border: `1px solid ${borderNeutral}`,
      borderRadius: 8,
      cursor: "pointer",
      position: "relative",
      "&::before": {
        border: "none !important",
      },
      ...(outlined === false && {
        border: "none !important",
        "&::after": {
          border: "none !important",
        },
      }),
      "&.Mui-error": {
        borderColor: outlined ? critical[80] : "transparent",
        backgroundColor: critical[99],
        "&:hover": {
          backgroundColor: critical[90],
        },
      },
      "&.Mui-focused": {
        outline: `2px solid ${primary[70]}`,
        outlineOffset: "1px",
      },
      "&.Mui-focused:has([aria-expanded='true'])": {
        outline: "none",
        outlineOffset: "0",
      },
      "&.Mui-readOnly": {
        backgroundColor: neutral[99],
        "&.Mui-focused": {
          outline: "none",
          outlineOffset: "0",
        },
      },
      "& .MuiSelect-icon": {
        color: neutral[50],
        right: 8,
        pointerEvents: "none",
      },
      "&.Mui-focused::before": {
        borderColor: "transparent",
      },
      "&.Mui-error::before": {
        borderColor: "transparent",
      },
      ":hover": {
        backgroundColor: neutral[99],
        borderColor: outlined ? neutral[90] : "transparent",
      },
    },
    "& .MuiSelect-select": {
      ...typography.bodyMRegular,
      color: neutral[10],
      paddingLeft: "0 !important",
      [theme.breakpoints.down("sm")]: {
        paddingTop: "8px !important",
      },
      [theme.breakpoints.up("sm")]: {
        minHeight: "auto !important",
        lineHeight: "normal !important",
      },
      "&:focus": {
        backgroundColor: "transparent",
      },
    },
    "& .MuiMenu-paper": {
      borderRadius: "16px",
      boxShadow: "0px 2px 4px 0px #0000000A, 0px 4px 8px 0px #0000000A",
      border: `1px solid #E6EAEE`,
      boxSizing: "border-box",
      margin: 0,
      marginTop: "4px",
    },
    "& .MuiMenu-list": {
      padding: "8px",
    },
    "& .MuiMenuItem-root": {
      ...typography.bodyMRegular,
      color: primary[10],
      "&:hover": {
        backgroundColor: neutral[95],
      },
      "&.Mui-selected": {
        backgroundColor: primary[95],
        "&:hover": {
          backgroundColor: primary[90],
        },
      },
    },
    "& .MuiInputLabel-root": {
      ...typography.bodySSemiBold,
      marginBottom: "8px",
      color: neutral[50],
      "&.Mui-focused": {
        color: neutral[50],
      },
      "&.Mui-error": {
        color: neutral[50],
      },
      [theme.breakpoints.down("sm")]: {
        position: "absolute",
        top: "10px",
        left: "12px",
        backgroundColor: "transparent",
        padding: "0 4px",
        transform: "translateY(0)",
        pointerEvents: "none",
        zIndex: 1,
      },
    },
    "& .MuiInputLabel-asterisk": {
      color: "inherit",
    },
    "& .MuiInputLabel-shrink": {
      [theme.breakpoints.down("sm")]: {
        transform: "translateY(0) scale(0.85)",
        transformOrigin: "top left",
      },
    },
    "& .MuiFormHelperText-root": {
      marginTop: "4px",
      fontSize: "12px",
      "&.Mui-error": {
        color: colorPalettes.critical[50],
      },
    },

    "& .CdsErrorText-errorMessage": {
      display: "none !important",
    },
    '& [id$="-error-text"]': {
      display: "none !important",
    },
    '& [aria-live="polite"]': {
      display: "none !important",
    },
  })
);

export interface SelectProps extends CegidSelectProps {
  outlined?: boolean;
}

function Select(props: Readonly<SelectProps>) {
  const {
    errorText,
    outlined = true,
    SelectProps: selectPropsProp,
    ...otherProps
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMenuEntered = useCallback(
    (node: HTMLElement) => {
      repositionMenuIfNeeded(node);

      selectPropsProp?.MenuProps?.TransitionProps?.onEntered?.(node, false);
    },
    [selectPropsProp?.MenuProps?.TransitionProps?.onEntered]
  );

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (target.getAttribute("role") === "combobox") {
      return;
    }

    const inputBase =
      containerRef.current?.querySelector<HTMLElement>(".MuiInputBase-root");

    if (inputBase && (inputBase === target || inputBase.contains(target))) {
      const combobox =
        containerRef.current?.querySelector<HTMLElement>('[role="combobox"]');
      if (combobox) {
        combobox.dispatchEvent(
          new MouseEvent("mousedown", { bubbles: true, cancelable: true })
        );
      }
    }
  }, []);

  return (
    <>
      <StyledSelect
        {...otherProps}
        ref={containerRef}
        outlined={outlined}
        onClick={handleClick}
        SelectProps={{
          ...selectPropsProp,
          IconComponent: SelectIcon,
          MenuProps: {
            ...selectPropsProp?.MenuProps,
            TransitionProps: {
              ...selectPropsProp?.MenuProps?.TransitionProps,
              onEntered: handleMenuEntered,
            },
          },
        }}
      />

      {errorText && (
        <Row gap={2} mt={4}>
          <Icon variant="stroke" size={16} color="critical/50">
            information-circle
          </Icon>
          <Typography variant="captionRegular" color="critical/50">
            {errorText}
          </Typography>
        </Row>
      )}
    </>
  );
}

export default Select;
