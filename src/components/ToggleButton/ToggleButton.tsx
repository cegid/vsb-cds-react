'use client';

import React from 'react';

import { ToggleButton as CegidToggleButton, styled } from '@cegid/cds-react';

import { neutral, primary } from '../../theme/colors';

type ToggleButtonVariant = 'borderless' | 'filled';

interface ToggleButtonProps extends React.ComponentProps<typeof CegidToggleButton> {
  variant?: ToggleButtonVariant;
}

const getStyles = (variant: ToggleButtonVariant = 'filled') => {
  const baseStyles = {
    borderRadius: '8px',
    padding: '8px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&:focus-visible': {
      outline: 'none',
    },
  };

  const variantStyles = {
    filled: {
      border: `1px solid ${neutral[90]}`,
      boxShadow: '0px 2px 4px 0px #B3B3B366',
      backgroundColor: '#FFFFFF',
      color: primary[10],

      '&[aria-pressed=true]': {
        backgroundColor: primary[99],
        borderColor: primary[90],
        color: primary[50],
      },

      '&:hover:not([disabled])': {
        backgroundColor: neutral[99],
      },

      '&:active:not([disabled])': {
        backgroundColor: neutral[99],
        boxShadow: 'none',
      },

      '&:focus-visible': {
        boxShadow: '0px 2px 4px 0px #B3B3B366',
        borderColor: primary[65],
      },

      '&[disabled]': {
        backgroundColor: neutral[99],
        boxShadow: '0px 2.5px 5px 0px #B3B3B366',
        color: neutral[90],
        cursor: 'not-allowed',
      },
    },
    borderless: {
      border: 'none',
      boxShadow: 'none',
      backgroundColor: '#ffffff',
      color: neutral[50],

      '&[aria-pressed=true]': {
        backgroundColor: '#ffffff',
        color: primary[10],
      },

      '&:hover:not([disabled])': {
        backgroundColor: neutral[95],
        color: primary[10],
      },

      '&:active:not([disabled])': {
        backgroundColor: neutral[90],
        color: primary[10],
      },

      '&:focus-visible': {
        outline: `1px solid ${primary[65]}`,
        outlineOffset: '2px',
      },

      '&[disabled]': {
        border: 'none',
        boxShadow: 'none',
        backgroundColor: '#ffffff',
        color: neutral[50],
        cursor: 'not-allowed',
      },
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[variant],
  };
};

const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  ({ variant = 'filled', ...props }, ref) => {
    const StyledToggleButton = styled(CegidToggleButton)(getStyles(variant));

    return <StyledToggleButton ref={ref} {...props} />;
  }
);

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
