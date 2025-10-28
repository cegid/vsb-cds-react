import type { Meta, StoryObj } from "@storybook/react";
import SystemBanner from "./SystemBanner";

const meta: Meta<typeof SystemBanner> = {
  title: "💬 Messaging/SystemBanner",
  component: SystemBanner,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SystemBanner>;

export const Default: Story = {
  args: {
    color: "critical",
    children: "Système en maintenance",
  },
};

export const Warning: Story = {
  args: {
    color: "warning",
    children: "Maintenance programmée ce soir",
  },
};
