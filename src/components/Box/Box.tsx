'use client';

import React from 'react';

import { Box as CegidBox } from '@cegid/cds-react';

import colorPalettes, { CustomColorString, IColorPalettes } from '../../../theme/colors';

type CegidBoxProps = React.ComponentProps<typeof CegidBox>;

interface CustomBoxProps
  extends Omit<
    CegidBoxProps,
    | 'bgcolor'
    | 'backgroundColor'
    | 'border'
    | 'borderTop'
    | 'borderLeft'
    | 'borderBottom'
    | 'borderRight'
  > {
  /**
   * Sets the background color of the component.
   * Accepts a string matching a custom color.
   */
  backgroundColor?: CustomColorString;

  /**
   * Configures all borders of the component.
   * Defines style, width, and color for all sides at once.
   */
  border?: BorderProps;

  /**
   * Configures only the top border of the component.
   * Overrides the general border setting for the top side.
   */
  borderTop?: BorderProps;

  /**
   * Configures only the left border of the component.
   * Overrides the general border setting for the left side.
   */
  borderLeft?: BorderProps;

  /**
   * Configures only the bottom border of the component.
   * Overrides the general border setting for the bottom side.
   */
  borderBottom?: BorderProps;

  /**
   * Configures only the right border of the component.
   * Overrides the general border setting for the right side.
   */
  borderRight?: BorderProps;
}

/**
 * Defines the properties of a border.
 * Used to specify border appearance for component edges.
 */
export type BorderProps = {
  /**
   * The color of the border.
   * Uses the CustomColorString type for color values.
   */
  color: CustomColorString;

  /**
   * The width of the border in pixels.
   * Specifies the thickness of the border line.
   */
  width: number; // in pixels

  /**
   * The visual style of the border.
   * Determines how the border line is rendered.
   */
  style: BorderStyleProps;
};

/**
 * Available border style options.
 * These values correspond to standard CSS border style properties.
 */
export type BorderStyleProps =
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset';

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
  const {
    backgroundColor,
    border,
    borderTop,
    borderBottom,
    borderRight,
    borderLeft,
    style = {},
    ...otherProps
  } = props;

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

  const formatBorder = (border?: BorderProps) => {
    return border
      ? `${border?.style} ${border?.width}px ${parseCustomColor(border?.color ?? '')}`
      : undefined
  }

  return (
    <CegidBox
      border={
        formatBorder(border)
      }
      borderTop={
        formatBorder(borderTop)
      }
      borderBottom={
        formatBorder(borderBottom)
      }
      borderRight={
        formatBorder(borderRight)
      }
      borderLeft={
        formatBorder(borderLeft)
      }
      ref={ref}
      style={customStyle}
      {...otherProps}
    />
  );
});

Box.displayName = 'Box';

export default Box;
