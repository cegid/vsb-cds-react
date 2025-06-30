"use client";

import {
  styled,
  Select as CegidSelect,
  SelectProps as CegidSelectProps,
} from "@cegid/cds-react";

import { colorPalettes } from "../../theme/colors";
import typography from "../../theme/typography";
import Row from "../Row";
import Icon from "../Icon";
import Typography from "../Typography";

const { primary, neutral, critical } = colorPalettes;

const StyledSelect = styled(CegidSelect)(({ theme }) => ({
  "& .MuiInputBase-root": {
    padding: "8px 8px 8px 16px",
    "& .MuiInputAdornment-root": {
      left: "8px",
    },
    "&.Mui-error": {
      borderColor: critical[80],
      backgroundColor: critical[99],
    },
    "&.Mui-focused": {
      outline: `2px solid ${primary[70]}`,
      outlineOffset: "1px",
    },
    "&.Mui-readOnly": {
      backgroundColor: neutral[99],
      "&.Mui-focused": {
        outline: "none",
        outlineOffset: "0",
      },
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
  "& .MuiSelect-icon": {
    color: neutral[50],
    "&:hover": {
      backgroundColor: "transparent",
      color: neutral[10],
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
      "&.Mui-focusVisible": {
        backgroundColor: primary[90],
      },
    },
  },
  "& .MuiInputLabel-root": {
    ...typography.bodySSemiBold,
    marginBottom: "8px",
    color: neutral[50],
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
}));

function Select(props: CegidSelectProps) {
  const { errorText, ...otherProps } = props;

  return (
    <>
      <StyledSelect {...otherProps} />

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
