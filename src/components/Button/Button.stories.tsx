import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@cegid/cds-react';

import { Add, Delete, Edit, Favorite, Search, Settings } from '@cegid/icons-react';

import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'neutral'],
      description: 'The color of the component',
    },
    variant: {
      control: 'select',
      options: ['text', 'contained', 'outlined', 'tonal'],
      description: 'The variant to use',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled',
    },
    startIcon: {
      control: 'boolean',
      description: 'Element placed before the children',
    },
    endIcon: {
      control: 'boolean',
      description: 'Element placed after the children',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    color: 'primary',
    variant: 'contained',
    disabled: false,
    startIcon: false,
    endIcon: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => <Button {...args}>Button</Button>,
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
  render: (args) => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <Button {...args}>Primary</Button>
      <Button {...args} color="secondary">
        Secondary
      </Button>
      <Button {...args} color="success">
        Success
      </Button>
      <Button {...args} color="error">
        Error
      </Button>
      <Button {...args} color="warning">
        Warning
      </Button>
      <Button {...args} color="info">
        Info
      </Button>
      <Button {...args} color="neutral">
        Neutral
      </Button>
    </Stack>
  ),
};

export const Contained: Story = {
  args: {
    variant: 'contained',
  },
  render: (args) => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <Button {...args}>Primary</Button>
      <Button {...args} color="secondary">
        Secondary
      </Button>
      <Button {...args} color="success">
        Success
      </Button>
      <Button {...args} color="error">
        Error
      </Button>
      <Button {...args} color="warning">
        Warning
      </Button>
      <Button {...args} color="info">
        Info
      </Button>
      <Button {...args} color="neutral">
        Neutral
      </Button>
    </Stack>
  ),
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
  render: (args) => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <Button {...args}>Primary</Button>
      <Button {...args} color="secondary">
        Secondary
      </Button>
      <Button {...args} color="success">
        Success
      </Button>
      <Button {...args} color="error">
        Error
      </Button>
      <Button {...args} color="warning">
        Warning
      </Button>
      <Button {...args} color="info">
        Info
      </Button>
      <Button {...args} color="neutral">
        Neutral
      </Button>
    </Stack>
  ),
};

export const Tonal: Story = {
  args: {
    variant: 'tonal',
  },
  render: (args) => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <Button {...args}>Primary</Button>
      <Button {...args} color="secondary">
        Secondary
      </Button>
      <Button {...args} color="success">
        Success
      </Button>
      <Button {...args} color="error">
        Error
      </Button>
      <Button {...args} color="warning">
        Warning
      </Button>
      <Button {...args} color="info">
        Info
      </Button>
      <Button {...args} color="neutral">
        Neutral
      </Button>
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        <Button {...args} startIcon={<Add />}>
          Start Icon
        </Button>
        <Button {...args} endIcon={<Edit />}>
          End Icon
        </Button>
        <Button {...args} startIcon={<Favorite />} endIcon={<Delete />}>
          Both Icons
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        <Button {...args} variant="outlined" startIcon={<Settings />}>
          Start Icon
        </Button>
        <Button {...args} variant="outlined" endIcon={<Search />}>
          End Icon
        </Button>
        <Button {...args} variant="outlined" startIcon={<Add />} endIcon={<Edit />}>
          Both Icons
        </Button>
      </Stack>
    </Stack>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <Button {...args} variant="contained">
        Contained
      </Button>
      <Button {...args} variant="outlined">
        Outlined
      </Button>
      <Button {...args} variant="text">
        Text
      </Button>
      <Button {...args} variant="tonal">
        Tonal
      </Button>
    </Stack>
  ),
};
