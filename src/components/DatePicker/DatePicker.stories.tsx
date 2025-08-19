import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import DatePicker from "./DatePicker";
import Box from "../Box";

const meta = {
  title: "🎛️ Form Controls/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "date" },
      description: "The selected date value or date range [startDate, endDate]",
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the date changes",
    },
    isDateRange: {
      control: { type: "boolean" },
      description: "Whether to enable date range selection",
    },
    showTime: {
      control: { type: "boolean" },
      description: "Whether to show time selection (hours and minutes)",
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
    locale: {
      control: { type: "select" },
      options: ["fr", "en", "de"],
      description: "Locale for date formatting and labels",
    },
    timezone: {
      control: { type: "text" },
      description: "Timezone for date handling (e.g. 'Europe/Paris', 'UTC')",
    },
    utc: {
      control: { type: "boolean" },
      description: "Force UTC mode - all dates will be treated as UTC",
    },
    static: {
      control: { type: "boolean" },
      description: "Display the date picker in static mode (always visible)",
    },
  },
  args: {
    disabled: false,
    placeholder: "Select date",
    label: "label",
    value: new Date("2024-12-25"),
    isDateRange: false,
    showTime: false,
    locale: "fr",
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(args.value);
    
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
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(args.value);
    
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
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(args.value);
    
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
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(args.value);
    
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

export const WithTime: Story = {
  args: {
    showTime: true,
    value: new Date("2024-12-25"),
    label: "Date et heure de rendez-vous",
  },
  render: (args) => {
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(args.value);
    
    return (
      <Box width={300} height={500}>
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

export const DateRange: Story = {
  args: {
    isDateRange: true,
    value: [new Date("2024-12-25"), new Date("2024-12-31")],
    label: "Période de vacances",
  },
  render: (args) => {
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(args.value);
    
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

export const DateRangeWithTime: Story = {
  args: {
    isDateRange: true,
    showTime: true,
    value: [new Date("2024-12-25"), new Date("2024-12-27")],
    label: "Période avec heures",
  },
  render: (args) => {
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(args.value);
    
    return (
      <Box width={300} height={500}>
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

export const StaticMode: Story = {
  args: {
    static: true,
    value: new Date("2024-12-25"),
    label: "Sélecteur toujours visible",
  },
  render: (args) => {
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(args.value);
    
    return (
      <Box width={350}>
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

export const StaticWithTime: Story = {
  args: {
    static: true,
    showTime: true,
    value: new Date("2024-12-25"),
    label: "Sélecteur statique avec heures",
  },
  render: (args) => {
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(args.value);
    
    return (
      <Box width={350}>
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