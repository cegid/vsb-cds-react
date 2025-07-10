import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Box,
} from "@mui/material";

import Radio from "./Radio";

const meta = {
  title: "Components/Buttons/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Si le radio est sélectionné",
    },
    disabled: {
      control: "boolean",
      description: "Si le radio est désactivé",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Taille du radio",
    },
    color: {
      control: "select",
      options: ["default", "primary", "secondary"],
      description: "Couleur du radio",
    },
    value: {
      control: "text",
      description: "Valeur du radio",
    },
    name: {
      control: "text",
      description: "Nom du radio",
    },
  },
  args: {
    checked: false,
    disabled: false,
    size: "medium",
    color: "default",
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const AllStates: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <Radio />
        <span>Non sélectionné</span>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Radio checked />
        <span>Sélectionné</span>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Radio disabled />
        <span>Désactivé</span>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Radio disabled checked />
        <span>Désactivé et sélectionné</span>
      </Box>
    </Box>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("option1");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };

    return (
      <FormControl component="fieldset">
        <RadioGroup value={value} onChange={handleChange}>
          <FormControlLabel
            value="option1"
            control={<Radio />}
            label="Option 1"
          />
          <FormControlLabel
            value="option2"
            control={<Radio />}
            label="Option 2"
          />
          <FormControlLabel
            value="option3"
            control={<Radio />}
            label="Option 3"
          />
          <FormControlLabel
            value="option4"
            control={<Radio />}
            label="Option 4 (désactivée)"
            disabled
          />
        </RadioGroup>
      </FormControl>
    );
  },
};