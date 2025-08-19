import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";

import Box from "../Box";
import Button from "../Button";
import Typography from "../Typography";
import Dialog from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "💬 Feedback/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const DialogTemplate = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <>
      <Button onClick={openDialog}>Open Dialog</Button>
      <Dialog
        {...args}
        isOpen={isOpen}
        actions={args.actions?.map((action: any) =>
          React.cloneElement(action, {
            onClick: () => {
              action.props.onClick?.();
              closeDialog();
            },
          })
        )}
      />
    </>
  );
};

export const AlertVariant: Story = {
  render: DialogTemplate,
  args: {
    title: "Confirmer la suppression",
    variant: "alert",
    content: (
      <Typography variant="bodyMRegular">
        Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est
        irréversible.
      </Typography>
    ),
    actions: [
      <Button key="cancel" variant="contained" color="secondary">
        Annuler
      </Button>,
      <Button key="confirm" variant="contained">
        Confirmer
      </Button>,
    ],
  },
};

export const InfoVariant: Story = {
  render: DialogTemplate,
  args: {
    title: "Nouvelle fonctionnalité",
    variant: "info",
    content: (
      <Typography variant="bodyMRegular">
        Découvrez notre nouvelle fonctionnalité qui vous permettra de gagner du
        temps dans vos tâches quotidiennes.
      </Typography>
    ),
    actions: [
      <Button key="later" variant="contained" color="secondary">
        Plus tard
      </Button>,
      <Button key="discover" variant="contained">
        Découvrir
      </Button>,
    ],
  },
};

export const SingleAction: Story = {
  render: DialogTemplate,
  args: {
    title: "Information importante",
    variant: "alert",
    content: (
      <Typography variant="bodyMRegular">
        Votre session va expirer dans 5 minutes. Sauvegardez vos modifications.
      </Typography>
    ),
    actions: [
      <Button key="ok" variant="contained">
        Compris
      </Button>,
    ],
  },
};

export const WithoutActions: Story = {
  render: DialogTemplate,
  args: {
    title: "Chargement en cours",
    variant: "info",
    content: (
      <Typography variant="bodyMRegular">
        Veuillez patienter pendant que nous traitons votre demande...
      </Typography>
    ),
  },
};

export const WithImage: Story = {
  render: DialogTemplate,
  args: {
    title: "Félicitations !",
    variant: "info",
    image: (
      <img src="https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w3840-h2160-rw" alt="" width={250}/>
    ),
    content: (
      <Typography variant="bodyMRegular">
        Vous avez terminé avec succès votre configuration.
        Vous avez terminé avec succès votre configuration.
        Vous avez terminé avec succès votre configuration.
        Vous avez terminé avec succès votre configuration.
      </Typography>
    ),
    actions: [
      <Button key="continue" variant="contained" fullWidth>
        Continuer
      </Button>,
    ],
  },
};

export const CustomContent: Story = {
  render: DialogTemplate,
  args: {
    title: "Personnalisation",
    variant: "info",
    children: (
      <Box p={24} textAlign="center">
        <Typography variant="bodySSemiBold" style={{ marginBottom: "16px" }}>
          Contenu personnalisé
        </Typography>
        <Typography variant="bodyMRegular" style={{ marginBottom: "24px" }}>
          Ceci est un exemple de dialog avec du contenu entièrement
          personnalisé.
        </Typography>
        <Button variant="contained">Action personnalisée</Button>
      </Box>
    ),
  },
};
