"use client";

import { styled } from "@mui/material/styles";
import React from "react";

import { neutral, primary } from "../../theme/colors";

export type CheckBoxSize = "S" | "L";
const StyledInput = styled("input")(
  ({
    checkboxSize,
    undetermined,
  }: {
    checkboxSize: CheckBoxSize;
    undetermined: boolean;
  }) => ({
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    margin: 0,
    width: checkboxSize === "L" ? "20px" : "16px",
    height: checkboxSize === "L" ? "20px" : "16px",
    borderRadius: checkboxSize === "L" ? "6px" : "3px",
    border: "1px solid #8095A8",
    outline: "none",
    cursor: "pointer",
    position: "relative",

    transition: "all 0.2s",

    "&:not(:disabled):hover": {
      borderColor: neutral[70],
    },

    "&:focus": {
      outline: "2px solid #3169FF",
      outlineOffset: "1px",
    },

    "&:checked": {
      backgroundColor: primary[60],
      borderColor: primary[40],
    },

    "&:checked::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: undetermined
        ? "translate(-50%, -50%) rotate(90deg)"
        : "translate(-50%, -50%) rotate(45deg)",
      width: checkboxSize === "L" ? "4px" : "3px",
      height: checkboxSize === "L" ? "8px" : "6px",
      border: "solid white",
      borderWidth: undetermined ? "0 1px 0px 0" : "0 1px 1px 0",
      marginTop: "-1px",
      borderRadius: "10%",
    },

    "&:not(:disabled):checked:hover": {
      backgroundColor: primary[55],
    },

    "&:disabled": {
      backgroundColor: neutral[95],
      borderColor: neutral[90],
      cursor: "not-allowed",
    },
    "&:checked:disabled::after": {
      borderColor: neutral[80],
    },
  })
);

export interface CheckboxProps {
  /**
   * Controls the checked state of the checkbox.
   * When true, the checkbox displays as selected with primary colors.
   */
  checked: boolean;

  /**
   * Disables the checkbox interaction when set to true.
   * Applies neutral colors and prevents user interaction.
   * @default false
   */
  disabled?: boolean;

  /**
   * Displays the checkbox in an indeterminate state.
   * Shows a horizontal line instead of a checkmark and forces checked appearance.
   * Useful for parent checkboxes with partially selected children.
   * @default false
   */
  undetermined?: boolean;

  /**
   * The name attribute for the checkbox input element.
   * Used for form identification and accessibility.
   */
  name: string;

  /**
   * Controls the size of the checkbox.
   * 'L' renders a 20x20px checkbox, 'S' renders a 16x16px checkbox.
   * @default 'L'
   */
  size?: CheckBoxSize;

  /**
   * Callback function triggered when the checkbox state changes.
   * Receives the React change event containing the new checked state.
   */
  onChange: (isChecked: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
  const {
    checked,
    onChange,
    name,
    disabled = false,
    size = "L",
    undetermined = false,
  } = props;
  return (
    <StyledInput
      type="checkbox"
      checked={checked || undetermined}
      onChange={(e) => onChange(e)}
      name={name}
      disabled={disabled}
      checkboxSize={size}
      undetermined={undetermined}
    />
  );
};

export default Checkbox;
