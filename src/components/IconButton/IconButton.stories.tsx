import type { Meta, StoryObj } from "@storybook/react-vite";

import IconButton from "./IconButton";
import Stack from "../Stack";
import Icon from "../Icon/Icon";

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
      <Icon size={16}>add-01</Icon>
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
        <Icon size={16}>add-01</Icon>
      </IconButton>
      <IconButton {...args} color="secondary">
        <Icon size={16}>edit-01</Icon>
      </IconButton>
      <IconButton {...args} color="success">
        <Icon size={16}>favourite</Icon>
      </IconButton>
      <IconButton {...args} color="error">
        <Icon size={16}>delete-01</Icon>
      </IconButton>
      <IconButton {...args} color="warning">
        <Icon size={16}>settings-01</Icon>
      </IconButton>
      <IconButton {...args} color="info">
        <Icon size={16}>search-01</Icon>
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
        <Icon size={16}>add-01</Icon>
      </IconButton>
      <IconButton {...args} color="secondary">
        <Icon size={16}>edit-01</Icon>
      </IconButton>
      <IconButton {...args} color="success">
        <Icon size={16}>favourite</Icon>
      </IconButton>
      <IconButton {...args} color="error">
        <Icon size={16}>delete-01</Icon>
      </IconButton>
      <IconButton {...args} color="warning">
        <Icon size={16}>settings-01</Icon>
      </IconButton>
      <IconButton {...args} color="info">
        <Icon size={16}>search-01</Icon>
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
        <Icon size={16}>add-01</Icon>
      </IconButton>
      <IconButton {...args} color="secondary">
        <Icon size={16}>edit-01</Icon>
      </IconButton>
      <IconButton {...args} color="success">
        <Icon size={16}>favourite</Icon>
      </IconButton>
      <IconButton {...args} color="error">
        <Icon size={16}>delete-01</Icon>
      </IconButton>
      <IconButton {...args} color="warning">
        <Icon size={16}>settings-01</Icon>
      </IconButton>
      <IconButton {...args} color="info">
        <Icon size={16}>search-01</Icon>
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
        <Icon size={16}>add-01</Icon>
      </IconButton>
      <IconButton {...args} color="secondary">
        <Icon size={16}>edit-01</Icon>
      </IconButton>
      <IconButton {...args} color="success">
        <Icon size={16}>favourite</Icon>
      </IconButton>
      <IconButton {...args} color="error">
        <Icon size={16}>delete-01</Icon>
      </IconButton>
      <IconButton {...args} color="warning">
        <Icon size={16}>settings-01</Icon>
      </IconButton>
      <IconButton {...args} color="info">
        <Icon size={16}>search-01</Icon>
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
        <Icon size={16}>add-01</Icon>
      </IconButton>
      <IconButton {...args} variant="contained" color="secondary">
        <Icon size={16}>edit-01</Icon>
      </IconButton>
      <IconButton {...args} variant="outlined" color="success">
        <Icon size={16}>favourite</Icon>
      </IconButton>
      <IconButton {...args} variant="tonal" color="error">
        <Icon size={16}>delete-01</Icon>
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
        <Icon size={16}>add-01</Icon>
      </IconButton>
      <IconButton {...args} variant="iconOnly" color="secondary">
        <Icon size={16}>edit-01</Icon>
      </IconButton>
      <IconButton {...args} variant="contained" color="success">
        <Icon size={16}>favourite</Icon>
      </IconButton>
      <IconButton {...args} variant="outlined" color="error">
        <Icon size={16}>delete-01</Icon>
      </IconButton>
      <IconButton {...args} variant="tonal" color="warning">
        <Icon size={16}>settings-01</Icon>
      </IconButton>
    </Stack>
  ),
};

export const AllColors: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <IconButton {...args}>
        <Icon size={16}>add-01</Icon>
      </IconButton>
      <IconButton {...args} color="secondary">
        <Icon size={16}>edit-01</Icon>
      </IconButton>
      <IconButton {...args} color="success">
        <Icon size={16}>favourite</Icon>
      </IconButton>
      <IconButton {...args} color="error">
        <Icon size={16}>delete-01</Icon>
      </IconButton>
      <IconButton {...args} color="warning">
        <Icon size={16}>settings-01</Icon>
      </IconButton>
      <IconButton {...args} color="info">
        <Icon size={16}>search-01</Icon>
      </IconButton>
    </Stack>
  ),
};
