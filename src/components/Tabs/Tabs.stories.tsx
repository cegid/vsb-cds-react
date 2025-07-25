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
  argTypes: {},
  args: {},
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
      <Tabs aria-label="Customer tabs" value={value} onChange={handleChange}>
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

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
      <Tabs aria-label="Customer tabs" value={value} onChange={handleChange}>
        <Tab label="Particulier" />
        <Tab label="Professionnel" />
        <Tab label="Entreprise" />
        <Tab label="Association" />
      </Tabs>
    );
  },
};

export const Preselected: Story = {
  render: () => {
    const [value, setValue] = useState(1);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
      <Tabs aria-label="Customer tabs" value={value} onChange={handleChange}>
        <Tab label="Particulier" />
        <Tab label="Professionnel" />
      </Tabs>
    );
  },
};
