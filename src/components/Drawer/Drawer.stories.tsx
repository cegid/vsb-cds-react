import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Drawer from "./Drawer";
import Button from "../Button";
import Box from "../Box";
import Typography from "../Typography";
import Row from "../Row";
import Column from "../Column";

const meta = {
  title: "🚧 WIP/SystemBanner",
  component: Drawer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    anchor: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Side from which the drawer will appear",
    },
    open: {
      control: "boolean",
      description: "If true, the drawer is open",
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const DrawerDemo = ({ anchor = "right" }: { anchor?: "top" | "bottom" | "left" | "right" }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box p={4}>
      <Button onClick={() => setOpen(true)}>
        Open {anchor} drawer
      </Button>
      <Drawer anchor={anchor} open={open} onClose={() => setOpen(false)}>
        <Box p={4} width={anchor === "top" || anchor === "bottom" ? "100%" : "400px"}>
          <Column gap={3}>
            <Typography variant="h3">Drawer Title</Typography>
            <Typography variant="bodyMRegular">
              This is the drawer content. You can put any content here.
            </Typography>
            <Typography variant="bodyMRegular">
              The drawer can be opened from top, bottom, left, or right side.
            </Typography>
            <Row gap={2} mt={4}>
              <Button variant="contained" onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </Row>
          </Column>
        </Box>
      </Drawer>
    </Box>
  );
};

export const Right: Story = {
  render: () => <DrawerDemo anchor="right" />,
};

export const Left: Story = {
  render: () => <DrawerDemo anchor="left" />,
};

export const Top: Story = {
  render: () => <DrawerDemo anchor="top" />,
};

export const Bottom: Story = {
  render: () => <DrawerDemo anchor="bottom" />,
};

export const WithCustomContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Box p={4}>
        <Button onClick={() => setOpen(true)}>
          Open drawer with custom content
        </Button>
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
          <Box p={4} width="500px">
            <Column gap={3}>
              <Typography variant="h2">Custom Drawer</Typography>
              <Typography variant="bodyLRegular" color="neutral/50">
                This drawer contains custom styled content
              </Typography>

              <Box
                p={3}
                borderRadius={2}
                backgroundColor="primary/95"
                border={{ color: "primary/90", width: 1, style: "solid" }}
              >
                <Typography variant="bodyMSemiBold" color="primary/10">
                  Important Information
                </Typography>
                <Typography variant="bodySRegular" color="neutral/50" mt={1}>
                  This is a custom card inside the drawer
                </Typography>
              </Box>

              <Box
                p={3}
                borderRadius={2}
                backgroundColor="success/95"
                border={{ color: "success/90", width: 1, style: "solid" }}
              >
                <Typography variant="bodyMSemiBold" color="success/10">
                  Success
                </Typography>
                <Typography variant="bodySRegular" color="neutral/50" mt={1}>
                  Operation completed successfully
                </Typography>
              </Box>

              <Row gap={2} justifyContent="flex-end" mt={4}>
                <Button variant="text" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={() => setOpen(false)}>
                  Confirm
                </Button>
              </Row>
            </Column>
          </Box>
        </Drawer>
      </Box>
    );
  },
};
