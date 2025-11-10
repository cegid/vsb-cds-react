import type { Meta, StoryObj } from "@storybook/react-vite";
import Avatar from "./Avatar";
import Box from "../Box";
import Typography from "../Typography";
import Icon from "../Icon";

const meta = {
  title: "📃 Content display/Avatar",
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
      options: ["extraSmall", "small", "medium", "large"],
      description: "Size of the avatar",
      table: {
        type: { summary: "CustomAvatarSize" },
        defaultValue: { summary: "medium" },
      },
    },
    shape: {
      control: "select",
      options: ["circle", "square", "hexagon", "starburst", "flower"],
      description: "Shape of the avatar",
      table: {
        type: { summary: "CustomAvatarShape" },
        defaultValue: { summary: "circle" },
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
    trigram: "AB",
  },
};

export const Shapes: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={20}>
      <Box>
        <Box marginBottom={12}>
          <Typography variant="bodyMSemiBold">With trigrams</Typography>
        </Box>
        <Box display="flex" gap={12} alignItems="center" flexWrap="wrap">
          <Avatar size="large" trigram="CI" color="primary" shape="circle" />
          <Avatar size="large" trigram="SQ" color="secondary" shape="square" />
          <Avatar size="large" trigram="HX" color="success" shape="hexagon" />
          <Avatar size="large" trigram="ST" color="yellow" shape="starburst" />
          <Avatar size="large" trigram="FL" color="critical" shape="flower" />
        </Box>
      </Box>
      <Box>
        <Box marginBottom={12}>
          <Typography variant="bodyMSemiBold">With images</Typography>
        </Box>
        <Box display="flex" gap={12} alignItems="center" flexWrap="wrap">
          <Avatar
            size="large"
            imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            color="primary"
            shape="circle"
          />
          <Avatar
            size="large"
            imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
            color="secondary"
            shape="square"
          />
          <Avatar
            size="large"
            imageUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
            color="success"
            shape="hexagon"
          />
          <Avatar
            size="large"
            imageUrl="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
            color="yellow"
            shape="starburst"
          />
          <Avatar
            size="large"
            imageUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
            color="critical"
            shape="flower"
          />
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All available shape variants: circle, square, hexagon, starburst, and flower.",
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <Box display="flex" gap={12} alignItems="center" flexWrap="wrap">
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
        story: "All available color variants for the avatar.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={20}>
      <Box>
        <Box marginBottom={4}>
          <Typography variant="bodyMSemiBold">With trigrams</Typography>
        </Box>
        <Box display="flex" gap={6} alignItems="center" flexWrap="wrap">
          <Avatar size="extraSmall" trigram="XS" color="primary" />
          <Avatar size="small" trigram="SM" color="primary" />
          <Avatar size="medium" trigram="MD" color="primary" />
          <Avatar size="large" trigram="LG" color="primary" />
        </Box>
      </Box>
      <Box>
        <Box marginBottom={4}>
          <Typography variant="bodyMSemiBold">With icons</Typography>
        </Box>
        <Box display="flex" gap={6} alignItems="center" flexWrap="wrap">
          <Avatar size="extraSmall" icon={<Icon>user-01</Icon>} color="secondary" />
          <Avatar size="small" icon={<Icon>user-01</Icon>} color="secondary" />
          <Avatar size="medium" icon={<Icon>user-01</Icon>} color="secondary" />
          <Avatar size="large" icon={<Icon>user-01</Icon>} color="secondary" />
        </Box>
      </Box>
      <Box>
        <Box marginBottom={4}>
          <Typography variant="bodyMSemiBold">With images</Typography>
        </Box>
        <Box display="flex" gap={6} alignItems="center" flexWrap="wrap">
          <Avatar
            size="extraSmall"
            imageUrl="https://images.unsplash.com/photo-1494790108755-2616b612b2e5?w=100&h=100&fit=crop&crop=face"
            color="success"
          />
          <Avatar
            size="small"
            imageUrl="https://images.unsplash.com/photo-1494790108755-2616b612b2e5?w=100&h=100&fit=crop&crop=face"
            color="success"
          />
          <Avatar
            size="medium"
            imageUrl="https://images.unsplash.com/photo-1494790108755-2616b612b2e5?w=100&h=100&fit=crop&crop=face"
            color="success"
          />
          <Avatar
            size="large"
            imageUrl="https://images.unsplash.com/photo-1494790108755-2616b612b2e5?w=100&h=100&fit=crop&crop=face"
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
          "All available sizes: extraSmall (16px), small (24px), medium (32px), and large (40px).",
      },
    },
  },
};

export const Examples: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={20}>
      <Box>
        <Box marginBottom={12}>
          <Typography variant="bodyMSemiBold">User profiles</Typography>
        </Box>
        <Box display="flex" gap={12} alignItems="center" flexWrap="wrap">
          <Avatar size="small" trigram="JD" color="primary" />
          <Avatar size="medium" trigram="SM" color="secondary" />
          <Avatar
            size="large"
            imageUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
            color="success"
          />
        </Box>
      </Box>
      <Box>
        <Box marginBottom={12}>
          <Typography variant="bodyMSemiBold">Action buttons</Typography>
        </Box>
        <Box display="flex" gap={12} alignItems="center" flexWrap="wrap">
          <Avatar size="small" icon={<Icon>add-01</Icon>} color="primary" />
          <Avatar size="medium" icon={<Icon>settings-01</Icon>} color="yellow" />
          <Avatar size="large" icon={<Icon>contact</Icon>} color="info" />
        </Box>
      </Box>
      <Box>
        <Box marginBottom={12}>
          <Typography variant="bodyMSemiBold">Creative shapes</Typography>
        </Box>
        <Box display="flex" gap={12} alignItems="center" flexWrap="wrap">
          <Avatar
            size="medium"
            imageUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
            color="primary"
            shape="hexagon"
          />
          <Avatar
            size="medium"
            imageUrl="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
            color="secondary"
            shape="starburst"
          />
          <Avatar size="medium" trigram="FL" color="success" shape="flower" />
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Common use cases for the Avatar component.",
      },
    },
  },
};
