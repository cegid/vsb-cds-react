import '@mui/material/styles';
import '@mui/material/Typography';
import '@cegid/cds-react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    // Title styles
    titleLRegular: React.CSSProperties;
    titleLSemiBold: React.CSSProperties;
    titleMRegular: React.CSSProperties;
    titleMSemiBold: React.CSSProperties;
    titleSRegular: React.CSSProperties;
    titleSSemiBold: React.CSSProperties;

    // Body styles
    bodyMRegular: React.CSSProperties;
    bodyMSemiBold: React.CSSProperties;
    bodySRegular: React.CSSProperties;
    bodySMedium: React.CSSProperties;
    bodySSemiBold: React.CSSProperties;
    bodyXSRegular: React.CSSProperties;
    bodyXSSemiBold: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    // Title styles
    titleLRegular?: React.CSSProperties;
    titleLSemiBold?: React.CSSProperties;
    titleMRegular?: React.CSSProperties;
    titleMSemiBold?: React.CSSProperties;
    titleSRegular?: React.CSSProperties;
    titleSSemiBold?: React.CSSProperties;

    // Body styles
    bodyMRegular?: React.CSSProperties;
    bodyMSemiBold?: React.CSSProperties;
    bodySRegular?: React.CSSProperties;
    bodySMedium?: React.CSSProperties;
    bodySSemiBold?: React.CSSProperties;
    bodyXSRegular?: React.CSSProperties;
    bodyXSSemiBold?: React.CSSProperties;
  }

  interface TypeBackground {
    primary?: {
      main: string;
      mainDisabled: string;
      light: string;
      focused: string;
    };
    critical?: {
      main: string;
      mainDisabled: string;
      light: string;
      focused: string;
    };
    neutral?: {
      main: string;
      mainDisabled: string;
      dark: string;
      light: string;
      white: string;
      focused: string;
    };
  }

  interface TypeText {
    primary: {
      highEmphasis: string;
      disabled: string;
    };
    success: {
      highEmphasis: string;
      disabled: string;
    };
    warn: {
      highEmphasis: string;
      disabled: string;
    };
    critical: {
      highEmphasis: string;
      disabled: string;
    };
    neutral: {
      highEmphasis: string;
      mediumEmphasis: string;
      disabled: string;
      white: string;
    };
  }
  interface Palette {
    neutral: Palette['primary'];
    yellow: Palette['primary'];
    banana: Palette['primary'];
    critical: Palette['primary'];
    pink: Palette['primary'];
    purple: Palette['primary'];
    plum: Palette['primary'];
    beige: Palette['primary'];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    yellow?: PaletteOptions['primary'];
    banana?: PaletteOptions['primary'];
    critical?: PaletteOptions['primary'];
    pink?: PaletteOptions['primary'];
    purple?: PaletteOptions['primary'];
    plum?: PaletteOptions['primary'];
    beige?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    // Title styles
    titleLRegular: true;
    titleLSemiBold: true;
    titleMRegular: true;
    titleMSemiBold: true;
    titleSRegular: true;
    titleSSemiBold: true;

    // Body styles
    bodyMRegular: true;
    bodyMSemiBold: true;
    bodySRegular: true;
    bodySMedium: true;
    bodySSemiBold: true;
    bodyXSRegular: true;
    bodyXSSemiBold: true;
  }
}
