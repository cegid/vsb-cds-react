import { TypographyVariantsOptions } from "@mui/material/styles";
import { Variant } from "@mui/material/styles/createTypography";
import { OverridableStringUnion } from "@mui/types";

import { TypographyPropsVariantOverrides } from "@cegid/cds-react/Typography";

const typography: TypographyVariantsOptions = {
  allVariants: { letterSpacing: "normal", textTransform: "none" },
  fontFamily: "DMSansRegular, sans-serif",
  // Title styles
  displayMRegular: {
    fontFamily: "DMSansRegular, sans-serif",
    fontSize: "45px",
    lineHeight: "52px",
  },
  displayMSemiBold: {
    fontFamily: "DMSansSemiBold, sans-serif",
    fontSize: "45px",
    lineHeight: "52px",
  },
  displaySRegular: {
    fontFamily: "DMSansRegular, sans-serif",
    fontSize: "36px",
    lineHeight: "44px",
  },
  displaySSemiBold: {
    fontFamily: "DMSansSemiBold, sans-serif",
    fontSize: "36px",
    lineHeight: "44px",
  },
  headLineMRegular: {
    fontFamily: "DMSansRegular, sans-serif",
    fontSize: "28px",
    lineHeight: "36px",
  },
  headLineMSemiBold: {
    fontFamily: "DMSansSemiBold, sans-serif",
    fontSize: "28px",
    lineHeight: "36px",
  },
  headLineSRegular: {
    fontFamily: "DMSansRegular, sans-serif",
    fontSize: "24px",
    lineHeight: "36px",
  },
  headLineSSemiBold: {
    fontFamily: "DMSansSemiBold, sans-serif",
    fontSize: "24px",
    lineHeight: "36px",
  },
  titleLRegular: {
    fontFamily: "DMSansRegular, sans-serif",
    fontSize: "20px",
    lineHeight: "32px",
  },
  titleLSemiBold: {
    fontFamily: "DMSansSemiBold, sans-serif",
    fontSize: "20px",
    lineHeight: "32px",
  },
  // Body styles
  bodyMRegular: {
    fontFamily: "DMSansRegular, sans-serif",
    fontSize: "16px",
    lineHeight: "24px",
  },
  bodyMSemiBold: {
    fontFamily: "DMSansSemiBold, sans-serif",
    fontSize: "16px",
    lineHeight: "24px",
  },
  bodySMedium: {
    fontFamily: "DMSansMedium, sans-serif",
    fontSize: "14px",
    lineHeight: "20px",
  },
  bodySSemiBold: {
    fontFamily: "DMSansSemiBold, sans-serif",
    fontSize: "14px",
    lineHeight: "20px",
  },
  bodySRegular: {
    fontFamily: "DMSansRegular, sans-serif",
    fontSize: "14px",
    lineHeight: "20px",
  },
  captionSemiBold: {
    fontFamily: "DMSansSemiBold, sans-serif",
    fontSize: "12px",
    lineHeight: "16px",
  },
  captionRegular: {
    fontFamily: "DMSansRegular, sans-serif",
    fontSize: "12px",
    lineHeight: "16px",
  },
};

export type TypographyVariants = OverridableStringUnion<
  Variant | "inherit" | CustomVariant,
  TypographyPropsVariantOverrides
>;

export type CustomVariant =
  | "displayMRegular"
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
  | "bodySRegular"
  | "bodySMedium"
  | "bodySSemiBold"
  | "captionSemiBold"
  | "captionRegular";

export default typography;
