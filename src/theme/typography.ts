import { TypographyVariantsOptions } from '@mui/material/styles';
import { Variant } from '@mui/material/styles/createTypography';
import { OverridableStringUnion } from '@mui/types';

import { TypographyPropsVariantOverrides } from '@cegid/cds-react/Typography';

const typography: TypographyVariantsOptions = {
  allVariants: { letterSpacing: 'normal', textTransform: 'none' },
  fontFamily: 'ManropeRegular, sans-serif',
  // Title styles
  titleLRegular: {
    fontFamily: 'ManropeRegular, sans-serif',
    fontSize: '28px',
    lineHeight: '36px',
  },
  titleLSemiBold: {
    fontFamily: 'ManropeSemiBold, sans-serif',
    fontSize: '28px',
    lineHeight: '36px',
  },
  titleMRegular: {
    fontFamily: 'ManropeRegular, sans-serif',
    fontSize: '24px',
    lineHeight: '36px',
  },
  titleMSemiBold: {
    fontFamily: 'ManropeSemiBold, sans-serif',
    fontSize: '24px',
    lineHeight: '36px',
  },
  titleSRegular: {
    fontFamily: 'ManropeRegular, sans-serif',
    fontSize: '20px',
    lineHeight: '32px',
  },
  titleSSemiBold: {
    fontFamily: 'ManropeSemiBold, sans-serif',
    fontSize: '20px',
    lineHeight: '32px',
  },
  // Body styles
  bodyMRegular: {
    fontFamily: 'ManropeRegular, sans-serif',
    fontSize: '16px',
    lineHeight: '24px',
  },
  bodyMSemiBold: {
    fontFamily: 'ManropeSemiBold, sans-serif',
    fontSize: '16px',
    lineHeight: '24px',
  },
  bodySRegular: {
    fontFamily: 'ManropeRegular, sans-serif',
    fontSize: '14px',
    lineHeight: '20px',
  },
  bodySMedium: {
    fontFamily: 'ManropeMedium, sans-serif',
    fontSize: '14px',
    lineHeight: '20px',
  },
  bodySSemiBold: {
    fontFamily: 'ManropeSemiBold, sans-serif',
    fontSize: '14px',
    lineHeight: '16px',
  },
  bodyXSSemiBold: {
    fontFamily: 'ManropeSemiBold, sans-serif',
    fontSize: '12px',
    lineHeight: '16px',
  },
  bodyXSRegular: {
    fontFamily: 'ManropeRegular, sans-serif',
    fontSize: '12px',
    lineHeight: '16px',
  },
};

export type TypographyVariants = OverridableStringUnion<
  Variant | 'inherit' | CustomVariant,
  TypographyPropsVariantOverrides
>;

export type CustomVariant = 
  | 'titleLRegular'
  | 'titleLSemiBold'
  | 'titleMRegular'
  | 'titleMSemiBold'
  | 'titleSRegular'
  | 'titleSSemiBold'
  | 'bodyMRegular'
  | 'bodyMSemiBold'
  | 'bodySRegular'
  | 'bodySMedium'
  | 'bodySSemiBold'
  | 'bodyXSSemiBold'
  | 'bodyXSRegular';

export default typography;
