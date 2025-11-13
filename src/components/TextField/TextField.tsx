"use client";

import {
  TextField as CegidTextField,
  TextFieldProps as CegidTextFieldProps,
  styled,
} from "@cegid/cds-react";
import { useEffect, useRef } from "react";

import { colorPalettes } from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import typography from "../../theme/typography";
import Row from "../Row";
import Icon from "../Icon";
import Typography from "../Typography";
import Box from "../Box";
import { color } from "chart.js/helpers";

export interface TextFieldProps extends CegidTextFieldProps {
  /**
   * Callback appelé après un délai (debounce) suivant la dernière frappe
   * @param event L'événement de changement
   * @param delay Le délai en millisecondes avant l'appel (défaut: 300ms)
   * @example
   * <TextField
   *   onDebouncedChange={(e) => performSearch(e.target.value)}
   *   debounceDelay={500}
   * />
   */
  onDebouncedChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Délai en millisecondes pour le debounce de onDebouncedChange
   * @default 300
   */
  debounceDelay?: number;
}

const { primary, neutral, critical } = colorPalettes;

const StyledTextField = styled(CegidTextField)(
  ({ theme, label, multiline }) => ({
    width: "100%",

    "& .MuiInputBase-root": {
      width: "100%",
      ...typography.bodyMRegular,
      borderRadius: RADIUS.S,
      border: `1px solid ${neutral[90]}`,
      "&:before, &:after": {
        content: "none",
      },
      "&.Mui-error": {
        borderColor: critical[80],
        backgroundColor: critical[99],
      },
      "&.Mui-focused": {
        outline: `2px solid ${primary[70]}`,
        outlineOffset: "1px",
        color: neutral[50],
      },
      "&.Mui-readOnly": {
        backgroundColor: neutral[99],
        "&.Mui-focused": {
          outline: "none",
          outlineOffset: "0",
        },
        "&.Mui-error": {
          backgroundColor: critical[99],
        },
      },
      "&.MuiInputBase-multiline": {
        paddingLeft: "12px",
        color: neutral[50],
      },
      [theme.breakpoints.down("sm")]: {
        ".MuiInputLabel-shrink + .CdsFormItem-inputWrapper &": {
          paddingTop: "18px",
        },
      },
    },

    "& .MuiInputAdornment-positionStart": {
      [theme.breakpoints.down("sm")]: {
        paddingTop: label ? "18px" : "0"
      },
    },
    "& .MuiInputAdornment-positionEnd": {
      [theme.breakpoints.down("sm")]: {
        paddingTop: label ? "18px" : "0"
      },
    },

    "& .MuiInputBase-input": {
      padding: multiline ? "8px 8px 8px 0" : "8px 8px 8px 16px",
      [theme.breakpoints.down("sm")]: {
        padding: multiline
          ? label
            ? "28px 8px 8px 0"
            : "8px 8px 8px 0"
          : label
            ? "28px 8px 8px 16px"
            : "8px 8px 8px 16px",
      },
      height: "24px",
      color: neutral[10],
      ...typography.bodyMRegular,
      "&::placeholder": {
        color: neutral[50],
        ...typography.bodyMRegular,
      },
    },

    "& .MuiFormLabel-root": {
      color: neutral[50],
      ...typography.bodySSemiBold,
      marginBottom: "8px",
      [theme.breakpoints.down("sm")]: {
        position: "absolute",
        top: "10px",
        left: "15px",
        backgroundColor: "transparent",
        transform: "translateY(0)",
        pointerEvents: "none",
        zIndex: 1,
      },
      "&.MuiInputLabel-shrink": {
        [theme.breakpoints.down("sm")]: {
          transform: "translateY(0) scale(0.85)",
          transformOrigin: "top left",
        },
      },
      "& .MuiInputLabel-asterisk": {
        color: "inherit",
      },
    },
    "&.CdsFormItem": {
      width: "100%",
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
    "& .mui-qaiqkx": {
      display: "none !important",
    },
  })
);

const TextField = (props: TextFieldProps) => {
  const { onDebouncedChange, debounceDelay = 300, onChange, errorText, fullWidth, ...restProps } = props;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);

    if (onDebouncedChange) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => onDebouncedChange(event), debounceDelay);
    }
  };

  return (
    <Box width={fullWidth ? "100%" : "fit-content"}>
      <StyledTextField {...restProps} fullWidth={fullWidth} onChange={handleChange} />
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
    </Box>
  );
};

export default TextField;
