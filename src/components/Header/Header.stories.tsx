import type { Meta, StoryObj } from "@storybook/react";

import Header from "./Header";

const meta = {
  title: "Components/Structure/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The title for header",
    },
    primaryButtonText: {
      control: "text",
      description: "The text for the primary action button",
    },
    secondaryButtonText: {
      control: "text",
      description: "The text for the secondary action button",
    },
  },
  args: {
    title: "Page Title",
    primaryButtonText: "Button",
    secondaryButtonText: "Button",
    primaryAction: () => {},
    secondaryAction: () => {},
    settingsAction: () => {},
    moreAction: () => {},
    backAction: () => {},
    segmentedControlRight: false,
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Header
      {...args}
      primaryAction={args.primaryAction ? args.primaryAction : undefined}
      secondaryAction={args.secondaryAction ? args.secondaryAction : undefined}
      settingsAction={args.settingsAction ? args.settingsAction : undefined}
      moreAction={args.moreAction ? args.moreAction : undefined}
      backAction={args.backAction ? args.backAction : undefined}
    />
  ),
};

export const WithSegmentedControl: Story = {
  args: {
    title: "Dashboard",
    primaryButtonText: "Create",
    secondaryButtonText: "Export",
    segmentedControlRight: true,
    segmentedControlProps: {
      actions: [
        { label: "Day", onClick: () => console.log("Day selected") },
        { label: "Week", onClick: () => console.log("Week selected") },
        { label: "Month", onClick: () => console.log("Month selected") },
      ],
      defaultSelected: 1,
    },
  },
  render: (args) => (
    <Header
      {...args}
      primaryAction={args.primaryAction ? args.primaryAction : undefined}
      secondaryAction={args.secondaryAction ? args.secondaryAction : undefined}
      settingsAction={args.settingsAction ? args.settingsAction : undefined}
      moreAction={args.moreAction ? args.moreAction : undefined}
    />
  ),
};
