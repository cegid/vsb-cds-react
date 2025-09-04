"use client";

import React, { useState, useEffect, useRef } from "react";
import Icon from "../Icon";
import { neutral, primary } from "../../theme";
import typography from "../../theme/typography";
import Box from "../Box";
import TextField, { TextFieldProps } from "../TextField";
import { styled } from "@cegid/cds-react";
import Row from "../Row";
import IconButton from "../IconButton";

/**
 * Size variants for the SearchInput component
 * @typedef {"short" | "long"} SearchInputSize
 */
export type SearchInputSize = "short" | "long";

/**
 * Props for the SearchInput component
 * @interface SearchInputProps
 * @extends {Omit<TextFieldProps, "InputProps" | "size">}
 */
export interface SearchInputProps
  extends Omit<TextFieldProps, "InputProps" | "size"> {
  /**
   * Callback function triggered when the filter button is clicked
   */
  onFilterClick?: () => void;
  /**
   * Default size of the search input component
   * @default "long"
   */
  defaultSize?: SearchInputSize;
  /**
   * Whether the input should take the full width of its container
   * @default false
   */
  fullwidth?: boolean;
}

const CustomTextField = styled(TextField)<{ $size?: SearchInputSize }>(
  ({ theme, $size }) => ({
    "& .MuiInputBase-root": {
      paddingLeft: $size === "short" ? "9px" : "16px",
      paddingRight: $size === "short" ? "9px" : "10px",
      height: "32px",
      [theme.breakpoints.down("sm")]: {
        height: "40px",
      },
      backgroundColor: neutral[99],
      borderRadius: "12px",
      border: "none",

      "&:hover": {
        backgroundColor: neutral[99],
      },

      "&.Mui-focused": {
        backgroundColor: neutral[99],
        outline: `2px solid ${primary[70]}`,
        outlineOffset: "1px",
      },

      "& fieldset": {
        border: "none",
      },
    },

    "& .MuiInputBase-input": {
      marginLeft: $size === "short" ? 0 : 8,
      color: neutral[10],
      ...typography.bodyMMedium,
      padding: $size === "short" ? "0" : "0 16px 0 0",
      width: $size === "short" ? "0" : "auto",
      minWidth: $size === "short" ? "0" : "auto",
      opacity: $size === "short" ? 0 : 1,
      transition: "opacity 0.2s ease-in-out",
      flex: 1,

      "&::placeholder": {
        color: neutral[50],
        opacity: $size === "short" ? 0 : 1,
        transition: "opacity 0.2s ease-in-out",
      },
    },

    "& .MuiInputAdornment-root": {
      marginLeft: $size === "short" ? "0" : "16px",
      marginRight: $size === "short" ? "0" : "auto",
      transition: "margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
  })
);

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Cherchez par nom, tél, type...",
  value,
  onChange,
  onFilterClick,
  defaultSize = "long",
  fullwidth = false,
  ...props
}) => {
  const [hasValue, setHasValue] = useState(false);
  const [size, setSize] = useState(defaultSize);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHasValue(Boolean(value && value.toString().trim() !== ""));
  }, [value]);

  const handleClearClick = () => {
    if (onChange) {
      const syntheticEvent = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (onChange) {
      if (e.target.value && e.target.value.trim() !== "") {
        setHasValue(true);
      } else {
        setHasValue(false);
      }
      onChange(e);
    }
  };

  return (
    <Row gap={4}>
      <Box
        onClick={() => {
          if (size === "short") {
            setSize("long");
            // Focus uniquement quand on passe de short à long
            setTimeout(() => inputRef.current?.focus(), 0);
          }
        }}
        flex={size === "long" ? 1 : 0}
      >
        <CustomTextField
          $size={size}
          placeholder={size === "short" ? "" : placeholder}
          value={value}
          onChange={(e) => handleChange(e)}
          inputRef={inputRef}
          InputProps={{
            startAdornment: (
              <Box
                display="flex"
                alignItems="center"
                onClick={() => setSize("short")}
                sx={{ cursor: "pointer" }}
              >
                <Icon size={14}>search-01</Icon>
              </Box>
            ),
            endAdornment: hasValue ? (
              <Box
                sx={{
                  cursor: "pointer",
                  opacity: size === "short" ? 0 : 1,
                  transition: "opacity 0.2s ease-in-out",
                  pointerEvents: size === "short" ? "none" : "auto",
                }}
                onClick={handleClearClick}
                display="flex"
                alignItems="center"
              >
                <Icon size={16} variant="solid" color="neutral/50">
                  cancel-circle
                </Icon>
              </Box>
            ) : null,
          }}
          {...props}
        />
      </Box>
      {onFilterClick && (
        <IconButton
          variant="tonal"
          color="neutral"
          square
          onClick={onFilterClick}
          disabled={props.disabled}
        >
          <Icon size={16}>filter</Icon>
        </IconButton>
      )}
    </Row>
  );
};

export default SearchInput;
