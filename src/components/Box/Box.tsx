"use client";

import React from "react";

import { Box as CegidBox } from "@cegid/cds-react";

import {
  CustomColorString,
  IColorPalettes,
  opacityToHex,
  parseCustomColor,
} from "../../theme/colors";

type CegidBoxProps = React.ComponentProps<typeof CegidBox>;

export interface CustomBoxProps
  extends Omit<
    CegidBoxProps,
    | "bgcolor"
    | "backgroundColor"
    | "border"
    | "borderTop"
    | "borderLeft"
    | "borderBottom"
    | "borderRight"
  > {
  /**
   * Sets the background color of the component.
   * Accepts a string matching a custom color.
   */
  backgroundColor?: CustomColorString;

  /**
   * Configures all borders of the component.
   * Defines style, width, and color for all sides at once.
   */
  border?: BorderProps;

  /**
   * Configures only the top border of the component.
   * Overrides the general border setting for the top side.
   */
  borderTop?: BorderProps;

  /**
   * Configures only the left border of the component.
   * Overrides the general border setting for the left side.
   */
  borderLeft?: BorderProps;

  /**
   * Configures only the bottom border of the component.
   * Overrides the general border setting for the bottom side.
   */
  borderBottom?: BorderProps;

  /**
   * Configures only the right border of the component.
   * Overrides the general border setting for the right side.
   */
  borderRight?: BorderProps;
}

/**
 * Defines the properties of a border.
 * Used to specify border appearance for component edges.
 */
export type BorderProps = {
  /**
   * The color of the border.
   * Uses the CustomColorString type for color values.
   */
  color: CustomColorString;

  /**
   * The width of the border in pixels.
   * Specifies the thickness of the border line.
   */
  width: number; // in pixels

  /**
   * The visual style of the border.
   * Determines how the border line is rendered.
   */
  style: BorderStyleProps;
  /**
   * The opacity of the border color as a percentage (0-100).
   * 100 means fully opaque, 0 means fully transparent.
   */
  opacity?: number;
};

/**
 * Available border style options.
 * These values correspond to standard CSS border style properties.
 */
export type BorderStyleProps =
  | "dotted"
  | "dashed"
  | "solid"
  | "double"
  | "groove"
  | "ridge"
  | "inset"
  | "outset";

const Box = React.forwardRef<HTMLDivElement, CustomBoxProps>((props, ref) => {
  const {
    backgroundColor,
    border,
    borderTop,
    borderBottom,
    borderRight,
    borderLeft,
    style = {},
    ...otherProps
  } = props;

  let customStyle = { ...style };

  if (typeof backgroundColor === "string") {
    const customColor = parseCustomColor(backgroundColor);

    if (customColor) {
      customStyle.backgroundColor = customColor;
    } else if (backgroundColor) {
      otherProps.sx = {
        ...(otherProps.sx || {}),
        bgcolor: backgroundColor,
      };
    }
  }

  const formatBorder = (border?: BorderProps) => {
    return border
      ? `${border?.style} ${border?.width}px ${parseCustomColor(border?.color ?? "")}${opacityToHex(border?.opacity ?? 100)}`
      : undefined;
  };

  return (
    <CegidBox
      border={formatBorder(border)}
      borderTop={formatBorder(borderTop)}
      borderBottom={formatBorder(borderBottom)}
      borderRight={formatBorder(borderRight)}
      borderLeft={formatBorder(borderLeft)}
      ref={ref}
      style={customStyle}
      {...otherProps}
    />
  );
});

Box.displayName = "Box";

export default Box;
