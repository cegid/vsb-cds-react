'use client';

import {
  TextField as CegidTextField,
  TextFieldProps as CegidTextFieldProps,
  styled,
} from '@cegid/cds-react';

import { colorPalettes } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import typography from '../../theme/typography';

const { primary, neutral, critical } = colorPalettes;

const StyledTextField = styled(CegidTextField)(({ theme, label }) => ({
  width: '100%',

  '& .MuiInputBase-root': {
    width: '100%',
    ...typography.bodyMRegular,
    borderRadius: RADIUS.S,
    border: `1px solid ${neutral[90]}`,
    '&:before, &:after': {
      content: 'none',
    },
    '&.Mui-error': {
      borderColor: critical[80],
      backgroundColor: critical[99],
    },
    '&.Mui-focused': {
      outline: `2px solid ${primary[60]}`,
      outlineOffset: '1px',
    },
    '&.Mui-readOnly': {
      backgroundColor: neutral[99],
    },
    '&.MuiInputBase-multiline': {
      paddingLeft: '12px',
    },
    [theme.breakpoints.down('sm')]: {
      '.MuiInputLabel-shrink + .CdsFormItem-inputWrapper &': {
        paddingTop: '18px',
      },
    },
  },

  '& .MuiInputAdornment-positionStart': {
    [theme.breakpoints.down('sm')]: { paddingTop: '24px' },
    paddingLeft: '12px',
  },

  '& .MuiInputBase-input': {
    padding: '8px 8px 8px 16px',
    [theme.breakpoints.down('sm')]: {
      padding: label ? '28px 8px 8px 16px' : '8px 8px 8px 16px',
    },
    height: '24px',
    color: primary[10],
    ...typography.bodyMRegular,
    '&::placeholder': {
      color: neutral[50],
      ...typography.bodyMRegular,
    },
  },

  '& .MuiFormLabel-root': {
    color: neutral[50],
    ...typography.bodySSemiBold,
    marginBottom: '8px',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      top: '10px',
      left: '15px',
      backgroundColor: 'transparent',
      transform: 'translateY(0)',
      pointerEvents: 'none',
      zIndex: 1,
    },
    '&.MuiInputLabel-shrink': {
      [theme.breakpoints.down('sm')]: {
        transform: 'translateY(0) scale(0.85)',
        transformOrigin: 'top left',
      },
    },
    '& .MuiInputLabel-asterisk': {
      color: 'inherit',
    },
  },

  '&.CdsFormItem': {
    width: '100%',
  },
}));

const TextField = (props: CegidTextFieldProps) => {
  return <StyledTextField {...props} />;
};

export default TextField;
