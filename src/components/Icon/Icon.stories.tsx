import type { Meta, StoryObj } from "@storybook/react";
import Icon from "./Icon";

const meta = {
  title: "Components/Icons/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
    docs: {},
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "text",
      description:
        'The color of the component. Can use format "palette/shade" (e.g., "primary/50")',
    },
    size: {
      control: "number",
      description: "The size of the component.",
    },
  },
  args: {
    children: "3-d-view",
    color: "primary/50",
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => <Icon {...args}>{args.children}</Icon>,
};
