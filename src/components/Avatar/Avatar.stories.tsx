import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";
import { Add, Settings, Mail, Contacts } from "@cegid/icons-react";
import Box from "../Box";
import Typography from "../Typography";
import Icon from "../Icon";

const meta = {
  title: "Components/Display/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Avatar component for displaying user profile pictures, initials, or icons with various sizes and colors. Supports image URLs, text trigrams, and SVG icons with customizable color themes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the avatar",
      table: {
        type: { summary: "CustomAvatarSize" },
        defaultValue: { summary: "medium" },
      },
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "error", "info"],
      description: "Color theme from the palette",
      table: {
        type: { summary: "PaletteNames" },
      },
    },
    trigram: {
      control: "text",
      description: "Text to display (typically user initials)",
      table: {
        type: { summary: "string" },
      },
    },
    imageUrl: {
      control: "text",
      description: "URL of the image to display as avatar",
      table: {
        type: { summary: "string" },
      },
    },
    icon: {
      control: false,
      description: "SVG icon component to display",
      table: {
        type: { summary: "SVGIconType" },
      },
    },
  },
  args: {
    size: "medium",
    color: "primary",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigram: "EPE",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    trigram: "SM",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    trigram: "MD",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    trigram: "LG",
  },
};

export const WithAddIcon: Story = {
  args: {
    icon: <Icon>add-01</Icon>,
    size: "large",
  },
};

export const WithSettingsIcon: Story = {
  args: {
    icon: <Icon>settings-02</Icon>,
    size: "small",
  },
};

export const WithImage: Story = {
  args: {
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    size: "medium",
  },
};

export const WithImageLarge: Story = {
  args: {
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    size: "large",
  },
};

export const ColorVariants: Story = {
  render: () => (
    <Box display="flex" gap={12} alignItems="center">
      <Avatar size="medium" trigram="PR" color="primary" />
      <Avatar size="medium" trigram="SC" color="secondary" />
      <Avatar size="medium" trigram="SU" color="success" />
      <Avatar size="medium" trigram="WA" color="yellow" />
      <Avatar size="medium" trigram="ER" color="critical" />
      <Avatar size="medium" trigram="IN" color="info" />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstration of different color variants available for the avatar.",
      },
    },
  },
};

export const ContentTypes: Story = {
  render: () => (
    <Box display="flex" gap={16} alignItems="center">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar size="medium" trigram="AB" color="primary" />
        <Box marginTop={8}>
          <Typography variant="captionRegular">Trigram</Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar size="medium" icon={<Icon>mail-01</Icon>} color="secondary" />
        <Box marginTop={8}>
          <Typography variant="captionRegular">Icon</Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
          size="medium"
          imageUrl="https://images.unsplash.com/photo-1494790108755-2616b612b2e5?w=100&h=100&fit=crop&crop=face"
          color="success"
        />
        <Box marginTop={8}>
          <Typography variant="captionRegular">Image</Typography>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstration of the three supported content types: trigram (initials), icon, and image.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <Box display="flex" gap={16} alignItems="center">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar size="small" trigram="S" color="primary" />
        <Box marginTop={8}>
          <Typography variant="captionRegular">Small (24px)</Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar size="medium" trigram="M" color="primary" />
        <Box marginTop={8}>
          <Typography variant="captionRegular">Medium (32px)</Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar size="large" trigram="L" color="primary" />
        <Box marginTop={8}>
          <Typography variant="captionRegular">Large (40px)</Typography>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comparison of the three available avatar sizes with their respective dimensions.",
      },
    },
  },
};

export const UseCases: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={20}>
      <Box>
        <Box marginBottom={12}>
          <Typography variant="bodySRegular">Profile avatars</Typography>
        </Box>
        <Box display="flex" gap={12} alignItems="center">
          <Avatar size="small" trigram="JD" color="primary" />
          <Avatar size="medium" trigram="SM" color="secondary" />
          <Avatar size="large" trigram="AL" color="success" />
        </Box>
      </Box>
      <Box>
        <Box marginBottom={12}>
          <Typography variant="bodySRegular">Action buttons</Typography>
        </Box>
        <Box display="flex" gap={12} alignItems="center">
          <Avatar size="small" icon={<Icon>add-01</Icon>} color="primary" />
          <Avatar size="medium" icon={<Icon>settings-01</Icon>} color="yellow" />
          <Avatar size="large" icon={<Icon>contact</Icon>} color="info" />
        </Box>
      </Box>
      <Box>
        <Box marginBottom={12}>
          <Typography variant="bodySRegular">User profiles</Typography>
        </Box>
        <Box display="flex" gap={12} alignItems="center">
          <Avatar
            size="small"
            imageUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
            color="primary"
          />
          <Avatar
            size="medium"
            imageUrl="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
            color="secondary"
          />
          <Avatar
            size="large"
            imageUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
            color="success"
          />
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Common use case examples of the Avatar component in different user interface contexts.",
      },
    },
  },
};
