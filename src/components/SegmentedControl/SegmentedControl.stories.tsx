import type { Meta, StoryObj } from "@storybook/react-vite";
import SegmentedControl from "./SegmentedControl";
import Icon from "../Icon";

const meta = {
  title: "🎛️ Form Controls/SegmentedControl",
  component: SegmentedControl,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    actions: [
      {
        icon: <Icon size={16}>add-01</Icon>,
        label: "Button",
        onClick: () => {},
      },
      {
        icon: <Icon size={16}>add-01</Icon>,
        label: "Button",
        onClick: () => {},
      },
      {
        icon: <Icon size={16}>add-01</Icon>,
        label: "Button",
        onClick: () => {},
      },
    ],
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const IconOnly: Story = {
  args: {
    actions: [
      {
        icon: <Icon size={16}>add-01</Icon>,
        onClick: () => {},
      },
      {
        icon: <Icon size={16}>add-01</Icon>,
        onClick: () => {},
      },
      {
        icon: <Icon size={16}>add-01</Icon>,
        onClick: () => {},
      },
    ],
  },
};
