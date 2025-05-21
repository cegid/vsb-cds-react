'use client'

import React from 'react';

import { Box, OverridableComponent, SvgIconTypeMap } from '@cegid/cds-react';

import colorPalettes, { PaletteNames } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import spacing from '../../theme/spacing';
import Typography from '../Typography/Typography';

export interface StatusProps {
  label: string;
  size?: 'small' | 'medium';
  color?: PaletteNames;
  variant?: 'solid' | 'light';
  icon?: SVGIconType
  sx?: React.CSSProperties;
  className?: string;
}

export type SVGIconType = OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };

const Status: React.FC<StatusProps> = ({
  label,
  size = 'medium',
  color = 'primary',
  variant,
  icon,
  sx,
  className,
}) => {
  if (!colorPalettes[color]) {
    color = 'primary';
  }

  const palette = colorPalettes[color];

  const height = size === 'small' ? 20 : 24;
  const paddingLeft = size === 'small' ? 6 : 8;
  const paddingRight = size === 'small' ? 6 : 10;
  const iconSize = size === 'small' ? 12 : 14;

  const mainColor = palette[40];
  const bgColor = palette[95];

  const solidStyle = {
    backgroundColor: mainColor,
    color: '#FFFFFF',
  };

  const lightStyle = {
    backgroundColor: bgColor,
    color: mainColor,
  };

  const style = variant === 'solid' ? solidStyle : lightStyle;

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        height: height,
        borderRadius: RADIUS.FULL,
        paddingLeft: `${paddingLeft}px`,
        paddingRight: `${paddingRight}px`,
        width: 'fit-content',
        ...style,
        ...sx,
      }}
      className={className}
    >
      {icon && (
        <Box
          component={icon}
          sx={{
            width: `${iconSize}px !important`,
            height: `${iconSize}px !important`,
            fontSize: `${iconSize}px !important`,
            minWidth: `${iconSize}px !important`,
            minHeight: `${iconSize}px !important`,
            marginRight: spacing(2),
          }}
        />
      )}
      <Typography
        variant={size === 'small' ? 'bodyXSRegular' : 'bodySRegular'}
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default Status;
