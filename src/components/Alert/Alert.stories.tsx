import type { Meta, StoryObj } from "@storybook/react-vite";
import Alert from "./Alert";
import { TestIcon } from "./test";
import React from "react";
import Column from "../Column";

const meta = {
  title: "💬 Feedback/Alert",
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

export const AllVariants: Story = {
  render: () => (
    <Column gap={4}>
      <Alert
        variant="info"
        title="Information"
        description="This is an informational alert with helpful details"
        image={TestIcon}
        buttonLabel="Learn more"
      />
      <Alert
        variant="success"
        title="Success!"
        description="Your action was completed successfully"
        image={TestIcon}
        buttonLabel="Continue"
      />
      <Alert
        variant="warning"
        title="Warning message"
        description="This is a warning alert with important information"
        image={TestIcon}
        buttonLabel="Review"
      />
      <Alert
        variant="error"
        title="Error occurred"
        description="Something went wrong, please try again"
        image={TestIcon}
        buttonLabel="Retry"
      />
    </Column>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Column gap={4}>
      <Alert
        variant="info"
        size="M"
        title="Medium size alert"
        description="This is the default medium size with full description"
        image={TestIcon}
        buttonLabel="Action"
      />
      <Alert
        variant="warning"
        size="XS"
        title="Extra small alert"
        description="Compact version for less space"
        image={TestIcon}
        buttonLabel="OK"
      />
    </Column>
  ),
};

export const WithoutElements: Story = {
  render: () => (
    <Column gap={4}>
      <Alert
        variant="info"
        title="No image alert"
        description="This alert doesn't have an image"
        buttonLabel="Action"
      />
      <Alert
        variant="success"
        title="No button alert"
        description="This alert doesn't have an action button"
        image={TestIcon}
      />
      <Alert
        variant="warning"
        title="Title only"
        image={TestIcon}
        buttonLabel="Action"
      />
    </Column>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Column gap={4}>
      <Alert
        variant="error"
        title="Alert with actions"
        description="This alert has both action and close buttons"
        image={TestIcon}
        buttonLabel="Take action"
        onActionClick={() => alert("Action clicked!")}
        onClose={() => alert("Close clicked!")}
      />
      <Alert
        variant="info"
        title="With string image URL"
        description="This alert uses a string URL for the image"
        image="https://w7.pngwing.com/pngs/980/712/png-transparent-computer-icons-user-avatar-avatar-heroes-silhouette-50x50.png"
        buttonLabel="View"
        onActionClick={() => alert("View clicked!")}
      />
    </Column>
  ),
};
