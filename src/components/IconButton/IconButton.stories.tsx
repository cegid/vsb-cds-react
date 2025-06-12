import type { Meta, StoryObj } from "@storybook/react";

import IconButton from "./IconButton";
import {
  Add,
  Delete,
  Edit,
  Favorite,
  Search,
  Settings,
} from "@cegid/icons-react";
import Stack from "../Stack";

const meta = {
  title: "Components/Buttons/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
        "neutral",
      ],
      description: "The color of the component",
    },
    variant: {
      control: "select",
      options: ["text", "contained", "outlined", "tonal", "iconOnly"],
      description: "The variant to use",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "The size of the component",
    },
    disabled: {
      control: "boolean",
      description: "If true, the component is disabled",
    },
    square: {
      control: "boolean",
      description: "If true, rounded corners are disabled",
    },
    onClick: { action: "clicked" },
  },
  args: {
    color: "primary",
    variant: "contained",
    size: "medium",
    disabled: false,
    square: false,
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <IconButton {...args}>
      <Add />
    </IconButton>
  ),
};

export const IconOnly: Story = {
  args: {
    variant: "iconOnly",
  },
  render: (args) => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <IconButton {...args}>
        <Add />
      </IconButton>
      <IconButton {...args} color="secondary">
        <Edit />
      </IconButton>
      <IconButton {...args} color="success">
        <Favorite />
      </IconButton>
      <IconButton {...args} color="error">
        <Delete />
      </IconButton>
      <IconButton {...args} color="warning">
        <Settings />
      </IconButton>
      <IconButton {...args} color="info">
        <Search />
      </IconButton>
    </Stack>
  ),
};

export const Contained: Story = {
  args: {
    variant: "contained",
  },
  render: (args) => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <IconButton {...args}>
        <Add />
      </IconButton>
      <IconButton {...args} color="secondary">
        <Edit />
      </IconButton>
      <IconButton {...args} color="success">
        <Favorite />
      </IconButton>
      <IconButton {...args} color="error">
        <Delete />
      </IconButton>
      <IconButton {...args} color="warning">
        <Settings />
      </IconButton>
      <IconButton {...args} color="info">
        <Search />
      </IconButton>
    </Stack>
  ),
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
  },
  render: (args) => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <IconButton {...args}>
        <Add />
      </IconButton>
      <IconButton {...args} color="secondary">
        <Edit />
      </IconButton>
      <IconButton {...args} color="success">
        <Favorite />
      </IconButton>
      <IconButton {...args} color="error">
        <Delete />
      </IconButton>
      <IconButton {...args} color="warning">
        <Settings />
      </IconButton>
      <IconButton {...args} color="info">
        <Search />
      </IconButton>
    </Stack>
  ),
};

export const Tonal: Story = {
  args: {
    variant: "tonal",
  },
  render: (args) => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <IconButton {...args}>
        <Add />
      </IconButton>
      <IconButton {...args} color="secondary">
        <Edit />
      </IconButton>
      <IconButton {...args} color="success">
        <Favorite />
      </IconButton>
      <IconButton {...args} color="error">
        <Delete />
      </IconButton>
      <IconButton {...args} color="warning">
        <Settings />
      </IconButton>
      <IconButton {...args} color="info">
        <Search />
      </IconButton>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconButton {...args} size="small">
        <Add fontSize="small" />
      </IconButton>
      <IconButton {...args} size="medium">
        <Add />
      </IconButton>
      <IconButton {...args} size="large">
        <Add fontSize="large" />
      </IconButton>
    </Stack>
  ),
};

export const Square: Story = {
  args: {
    square: true,
  },
  render: (args) => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <IconButton {...args}>
        <Add />
      </IconButton>
      <IconButton {...args} variant="contained" color="secondary">
        <Edit />
      </IconButton>
      <IconButton {...args} variant="outlined" color="success">
        <Favorite />
      </IconButton>
      <IconButton {...args} variant="tonal" color="error">
        <Delete />
      </IconButton>
    </Stack>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <IconButton {...args}>
        <Add />
      </IconButton>
      <IconButton {...args} variant="iconOnly" color="secondary">
        <Edit />
      </IconButton>
      <IconButton {...args} variant="contained" color="success">
        <Favorite />
      </IconButton>
      <IconButton {...args} variant="outlined" color="error">
        <Delete />
      </IconButton>
      <IconButton {...args} variant="tonal" color="warning">
        <Settings />
      </IconButton>
    </Stack>
  ),
};

export const AllColors: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <IconButton {...args}>
        <Add />
      </IconButton>
      <IconButton {...args} color="secondary">
        <Edit />
      </IconButton>
      <IconButton {...args} color="success">
        <Favorite />
      </IconButton>
      <IconButton {...args} color="error">
        <Delete />
      </IconButton>
      <IconButton {...args} color="warning">
        <Settings />
      </IconButton>
      <IconButton {...args} color="info">
        <Search />
      </IconButton>
    </Stack>
  ),
};
