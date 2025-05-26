import type { Meta, StoryObj } from '@storybook/react';

import { InfoOutlined } from '@cegid/icons-react';

import colorPalettes, { PaletteNames } from '../../../theme/colors';
import Status from './Status';
import Box from '../Box';
import Stack from '../Stack';
import { Typography } from '@mui/material';

const colorNames = Object.keys(colorPalettes);

const meta = {
  title: 'Components/Status',
  component: Status,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium'],
      description: 'La taille du Status',
    },
    color: {
      control: 'select',
      options: colorNames,
      description: 'La couleur du Status',
    },
    variant: {
      control: 'radio',
      options: ['light', 'solid'],
      description: "Le style d'affichage",
    },
    icon: {
      control: 'select',
      options: ['Info', 'None'],
      mapping: {
        Info: InfoOutlined,
        None: undefined,
      },
      description: "L'icône à afficher",
    },
    label: {
      control: 'text',
      description: 'Le texte à afficher',
    },
  },
  args: {
    size: 'medium',
    color: 'primary',
    variant: 'solid',
    icon: InfoOutlined,
    label: 'Status',
  },
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Status',
  },
};

export const Variants: Story = {
  render: (args) => (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center">
        <Status {...args} variant="light" color="success" icon={InfoOutlined} label="Light" />
        <Status {...args} variant="solid" color="success" icon={InfoOutlined} label="Solid" />
      </Stack>
    </Stack>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <Stack direction="column" spacing={3}>
      <Box>
        <Typography variant='titleMSemiBold' mb={1}>
          Light Variant
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          {colorNames.map((colorName) => (
            <Status
              key={`light-${colorName}`}
              {...args}
              variant="light"
              color={colorName as PaletteNames}
              icon={InfoOutlined}
              label={colorName}
            />
          ))}
        </Box>
      </Box>

      <Box>
        <Typography variant='titleMSemiBold' mb={1}>
          Solid Variant
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          {colorNames.map((colorName) => (
            <Status
              key={`solid-${colorName}`}
              {...args}
              variant="solid"
              color={colorName as PaletteNames}
              icon={InfoOutlined}
              label={colorName}
            />
          ))}
        </Box>
      </Box>
    </Stack>
  ),
};

export const SizeComparison: Story = {
  render: (args) => (
    <Stack direction="column" spacing={3}>
      <Box>
        <Typography variant='titleMSemiBold' mb={1}>
          Medium Size
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          {colorNames.slice(0, 4).map((colorName, index) => (
            <Status
              key={`medium-${colorName}`}
              {...args}
              size="medium"
              variant={index % 2 === 0 ? 'light' : 'solid'}
              color={colorName as PaletteNames}
              icon={InfoOutlined}
              label={colorName}
            />
          ))}
        </Box>
      </Box>

      <Box>
        <Typography variant='titleMSemiBold' mb={1}>
          Small Size
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          {colorNames.slice(0, 4).map((colorName, index) => (
            <Status
              key={`small-${colorName}`}
              {...args}
              size="small"
              variant={index % 2 === 0 ? 'light' : 'solid'}
              color={colorName as PaletteNames}
              icon={InfoOutlined}
              label={colorName}
            />
          ))}
        </Box>
      </Box>
    </Stack>
  ),
};

export const IconsAndNoIcons: Story = {
  render: (args) => (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        <Status {...args} color="success" icon={InfoOutlined} label="With Icon" />
        <Status {...args} color="success" label="No Icon" />
      </Stack>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        <Status {...args} variant="solid" color="yellow" icon={InfoOutlined} label="With Icon" />
        <Status {...args} variant="solid" color="yellow" label="No Icon" />
      </Stack>
    </Stack>
  ),
};

export const AllColors: Story = {
  render: () => (
    <Stack direction="column" spacing={3}>
      {colorNames.map((colorName) => (
        <Box
          key={colorName}
          display='grid'
          gridTemplateColumns='repeat(4, auto)'
          gap={2}
          alignItems="center"
        >
          <Status
            size="medium"
            variant="light"
            color={colorName as PaletteNames}
            icon={InfoOutlined}
            label={colorName}
          />
          <Status
            size="medium"
            variant="solid"
            color={colorName as PaletteNames}
            icon={InfoOutlined}
            label={colorName}
          />
          <Status
            size="small"
            variant="light"
            color={colorName as PaletteNames}
            icon={InfoOutlined}
            label={colorName}
          />
          <Status
            size="small"
            variant="solid"
            color={colorName as PaletteNames}
            icon={InfoOutlined}
            label={colorName}
          />
        </Box>
      ))}
    </Stack>
  ),
};
