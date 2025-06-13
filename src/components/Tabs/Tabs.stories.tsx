import type { Meta, StoryObj } from "@storybook/react";

import Tabs from "./Tabs";
import Tab from "../Tab/Tab";

const meta = {
  title: "Components/Structure/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    children: (
      <>
        <Tab label="label" />
        <Tab label="label" />
        <Tab label="label" />
      </>
    ),
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
