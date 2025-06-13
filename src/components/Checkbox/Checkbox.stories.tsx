import {
  Divider,
  FormHelperText,
  FormLabel,
} from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import Checkbox from './Checkbox';
import Box from '../Box';
import Stack from '../Stack';
import Typography from '../Typography';
import FormControlLabel from '../FormControlLabel';
import FormControl from '../FormControl';
import FormGroup from '../FormGroup';

const meta = {
  title: 'Components/Buttons/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'If the component is disabled',
    },
    size: {
      control: 'select',
      options: ['S', 'L'],
      description: 'The size of the component',
    },
    undetermined: {
      control: 'boolean',
      description: 'If the checkbox is in an undetermined state',
    },
    onChange: { action: 'changed' },
  },
  args: {
    disabled: false,
    size: 'L',
    undetermined: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    name: 'default',
    onChange: () => { },
  },
  render: (args) => (
    <Box p={2} >
      <Checkbox {...args} />
    </Box>
  ),
};

export const WithLabel: Story = {
  args: {
    checked: false,
    name: 'withLabel',
    onChange: () => { },
  },
  render: (args) => (
    <Box p={2}>
      <FormControlLabel control={<Checkbox {...args} />} label="I accept the terms" />
    </Box>
  ),
};

export const Sizes: Story = {
  args: {
    checked: true,
    name: 'sizes',
    onChange: () => { },
  },
  render: (args) => (
    <Box p={2}>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        <FormControlLabel control={<Checkbox {...args} size="S" />} label="S" />
        <FormControlLabel control={<Checkbox {...args} />} label="L (default)" />
      </Stack>
    </Box>
  ),
};

export const States: Story = {
  args: {
    checked: false,
    name: 'states',
    onChange: () => { },
  },
  render: (args) => (
    <Box p={3}>
      <Stack direction="row" spacing={2} flexWrap="wrap" mb={2}>
        <FormControlLabel control={<Checkbox {...args} />} label="Unchecked" />
        <FormControlLabel control={<Checkbox {...args} checked />} label="Checked" />
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack direction="row" spacing={2} flexWrap="wrap" mb={2}>
        <FormControlLabel control={<Checkbox {...args} disabled />} label="Disabled" />
        <FormControlLabel
          control={<Checkbox {...args} disabled checked />}
          label="Disabled and checked"
        />
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack direction="row" spacing={2} flexWrap="wrap" mb={2}>
        <FormControlLabel control={<Checkbox {...args} undetermined />} label="Undetermined" />
      </Stack>
    </Box>
  ),
};

export const CheckboxGroup: Story = {
  args: {
    checked: false,
    name: 'checkboxGroup',
    onChange: () => { },
  },
  render: () => {
    const [state, setState] = useState({
      Karadoc: true,
      Leodagan: false,
      Perceval: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
      });
    };

    const { Karadoc, Leodagan, Perceval } = state;

    return (
      <Box p={3}>
        <FormControl component="fieldset" variant="standard" sx={{ width: '100%' }}>
          <FormLabel component="legend" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="medium">
              Assign responsibility
            </Typography>
          </FormLabel>
          <FormGroup>
            <Box display='flex' flexDirection="column" gap={1}>
              <FormControlLabel
                control={<Checkbox checked={Karadoc} onChange={handleChange} name="Karadoc" />}
                label="Karadoc"
              />
              <FormControlLabel
                control={<Checkbox checked={Leodagan} onChange={handleChange} name="Leodagan" />}
                label="Leodagan"
              />
              <FormControlLabel
                control={<Checkbox checked={Perceval} onChange={handleChange} name="Perceval" />}
                label="Perceval"
              />
            </Box>
          </FormGroup>
          <FormHelperText sx={{ mt: 2 }}>You can display a help message here</FormHelperText>
        </FormControl>
      </Box>
    );
  },
};

export const LabelPlacement: Story = {
  args: {
    checked: true,
    name: 'labelPlacement',
    onChange: () => { },
  },
  render: (args) => (
    <Box p={3}>
      <Stack spacing={2} mt={2}>
        <FormControlLabel
          value="end"
          control={<Checkbox {...args} />}
          label="End (default)"
          labelPlacement="end"
        />
        <Divider />
        <FormControlLabel
          value="start"
          control={<Checkbox {...args} />}
          label="Start"
          labelPlacement="start"
        />
        <Divider />
        <FormControlLabel
          value="top"
          control={<Checkbox {...args} />}
          label="Top"
          labelPlacement="top"
        />
        <Divider />
        <FormControlLabel
          value="bottom"
          control={<Checkbox {...args} />}
          label="Bottom"
          labelPlacement="bottom"
        />
      </Stack>
    </Box>
  ),
};
