"use client";

import { styled } from "@mui/material/styles";
import React from "react";

import { neutral, primary } from "../../theme/colors";
import Icon from "../Icon";

export type CheckBoxSize = "S" | "L";

const CheckboxContainer = styled("div")({
  position: "relative",
  display: "flex",
});

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
    borderRadius: checkboxSize === "L" ? "7px" : "3px",
    border: "1px solid",
    borderColor: neutral[70],
    outline: "none",
    cursor: "pointer",
    position: "relative",

    transition: "all 0.2s",

    "&:not(:disabled):hover": {
      borderColor: "#0640CD4D",
    },

    "&:focus": {
      outline: `2px solid ${primary[70]}`,
      outlineOffset: "1px",
    },

    "&:checked": {
      backgroundColor: primary[60],
      borderColor: primary[30] + "4D",
    },

    "&:not(:disabled):checked:hover": {
      backgroundColor: primary[50],
    },

    "&:disabled": {
      backgroundColor: neutral[95],
      borderColor: neutral[90],
      cursor: "not-allowed",
    },
  })
);

const IconContainer = styled("div")(
  ({
    checkboxSize,
    undetermined,
  }: {
    checkboxSize: CheckBoxSize;
    undetermined: boolean;
  }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    color: "white",
    fontSize: checkboxSize === "L" ? "12px" : "10px",
    lineHeight: 1,
    display: "flex",

    "&::after": undetermined
      ? {
          content: '""',
          display: "block",
          width: checkboxSize === "L" ? "8px" : "6px",
          height: "1px",
          backgroundColor: "white",
        }
      : {},
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
    <CheckboxContainer>
      <StyledInput
        type="checkbox"
        checked={checked || undetermined}
        onChange={(e) => onChange(e)}
        name={name}
        disabled={disabled}
        checkboxSize={size}
        undetermined={undetermined}
      />
      {(checked || undetermined) && !disabled && (
        <IconContainer checkboxSize={size} undetermined={undetermined}>
          {undetermined ? null : <Icon size={12}>tick-01</Icon>}
        </IconContainer>
      )}
      {(checked || undetermined) && disabled && (
        <IconContainer
          checkboxSize={size}
          undetermined={undetermined}
          style={{ color: neutral[80] }}
        >
          {undetermined ? null : <Icon size={12}>tick-01</Icon>}
        </IconContainer>
      )}
    </CheckboxContainer>
  );
};

export default Checkbox;
