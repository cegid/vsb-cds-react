import type { Meta, StoryObj } from '@storybook/react-vite';

import { Grid } from '@cegid/cds-react';
import TextField from './TextField';

const meta = {
  title: '🎛️ Form Controls/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'The label of the TextField' },
    placeholder: { control: 'text', description: 'The placeholder text' },
    defaultValue: { control: 'text', description: 'The default value of the TextField' },
    required: { control: 'boolean', description: 'If true, the label is displayed as required' },
    error: {
      control: 'boolean',
      description: 'If true, the TextField will indicate an error state',
    },
    helperText: { control: 'text', description: 'Helper text to display below the TextField' },
    disabled: { control: 'boolean', description: 'If true, the TextField is disabled' },
    type: {
      control: 'select',
      options: ['text', 'password', 'number', 'email', 'search'],
      description: 'The type of the TextField element',
    },
    onChange: { action: 'changed' },
  },
  args: {
    fullWidth: true,
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  render: (args) => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          {...args}
          label="Standard TextField"
          placeholder="Placeholder text"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          {...args}
          label="With Default Value"
          defaultValue="Default text"
        />
      </Grid>
    </Grid>
  ),
};

export const Required: Story = {
  render: (args) => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          {...args}
          label="Required TextField"
          placeholder="This field is required"
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField {...args} label="Required With Value" defaultValue="Required value" required />
      </Grid>
    </Grid>
  ),
};

export const WithErrors: Story = {
  render: (args) => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          {...args}
          label="Error State"
          placeholder="Error TextField"
          errorText="This is an error message"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          {...args}
          label="Required With Error"
          placeholder="Missing value"
          required
          errorText="This field is required"
        />
      </Grid>
    </Grid>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField {...args} label="Disabled TextField" placeholder="Cannot be modified" disabled />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          {...args}
          label="Disabled With Value"
          defaultValue="Disabled with content"
          disabled
        />
      </Grid>
    </Grid>
  ),
};

export const ReadOnly: Story = {
  render: (args) => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField {...args} label="Read Only TextField" defaultValue="Read only value" readOnly />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          {...args}
          label="Read Only Required"
          defaultValue="Required read-only value"
          required
          readOnly
        />
      </Grid>
    </Grid>
  ),
};