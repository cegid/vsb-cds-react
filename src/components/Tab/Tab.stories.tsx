import type { Meta, StoryObj } from "@storybook/react-vite";

import Tab from "./Tab";
import Typography from "../Typography";

const meta = {
  title: "Components/Structure/Tab",
  component: Tab,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The text label for the tab",
    },
    badge: {
      control: "object",
      description: "Badge props to display next to the tab label",
    },
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

export const WithBadgeExamples: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Tab label="Default" />
      <Tab
        label="Messages"
        badge={{
          children: (
            <Typography variant="captionRegular" color="inherit">
              5
            </Typography>
          ),
          variant: "tonal",
          color: "primary",
        }}
      />
      <Tab
        label="Notifications"
        badge={{
          children: (
            <Typography variant="captionRegular" color="inherit">
              12
            </Typography>
          ),
          variant: "outlined",
          color: "critical",
        }}
      />
      <Tab
        label="Status"
        badge={{
          size: "small",
          color: "success",
        }}
      />
      <Tab
        label="Archive"
        badge={{
          children: (
            <Typography variant="captionRegular" color="inherit">
              99+
            </Typography>
          ),
          variant: "tonal",
          color: "neutral",
        }}
      />
    </div>
  ),
};
