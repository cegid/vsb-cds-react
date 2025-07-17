import type { Meta, StoryObj } from "@storybook/react-vite";

import colorPalettes, { PaletteNames } from "../../theme/colors";
import Status from "./Status";
import Box from "../Box";
import Stack from "../Stack";
import Typography from "../Typography";
import Avatar from "../Avatar";

const colorNames = Object.keys(colorPalettes);

const meta = {
  title: "Components/Display/Status",
  component: Status,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["small", "medium"],
      description: "La taille du Status",
    },
    color: {
      control: "select",
      options: colorNames,
      description: "La couleur du Status",
    },
    variant: {
      control: "radio",
      options: ["light", "dark", "link"],
      description: "Le style d'affichage",
    },
    icon: {
      control: "select",
      options: ["Info", "None"],
      mapping: {
        Info: "information-diamond",
        None: undefined,
      },
      description: "L'icône à afficher",
    },
    label: {
      control: "text",
      description: "Le texte à afficher",
    },
    avatar: {
      control: false,
      description: "Le composant Avatar à afficher (priorité sur l'icône)",
    },
  },
  args: {
    size: "medium",
    color: "primary",
    variant: "dark",
    icon: "information-diamond",
    label: "Status",
  },
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Status",
  },
};

export const Variants: Story = {
  render: (args) => (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center">
        <Status
          {...args}
          variant="light"
          color="success"
          icon="information-circle"
          label="Light"
        />
        <Status
          {...args}
          variant="dark"
          color="success"
          icon="information-circle"
          label="dark"
        />
      </Stack>
    </Stack>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <Stack direction="column" spacing={3}>
      <Box>
        <Typography variant="titleLSemiBold" mb={1}>
          Light Variant
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          {colorNames.map((colorName) => (
            <Status
              key={`light-${colorName}`}
              {...args}
              variant="light"
              color={colorName as PaletteNames}
              icon="information-circle"
              label={colorName}
            />
          ))}
        </Box>
      </Box>

      <Box>
        <Typography variant="titleLSemiBold" mb={1}>
          dark Variant
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          {colorNames.map((colorName) => (
            <Status
              key={`dark-${colorName}`}
              {...args}
              variant="dark"
              color={colorName as PaletteNames}
              icon="information-circle"
              label={colorName}
            />
          ))}
        </Box>
      </Box>
    </Stack>
  ),
};

export const Size: Story = {
  render: (args) => (
    <Stack direction="column" spacing={3}>
      <Box>
        <Typography variant="titleLSemiBold" mb={1}>
          Medium Size
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          {colorNames.slice(0, 4).map((colorName, index) => (
            <Status
              key={`medium-${colorName}`}
              {...args}
              size="medium"
              variant={index % 2 === 0 ? "light" : "dark"}
              color={colorName as PaletteNames}
              icon="information-circle"
              label={colorName}
            />
          ))}
        </Box>
      </Box>

      <Box>
        <Typography variant="titleLSemiBold" mb={1}>
          small Size
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          {colorNames.slice(0, 4).map((colorName, index) => (
            <Status
              key={`small-${colorName}`}
              {...args}
              size="small"
              variant={index % 2 === 0 ? "light" : "dark"}
              color={colorName as PaletteNames}
              icon="information-circle"
              label={colorName}
            />
          ))}
        </Box>
      </Box>
    </Stack>
  ),
};

export const Icons: Story = {
  render: (args) => (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        <Status
          {...args}
          color="success"
          icon="information-circle"
          label="With Icon"
        />
      </Stack>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        <Status
          {...args}
          variant="dark"
          color="yellow"
          icon="information-circle"
          label="With Icon"
        />
      </Stack>
    </Stack>
  ),
};

export const WithAvatars: Story = {
  render: (args) => (
    <Stack direction="column" spacing={3}>
      <Box>
        <Typography variant="titleLSemiBold" mb={1}>
          Avatar avec Trigram
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Status
            {...args}
            variant="light"
            color="primary"
            avatar={<Avatar size="extraSmall" color="primary" trigram="JD" />}
            label="John Doe"
          />
          <Status
            {...args}
            variant="dark"
            color="success"
            avatar={<Avatar size="extraSmall" color="success" trigram="AM" />}
            label="Alice Martin"
          />
          <Status
            {...args}
            variant="link"
            color="yellow"
            avatar={<Avatar size="extraSmall" color="yellow" trigram="BL" />}
            label="Bob Lee"
          />
        </Stack>
      </Box>

      <Box>
        <Typography variant="titleLSemiBold" mb={1}>
          Avatar avec Image
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Status
            {...args}
            variant="light"
            color="primary"
            avatar={
              <Avatar
                size="extraSmall"
                color="primary"
                imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              />
            }
            label="Profile 1"
          />
          <Status
            {...args}
            variant="dark"
            color="info"
            avatar={
              <Avatar
                size="extraSmall"
                color="info"
                imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              />
            }
            label="Profile 2"
          />
        </Stack>
      </Box>

      <Box>
        <Typography variant="titleLSemiBold" mb={1}>
          Avatar avec Icône
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Status
            {...args}
            variant="light"
            color="critical"
            avatar={
              <Avatar
                size="extraSmall"
                color="critical"
                icon={<span>👤</span>}
              />
            }
            label="Admin"
          />
          <Status
            {...args}
            variant="dark"
            color="secondary"
            avatar={
              <Avatar
                size="extraSmall"
                color="secondary"
                icon={<span>⚙️</span>}
              />
            }
            label="Settings"
          />
        </Stack>
      </Box>
    </Stack>
  ),
};
