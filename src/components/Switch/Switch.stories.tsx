import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Switch from "./Switch";

const meta = {
    title: 'Components/Inputs/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A customizable toggle switch component with active/inactive states, hover effects, and disabled state support.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        disabled: {
            control: 'boolean',
            description: 'Determines if the switch is disabled',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        isActive: {
            control: 'boolean',
            description: 'Initial active state of the switch',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        onClick: {
            action: 'clicked',
            description: 'Callback function called when the switch is clicked',
            table: {
                type: { summary: '() => void' },
            },
        },
    },
    args: {
        disabled: false,
        isActive: true,
        onClick: fn(),
    },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};