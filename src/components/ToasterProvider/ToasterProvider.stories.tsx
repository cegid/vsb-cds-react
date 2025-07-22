import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@mui/material";

import ToasterProvider, { useToaster } from "./ToasterProvider";
import Row from "../Row";

const ToasterDemo = () => {
  const { displayInfo, displaySuccess, displayWarning, displayError, close } =
    useToaster();

  return (
    <Row gap={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => displayInfo("This is an info notification")}
      >
        Show Info
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={() => displaySuccess("Operation completed successfully!")}
      >
        Show Success
      </Button>
      <Button
        variant="contained"
        color="warning"
        onClick={() => displayWarning("This is a warning message")}
      >
        Show Warning
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => displayError("An error has occurred")}
      >
        Show Error
      </Button>
    </Row>
  );
};

const meta = {
  title: "Components/Structure/ToasterProvider",
  component: ToasterProvider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    anchorOrigin: {
      control: "object",
      description: "Position where notifications should appear",
      defaultValue: { vertical: "top", horizontal: "right" },
    },
    children: ToasterDemo,
  },
  args: {
    anchorOrigin: { vertical: "top", horizontal: "right" },
  },
} satisfies Meta<typeof ToasterProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ToasterProvider {...args}>
      <ToasterDemo />
    </ToasterProvider>
  ),
};

const AutoHideDemo = () => {
  const { displayInfo, displaySuccess } = useToaster();

  return (
    <Row gap={2}>
      <Button
        variant="outlined"
        onClick={() =>
          displayInfo("Auto-hides in 2 seconds", { autoHideDuration: 2000 })
        }
      >
        2s Auto-hide
      </Button>
      <Button
        variant="outlined"
        onClick={() =>
          displaySuccess("Auto-hides in 8 seconds", { autoHideDuration: 8000 })
        }
      >
        8s Auto-hide
      </Button>
      <Button
        variant="outlined"
        onClick={() => displayInfo("Never auto-hides", { autoHideDuration: 0 })}
      >
        No Auto-hide
      </Button>
      <Button
        variant="outlined"
        onClick={() => displayInfo("Default 5s auto-hide")}
      >
        Default (5s)
      </Button>
    </Row>
  );
};

export const AutoHideDuration: Story = {
  render: (args) => (
    <ToasterProvider {...args}>
      <AutoHideDemo />
    </ToasterProvider>
  ),
};
