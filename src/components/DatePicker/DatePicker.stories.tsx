import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import DatePicker from "./DatePicker";
import Box from "../Box";

const meta = {
  title: "Components/Inputs/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "date" },
      description: "The selected date value",
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the date changes",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the date picker is disabled",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text when no date is selected",
    },
    minDate: {
      control: { type: "date" },
      description: "The minimum selectable date",
    },
    maxDate: {
      control: { type: "date" },
      description: "The maximum selectable date",
    },
    label: {
      control: { type: "text" },
      description: "Label for the date picker",
    },
  },
  args: {
    disabled: false,
    placeholder: "Select date",
    label: "label",
    value: new Date("2024-12-25"),
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(args.value);
    
    return (
      <Box width={300} height={450}>
        <DatePicker 
          {...args}
          value={value}
          onChange={(date) => {
            setValue(date || undefined);
            args.onChange?.(date);
          }}
        />
      </Box>
    );
  },
};

export const WithValue: Story = {
  args: {
    value: new Date("2024-12-25"),
    label: "Date de naissance",
  },
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(args.value);
    
    return (
      <Box width={300}>
        <DatePicker 
          {...args} 
          value={value}
          onChange={(date) => {
            setValue(date || undefined);
            args.onChange?.(date);
          }}
        />
      </Box>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: new Date("2024-12-25"),
    label: "Date de naissance",
  },
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(args.value);
    
    return (
      <Box width={300}>
        <DatePicker 
          {...args} 
          value={value}
          onChange={(date) => {
            setValue(date || undefined);
            args.onChange?.(date);
          }}
        />
      </Box>
    );
  },
};

export const WithMinMaxDates: Story = {
  args: {
    minDate: new Date("2024-01-01"),
    maxDate: new Date("2024-12-31"),
    value: new Date("2024-06-15"),
    label: "Date de naissance",
  },
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(args.value);
    
    return (
      <Box width={300}>
        <DatePicker 
          {...args} 
          value={value}
          onChange={(date) => {
            setValue(date || undefined);
            args.onChange?.(date);
          }}
        />
      </Box>
    );
  },
};
