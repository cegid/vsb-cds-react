import type { Meta, StoryObj } from '@storybook/react';

import { Check, Close, Face } from '@cegid/icons-react';

import Chip from './Chip';
import Box from '../Box';
import Typography from '../Typography';
import { Stack } from '@cegid/cds-react';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium'],
      description: 'La taille du Chip',
    },
    icon: {
      control: 'select',
      options: ['Check', 'Face', 'None'],
      mapping: {
        Check: <Check />,
        Face: <Face />,
        None: undefined,
      },
      description: "L'icône à afficher",
    },
    label: {
      control: 'text',
      description: 'Le texte à afficher',
    },
    deleteIcon: {
      control: 'select',
      options: ['Check', 'Face', 'None'],
      mapping: {
        Check: <Check />,
        Face: <Face />,
        None: undefined,
      },
      description: "L'icône à afficher",
    },
    disabled: {
      control: 'boolean',
      description: 'Désactiver le chip',
    },
    onDelete: {
      control: 'boolean',
      description: 'Rend une action au clic sur delete',
    },
    onClick: {
      control: 'boolean',
      description: 'Rendre le chip cliquable',
    },
  },
  args: {
    size: 'medium',
    icon: <Check />,
    deleteIcon: <Close />,
    label: 'Chip',
    disabled: false,
    onDelete: () => { },
    onClick: () => { },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Chip',
  },
};

export const SizeComparison: Story = {
  render: (args) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="titleMSemiBold" gutterBottom>
          Taille Medium
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip key={`medium`} {...args} size="medium" icon={<Check />} label="medium" />
        </Box>
      </Box>
      <Box>
        <Typography variant="titleMSemiBold" gutterBottom>
          Taille Small
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip key={`small`} {...args} size="small" icon={<Check />} label="small" />
        </Box>
      </Box>
    </Box>
  ),
};

export const IconsAndNoIcons: Story = {
  render: (args) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="titleMSemiBold" gutterBottom>
        Chips avec et sans icônes
      </Typography>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip {...args} icon={<Check />} label="Avec Icône" />
          <Chip {...args} icon={undefined} label="Sans Icône" />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip {...args} icon={<Check />} label="Avec Icône" />
          <Chip {...args} icon={undefined} label="Sans Icône" />
        </Box>
      </Stack>
    </Box>
  ),
};

export const WithDeleteIcon: Story = {
  render: (args) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="titleMSemiBold" gutterBottom>
        Chips avec icône de suppression
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Chip label="Supprimable" onDelete={() => { }} deleteIcon={<Close />} />
      </Box>
    </Box>
  ),
};

export const Clickable: Story = {
  render: (args) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="titleMSemiBold" gutterBottom>
        Chips cliquables
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Chip label="Cliquable" onClick={() => alert('Chip cliqué!')} clickable />
        <Chip label="Cliquable" onClick={() => alert('Chip cliqué!')} clickable />
        <Chip
          icon={<Check />}
          label="Cliquable avec Icône"
          onClick={() => alert('Chip cliqué!')}
          clickable
        />
      </Box>
    </Box>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="titleMSemiBold" gutterBottom>
        Chips désactivés
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Chip label="Désactivé" disabled />
        <Chip icon={<Check />} label="Désactivé avec Icône" disabled />
        <Chip label="Désactivé Supprimable" onDelete={() => { }} disabled />
      </Box>
    </Box>
  ),
};
