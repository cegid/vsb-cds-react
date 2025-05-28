import type { Meta, StoryObj } from "@storybook/react";

import Callout from "./Callout";

import { TestIcon } from "./test";

const meta = {
  title: "Components/Display/Callout",
  component: Callout,
  parameters: {
    layout: "centered",
    title: {
      control: "text",
      description: "The title to be displayed in the callout",
    },
    description: {
      control: "text",
      description: "The description to be displayed in the callout",
    },
    buttonLabel: {
      control: "text",
      description: "The label to be displayed in the action button",
    },
    image: {},
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    title: "Callouts alway have a title",
    description: "But they also have a description, if not use the Callout XS",
    buttonLabel: "Action",
    variant: "error",
    image: TestIcon,
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => <Callout {...args}></Callout>,
};
