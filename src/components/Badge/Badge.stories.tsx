import type { Meta, StoryObj } from "@storybook/react-vite";
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
      options: ["tonal", "outlined"],
    },
    size: {
      control: "select",
      options: ["small", "medium"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "critical", "neutral"],
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

export const tonal: Story = {
  args: {
    variant: "tonal",
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
    variant: "tonal",
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
      <Badge variant="tonal" size="medium">
        <Row gap={1}>
          <Icon size={12}>add-01</Icon>
          <Typography variant="captionRegular">Medium tonal</Typography>
        </Row>
      </Badge>
      <Badge variant="outlined" size="small" />
      <Badge variant="tonal" size="small" />
    </Row>
  ),
};

export const AllColors: Story = {
  render: () => (
    <Row gap={2}>
      <Badge variant="tonal" color="primary">
        <Typography variant="captionRegular">Primary</Typography>
      </Badge>
      <Badge variant="tonal" color="secondary">
        <Typography variant="captionRegular">Secondary</Typography>
      </Badge>
      <Badge variant="tonal" color="success">
        <Typography variant="captionRegular">Success</Typography>
      </Badge>
      <Badge variant="tonal" color="yellow">
        <Typography variant="captionRegular">Warning</Typography>
      </Badge>
      <Badge variant="tonal" color="critical">
        <Typography variant="captionRegular">Error</Typography>
      </Badge>
    </Row>
  ),
};
