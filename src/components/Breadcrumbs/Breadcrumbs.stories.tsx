import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Breadcrumbs, { BreadcrumbsItem } from "./Breadcrumbs";

const BREAD_CRUMS_TREE: BreadcrumbsItem[] = [
  {
    id: "ventes",
    label: "Ventes",
    icon: 'cashier-02',
    children: [
      { id: "devis", label: "Devis", path: "/devis", onClick: () => console.log("Navigating to /devis"), icon: "estimate-02" },
      { id: "factures", label: "Factures", path: "/factures", onClick: () => console.log("Navigating to /factures"), icon: "estimate-02" },
      { id: "produits", label: "Produits et Services", path: "/services", onClick: () => console.log("Navigating to /services"), icon: "estimate-02" },
      {
        id: "reglements",
        label: "Règlements",
        children: [
          { id: "saisir", label: "Saisir des règlements", path: "/payment/new", onClick: () => console.log("Navigating to /payment/new"), icon: "estimate-02" },
          { id: "retard", label: "Retard", path: "/payment/late", onClick: () => console.log("Navigating to /payment/late"), icon: "estimate-02" },
          { id: "avenir", label: "À venir", path: "/payment/incoming", onClick: () => console.log("Navigating to /payment/incoming"), icon: "estimate-02" },
          { id: "recu", label: "Reçu", path: "/payment/received", onClick: () => console.log("Navigating to /payment/received"), icon: "estimate-02" },
        ],
        icon: "estimate-02"
      },
    ],
    path: "/devis",
  },
];


const meta = {
  title: "Components/Navigation/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
  },
  args: {
    breadcrumbsTree: BREAD_CRUMS_TREE,
    currentPath: '/services',
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    breadcrumbsTree: BREAD_CRUMS_TREE,
    currentPath: '/payment/received',
  },
  render: (args) => (
    <Breadcrumbs { ...args } />
  ),
};