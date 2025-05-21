import type { Meta, StoryObj } from '@storybook/react';

import { Add } from '@cegid/icons-react';

import ToggleButton from './ToggleButton';

const meta = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled',
    },
    selected: {
      control: 'boolean',
      description: 'If true, the component is selected',
    },
    variant: {
      control: 'select',
      options: ['borderless', 'filled'],
      description: 'The variant to use',
    },
    onClick: { action: 'clicked' },
  },
  args: { disabled: false },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 'value' },
  render: (args) => (
    <ToggleButton {...args}>
      <Add fontSize="small" />
    </ToggleButton>
  ),
};
