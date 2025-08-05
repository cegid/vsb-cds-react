import { TypographyVariantsOptions } from "@mui/material/styles";
import { Variant } from "@mui/material/styles/createTypography";
import { OverridableStringUnion } from "@mui/types";

import { TypographyPropsVariantOverrides } from "@cegid/cds-react/Typography";

const typography: TypographyVariantsOptions = {
  allVariants: { letterSpacing: "normal", textTransform: "initial" },
  fontFamily: "DMSans, sans-serif",
  // Title styles
  displayMRegular: {
    fontFamily: "DMSansRegular, sans-serif",
    fontSize: "45px",
    lineHeight: "52px",
    fontWeight: "initial"
  },
  displayMSemiBold: {
    fontFamily: "DMSansSemiBold, sans-serif",
    fontSize: "45px",
    lineHeight: "52px",
    fontWeight: "initial"
  },
  displaySRegular: {
    fontFamily: "DMSansRegular, sans-serif",
    fontSize: "36px",
    lineHeight: "44px",
    fontWeight: "initial"
  },
  displaySSemiBold: {
    fontFamily: "DMSansSemiBold, sans-serif",
    fontSize: "36px",
    lineHeight: "44px",
    fontWeight: "initial"
  },
  headLineMRegular: {
    fontFamily: "DMSansRegular, sans-serif",
    fontSize: "28px",
    lineHeight: "36px",
    fontWeight: "initial"
  },
  headLineMSemiBold: {
    fontFamily: "DMSansSemiBold, sans-serif",
    fontSize: "28px",
    lineHeight: "36px",
    fontWeight: "initial"
  },
  headLineSRegular: {
    fontFamily: "DMSansRegular, sans-serif",
    fontSize: "24px",
    lineHeight: "36px",
    fontWeight: "initial"
  },
  headLineSSemiBold: {
    fontFamily: "DMSansSemiBold, sans-serif",
    fontSize: "24px",
    lineHeight: "36px",
    fontWeight: "initial"
  },
  titleLRegular: {
    fontFamily: "DMSansRegular, sans-serif",
    fontSize: "20px",
    lineHeight: "32px",
    fontWeight: "initial"
  },
  titleLSemiBold: {
    fontFamily: "DMSansSemiBold, sans-serif",
    fontSize: "20px",
    lineHeight: "32px",
    fontWeight: "initial"
  },
  // Body styles
  bodyMRegular: {
    fontFamily: "DMSansRegular, sans-serif",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "initial"
  },
  bodyMMedium: {
    fontFamily: "DMSansMedium, sans-serif",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "initial"
  },
  bodyMSemiBold: {
    fontFamily: "DMSansSemiBold, sans-serif",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "initial"
  },
  bodySMedium: {
    fontFamily: "DMSansMedium, sans-serif",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "initial"
  },
  bodySSemiBold: {
    fontFamily: "DMSansSemiBold, sans-serif",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "initial"
  },
  bodySRegular: {
    fontFamily: "DMSansRegular, sans-serif",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "initial"
  },
  captionSemiBold: {
    fontFamily: "DMSansSemiBold, sans-serif",
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: "initial"
  },
  captionRegular: {
    fontFamily: "DMSansRegular, sans-serif",
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: "initial"
  },
};

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
