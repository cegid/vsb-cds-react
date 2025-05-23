'use client';
import type { SxProps } from '@mui/material/styles';
import { ReactNode } from 'react';
import colorPalettes, { IColorPalettes } from './colors';
import { tabStyles } from './components/tabs';
import { RADIUS } from './radius';
import shadows from './shadows';
import spacing from './spacing';
import typography from './typography';
import { snackbarStyles } from './components/snackbar';
import { createTheme, CssBaseline, Theme, ThemeOptions, ThemeProvider } from '@cegid/cds-react';


const createCompletePalette = (colorObj: IColorPalettes) => ({
  50: colorObj[95],
  100: colorObj[90],
  200: colorObj[80],
  300: colorObj[70],
  400: colorObj[60],
  500: colorObj[50],
  600: colorObj[40],
  700: colorObj[30],
  800: colorObj[20],
  900: colorObj[10]
});

const defaultTheme = createTheme();

const { primary, secondary, success, critical, yellow, plum, neutral, banana, pink, purple, info, beige } = colorPalettes;

export type SxPropsTheme = SxProps<Theme>;

export const VSBTheme = createTheme({
  palette: {
    primary: createCompletePalette(primary),
    secondary: createCompletePalette(secondary),
    success: createCompletePalette(success),
    error: createCompletePalette(critical),
    warning: createCompletePalette(yellow),
    info: createCompletePalette(info),
    neutral: createCompletePalette(neutral),
    banana: createCompletePalette(banana),
    critical: createCompletePalette(critical),
    pink: createCompletePalette(pink),
    purple: createCompletePalette(purple),
    plum: createCompletePalette(plum),
    yellow: createCompletePalette(yellow),
    beige: createCompletePalette(beige),
  } as ThemeOptions['palette'],
  typography: typography,
  shadows: shadows,
  spacing: spacing,
  shape: {
    borderRadius: RADIUS.XS,
  },
  components: {
    ...defaultTheme.components,
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'ManropeRegular';
          src: url('/theme/fonts/Manrope-Regular.woff2') format('woff2');
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'ManropeMedium';
          src: url('/theme/fonts/Manrope-Medium.woff2') format('woff2');
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'ManropeSemiBold';
          src: url('/theme/fonts/Manrope-SemiBold.woff2') format('woff2');
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'ManropeBold';
          src: url('/theme/fonts/Manrope-Bold.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        
        body {
          font-family: 'ManropeRegular', sans-serif;
        }
        .MuiSelect-select:not(.Mui-focused):has(+ .MuiSelect-nativeInput:not([value])) {
          color: ${neutral[50]} !important;
        }
        .MuiSelect-nativeInput:not([value]) ~ .MuiSelect-select:not(.Mui-focused) {
          color: ${neutral[50]} !important;
        }`,
    },
    ...tabStyles(defaultTheme, typography),
    ...snackbarStyles(typography),
  },
  mixins: defaultTheme.mixins,
});

interface VSBThemeProviderProps {
  children: ReactNode;
}

export const VSBThemeProvider: React.FC<VSBThemeProviderProps> = ({ children }) => {
  return (
    <ThemeProvider theme={VSBTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
