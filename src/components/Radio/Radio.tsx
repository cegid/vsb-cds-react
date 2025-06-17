"use client";

import React from "react";
import {
  Radio as CegidRadio,
  RadioProps as CegidRadioProps,
} from "@cegid/cds-react";
import { styled } from "@mui/material/styles";
import { neutral, primary, white } from "../../theme";

export interface CustomRadioProps extends CegidRadioProps {}

const StyledRadio = styled(CegidRadio)(() => ({
  "& .PrivateSwitchBase-root": {
    "&:hover": {
      backgroundColor: "transparent !important",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "transparent !important",
    },
  },
  "&:hover": {
    backgroundColor: "transparent",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "transparent",
  },
  "& .MuiTouchRipple-root": {
    display: "none",
  },
  "&.MuiRadio-root": {
    color: neutral[70],
    "&.Mui-checked": {
      color: primary[60],
    },
    "&.Mui-disabled": {
      color: neutral[40],
      "&.Mui-checked": {
        color: neutral[40],
      },
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.5rem",
    },
  },
  '& .MuiSvgIcon-root[data-testid="RadioButtonUncheckedIcon"]': {
    fill: neutral[70],
  },
  '& .MuiSvgIcon-root[data-testid="RadioButtonCheckedIcon"]': {
    fill: primary[60],
  },
  '&.Mui-disabled .MuiSvgIcon-root[data-testid="RadioButtonUncheckedIcon"]': {
    fill: neutral[40],
  },
  '&.Mui-disabled .MuiSvgIcon-root[data-testid="RadioButtonCheckedIcon"]': {
    fill: neutral[40],
  },
  '&.Mui-checked .MuiSvgIcon-root[data-testid="RadioButtonCheckedIcon"]': {
    "& path": {
      d: 'path("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z")',
      fillRule: "evenodd",
    },
  },
  "& .custom-checked-icon": {
    "& circle:first-of-type": {
      fill: primary[60],
      transition: "fill 0.2s ease",
    },
  },
  "&.Mui-checked:hover .custom-checked-icon": {
    "& circle:first-of-type": {
      fill: primary[50],
    },
  },
  "&.Mui-disabled .custom-checked-icon": {
    "& circle:first-of-type": {
      fill: `${neutral[40]} !important`,
    },
    "& circle:last-of-type": {
      fill: `${neutral[20]} !important`,
    },
  },
}));

const Radio: React.FC<CustomRadioProps> = (props) => {
  const { disabled, checked, ...restProps } = props;

  const getBorderColor = () => {
    if (disabled) return neutral[90];
    return neutral[70];
  };

  const getFillColor = () => {
    if (disabled) return neutral[95];
    return primary[60];
  };

  const getDotColor = () => {
    if (disabled) return white;
    return white;
  };

  return (
    <StyledRadio
      disableRipple
      disableFocusRipple
      disabled={disabled}
      checked={checked}
      {...restProps}
      icon={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke={getBorderColor()}
            strokeWidth="1"
            fill="none"
          />
        </svg>
      }
      checkedIcon={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill={getFillColor()} />
          <circle cx="12" cy="12" r="4" fill={getDotColor()} />
        </svg>
      }
    />
  );
};

export default Radio;
