import type { Meta, StoryObj } from '@storybook/react';
import Switch from "./Switch";


const meta = {
    title: 'Components/Inputs/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
        disabled: false,
        isActive: true,
        onClick: () => {},
    },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
    render: (args) => (
        <Switch {...args}>

        </Switch>
    ),
};