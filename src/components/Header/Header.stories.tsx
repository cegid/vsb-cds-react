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
    buttonText: {
      control: "text",
      description: "The text for the button",
    },
    primaryAction: {
      control: "boolean",
      description: "has a primary action",
      defaultValue: true,
    },
    settingsAction: {
      control: "boolean",
      description: "has a settings action",
      defaultValue: true,
    },
    moreAction: {
      control: "boolean",
      description: "has a more action",
      defaultValue: true,
    },
  },
  args: {
    title: "Page Title",
    buttonText: "Button",
    primaryAction: () => {},
    settingsAction: () => {},
    moreAction: () => {},
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
      settingsAction={args.settingsAction ? args.settingsAction : undefined}
      moreAction={args.moreAction ? args.moreAction : undefined}
    ></Header>
  ),
};
