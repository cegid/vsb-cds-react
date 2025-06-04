"use client";

import React from "react";
import { CustomColorString, parseCustomColor } from "../../theme/colors";

/**
 * Props for the Icon component using Huge Icons Pro fonts
 */
interface IconProps {
  /**
   * The icon name (e.g., "add-female", "user", "home")
   * @example "add-female"
   * @example "user-circle"
   */
  children: string;

  /**
   * Icon size in pixels or CSS unit
   * @default 24
   * @example 16
   * @example "1.5rem"
   */
  size?: number | string;

  /**
   * Icon color using the custom color system
  */
  color?: CustomColorString;

  /**
   * Icon variant style
   * - bulk: Icon with partial fill
   * - duotone: Two-tone icon
   * - solid: Fully filled icon
   * - stroke: Outline icon (line)
   * - twotone: Icon with two shades
   * @default "stroke"
   */
  variant?: "bulk" | "duotone" | "solid" | "stroke" | "twotone";

  /**
   * Icon corner style
   * - rounded: Rounded corners
   * - sharp: Sharp corners
   * - standard: Standard style
   * @default "rounded"
   */
  style?: "rounded" | "sharp" | "standard";

  /**
   * Additional CSS classes to apply
   * @example "my-custom-class"
   */
  className?: string;

  /**
   * Function called when the icon is clicked
   * Makes the icon clickable and changes cursor to pointer
   */
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  children,
  size = 24,
  color,
  variant = "stroke",
  style = "rounded",
  className = "",
  onClick,
  ...props
}) => {
  const getIconClass = () => {
    const variantClass = `hgi-${variant}`;
    const styleClass = `hgi-${style}`;
    const iconClass = `hgi-${children}`;
    return `${variantClass} ${styleClass} ${iconClass}`;
  };

  const iconStyle: React.CSSProperties = {
    fontSize: typeof size === "number" ? `${size}px` : size,
    color: color ? parseCustomColor(color) : "inherit",
    cursor: onClick ? "pointer" : "inherit",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
  };

  return (
    <i
      className={`${getIconClass()} ${className}`}
      style={iconStyle}
      onClick={onClick}
      {...props}
    />
  );
};

export default Icon;
