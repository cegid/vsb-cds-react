import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import Tabs from "./Tabs";
import Tab from "../Tab";

const meta = {
  title: "🧭 Navigation & Layout/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "number" },
      description: "The currently selected tab index",
    },
    fullwidth: {
      control: { type: "boolean" },
      description: "Whether the tabs should take full width",
    },
    bottomLine: {
      control: { type: "boolean" },
      description: "Whether to show the bottom line under tabs",
    },
  },
  args: {
    value: 0,
    fullwidth: false,
    bottomLine: true,
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState(args.value || 0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
      <Tabs {...args} aria-label="Customer tabs" value={value} onChange={handleChange}>
        <Tab
          aria-controls="simple-tabpanel-0"
          id="individual-tab"
          label="Particulier"
        />
        <Tab
          aria-controls="simple-tabpanel-1"
          id="company-tab"
          label="Professionnel"
        />
      </Tabs>
    );
  },
};

export const WithoutBottomLine: Story = {
  args: {
    bottomLine: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || 0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
      <Tabs
        {...args}
        aria-label="Tabs without bottom line"
        value={value}
        onChange={handleChange}
      >
        <Tab label="Particulier" />
        <Tab label="Professionnel" disabled />
        <Tab label="Entreprise" />
      </Tabs>
    );
  },
};

export const Preselected: Story = {
  args: {
    value: 1,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || 1);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
      <Tabs {...args} aria-label="Customer tabs" value={value} onChange={handleChange}>
        <Tab label="Particulier" />
        <Tab label="Professionnel" />
      </Tabs>
    );
  },
};

export const Fullwidth: Story = {
  args: {
    fullwidth: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || 0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
      <Tabs {...args} aria-label="Full width tabs" value={value} onChange={handleChange}>
        <Tab label="Particulier" />
        <Tab label="Professionnel" />
        <Tab label="Entreprise" />
      </Tabs>
    );
  },
};
