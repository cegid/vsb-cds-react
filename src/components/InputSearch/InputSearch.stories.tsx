import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import InputSearch from "./InputSearch";

const meta = {
  title: "🎛️ Inputs and selection/InputSearch",
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
      description: "Default size of the search field on load",
    },
    fullwidth: {
      control: "boolean",
      description:
        "Whether the input should take the full width of its container",
    },
    onFilterClick: {
      action: "filter clicked",
      description:
        "Callback function triggered when the filter button is clicked",
    },
  },
  args: {
    placeholder: "Cherchez par nom, tél, type...",
    defaultSize: "long",
    fullwidth: false,
    onFilterClick: () => {},
  },
} satisfies Meta<typeof InputSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <InputSearch
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFilterClick={args.onFilterClick}
      />
    );
  },
};
