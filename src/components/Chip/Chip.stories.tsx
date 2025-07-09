import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Box } from "@mui/material";

import Chip from "./Chip";
import Typography from "../Typography";
import Icon from "../Icon";
import Badge from "../Badge";
import Avatar from "../Avatar";

const meta = {
  title: "Components/Display/Chip",
  component: Chip,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "warning", "error"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    label: {
      control: { type: "text" },
    },
  },
  args: {
    size: "small",
    color: "primary",
    disabled: false,
    label: "Label",
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default Chip",
  },
};

export const Complete: Story = {
  args: {
    label: (
      <Typography color="neutral/10" variant="bodySSemiBold">
        Complete Chip
      </Typography>
    ),
    onClick: () => {
      console.log("Chip clicked");
    },
    size: "small",
    startIcon: (
      <Icon color="neutral/10" size={14}>
        add-01
      </Icon>
    ),
    endIcon: (
      <Icon color="neutral/10" size={14}>
        chevron-down
      </Icon>
    ),
    badge: (
      <Badge size="small" color="critical">
        5
      </Badge>
    ),
  },
};

export const WithAvatar: Story = {
  args: {
    label: "User Chip",
    onClick: () => console.log("Avatar chip clicked"),
    startIcon: <Avatar size="extraSmall" trigram="CI" color="primary" />,
    endIcon: (
      <Icon color="neutral/10" size={14}>
        x
      </Icon>
    ),
  },
};

export const Sizes: Story = {
  render: () => (
    <Box display="flex" gap={2} alignItems="center">
      <Chip
        size="small"
        label="Small"
        onClick={() => console.log("Small clicked")}
        startIcon={
          <Icon color="neutral/10" size={14}>
            user
          </Icon>
        }
      />
      <Chip
        size="medium"
        label="Medium"
        onClick={() => console.log("Medium clicked")}
        startIcon={
          <Icon color="neutral/10" size={16}>
            user
          </Icon>
        }
      />
    </Box>
  ),
};

export const Colors: Story = {
  render: () => (
    <Box display="flex" gap={2} flexWrap="wrap">
      {["primary", "secondary", "success", "warning", "error"].map((color) => (
        <Chip
          key={color}
          color={color as any}
          label={`${color.charAt(0).toUpperCase() + color.slice(1)}`}
          onClick={() => console.log(`${color} clicked`)}
          startIcon={
            <Icon color="neutral/10" size={14}>
              star
            </Icon>
          }
        />
      ))}
    </Box>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [selectedChips, setSelectedChips] = useState<string[]>([]);

    const toggleChip = (chipId: string) => {
      setSelectedChips((prev) =>
        prev.includes(chipId)
          ? prev.filter((id) => id !== chipId)
          : [...prev, chipId]
      );
    };

    const chips = [
      { id: "react", label: "React", color: "primary" },
      { id: "vue", label: "Vue", color: "success" },
      { id: "angular", label: "Angular", color: "error" },
      { id: "svelte", label: "Svelte", color: "warning" },
    ];

    return (
      <Box>
        <Box mb={2}>
          <Typography variant="bodySSemiBold">
            Select your favorite frameworks:
          </Typography>
        </Box>
        <Box display="flex" gap={1.5} flexWrap="wrap">
          {chips.map((chip) => (
            <Chip
              key={chip.id}
              label={chip.label}
              color={chip.color as any}
              onClick={() => toggleChip(chip.id)}
              startIcon={
                <Icon color="neutral/10" size={14}>
                  code
                </Icon>
              }
              sx={{
                backgroundColor: selectedChips.includes(chip.id)
                  ? undefined
                  : "white",
              }}
            />
          ))}
        </Box>
        <Box mt={2}>
          <Typography variant="bodySSemiBold" color="neutral/50">
            Selected: {selectedChips.join(", ") || "None"}
          </Typography>
        </Box>
      </Box>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Box display="flex" gap={2} alignItems="center">
      <Chip
        label="Normal"
        onClick={() => console.log("Normal clicked")}
        startIcon={
          <Icon color="neutral/10" size={14}>
            check
          </Icon>
        }
      />
      <Chip
        label="Disabled"
        disabled
        onClick={() => console.log("Disabled clicked")}
        startIcon={
          <Icon color="neutral/40" size={14}>
            check
          </Icon>
        }
      />
    </Box>
  ),
};

export const NonClickable: Story = {
  render: () => (
    <Box display="flex" gap={2} alignItems="center">
      <Chip
        label="Clickable"
        onClick={() => console.log("Clicked")}
        startIcon={
          <Icon color="neutral/10" size={14}>
            cursor-click
          </Icon>
        }
      />
      <Chip
        label="Non-clickable"
        startIcon={
          <Icon color="neutral/10" size={14}>
            info
          </Icon>
        }
      />
    </Box>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Box display="flex" gap={2} flexWrap="wrap">
      <Chip
        label="Notifications"
        onClick={() => console.log("Notifications clicked")}
        startIcon={
          <Icon color="neutral/10" size={14}>
            bell
          </Icon>
        }
        badge={
          <Badge size="small" color="critical">
            3
          </Badge>
        }
      />
      <Chip
        label="Messages"
        onClick={() => console.log("Messages clicked")}
        startIcon={
          <Icon color="neutral/10" size={14}>
            message
          </Icon>
        }
        badge={
          <Badge size="small" color="yellow">
            12
          </Badge>
        }
      />
      <Chip
        label="Tasks"
        onClick={() => console.log("Tasks clicked")}
        startIcon={
          <Icon color="neutral/10" size={14}>
            task
          </Icon>
        }
        badge={
          <Badge size="small" color="success">
            ✓
          </Badge>
        }
      />
    </Box>
  ),
};