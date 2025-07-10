"use client";

import { ReactNode } from "react";
import type { SxProps } from "@mui/material/styles";
import colorPalettes, { IColorPalettes } from "./colors";
import { RADIUS } from "./radius";
import shadows from "./shadows";
import spacing from "./spacing";
import typography from "./typography";
import {
  createTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
  Theme
} from "@cegid/cds-react";

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
  900: colorObj[10],
});

const defaultTheme = createTheme();

const {
  primary,
  secondary,
  success,
  critical,
  yellow,
  plum,
  neutral,
  banana,
  pink,
  purple,
  info,
  beige,
} = colorPalettes;

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
  } as ThemeOptions["palette"],
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
        body {
          font-family: 'DMSansRegular', sans-serif;
        }
        .MuiSelect-select:not(.Mui-focused):has(+ .MuiSelect-nativeInput:not([value])) {
          color: ${neutral[50]} !important;
        }
        .MuiSelect-nativeInput:not([value]) ~ .MuiSelect-select:not(.Mui-focused) {
          color: ${neutral[50]} !important;
        }`,
    },
    MuiMenu: {
      defaultProps: {
        BackdropProps: {
          style: { backgroundColor: "transparent" },
        },
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left",
        },
      },
      styleOverrides: {
        root: {
          alignItems: 'flex-start',
        },
        paper: {
          alignItems: 'flex-start',
          backgroundColor: "#FFF",
          border: `1px solid ${neutral[95]}`,
          borderRadius: "16px",
          boxShadow:
            "0px 4px 8px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.04)",
          maxWidth: "680px",
          width: "232px",
          padding: "8px 0",
        },
        list: {
          padding: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: () => ({
          display: "flex",
          alignItems: "center",
          alignSelf: "stretch",
          borderRadius: "8px",
          gap: spacing(4),
          padding: spacing(4),
          margin: '0 8px',
          "&:hover, &:focus": {
            backgroundColor: neutral[99],
          },
        }),
      },
    },
  },
  mixins: defaultTheme.mixins,
});
export type SxPropsTheme = SxProps<Theme>;
interface VSBThemeProviderProps {
  children: ReactNode;
}

export const VSBThemeProvider: React.FC<VSBThemeProviderProps> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={VSBTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default VSBThemeProvider;