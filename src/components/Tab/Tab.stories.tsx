import type { Meta, StoryObj } from "@storybook/react";

import Tab from "./Tab";

const meta = {
  title: "Components/Structure/Tab",
  component: Tab,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
  },
  args: {
    label: "Label",
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
