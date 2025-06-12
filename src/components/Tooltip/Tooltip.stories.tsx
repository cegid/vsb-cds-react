import type { Meta, StoryObj } from "@storybook/react";
import Box from "../Box";
import Typography from "../Typography";
import Tooltip from "./Tooltip";

const defaultChildren = (
  <Box padding={6} backgroundColor="secondary/50">
    <Typography color="white" variant="bodyMSemiBold">
      Hover to show
    </Typography>
  </Box>
);

const meta = {
  title: "Components/Display/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    title: "Tooltip",
    children: defaultChildren,
    color: "dark",
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => <Tooltip {...args}></Tooltip>,
};
