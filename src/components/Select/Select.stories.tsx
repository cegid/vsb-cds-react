import type { Meta, StoryObj } from "@storybook/react-vite";
import { MenuItem } from "@cegid/cds-react";
import Select from "./Select";

const meta = {
  title: "🎛️ Form Controls/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    errorText: { control: "text" },
    multiple: { control: "boolean" },
  },
  args: {
    label: "Label",
    placeholder: "Placeholder",
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const selectOptions = [
  <MenuItem key="option1" value="option1">
    Option 1
  </MenuItem>,
  <MenuItem key="option2" value="option2">
    Option 2
  </MenuItem>,
  <MenuItem key="option3" value="option3">
    Option 3
  </MenuItem>,
  <MenuItem key="option4" value="option4">
    Option 4
  </MenuItem>,
  <MenuItem key="option5" value="option5">
    Option 5
  </MenuItem>,
];

export const Standard: Story = {
  args: {},
  render: (args) => <Select {...args}>{selectOptions}</Select>,
};

export const WithErrors: Story = {
  args: {
    error: true,
  },
  render: (args) => (
    <Select {...args} required errorText="This field is required">
      {selectOptions}
    </Select>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => <Select {...args}>{selectOptions}</Select>,
};

export const MultipleSelect: Story = {
  args: {
    multiple: true,
  },
  render: (args) => (
    <Select {...args} defaultValue={["option1", "option3"]}>
      {selectOptions}
    </Select>
  ),
};

export const Required: Story = {
  args: {
    required: true,
  },
  render: (args) => <Select {...args}>{selectOptions}</Select>,
};
