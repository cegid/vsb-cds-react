import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import InputSearch from "./InputSearch";

const meta = {
  title: "🎛️ Form Controls/InputSearch",
  component: InputSearch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Helper text displayed in the field",
    },
    value: {
      control: "text",
      description: "Value of the search field",
    },
    disabled: {
      control: "boolean",
      description: "Disables the search field",
    },
    defaultSize: {
      control: "select",
      options: ["short", "long"],
      description: "default size of the search field on load",
    },
  },
  args: {},
} satisfies Meta<typeof InputSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Search by name, phone, type…",
    defaultSize: "long",
  },
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <InputSearch
        {...args}
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFilterClick={() => {}}
      />
    );
  },
};
