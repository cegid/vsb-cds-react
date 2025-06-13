import type { Meta, StoryObj } from "@storybook/react";
import Alert from "./Alert";
import { TestIcon } from "./test";

const meta = {
  title: "Components/Display/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["warning", "error", "info", "success"],
      description: "The variant of the alert",
    },
    title: {
      control: "text",
      description: "The title to be displayed in the alert",
    },
    description: {
      control: "text",
      description: "The description to be displayed in the alert",
    },
    buttonLabel: {
      control: "text",
      description: "The label to be displayed in the action button",
    },
    size: {
      control: { type: "select" },
      options: ["M", "XS"],
      description: "The size of the alert",
    },
    image: {
      control: false,
      description: "Icon or image to display",
    },
  },
  args: {
    title: "Alerts always have a title",
    description: "But they also have a description, if not use the Alert XS",
    buttonLabel: "Action",
    variant: "info",
    size: "M",
    image: TestIcon,
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning message",
    description: "This is a warning alert with important information",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Error occurred",
    description: "Something went wrong, please try again",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success!",
    description: "Your action was completed successfully",
  },
};

export const ExtraSmall: Story = {
  args: {
    size: "XS",
    title: "Compact alert",
    description: "This is a compact version of the alert",
  },
};

export const WithoutImage: Story = {
  args: {
    title: "No image alert",
    description: "This alert doesn't have an image",
    image: undefined,
  },
};

export const WithStringImage: Story = {
  args: {
    title: "Image from URL",
    description: "This alert uses a string URL for the image",
    image: "https://via.placeholder.com/50x50",
  },
};

export const WithActions: Story = {
  args: {
    title: "Alert with actions",
    description: "This alert has both action and close buttons",
    buttonLabel: "Take action",
    onActionClick: () => alert("Action clicked!"),
    onClose: () => alert("Close clicked!"),
  },
};