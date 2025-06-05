import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge";
import Row from "../Row";
import Typography from "../Typography";
import Icon from "../Icon";

const meta = {
  title: "Components/Display/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "outlined"],
    },
    size: {
      control: "select",
      options: ["small", "medium"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "error"],
    },
  },
  args: {
    variant: "outlined",
    size: "medium",
    color: "primary",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Badge {...args}>
      <Row gap={1}>
        <Icon size={12}>add-01</Icon>
        <Typography variant="captionRegular">3</Typography>
      </Row>
    </Badge>
  ),
};

export const Filled: Story = {
  args: {
    variant: "filled",
  },
  render: (args) => (
    <Badge {...args}>
      <Row gap={1}>
        <Icon size={12}>add-01</Icon>
        <Typography variant="captionRegular">3</Typography>
      </Row>
    </Badge>
  ),
};

export const Small: Story = {
  args: {
    size: "small",
    variant: "filled",
  },
  render: (args) => <Badge {...args} />,
};

export const SmallOutlined: Story = {
  args: {
    size: "small",
    variant: "outlined",
  },
  render: (args) => <Badge {...args} />,
};

export const AllVariants: Story = {
  render: () => (
    <Row gap={2}>
      <Badge variant="outlined" size="medium">
        <Row gap={1}>
          <Icon size={12}>add-01</Icon>
          <Typography variant="captionRegular">Medium Outlined</Typography>
        </Row>
      </Badge>
      <Badge variant="filled" size="medium">
        <Row gap={1}>
          <Icon size={12}>add-01</Icon>
          <Typography variant="captionRegular">Medium Filled</Typography>
        </Row>
      </Badge>
      <Badge variant="outlined" size="small" />
      <Badge variant="filled" size="small" />
    </Row>
  ),
};

export const AllColors: Story = {
  render: () => (
    <Row gap={2}>
      <Badge variant="filled" color="primary">
        <Typography variant="captionRegular">Primary</Typography>
      </Badge>
      <Badge variant="filled" color="secondary">
        <Typography variant="captionRegular">Secondary</Typography>
      </Badge>
      <Badge variant="filled" color="success">
        <Typography variant="captionRegular">Success</Typography>
      </Badge>
      <Badge variant="filled" color="yellow">
        <Typography variant="captionRegular">Warning</Typography>
      </Badge>
      <Badge variant="filled" color="critical">
        <Typography variant="captionRegular">Error</Typography>
      </Badge>
    </Row>
  ),
};
