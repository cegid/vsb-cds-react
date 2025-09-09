import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import DatePicker from "./DatePicker";
import Box from "../Box";
import InputAdornment from "../InputAdornment";
import Icon from "../Icon";
import { NotificationDecoratorComponent } from "../../storycomponents/NotificationDecorator";
const endAdornment = (
  <InputAdornment position="end">
    <Icon variant="stroke" size={16} color="neutral/50">
      search-01
    </Icon>
  </InputAdornment>
);

const GranularityValidationDecorator = (Story: any, context: any) => {
  const granularities = context.args.granularities;
  const hasError = Array.isArray(granularities) && granularities.length > 3;

  if (hasError) {
    return (
      <NotificationDecoratorComponent
        severity="critical"
        message="Vous ne pouvez pas sélectionner plus de 3 granularités"
      >
        <></>
      </NotificationDecoratorComponent>
    );
  }

  return <Story />;
};

const meta = {
  title: "🎛️ Inputs and selection/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [GranularityValidationDecorator],
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
    errorText: {
      control: { type: "text" },
      description: "Error message to display below the date picker",
    },
    granularities: {
      control: { type: "check" },
      options: ["day", "week", "month", "year", "hours"],
      description:
        "Available granularities to display in the segmented control (maximum 3)",
    },
  },
  args: {
    disabled: false,
    placeholder: "Select date",
    label: "label",
    value: undefined,
    isDateRange: false,
    locale: "fr",
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(
      args.value
    );

    return (
      <Box width={300} height={450}>
        <DatePicker
          {...args}
          InputProps={{
            endAdornment,
          }}
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

export const DateRangeWithMonthGranularity: Story = {
  args: {
    isDateRange: true,
    granularities: ["day", "month"] as const,
    label: "Sélection par mois",
  },
  render: (args) => {
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(
      args.value
    );

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

export const DateRangeWithYearGranularity: Story = {
  args: {
    isDateRange: true,
    granularities: ["day", "month", "year"] as const,
    label: "Sélection par année",
  },
  render: (args) => {
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(
      args.value
    );

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
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(
      args.value
    );

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
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(
      args.value
    );

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
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(
      args.value
    );

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
    granularities: ["day", "hours"] as const,
    value: new Date("2024-12-25"),
    label: "Date et heure de rendez-vous",
  },
  render: (args) => {
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(
      args.value
    );

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
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(
      args.value
    );

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
    granularities: ["day"] as const,
    value: [new Date("2024-12-25"), new Date("2024-12-27")],
    label: "Période de dates",
  },
  render: (args) => {
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(
      args.value
    );

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
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(
      args.value
    );

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

export const WithError: Story = {
  args: {
    value: undefined,
    label: "Date",
    errorText: "Ce champ est requis",
  },
  render: (args) => {
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(
      args.value
    );

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

export const WeekSelection: Story = {
  args: {
    value: new Date("2024-12-25"),
    label: "Sélection de semaine",
    granularities: ["day", "week", "month"] as const,
    isDateRange: true,
  },
  render: (args) => {
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(
      args.value
    );

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

export const MaxThreeGranularities: Story = {
  args: {
    value: new Date("2024-12-25"),
    label: "Maximum 3 granularités",
    granularities: ["day", "week", "month"] as const,
    isDateRange: true,
  },
  render: (args) => {
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(
      args.value
    );

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

export const WithSelectedIndex: Story = {
  args: {
    value: new Date("2024-12-25"),
    label: "Contrôle de l'index sélectionné",
    granularities: ["day", "week", "month"] as const,
    isDateRange: true,
    segmentedControlProps: {
      selectedIndex: 1, // Pré-sélectionne "Semaine" (index 1)
    },
  },
  render: (args) => {
    const [value, setValue] = useState<Date | [Date?, Date?] | undefined>(
      args.value
    );

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
