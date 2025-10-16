import type { Meta, StoryObj } from "@storybook/react-vite";

import TextField from "./TextField";
import Column from "../Column";
import Icon from "../Icon";
import InputAdornment from "../InputAdornment";

const meta = {
  title: "🎛️ Inputs and selection/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "The label of the TextField" },
    placeholder: { control: "text", description: "The placeholder text" },
    defaultValue: {
      control: "text",
      description: "The default value of the TextField",
    },
    required: {
      control: "boolean",
      description: "If true, the label is displayed as required",
    },
    error: {
      control: "boolean",
      description: "If true, the TextField will indicate an error state",
    },
    helperText: {
      control: "text",
      description: "Helper text to display below the TextField",
    },
    disabled: {
      control: "boolean",
      description: "If true, the TextField is disabled",
    },
    type: {
      control: "select",
      options: ["text", "password", "number", "email", "search"],
      description: "The type of the TextField element",
    },
    onChange: { action: "changed" },
  },
  args: {
    fullWidth: true,
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

const startAdornment = (
  <InputAdornment position="start">
    <Icon variant="stroke" size={16} color="neutral/50">
      search-01
    </Icon>
  </InputAdornment>
);

const endAdornment = (
  <InputAdornment position="end">
    <Icon variant="stroke" size={16} color="neutral/50">
      search-01
    </Icon>
  </InputAdornment>
);

export const Standard: Story = {
  render: (args) => (
    <Column gap={3}>
      <TextField
        {...args}
        label="Standard TextField"
        placeholder="Placeholder text"
      />
      <TextField
        {...args}
        label="With Default Value"
        defaultValue="Default text"
      />
    </Column>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <Column gap={3}>
      <TextField
        {...args}
        placeholder="Search something..."
        InputProps={{
          startAdornment,
        }}
      />
      <TextField
        {...args}
        label="With End Icon"
        placeholder="Enter amount"
        InputProps={{
          endAdornment,
        }}
      />
      <TextField
        {...args}
        label="With Both Icons"
        placeholder="Amount with icons"
        InputProps={{
          startAdornment,
          endAdornment,
        }}
      />
    </Column>
  ),
};

export const Required: Story = {
  render: (args) => (
    <Column gap={3}>
      <TextField
        {...args}
        label="Required TextField"
        placeholder="This field is required"
        required
      />
      <TextField
        {...args}
        label="Required With Value"
        defaultValue="Required value"
        required
      />
    </Column>
  ),
};

export const WithErrors: Story = {
  render: (args) => (
    <Column gap={3}>
      <TextField
        {...args}
        label="Error State"
        placeholder="Error TextField"
        errorText="This is an error message"
      />
      <TextField
        {...args}
        label="Required With Error"
        placeholder="Missing value"
        required
        errorText="This field is required"
      />
    </Column>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Column gap={3}>
      <TextField
        {...args}
        label="Disabled TextField"
        placeholder="Cannot be modified"
        disabled
      />
      <TextField
        {...args}
        label="Disabled With Value"
        defaultValue="Disabled with content"
        disabled
      />
    </Column>
  ),
};

export const ReadOnly: Story = {
  render: (args) => (
    <Column gap={3}>
      <TextField
        {...args}
        label="Read Only TextField"
        defaultValue="Read only value"
        readOnly
      />
      <TextField
        {...args}
        label="Read Only Required"
        defaultValue="Required read-only value"
        required
        readOnly
      />
    </Column>
  ),
};
