import type { Meta, StoryObj } from "@storybook/react";

import Snackbar from "./Snackbar";
import Typography from "../Typography";

const meta = {
  title: "Components/Display/Snackbar",
  component: Snackbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    severity: {
      control: { type: "select" },
      options: ["error", "success", "warning", "info"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "large"],
    },
    message: {
      control: { type: "text" },
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
      <Typography variant="bodySMedium" color="neutral/50" width="100%">
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
      <Typography variant="bodySMedium" color="neutral/50">
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
      <Typography variant="bodySMedium" color="neutral/50">
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
      <Typography variant="bodySMedium" color="neutral/50">
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
      <Typography variant="bodySMedium" color="neutral/50">
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
    severity: "success",
    message: {
      title: "Téléchargement terminé",
      message: "Le fichier document.pdf a été téléchargé avec succès",
    },
    action: { label: "Ouvrir", onClick: () => console.log("Open clicked") },
    onClose: () => console.log("Close clicked"),
  },
};

export const WithoutAction: Story = {
  args: {
    severity: "info",
    message: (
      <Typography variant="bodySMedium" color="neutral/50">
        Message d'information simple
      </Typography>
    ),
    onClose: () => console.log("Close clicked"),
  },
};

export const WithoutCloseButton: Story = {
  args: {
    severity: "success",
    message: (
      <Typography variant="bodySMedium" color="neutral/50">
        Message sans bouton de fermeture
      </Typography>
    ),
    action: { label: "Action", onClick: () => console.log("Action clicked") },
  },
};

export const LongMessage: Story = {
  args: {
    severity: "warning",
    message: (
      <Typography variant="bodySMedium" color="neutral/50">
        Ceci est un message très long qui permet de tester comment le composant
        Snackbar se comporte avec du contenu textuel étendu
      </Typography>
    ),
    action: {
      label: "Comprendre",
      onClick: () => console.log("Understand clicked"),
    },
    onClose: () => console.log("Close clicked"),
  },
};