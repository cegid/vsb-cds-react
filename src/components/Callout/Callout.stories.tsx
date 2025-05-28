import type { Meta, StoryObj } from "@storybook/react";
import Callout from "./Callout";
import { TestIcon } from "./test";

const meta = {
  title: "Components/Display/Callout",
  component: Callout,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["warning", "error", "info", "success"],
      description: "The variant of the callout",
    },
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
    size: {
      control: { type: "select" },
      options: ["M", "XS"],
      description: "The size of the callout",
    },
    image: {
      control: false,
      description: "Icon or image to display",
    },
  },
  args: {
    title: "Callouts always have a title",
    description: "But they also have a description, if not use the Callout XS",
    buttonLabel: "Action",
    variant: "info",
    size: "M",
    image: TestIcon,
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning message",
    description: "This is a warning callout with important information",
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
    title: "Compact callout",
    description: "This is a compact version of the callout",
  },
};

export const WithoutImage: Story = {
  args: {
    title: "No image callout",
    description: "This callout doesn't have an image",
    image: undefined,
  },
};

export const WithStringImage: Story = {
  args: {
    title: "Image from URL",
    description: "This callout uses a string URL for the image",
    image: "https://via.placeholder.com/50x50",
  },
};

export const WithActions: Story = {
  args: {
    title: "Callout with actions",
    description: "This callout has both action and close buttons",
    buttonLabel: "Take action",
    buttonActionClick: () => alert("Action clicked!"),
    onClose: () => alert("Close clicked!"),
  },
};