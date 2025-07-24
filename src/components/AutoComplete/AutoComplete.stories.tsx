import type { Meta, StoryObj } from "@storybook/react-vite";

import { Grid } from "@cegid/cds-react";
import AutoComplete from "./Autocomplete";
import Icon from "../Icon";

const meta = {
  title: "Components/Inputs/AutoComplete",
  component: AutoComplete,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The label of the AutoComplete",
    },
    placeholder: {
      control: "text",
      description: "The placeholder text",
    },
    options: {
      control: "object",
      description: "The array of options to display in the dropdown",
    },
    defaultValue: {
      control: "text",
      description: "The default selected value",
    },
    required: {
      control: "boolean",
      description: "If true, the label is displayed as required",
    },
    disabled: {
      control: "boolean",
      description: "If true, the AutoComplete is disabled",
    },
    errorText: {
      control: "text",
      description: "Error text to display below the input",
    },
    multiple: {
      control: "boolean",
      description: "If true, the AutoComplete is a multi-select",
    },
    disableClearable: {
      control: "boolean",
      description: "If true, the clear button is not displayed",
    },
    loading: {
      control: "boolean",
      description: "If true, the AutoComplete shows a loading indicator",
    },
    onChange: { action: "changed" },
    onInputChange: { action: "input changed" },
    onOpen: { action: "opened" },
    onClose: { action: "closed" },
  },
  args: {
    label: "Label",
    placeholder: "Placeholder",
    options: ["option 1", "option 2", "option 3", "option 4", "option 5"],
  },
} satisfies Meta<typeof AutoComplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const AutoCompleteOptions = [
  "option 1",
  "option 2",
  "option 3",
  "option 4",
  "option 5",
];

export const Standard: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    options: AutoCompleteOptions,
  },
  render: (args: any) => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <AutoComplete {...args} />
      </Grid>
      <Grid item xs={12} md={6}>
        <AutoComplete {...args} defaultValue="option 2" />
      </Grid>
    </Grid>
  ),
};

export const Required: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    options: AutoCompleteOptions,
    required: true,
  },
  render: (args: any) => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <AutoComplete {...args} />
      </Grid>
      <Grid item xs={12} md={6}>
        <AutoComplete {...args} defaultValue="option 1" />
      </Grid>
    </Grid>
  ),
};

export const WithIcon: Story = {
  args: {
    label: "With icon",
    placeholder: "Placeholder",
    options: AutoCompleteOptions,
    required: true,
  },
  render: (args: any) => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <AutoComplete
          endAdornment={<Icon size={16}>search-01</Icon>}
          {...args}
        />
      </Grid>
    </Grid>
  ),
};

export const WithErrors: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    options: AutoCompleteOptions,
  },
  render: (args: any) => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <AutoComplete {...args} errorText="I am an error message" />
      </Grid>
      <Grid item xs={12} md={6}>
        <AutoComplete {...args} required errorText="This field is required" />
      </Grid>
    </Grid>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    options: AutoCompleteOptions,
    disabled: true,
  },
  render: (args: any) => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <AutoComplete {...args} />
      </Grid>
      <Grid item xs={12} md={6}>
        <AutoComplete {...args} defaultValue="option 2" />
      </Grid>
    </Grid>
  ),
};

export const MultipleAutoComplete: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    options: AutoCompleteOptions,
    multiple: true,
  },
  render: (args: any) => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <AutoComplete {...args} defaultValue={["option 1", "option 3"]} />
      </Grid>
    </Grid>
  ),
};

export const Loading: Story = {
  args: {
    label: "Label",
    placeholder: "Loading options...",
    options: [],
    loading: true,
  },
  render: (args: any) => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <AutoComplete {...args} />
      </Grid>
    </Grid>
  ),
};
