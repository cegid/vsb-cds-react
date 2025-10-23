import type { Meta, StoryObj } from "@storybook/react";

import Snackbar from "./Snackbar";
import Typography from "../Typography";

const meta = {
  title: "💬 Messaging/Snackbar",
  component: Snackbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    severity: {
      control: { type: "select" },
      options: ["error", "success", "warning", "info"],
      description: "Visual severity level affecting icon and colors",
    },
    size: {
      control: { type: "select" },
      options: ["small", "large"],
      description: "Size variant of the snackbar",
    },
    message: {
      control: { type: "text" },
      description: "Message content - can be a string, React node, or object with message property",
    },
    action: {
      control: { type: "object" },
      description: "Optional action button configuration with label and onClick",
    },
    onClose: {
      control: false,
      description: "Optional close button handler",
    },
  },
  args: {
    severity: "success",
    size: "small",
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: (
      <Typography variant="bodySMedium" color="white">
        Message
      </Typography>
    ),
    action: { label: "Annuler", onClick: () => console.log("Action clicked") },
    onClose: () => console.log("Close clicked"),
  },
};

export const SuccessSnackbar: Story = {
  args: {
    severity: "success",
    message: (
      <Typography variant="bodySMedium" color="white">
        Votre fichier a été sauvegardé avec succès
      </Typography>
    ),
    onClose: () => console.log("Close clicked"),
  },
};

export const ErrorSnackbar: Story = {
  args: {
    severity: "error",
    message: (
      <Typography variant="bodySMedium" color="white">
        Une erreur s'est produite lors de la sauvegarde
      </Typography>
    ),
    action: { label: "Réessayer", onClick: () => console.log("Retry clicked") },
    onClose: () => console.log("Close clicked"),
  },
};

export const WarningSnackbar: Story = {
  args: {
    severity: "warning",
    message: (
      <Typography variant="bodySMedium" color="white">
        Attention, cette action est irréversible
      </Typography>
    ),
    action: {
      label: "Continuer",
      onClick: () => console.log("Continue clicked"),
    },
    onClose: () => console.log("Close clicked"),
  },
};

export const InfoSnackbar: Story = {
  args: {
    severity: "info",
    message: (
      <Typography variant="bodySMedium" color="white">
        Nouvelle fonctionnalité disponible
      </Typography>
    ),
    action: {
      label: "Découvrir",
      onClick: () => console.log("Discover clicked"),
    },
    onClose: () => console.log("Close clicked"),
  },
};

export const WithObjectMessage: Story = {
  args: {
    severity: "warning",
    message: {
      message: (
        <Typography variant="bodySMedium" color="white">
          Attention, cette action nécessite une confirmation
        </Typography>
      ),
    },
    action: {
      label: "Confirmer",
      onClick: () => console.log("Confirm clicked"),
    },
    onClose: () => console.log("Close clicked"),
  },
};

export const LongTextWithEllipsis: Story = {
  args: {
    severity: "success",
    message: (
      <Typography variant="bodySMedium" color="white">
        Ceci est un message très long qui devrait être tronqué avec des points de suspension lorsqu'il dépasse la largeur maximale du snackbar
      </Typography>
    ),
    action: { label: "Action", onClick: () => console.log("Action clicked") },
    onClose: () => console.log("Close clicked"),
  },
};

export const WithoutActions: Story = {
  args: {
    severity: "info",
    message: (
      <Typography variant="bodySMedium" color="white">
        Message sans action ni bouton de fermeture
      </Typography>
    ),
  },
};
