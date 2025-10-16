import type { Meta, StoryObj } from "@storybook/react-vite";

import List from "./List";
import ListItem from "../ListItem";
import ListItemButton from "../ListItemButton";
import Typography from "../Typography";

const meta = {
  title: "📃 Content display/List",
  component: List,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    children: "List content",
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithText: Story = {
  args: {},
  render: () => (
    <List subheader={<Typography component="div">I'm a Subheader</Typography>}>
      <ListItem>
        <Typography variant="bodyMMedium" color="neutral/10">
          Item 1
        </Typography>
      </ListItem>
      <ListItem>
        <Typography variant="bodyMMedium" color="neutral/10">
          Item 2
        </Typography>
      </ListItem>
      <ListItem>
        <Typography variant="bodyMMedium" color="neutral/10">
          Item 3
        </Typography>
      </ListItem>
      <ListItem divider>
        <Typography variant="bodyMMedium" color="neutral/10">
          Item 4
        </Typography>
      </ListItem>
      <ListItem>
        <Typography variant="bodyMMedium" color="neutral/10">
          Item 5
        </Typography>
      </ListItem>
    </List>
  ),
};

export const WithClickableText: Story = {
  args: {},
  render: () => (
    <List
      subheader={<Typography component="div">I'm a Subheader</Typography>}
    >
      <ListItemButton>
        <Typography variant="bodyMMedium" color="neutral/10">
          Item 1
        </Typography>
      </ListItemButton>
      <ListItemButton selected>
        <Typography variant="bodyMMedium" color="neutral/10">
          Item 2
        </Typography>
      </ListItemButton>
      <ListItemButton disabled>
        <Typography variant="bodyMMedium" color="neutral/10">
          Item 3
        </Typography>
      </ListItemButton>
      <ListItemButton>
        <Typography variant="bodyMMedium" color="neutral/10">
          Item 4
        </Typography>
      </ListItemButton>
      <ListItemButton>
        <Typography variant="bodyMMedium" color="neutral/10">
          Item 5
        </Typography>
      </ListItemButton>
    </List>
  ),
};
