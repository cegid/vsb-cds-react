import { TypographyVariantsOptions } from "@mui/material/styles";
import { Variant } from "@mui/material/styles/createTypography";
import { OverridableStringUnion } from "@mui/types";

import { TypographyPropsVariantOverrides } from "@cegid/cds-react/Typography";

import typographyFromTokens from '@cegid/vsb-cds-tokens/typography';

const typography: TypographyVariantsOptions = typographyFromTokens;

export type TypographyVariants = OverridableStringUnion<
  Variant | "inherit" | CustomVariant,
  TypographyPropsVariantOverrides
>;

export type CustomVariant =
  | "displayMRegular"
  | "displayMSemiBold"
  | "displaySRegular"
  | "displaySSemiBold"
  | "headLineMRegular"
  | "headLineMSemiBold"
  | "headLineSRegular"
  | "headLineSSemiBold"
  | "titleLRegular"
  | "titleLSemiBold"
  | "bodyMRegular"
  | "bodyMSemiBold"
  | "bodyMMedium"
  | "bodySRegular"
  | "bodySMedium"
  | "bodySSemiBold"
  | "captionSemiBold"
  | "captionRegular";

export default typography;
