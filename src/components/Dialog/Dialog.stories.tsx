import type { Meta, StoryObj } from "@storybook/react";

import Dialog from "./Dialog";
import Typography from "../Typography";
import Button from "../Button";

const meta = {
  title: "Components/Display/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    title: "Title",
    content: (
      <Typography component="p" variant="bodySRegular" color="neutral/60">
        Lorem ipsum dolor sit amet consectetur. Varius amet tincidunt porta nibh
        arcu. Vitae nunc consequat malesuada orci quam sed fusce. Amet amet amet
        diam erat eu id natoque enim tellus. Elit sapien tincidunt consectetur
        tristique imperdiet elementum morbi volutpat.
      </Typography>
    ),
    actions: [<Button color="neutral" fullWidth>Button</Button>, <Button fullWidth>Button</Button>]
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
