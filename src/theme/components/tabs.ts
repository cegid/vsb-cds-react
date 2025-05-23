import { TypographyVariantsOptions } from '@mui/material';

import { Theme } from '@cegid/cds-react';

import colorPalettes from '../colors';

const { primary, neutral } = colorPalettes;

export const tabStyles = (defaultTheme: Theme, typography: TypographyVariantsOptions): any => ({
  MuiTabs: {
    styleOverrides: {
      root: {
        width: '100%',
        display: 'flex',
        minHeight: '40px',
        padding: '4px',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        alignSelf: 'stretch',
        borderRadius: '16px',
        backgroundColor: neutral[95],
        border: `1px solid ${neutral[90]}`,

        [defaultTheme.breakpoints.up('sm')]: {
          maxWidth: '368px',
        },
      },
      indicator: {
        display: 'none',
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        alignItems: 'center',
        alignSelf: 'stretch',
        display: 'flex',
        flex: '1 0 0',
        ...typography.bodySSemiBold,
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: 600,
        gap: '4px',
        justifyContent: 'center',
        lineHeight: '100%',
        padding: '9px !important',
        color: `${neutral[50]} !important`,

        '&.Mui-selected': {
          borderRadius: '12px',
          backgroundColor: '#FFF',
          color: `${primary[10]} !important`,

          '&:hover': {
            backgroundColor: neutral[99],
          },
        },
      },
    },
  },
});
