"use client";

import { Variant } from "@mui/material/styles/createTypography";
import React from "react";

import { Typography as CegidTypography } from "@cegid/cds-react";
import type { TypographyProps as CegidTypographyProps } from "@cegid/cds-react";

import {
  CustomColorString,
  IColorPalettes,
  parseCustomColor,
} from "../../theme/colors";
import { CustomVariant } from "../../theme/typography";

export type ExtendedVariant = Variant | "inherit" | CustomVariant;

interface CustomTypographyProps
  extends Omit<CegidTypographyProps, "color" | "variant" | "component"> {
  /**
   * The color of the text.
   * Supports custom color strings in the format 'palette/shade' (e.g., 'primary/60', 'neutral/40')
   * or the special value 'white' which resolves to '#FFFFFF'.
   * Falls back to standard Material-UI color props if custom format is not matched.
   */
  color?: CustomColorString;

  /**
   * The typography variant to apply to the text.
   * Extends Material-UI variants with custom variants from the design system.
   * Supports standard MUI variants (h1, h2, body1, etc.), 'inherit', and custom variants.
   */
  variant?: ExtendedVariant;

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   * @default 'span'
   */
  component?: React.ElementType;
}

type ShadeKey = keyof IColorPalettes;

const Typography = React.forwardRef<HTMLElement, CustomTypographyProps>(
  (props, ref) => {
    const {
      color,
      variant,
      component = "span",
      style = {},
      ...otherProps
    } = props;

    const customStyle = { ...style };

    if (typeof color === "string") {
      const customColor = parseCustomColor(color);

      if (customColor) {
        customStyle.color = customColor;
        return (
          <CegidTypography
            ref={ref}
            style={customStyle}
            component={component}
            variant={variant as any}
            {...otherProps}
          >
            {otherProps.children}
          </CegidTypography>
        );
      }
    }

    return (
      <CegidTypography
        ref={ref}
        color={color as any}
        style={style}
        component={component}
        variant={variant as any}
        {...otherProps}
      >
        {otherProps.children}
      </CegidTypography>
    );
  }
);

Typography.displayName = "Typography";

export default Typography;
