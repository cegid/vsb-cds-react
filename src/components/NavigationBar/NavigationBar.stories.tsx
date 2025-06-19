import type { Meta, StoryObj } from "@storybook/react";
import NavigationBar from "./NavigationBar";

const meta = {
  title: "Components/Navigation/NavigationBar",
  component: NavigationBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // Define any specific controls for the NavigationBar component here
  },
  args: {
    // Define default args for the NavigationBar component here
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};