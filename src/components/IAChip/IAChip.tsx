import React from "react";
import { CustomColorString } from "../../theme";
import Icon from "../Icon";
import Typography from "../Typography";
import Row from "../Row";

/**
 * Available sizes for the IAChip component
 * - small: Compact size with reduced spacing
 * - large: Extended size with more spacing
 */
export type IAChipSize = "small" | "large";

/**
 * Props for the IAChip component
 */
export interface IAChipProps {
  /**
   * Background color of the chip using the custom color system
   * @example "primary/60"
   * @example "neutral/20"
   */
  backgroundColor: CustomColorString;

  /**
   * Typography element to display as the chip label
   * Must be a React element of Typography type
   * @example <Typography variant="body2">My label</Typography>
   */
  label: React.ReactElement<typeof Typography>;

  /**
   * Optional icon to display in the chip
   * Must be a React element of Icon type
   * @example <Icon>user</Icon>
   * @optional
   */
  icon?: React.ReactElement<typeof Icon>;

  /**
   * Size of the chip
   * - small: 2px border radius, center alignment
   * - large: 4px border radius
   * @default "small"
   * @optional
   */
  size?: IAChipSize;

  /**
   * Callback function called when the chip is clicked
   * Only works if clickable is true
   * @optional
   */
  onClick?: () => void;

  /**
   * Determines if the chip is clickable
   * Changes cursor and enables interaction with onClick
   * @default false
   * @optional
   */
  clickable?: boolean;
}
const IAChip = React.forwardRef<HTMLDivElement, IAChipProps>((props, ref) => {
  const {
    backgroundColor,
    label,
    icon,
    size = "small",
    onClick,
    clickable = false,
  } = props;

  return (
    <Row
      ref={ref}
      px={4}
      backgroundColor={backgroundColor}
      borderRadius={size === "large" ? 4 : 2}
      gap={2}
      {...(size === "small" && { alignItems: "center" })}
      width="fit-content"
      sx={{ cursor: clickable ? "pointer" : "auto" }}
      onClick={onClick}
    >
      {icon} {label}
    </Row>
  );
});

IAChip.displayName = "IAChip";

export default IAChip;
