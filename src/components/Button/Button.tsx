'use client';

import { styled } from '@mui/material/styles';
import React from 'react';

import { Button as CegidButton } from '@cegid/cds-react';
import type { ButtonProps as CegidButtonProps } from '@cegid/cds-react';

import colorPalettes from '../../../theme/colors';
import { RADIUS } from '../../../theme/radius';

const { primary, secondary, success, critical, yellow, plum, neutral, banana, pink, purple } =
  colorPalettes;

const createTextButtonStyle = (color: any, colorIndex = 50, hoverIndex = 60, activeIndex = 60) => ({
  color: color[colorIndex],
  '&:hover': {
    backgroundColor: `${color[hoverIndex]}14`,
    '&:before': {
      backgroundColor: 'transparent',
    },
  },
  '&:active': {
    backgroundColor: `${color[activeIndex]}1F`,
  },
});

const createOutlinedButtonStyle = (
  color: any,
  colorIndex = 50,
  hoverIndex = 60,
  activeIndex = 60
) => ({
  color: color[colorIndex],
  background: '#ffffff',
  borderWidth: '1px',
  borderStyle: 'solid',
  '&:hover': {
    backgroundColor: `${color[hoverIndex]}14`,
    '&:before': {
      backgroundColor: 'transparent',
    },
  },
  '&:active': {
    backgroundColor: `${color[activeIndex]}1F`,
  },
});

const createTonalButtonStyle = (
  color: any,
  colorIndex = 50,
  bgIndex = 60,
  hoverIndex = 60,
  activeIndex = 60
) => ({
  color: color[colorIndex],
  backgroundColor: `${color[bgIndex]}14`,
  '&:hover': {
    backgroundColor: `${color[hoverIndex]}1F`,
  },
  '&:active': {
    backgroundColor: `${color[activeIndex]}1F`,
  },
});

const containedButtonBase = {
  borderRadius: RADIUS.FULL,
  color: '#FFFFFF',
  '&.Mui-disabled': {
    backgroundColor: neutral[90],
    color: neutral[60],
  },
  '&.Mui-focused, &:focus:not(:active)': {
    boxShadow: 'none',
  },
};

const createContainedButtonStyle = (
  color: any,
  backgroundIndex = 60,
  hoverIndex = 50,
  activeIndex = 40
) => ({
  backgroundColor: color[backgroundIndex],
  '&:hover': {
    backgroundColor: color[hoverIndex],
    '&:before': {
      backgroundColor: 'transparent',
    },
  },
  '&:active': {
    backgroundColor: color[activeIndex],
  },
});

const buttonBaseStyles = {
  letterSpacing: '0px',
  textTransform: 'none' as const,
  gap: '4px',
  borderRadius: RADIUS.FULL,
  height: '32px',
  padding: '0px 16px',
  transition: 'background-color 0.2s',
  '@media (max-width: 600px)': {
    height: '40px',
    padding: '1px 16px',
  },
  '& .MuiTouchRipple-root': {
    display: 'none',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '16px',
  },
  '& .MuiButton-startIcon, & .MuiButton-endIcon': {
    '& > *:first-of-type': {
      fontSize: '16px',
    },
  },
};

const StyledButton = styled(CegidButton)(({ theme }) => ({
  ...buttonBaseStyles,
  '&.MuiButton-contained': {
    ...containedButtonBase,
  },
  '&.MuiButton-containedPrimary': {
    ...createContainedButtonStyle(primary),
  },
  '&.MuiButton-containedSecondary': {
    ...createContainedButtonStyle(secondary),
  },
  '&.MuiButton-containedError': {
    ...createContainedButtonStyle(critical, 45, 40, 40),
  },
  '&.MuiButton-containedSuccess': {
    ...createContainedButtonStyle(success),
  },
  '&.MuiButton-containedWarning': {
    ...createContainedButtonStyle(yellow, 50, 45, 40),
  },
  '&.MuiButton-containedInfo': {
    ...createContainedButtonStyle(plum),
    '&.Mui-focused, &:focus:not(:active)': {
      boxShadow: 'none',
    },
  },
  '&.MuiButton-containedNeutral': {
    color: neutral[50],
    backgroundColor: '#ffffff',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: neutral[90],
    '&:hover': {
      backgroundColor: neutral[99],
      '&:before': {
        backgroundColor: 'transparent',
      },
    },
    '&:active': {
      backgroundColor: neutral[99],
    },
  },

  '&.MuiButton-outlined': {
    ...createOutlinedButtonStyle(primary),
    '&.Mui-disabled': {
      borderColor: neutral[90],
      color: neutral[90],
    },
    '&.Mui-focused, &:focus:not(:active)': {
      boxShadow: 'none',
    },
  },
  '&.MuiButton-outlinedNeutral': {
    borderColor: neutral[90],
    ...createOutlinedButtonStyle(neutral),
  },
  '&.MuiButton-outlinedSecondary': {
    ...createOutlinedButtonStyle(secondary),
    borderColor: neutral[90],
  },
  '&.MuiButton-outlinedError': {
    ...createOutlinedButtonStyle(critical, 40, 45, 45),
    borderColor: critical[80],
  },
  '&.MuiButton-outlinedWarning': {
    ...createOutlinedButtonStyle(yellow),
    borderColor: yellow[80],
  },
  '&.MuiButton-outlinedSuccess': {
    ...createOutlinedButtonStyle(success),
    borderColor: success[80],
  },
  '&.MuiButton-outlinedInfo': {
    ...createOutlinedButtonStyle(success),
    borderColor: plum[80],
  },

  '&.MuiButton-text': {
    ...createTextButtonStyle(primary),
    '&.Mui-disabled': {
      borderColor: neutral[90],
      color: neutral[90],
    },
    '&.Mui-focused, &:focus:not(:active)': {
      boxShadow: 'none',
    },
  },
  '&.MuiButton-textError': {
    ...createTextButtonStyle(critical, 40, 45, 45),
  },
  '&.MuiButton-textWarning': {
    ...createTextButtonStyle(yellow, 40),
  },
  '&.MuiButton-textSuccess': {
    ...createTextButtonStyle(success, 40),
  },
  '&.MuiButton-textInfo': {
    ...createTextButtonStyle(plum, 40),
  },
  '&.MuiButton-textSecondary': {
    ...createTextButtonStyle(secondary, 40),
  },
  '&.MuiButton-textNeutral': {
    ...createTextButtonStyle(neutral),
  },

  '&.MuiButton-tonal': {
    ...createTonalButtonStyle(primary),
    '&.Mui-disabled': {
      borderColor: neutral[90],
      color: neutral[80],
      backgroundColor: neutral[95],
    },
    '&.Mui-focused, &:focus:not(:active)': {
      boxShadow: 'none',
    },
  },
  '&.MuiButton-tonalError': {
    ...createTonalButtonStyle(critical, 40, 45, 45),
  },
  '&.MuiButton-tonalWarning': {
    ...createTonalButtonStyle(yellow),
  },
  '&.MuiButton-tonalSuccess': {
    ...createTonalButtonStyle(success),
  },
  '&.MuiButton-tonalInfo': {
    ...createTonalButtonStyle(plum),
  },
  '&.MuiButton-tonalSecondary': {
    ...createTonalButtonStyle(secondary),
  },
  '&.MuiButton-tonalNeutral': {
    ...createTonalButtonStyle(neutral),
  },
}));

const Button = React.forwardRef<HTMLButtonElement, CegidButtonProps>((props, ref) => {
  return <StyledButton {...{ disableRipple: true, disableElevation: true, ...props }} ref={ref} />;
});

export default Button;
export * from '@mui/material/Button';
