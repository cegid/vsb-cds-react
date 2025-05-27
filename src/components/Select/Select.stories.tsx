import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem, Grid } from '@cegid/cds-react';
import Select from './Select';

const meta = {
    title: 'Components/Inputs/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        placeholder: { control: 'text' },
        required: { control: 'boolean' },
        disabled: { control: 'boolean' },
        error: { control: 'boolean' },
        errorText: { control: 'text' },
        multiple: { control: 'boolean' },
    },
    args: {
        label: 'Label',
        placeholder: 'Placeholder',
    }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const selectOptions = [
    <MenuItem key="option1" value="option1">Option 1</MenuItem>,
    <MenuItem key="option2" value="option2">Option 2</MenuItem>,
    <MenuItem key="option3" value="option3">Option 3</MenuItem>,
    <MenuItem key="option4" value="option4">Option 4</MenuItem>,
    <MenuItem key="option5" value="option5">Option 5</MenuItem>
];

export const Standard: Story = {
    args: {},
    render: (args) => (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Select {...args}>
                    {selectOptions}
                </Select>
            </Grid>
            <Grid item xs={12} md={6}>
                <Select
                    {...args}
                    defaultValue="option2"
                >
                    {selectOptions}
                </Select>
            </Grid>
        </Grid>
    ),
};

export const Required: Story = {
    args: {
        required: true
    },
    render: (args) => (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Select {...args}>
                    {selectOptions}
                </Select>
            </Grid>
            <Grid item xs={12} md={6}>
                <Select
                    {...args}
                    defaultValue="option1"
                >
                    {selectOptions}
                </Select>
            </Grid>
        </Grid>
    ),
};

export const WithErrors: Story = {
    args: {
        error: true
    },
    render: (args) => (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Select
                    {...args}
                    errorText="I am an error message"
                >
                    {selectOptions}
                </Select>
            </Grid>
            <Grid item xs={12} md={6}>
                <Select
                    {...args}
                    required
                    errorText="This field is required"
                >
                    {selectOptions}
                </Select>
            </Grid>
        </Grid>
    ),
};

export const Disabled: Story = {
    args: {
        disabled: true
    },
    render: (args) => (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Select {...args}>
                    {selectOptions}
                </Select>
            </Grid>
            <Grid item xs={12} md={6}>
                <Select
                    {...args}
                    defaultValue="option2"
                >
                    {selectOptions}
                </Select>
            </Grid>
        </Grid>
    ),
};

export const MultipleSelect: Story = {
    args: {
        multiple: true
    },
    render: (args) => (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Select
                    {...args}
                    defaultValue={['option1', 'option3']}
                >
                    {selectOptions}
                </Select>
            </Grid>
        </Grid>
    ),
};

export const GroupedOptions: Story = {
    args: {},
    render: (args) => (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Select {...args}>
                    <li className="MuiListSubheader-root" style={{ fontWeight: 600 }}>Category 1</li>
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <li className="MuiListSubheader-root" style={{ fontWeight: 600 }}>Category 2</li>
                    <MenuItem value="option3">Option 3</MenuItem>
                    <MenuItem value="option4">Option 4</MenuItem>
                    <MenuItem value="option5">Option 5</MenuItem>
                </Select>
            </Grid>
        </Grid>
    ),
};