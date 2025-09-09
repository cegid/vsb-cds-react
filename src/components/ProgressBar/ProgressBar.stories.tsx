import type { Meta, StoryObj } from "@storybook/react-vite";

import ProgressBar from "./ProgressBar";
import Box from "../Box";

const meta = {
  title: "🌡 Indicators and status/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    progress: {
      control: { type: "range", min: -1, max: 100, step: 1 },
      description: "The progress value as a percentage (0-100). Set to -1 to show indeterminate animation",
      mapping: {
        [-1]: undefined,
      },
    },
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "neutral",
        "success",
        "yellow",
        "banana",
        "critical",
        "pink",
        "purple",
        "plum",
        "beige",
        "info",
      ],
      description: "The color variant from available palette names",
    },
    shape: {
      control: { type: "radio" },
      options: ["bar", "circle"],
      description: "The visual shape of the progress bar",
    },
    size: {
      control: { type: "range", min: 16, max: 80, step: 1 },
      description: "The size in pixels for circle shape (width and height)",
      if: { arg: "shape", eq: "circle" },
    },
  },
  args: {
    progress: 50,
    color: "primary",
    shape: "bar",
    size: 24,
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Box width={200}>
      <ProgressBar {...args} />
    </Box>
  ),
};
