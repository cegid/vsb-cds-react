import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@cegid/cds-react';

import Box from './Box';
import Typography from '../Typography';

const meta = {
  title: 'Components/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'text',
      description: 'La couleur de fond au format "palette/shade" (ex: "primary/50")',
    },
    p: {
      control: 'number',
      description: 'Le padding du composant',
    },
    borderRadius: {
      control: 'number',
      description: 'Le rayon de bordure du composant',
    },
    width: {
      control: 'text',
      description: 'La largeur du composant',
    },
    height: {
      control: 'text',
      description: 'La hauteur du composant',
    },
    display: {
      control: 'select',
      options: ['block', 'flex', 'inline', 'inline-block', 'grid', 'none'],
      description: "Le type d'affichage",
    },
    onClick: { action: 'clicked' },
  },
  args: {
    backgroundColor: 'primary/50',
    p: 2,
    borderRadius: 1,
    width: '200px',
    height: '100px',
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Box {...args}>
      <Typography align="center" color="white">
        Box par défaut
      </Typography>
    </Box>
  ),
};

export const BackgroundColors: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <Box {...args} backgroundColor="primary/95" width="120px" height="80px">
        <Typography align="center">primary/95</Typography>
      </Box>
      <Box {...args} backgroundColor="primary/90" width="120px" height="80px">
        <Typography align="center">primary/90</Typography>
      </Box>
      <Box {...args} backgroundColor="primary/80" width="120px" height="80px">
        <Typography align="center">primary/80</Typography>
      </Box>
      <Box {...args} backgroundColor="primary/70" width="120px" height="80px">
        <Typography align="center">primary/70</Typography>
      </Box>
      <Box {...args} backgroundColor="primary/50" width="120px" height="80px">
        <Typography align="center">primary/50</Typography>
      </Box>
      <Box {...args} backgroundColor="primary/40" width="120px" height="80px">
        <Typography align="center" color="white">
          primary/40
        </Typography>
      </Box>
      <Box {...args} backgroundColor="primary/30" width="120px" height="80px">
        <Typography align="center" color="white">
          primary/30
        </Typography>
      </Box>
      <Box {...args} backgroundColor="primary/20" width="120px" height="80px">
        <Typography align="center" color="white">
          primary/20
        </Typography>
      </Box>
      <Box {...args} backgroundColor="primary/10" width="120px" height="80px">
        <Typography align="center" color="white">
          primary/10
        </Typography>
      </Box>
    </Stack>
  ),
};

export const BorderRadius: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <Box
        {...args}
        backgroundColor="primary/50"
        p={2}
        borderRadius={0}
        width="120px"
        height="80px"
      >
        <Typography align="center" color="white">
          radius: 0
        </Typography>
      </Box>
      <Box
        {...args}
        backgroundColor="primary/50"
        p={2}
        borderRadius={1}
        width="120px"
        height="80px"
      >
        <Typography align="center" color="white">
          radius: 1
        </Typography>
      </Box>
      <Box
        {...args}
        backgroundColor="primary/50"
        p={2}
        borderRadius={2}
        width="120px"
        height="80px"
      >
        <Typography align="center" color="white">
          radius: 2
        </Typography>
      </Box>
      <Box
        {...args}
        backgroundColor="primary/50"
        p={2}
        borderRadius={4}
        width="120px"
        height="80px"
      >
        <Typography align="center" color="white">
          radius: 4
        </Typography>
      </Box>
      <Box
        {...args}
        backgroundColor="primary/50"
        p={2}
        borderRadius={8}
        width="120px"
        height="80px"
      >
        <Typography align="center" color="white">
          radius: 8
        </Typography>
      </Box>
    </Stack>
  ),
};

export const Padding: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <Box {...args} backgroundColor="primary/50" width="120px" height="80px">
        <Box backgroundColor="secondary/50" p={0}>
          <Typography align="center" color="white">
            p: 0
          </Typography>
        </Box>
      </Box>
      <Box {...args} backgroundColor="primary/50" width="120px" height="80px">
        <Box backgroundColor="secondary/50" p={1}>
          <Typography align="center" color="white">
            p: 1
          </Typography>
        </Box>
      </Box>
      <Box {...args} backgroundColor="primary/50" width="120px" height="80px">
        <Box backgroundColor="secondary/50" p={2}>
          <Typography align="center" color="white">
            p: 2
          </Typography>
        </Box>
      </Box>
      <Box {...args} backgroundColor="primary/50" width="120px" height="80px">
        <Box backgroundColor="secondary/50" p={3}>
          <Typography align="center" color="white">
            p: 3
          </Typography>
        </Box>
      </Box>
      <Box {...args} backgroundColor="primary/50" width="120px" height="80px">
        <Box backgroundColor="secondary/50" p={4}>
          <Typography align="center" color="white">
            p: 4
          </Typography>
        </Box>
      </Box>
    </Stack>
  ),
};

export const FlexBox: Story = {
  render: (args) => (
    <Box
      {...args}
      backgroundColor="primary/90"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="300px"
      height="150px"
    >
      <Box backgroundColor="secondary/50" p={2} borderRadius={1} m={2}>
        <Typography color="white">Centré avec Flex</Typography>
      </Box>
    </Box>
  ),
};

export const NestedBoxes: Story = {
  render: (args) => (
    <Box {...args} backgroundColor="neutral/90" p={3} width="350px" borderRadius={2}>
      <Typography variant="titleMSemiBold" gutterBottom>
        Boîtes imbriquées
      </Typography>
      <Stack spacing={2}>
        <Box backgroundColor="primary/80" p={2} borderRadius={1}>
          <Typography>Niveau 1</Typography>
          <Box backgroundColor="secondary/70" p={1} mt={1} borderRadius={1}>
            <Typography>Niveau 2</Typography>
            <Box backgroundColor="success/60" p={1} mt={1} borderRadius={1}>
              <Typography>Niveau 3</Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  ),
};
