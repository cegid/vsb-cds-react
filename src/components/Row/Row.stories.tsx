import type { Meta, StoryObj } from "@storybook/react-vite";

import Row from "./Row";
import Box from "../Box";

const meta = {
  title: "📁 Container & Layout/Row",
  component: Row,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The content to be displayed in the row",
    },
  },
  args: {
    children: "Column content",
  },
} satisfies Meta<typeof Row>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Row {...args} gap={6}>
      <Box padding={2} backgroundColor="primary/50">
        Item 1
      </Box>
      <Box padding={2} backgroundColor="secondary/50">
        Item 2
      </Box>
      <Box padding={2} backgroundColor="neutral/50">
        Item 3
      </Box>
    </Row>
  ),
};