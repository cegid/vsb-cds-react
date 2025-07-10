import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "./Button";
import Stack from "../Stack";
import Icon from "../Icon";

const meta = {
  title: "Components/Buttons/Button",
  component: Button,
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
      options: ["text", "contained", "outlined", "tonal"],
      description: "The variant to use",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large", "auto"],
      description: "The size of the button",
    },
    disabled: {
      control: "boolean",
      description: "If true, the component is disabled",
    },
    startIcon: {
      control: "boolean",
      description: "Element placed before the children",
    },
    endIcon: {
      control: "boolean",
      description: "Element placed after the children",
    },
    onClick: { action: "clicked" },
  },
  args: {
    color: "primary",
    variant: "contained",
    size: "auto",
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
    variant: "text",
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
    variant: "contained",
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
    variant: "outlined",
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
    variant: "tonal",
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
        <Button {...args} startIcon={<Icon size={16}>add-01</Icon>}>
          Start Icon
        </Button>
        <Button {...args} endIcon={<Icon size={16}>edit-01</Icon>}>
          End Icon
        </Button>
        <Button
          {...args}
          startIcon={<Icon size={16}>favourite</Icon>}
          endIcon={<Icon size={16}>delete-01</Icon>}
        >
          Both Icons
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        <Button
          {...args}
          variant="outlined"
          startIcon={<Icon size={16}>settings-01</Icon>}
        >
          Start Icon
        </Button>
        <Button
          {...args}
          variant="outlined"
          endIcon={<Icon size={16}>search-01</Icon>}
        >
          End Icon
        </Button>
        <Button
          {...args}
          variant="outlined"
          startIcon={<Icon size={16}>add-01</Icon>}
          endIcon={<Icon size={16}>edit-01</Icon>}
        >
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
