"use client";

import React, { useState, useEffect } from "react";
import Icon from "../Icon";
import { neutral, primary } from "../../theme";
import typography from "../../theme/typography";
import Box from "../Box";
import TextField, { TextFieldProps } from "../TextField";
import { styled } from "@cegid/cds-react";
import Row from "../Row";
import IconButton from "../IconButton";

export interface SearchInputProps extends Omit<TextFieldProps, "InputProps"> {
  onFilterClick?: () => void;
}

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    paddingLeft: "16px",
    paddingRight: "10px",
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
    marginLeft: 8,
    color: neutral[10],
    ...typography.bodyMMedium,
    padding: "0 16px 0 0",

    "&::placeholder": {
      color: neutral[50],
      opacity: 1,
    },
  },

  "& .MuiInputAdornment-root": {
    marginLeft: "16px",
  },
}));

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Cherchez par nom, tél, type...",
  value,
  onChange,
  onFilterClick,
  ...props
}) => {
  const [hasValue, setHasValue] = useState(false);

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
      <CustomTextField
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e)}
        InputProps={{
          startAdornment: (
            <Box display="flex" alignItems="center">
              <Icon size={14}>search-01</Icon>
            </Box>
          ),
          endAdornment: hasValue ? (
            <Box
              sx={{ cursor: "pointer" }}
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
      {onFilterClick && (
        <IconButton variant="tonal" color="neutral" square>
          <Icon size={16} color="primary/10">
            filter
          </Icon>
        </IconButton>
      )}
    </Row>
  );
};

export default SearchInput;
