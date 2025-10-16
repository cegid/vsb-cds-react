import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Switch from "./Switch";

const meta = {
    title: '🎛️ Inputs and selection/Switch',
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
            description: 'Initial active state of the switch (used only when controlled is false)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        value: {
            control: 'boolean',
            description: 'Controlled state value - when provided, the component becomes controlled',
            table: {
                type: { summary: 'boolean | undefined' },
            },
        },
        onClick: {
            action: 'clicked',
            description: 'Callback function called when the switch is clicked',
            table: {
                type: { summary: '(newValue?: boolean) => void' },
            },
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'yellow', 'banana', 'critical', 'pink', 'purple', 'plum', 'beige', 'info'],
            description: 'Color theme for the switch when active',
            table: {
                type: { summary: 'PaletteNames' },
                defaultValue: { summary: 'primary' },
            },
        },
    },
    args: {
        disabled: false,
        isActive: true,
        value: undefined,
        onClick: fn(),
        color: 'primary',
    },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};