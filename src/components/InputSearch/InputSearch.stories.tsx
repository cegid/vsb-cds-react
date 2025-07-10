import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import InputSearch from "./InputSearch";
import Box from "../Box";

const meta = {
  title: "Components/Inputs/InputSearch",
  component: InputSearch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Texte d'aide affiché dans le champ",
    },
    value: {
      control: "text",
      description: "Valeur du champ de recherche",
    },
    disabled: {
      control: "boolean",
      description: "Désactive le champ de recherche",
    },
  },
  args: {},
} satisfies Meta<typeof InputSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Cherchez par nom, tél, type…",
  },
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <Box minWidth="350px">
        <InputSearch
          {...args}
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFilterClick={() => {}}
        />
      </Box>
    );
  },
};
