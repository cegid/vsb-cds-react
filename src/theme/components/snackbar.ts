import { TypographyVariantsOptions } from '@mui/material';

import { Theme } from '@cegid/cds-react';

import colorPalettes from '../colors';
import { RADIUS } from '../radius';

const { neutral } = colorPalettes;

interface StyleProps {
  theme: Theme;
}

export const snackbarStyles = (typography: TypographyVariantsOptions): any => ({
  CdsAlert: {
    styleOverrides: {
      root: {
        backgroundColor: '#ffffff',
        borderRadius: RADIUS.L,
        boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.12)',
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
      },
      icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        margin: 0,
        marginRight: '12px',

        '& .MuiSvgIcon-root': {
          fontSize: '20px',
        },
      },
      timer: {
        position: 'absolute',
        width: '28px',
        height: '28px',
      },
      content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        padding: 0,
      },
      message: {
        ...typography.bodySMedium,
        margin: 0,
        padding: 0,
        color: neutral[50],
      },
      closeIconContainer: {
        display: 'flex',
        alignItems: 'center',
      },
      closeButton: {
        padding: '4px',
        marginLeft: '8px',
        '& .MuiSvgIcon-root': {
          fontSize: '18px',
          color: neutral[40],
        },
      },
    },
  },
  SnackbarContainer: {
    styleOverrides: {
      top: {
        top: '16px',
      },
      center: {
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
  },
});
