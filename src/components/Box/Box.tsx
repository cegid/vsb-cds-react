'use client'

import React from 'react';

import { Box as CegidBox } from '@cegid/cds-react';

import colorPalettes, { CustomColorString, IColorPalettes } from '../../theme/colors';

type CegidBoxProps = React.ComponentProps<typeof CegidBox>;

interface CustomBoxProps extends Omit<CegidBoxProps, 'bgcolor' | 'backgroundColor'> {
  backgroundColor?: CustomColorString;
}

type ShadeKey = keyof IColorPalettes;

const parseCustomColor = (colorValue: string): string | undefined => {
  if (!colorValue || typeof colorValue !== 'string') {
    return undefined;
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

const Box = React.forwardRef<HTMLDivElement, CustomBoxProps>((props, ref) => {
  const { backgroundColor, style = {}, ...otherProps } = props;

  let customStyle = { ...style };

  if (typeof backgroundColor === 'string') {
    const customColor = parseCustomColor(backgroundColor);

    if (customColor) {
      customStyle.backgroundColor = customColor;
    } else if (backgroundColor) {
      otherProps.sx = {
        ...(otherProps.sx || {}),
        bgcolor: backgroundColor,
      };
    }
  }

  return <CegidBox ref={ref} style={customStyle} {...otherProps} />;
});

Box.displayName = 'Box';

export default Box;
