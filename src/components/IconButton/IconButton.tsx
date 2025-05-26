'use client';

import React from 'react';

import {
  IconButton as CegidIconButton,
  IconButtonProps as CegidIconButtonProps,
  shouldForwardProp,
  styled,
} from '@cegid/cds-react';

import colorPalettes from '../../../theme/colors';
import { RADIUS } from '../../../theme/radius';

const { primary, secondary, success, critical, yellow, plum, neutral } = colorPalettes;

type CustomVariant = 'default' | 'contained' | 'outlined' | 'tonal' | 'iconOnly';
type CustomColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'default'
  | 'neutral';
type CustomBrightness = 'default' | 'contrast';
type CustomSize = 'small' | 'medium' | 'large';

interface IconButtonOwnProps {
  variant?: CustomVariant;
  color?: CustomColor;
  square?: boolean;
  brightness?: CustomBrightness;
  size?: CustomSize;
}

type IconButtonProps = Omit<CegidIconButtonProps, 'variant' | 'color' | 'brightness'> &
  IconButtonOwnProps & { ref?: React.Ref<HTMLButtonElement> };

const createIconOnlyButtonStyle = (color: any, colorIndex = 50, hoverIndex = 95) => ({
  color: color[colorIndex],
  '&:hover': {
    backgroundColor: color[hoverIndex],
    '&:before': {
      backgroundColor: 'transparent',
    },
  },
  '&:active': {
    backgroundColor: neutral[99],
  },
  '&.Mui-disabled': {
    color: neutral[80],
  },
});

const createTonalIconButtonStyle = (
  color: any,
  colorIndex = 50,
  bgIndex = 95,
  hoverIndex = 90
) => ({
  color: color[colorIndex],
  backgroundColor: color[bgIndex],
  '&:hover': {
    backgroundColor: color[hoverIndex],
  },
  '&:active': {
    backgroundColor: color[80],
  },
  '&.Mui-disabled': {
    color: neutral[80],
    backgroundColor: neutral[95],
  },
});

const createContainedIconButtonStyle = (
  color: any,
  backgroundIndex = 60,
  hoverIndex = 50,
  activeIndex = 40
) => ({
  backgroundColor: color[backgroundIndex],
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: color[hoverIndex],
    '&:before': {
      backgroundColor: 'transparent',
    },
  },
  '&:active': {
    backgroundColor: color[activeIndex],
  },
  '&.Mui-disabled': {
    backgroundColor: neutral[99],
    color: neutral[90],
    border: '1px solid',
    borderColor: neutral[90],
  },
});

const createOutlinedIconButtonStyle = (color: any, colorIndex = 50) => ({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: color[90],
  backgroundColor: '#ffffff',
  color: color[colorIndex],
  '&:hover': {
    backgroundColor: color[95],
  },
  '&:active': {
    backgroundColor: color[95],
  },
  '&.Mui-disabled': {
    border: 'none',
    color: neutral[80],
    backgroundColor: neutral[95],
  },
});

const getSizeStyles = (size: CustomSize) => {
  switch (size) {
    case 'small':
      return {
        width: '30px',
        height: '30px',
        padding: '7px', 
        '& .MuiSvgIcon-root': {
          width: '16px',
          height: '16px',
          fontSize: '16px',
        },
      };
    case 'medium':
      return {
        width: '40px',
        height: '40px',
        padding: '12px',
        '& .MuiSvgIcon-root': {
          width: '16px',
          height: '16px',
          fontSize: '16px',
        },
      };
    case 'large':
      return {
        width: '48px',
        height: '48px',
        padding: '16px',
        '& .MuiSvgIcon-root': {
          width: '16px',
          height: '16px',
          fontSize: '16px',
        },
      };
    default:
      return {};
  }
};

const IconButtonRoot = styled(CegidIconButton, {
  name: 'CdsIconButton',
  slot: 'root',
  shouldForwardProp: (prop) =>
    shouldForwardProp(prop) && prop !== 'square' && prop !== 'variant' && prop !== 'brightness',
})<{ ownerState: IconButtonProps }>(({ theme, ownerState }) => {
  const baseStyles = {
    borderRadius: ownerState.square ? RADIUS.M : RADIUS.FULL,
    boxShadow: 'none',
    padding: '8px',
    transition: 'background-color 0.2s',
    '& .MuiSvgIcon-root': {
      width: '16px',
      height: '16px',
      fontSize: '16px',
    },
    [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
      padding: ownerState.size === 'small' ? '8px' : '12px',
    },
    ...(ownerState.size ? getSizeStyles(ownerState.size) : {}),
  };

  let colorPalette;
  const colorProp = ownerState.color ?? 'primary';

  const isErrorColor = colorProp === 'error';
  const isNeutralColor = colorProp === 'neutral';

  switch (colorProp) {
    case 'primary':
      colorPalette = primary;
      break;
    case 'secondary':
      colorPalette = secondary;
      break;
    case 'success':
      colorPalette = success;
      break;
    case 'error':
      colorPalette = critical;
      break;
    case 'warning':
      colorPalette = yellow;
      break;
    case 'info':
      colorPalette = plum;
      break;
    case 'neutral':
      colorPalette = neutral;
      break;
    default:
      colorPalette = primary;
  }

  let variantStyles = {};
  const variantProp = ownerState.variant ?? 'default';

  if (variantProp === 'default') {
    if (isErrorColor) {
      variantStyles = createContainedIconButtonStyle(colorPalette, 45, 40, 40);
    } else if (isNeutralColor) {
      variantStyles = {
        border: '1px solid',
        borderColor: neutral[90],
        backgroundColor: '#ffffff',
        color: neutral[50],
        '&:hover': {
          backgroundColor: neutral[99],
        },
        '&:active': {
          backgroundColor: neutral[95],
        },
        '&.Mui-disabled': {
          backgroundColor: neutral[99],
          color: neutral[90],
          border: '1px solid',
          borderColor: neutral[90],
        },
      };
    } else {
      variantStyles = createContainedIconButtonStyle(colorPalette);
    }
  } else if (variantProp === 'iconOnly') {
    const colorIndex = isErrorColor ? 40 : isNeutralColor ? 40 : 50;
    variantStyles = createIconOnlyButtonStyle(colorPalette, colorIndex, 95);
  } else if (variantProp === 'contained') {
    if (isErrorColor) {
      variantStyles = createContainedIconButtonStyle(colorPalette, 45, 40, 40);
    } else if (isNeutralColor) {
      variantStyles = {
        backgroundColor: neutral[50],
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: neutral[40],
        },
        '&:active': {
          backgroundColor: neutral[30],
        },
        '&.Mui-disabled': {
          backgroundColor: neutral[99],
          color: neutral[90],
          border: '1px solid',
          borderColor: neutral[90],
        },
      };
    } else {
      variantStyles = createContainedIconButtonStyle(colorPalette);
    }
  } else if (variantProp === 'outlined') {
    if (isErrorColor) {
      variantStyles = {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: critical[80],
        color: critical[40],
        backgroundColor: critical[95],
        '&:hover': {
          backgroundColor: critical[90],
          borderColor: critical[70],
        },
        '&.Mui-disabled': {
          borderColor: neutral[90],
          color: neutral[80],
          backgroundColor: 'transparent',
        },
      };
    } else if (colorProp === 'default') {
      variantStyles = {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: neutral[90],
        color: neutral[50],
        backgroundColor: '#ffffff',
        '&:hover': {
          backgroundColor: neutral[99],
        },
        '&:active': {
          backgroundColor: neutral[99],
        },
        '&.Mui-disabled': {
          borderColor: neutral[90],
          color: neutral[80],
          backgroundColor: 'transparent',
        },
      };
    } else if (isNeutralColor) {
      variantStyles = {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: neutral[90],
        color: neutral[50],
        backgroundColor: '#ffffff',
        '&:hover': {
          backgroundColor: neutral[95],
        },
        '&:active': {
          backgroundColor: neutral[90],
        },
        '&.Mui-disabled': {
          border: 'none',
          color: neutral[80],
          backgroundColor: neutral[99],
        },
      };
    } else {
      const colorIndex = isErrorColor ? 40 : 50;
      variantStyles = createOutlinedIconButtonStyle(colorPalette, colorIndex);
    }
  } else if (variantProp === 'tonal') {
    const colorIndex = isErrorColor ? 40 : isNeutralColor ? 40 : 50;

    if (isNeutralColor) {
      variantStyles = {
        border: 'none',
        color: neutral[40],
        backgroundColor: neutral[95],
        '&:hover': {
          backgroundColor: neutral[90],
        },
        '&:active': {
          backgroundColor: neutral[99],
        },
        '&.Mui-disabled': {
          color: neutral[80],
          backgroundColor: neutral[95],
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
    variant = 'default',
    color = 'primary',
    className,
    square = false,
    brightness = 'default',
    size = 'medium',
    ...props
  } = inProps;

  const ownerState = {
    variant,
    color,
    square,
    brightness,
    size,
    ...props,
  };

  const mapColor = (customColor: CustomColor) => {
    if (customColor === 'error' || customColor === 'default' || customColor === 'neutral')
      return 'inherit';
    return customColor;
  };

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
