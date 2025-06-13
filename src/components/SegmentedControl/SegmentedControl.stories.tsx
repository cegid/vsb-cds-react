import type { Meta, StoryObj } from "@storybook/react";

import SegmentedControl from "./SegmentedControl";
import Icon from "../Icon";

const meta = {
  title: "Components/Structure/SegmentedControl",
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
        onClick: () => console.log("Button 1 clicked"),
      },
      {
        icon: <Icon size={16}>add-01</Icon>,
        label: "Button",
        onClick: () => console.log("Button 2 clicked"),
      },
      {
        icon: <Icon size={16}>add-01</Icon>,
        label: "Button",
        onClick: () => console.log("Button 3 clicked"),
      },
    ],
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
