import type { Meta, StoryObj } from "@storybook/react";
import SystemBanner from "./SystemBanner";
import Typography from "../Typography";

const meta: Meta<typeof SystemBanner> = {
  title: "💬 Messaging/SystemBanner",
  component: SystemBanner,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SystemBanner>;

export const Default: Story = {
  args: {
    color: "critical",
    children: (
      <Typography color="critical/50" variant="bodySRegular">
        Suite à un échec de paiement, votre compte est restreint.
        <Typography
          pl={1}
          color="critical/50"
          variant="bodySSemiBold"
          sx={{ textDecoration: "underline" }}
        >
          Mettre à jour l'abonnement
        </Typography>
      </Typography>
    ),
  },
};

export const Warning: Story = {
  args: {
    color: "warning",
    children: (
      <Typography color="primary/10" variant="bodySRegular">
        Suite à un échec de paiement, votre compte est restreint.
        <Typography
          pl={1}
          color="primary/10"
          variant="bodySSemiBold"
          sx={{ textDecoration: "underline" }}
        >
          Mettre à jour l'abonnement
        </Typography>
      </Typography>
    ),
  },
};
