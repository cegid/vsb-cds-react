import type { Meta, StoryObj } from "@storybook/react";

import Column from "./Column";
import Box from "../Box";
import Typography from "../Typography";

const meta = {
  title: "Components/Structure/Column",
  component: Column,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The content to be displayed in the column",
    },
  },
  args: {
    children: "Column content",
  },
} satisfies Meta<typeof Column>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Column {...args}>
      <Box padding={2} backgroundColor="primary/50" marginBottom={1}>
        Item 1
      </Box>
      <Box padding={2} backgroundColor="secondary/50" marginBottom={1}>
        Item 2
      </Box>
      <Box padding={2} backgroundColor="neutral/50">
        Item 3
      </Box>
    </Column>
  ),
};

export const WithText: Story = {
  render: (args) => (
    <Column {...args}>
      <Typography variant="titleLSemiBold" component="h3">
        Titre
      </Typography>
      <Typography variant="bodyMRegular" component="p">
        Premier paragraphe de texte dans la colonne.
      </Typography>
      <Typography variant="bodyMRegular" component="p">
        Deuxième paragraphe de texte dans la colonne.
      </Typography>
      <Typography variant="bodyMRegular" component="p">
        Troisième paragraphe de texte dans la colonne.
      </Typography>
    </Column>
  ),
};
