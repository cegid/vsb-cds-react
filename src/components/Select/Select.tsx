'use client'

import { useTheme } from '@mui/material/styles';

import { Select as CegidSelect, SelectProps as CegidSelectProps } from '@cegid/cds-react';

import { colorPalettes } from '../../theme/colors';
import typography from '../../theme/typography';

const { primary, neutral } = colorPalettes;

function Select(props: CegidSelectProps) {
  const theme = useTheme();

  return (
    <CegidSelect
      sx={{
        '& .MuiInputBase-root': {
          padding: '8px 8px 8px 16px',
          '& .MuiInputAdornment-root': {
            left: '8px',
          },
        },
        '& .MuiSelect-select': {
          ...typography.bodyMRegular,
          color: primary[10],
          paddingLeft: '0 !important',
          [theme.breakpoints.down('sm')]: {
            paddingTop: '8px !important',
          },
          [theme.breakpoints.up('sm')]: {
            minHeight: 'auto !important',
            lineHeight: 'normal !important',
          },
          '&:focus': {
            backgroundColor: 'transparent',
          },
        },
        '& .MuiSelect-icon': {
          color: neutral[50],
          '&:hover': {
            backgroundColor: 'transparent',
            color: neutral[10],
          },
        },
        '& .MuiMenu-paper': {
          borderRadius: '16px',
          boxShadow: '0px 2px 4px 0px #0000000A, 0px 4px 8px 0px #0000000A',
          border: `1px solid #E6EAEE`,
          boxSizing: 'border-box',
          margin: 0,
          marginTop: '4px',
        },
        '& .MuiMenu-list': {
          padding: '8px',
        },
        '& .MuiMenuItem-root': {
          ...typography.bodyMRegular,
          color: primary[10],
          '&:hover': {
            backgroundColor: neutral[95],
          },
          '&.Mui-selected': {
            backgroundColor: primary[95],
            '&:hover': {
              backgroundColor: primary[90],
            },
            '&.Mui-focusVisible': {
              backgroundColor: primary[90],
            },
          },
        },
        '& .MuiInputLabel-root': {
          ...typography.bodySSemiBold,
          marginBottom: '8px',
          color: neutral[50],
          [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            top: '10px',
            left: '12px',
            backgroundColor: 'transparent',
            padding: '0 4px',
            transform: 'translateY(0)',
            pointerEvents: 'none',
            zIndex: 1,
          },
        },
        '& .MuiInputLabel-asterisk': {
          color: 'inherit',
        },
        '& .MuiInputLabel-shrink': {
          [theme.breakpoints.down('sm')]: {
            transform: 'translateY(0) scale(0.85)',
            transformOrigin: 'top left',
          },
        },
        '& .MuiFormHelperText-root': {
          marginTop: '4px',
          fontSize: '12px',
          '&.Mui-error': {
            color: colorPalettes.critical[50],
          },
        },
      }}
      {...props}
    />
  );
}

export default Select;
