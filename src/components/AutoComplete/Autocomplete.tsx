'use client'

import { styled } from '@mui/material/styles';
import {
  Autocomplete as CegidAutocomplete,
  AutocompleteProps as CegidAutocompleteProps
} from '@cegid/cds-react';

import { colorPalettes } from '../../../theme/colors';
import typography from '../../../theme/typography';

const { primary, neutral } = colorPalettes;

const CustomAutocomplete = styled(CegidAutocomplete)(({ theme }) => ({
  '& .MuiInputBase-root': {
    padding: '8px 8px 8px 16px',
    '& .MuiInputAdornment-root': {
      left: '8px',
    },
  },
  '& .MuiAutocomplete-input': {
    ...typography.bodyMRegular,
    color: primary[10],
    paddingLeft: '0 !important',
    [`@media (max-width: 600px)`]: {
      paddingTop: '8px !important',
    },
  },
  '& .MuiAutocomplete-clearIndicator': {
    color: neutral[50],
    '&:hover': {
      backgroundColor: 'transparent',
      color: neutral[10],
    },
  },
  '& .MuiAutocomplete-popupIndicator': {
    color: neutral[50],
    '&:hover': {
      backgroundColor: 'transparent',
      color: neutral[10],
    },
  },
  '& .MuiAutocomplete-popper': {
    width: '100%',
    margin: 0,
    '&[data-popper-placement*="bottom"] .MuiAutocomplete-paper': {
      marginTop: '4px',
    },
    '&[data-popper-placement*="top"] .MuiAutocomplete-paper': {
      marginBottom: '4px',
    },
  },
  '& .MuiAutocomplete-paper': {
    borderRadius: '16px',
    boxShadow: '0px 2px 4px 0px #0000000A, 0px 4px 8px 0px #0000000A',
    border: `1px solid #E6EAEE`,
    boxSizing: 'border-box',
    margin: 0,
  },
  '& .MuiAutocomplete-listbox': {
    padding: '8px',
    '& .os-content': {
      width: '100% !important',
    },
  },
  '& .MuiInputLabel-root': {
    ...typography.bodySSemiBold,
    marginBottom: '8px',
    color: neutral[50],
    [`@media (max-width: 600px)`]: {
      position: 'absolute',
      top: '10px',
      left: '12px',
      backgroundColor: 'transparent',
      padding: '0 4px',
      transform: 'translateY(0)',
      pointerEvents: 'none',
      zIndex: 1,
    },
  },
  '& .MuiInputLabel-asterisk': {
    color: 'inherit',
  },
  '& .MuiInputLabel-shrink': {
    [`@media (max-width: 600px)`]: {
      transform: 'translateY(0) scale(0.85)',
      transformOrigin: 'top left',
    },
  },
}));


const Autocomplete = (props: CegidAutocompleteProps<any, any, any, any>) => {
  return (
    <CustomAutocomplete
      {...props}
    />
  );
};
export default Autocomplete;