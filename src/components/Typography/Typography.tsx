'use client';

import { Variant } from '@mui/material/styles/createTypography';
import React from 'react';

import { Typography as CegidTypography } from '@cegid/cds-react';
import type { TypographyProps as CegidTypographyProps } from '@cegid/cds-react';

import colorPalettes, { CustomColorString, IColorPalettes } from '../../../theme/colors';
import { CustomVariant } from '../../../theme/typography';

export type ExtendedVariant = Variant | 'inherit' | CustomVariant;

interface CustomTypographyProps extends Omit<CegidTypographyProps, 'color' | 'variant' | 'component'> {
  color?: CustomColorString;
  variant?: ExtendedVariant;
  component?: React.ElementType;
}

type ShadeKey = keyof IColorPalettes;

const parseCustomColor = (colorValue: string): string | undefined => {
  if (!colorValue || typeof colorValue !== 'string') {
    return undefined;
  }

  if (colorValue === 'white') {
    return '#FFFFFF';
  }
  const matches = colorValue.match(/^([a-z]+)\/(\d+)$/);

  if (!matches) {
    return undefined;
  }

  const [, paletteName, shade] = matches;

  if (!colorPalettes[paletteName as keyof typeof colorPalettes]) {
    return undefined;
  }

  const palette = colorPalettes[paletteName as keyof typeof colorPalettes];
  const shadeKey = shade as unknown as ShadeKey;

  if (!palette[shadeKey]) {
    return undefined;
  }

  return palette[shadeKey];
};

const Typography = React.forwardRef<HTMLElement, CustomTypographyProps>((props, ref) => {
  const {
    color,
    variant,
    component = 'span',
    style = {},
    ...otherProps
  } = props;

  const customStyle = { ...style };

  if (typeof color === 'string') {
    const customColor = parseCustomColor(color);

    if (customColor) {
      customStyle.color = customColor;
      return (
        <CegidTypography
          ref={ref}
          style={customStyle}
          component={component}
          variant={variant as any}
          {...otherProps}
        >
          {otherProps.children}
        </CegidTypography>
      );
    }
  }

  return (
    <CegidTypography
      ref={ref}
      color={color as any}
      style={style}
      component={component}
      variant={variant as any}
      {...otherProps}
    >
      {otherProps.children}
    </CegidTypography>
  );
});

Typography.displayName = 'Typography';

export default Typography;