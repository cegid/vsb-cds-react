import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import NavigationBar from "./NavigationBar";
import { HEADER_ITEMS, NAV_ITEMS, FOOTER_ITEMS } from "./constants";

const meta = {
  title: "Components/Navigation/NavigationBar",
  component: NavigationBar,
  parameters: {
    layout: "start",
  },
  tags: ["autodocs"],
  argTypes: {
    headerNavItems: {
      control: "object",
      description: "Items to display in the header navigation",
    },
    bodyNavItems: {
      control: "object",
      description: "Items to display in the body navigation",
    },
    footerNavItems: {
      control: "object",
      description: "Items to display in the footer navigation",
    },
    userName: {
      control: "text",
      description: "Name of the user to display in the header",
    },
    logoSrc: {
      control: "text",
      description: "Source URL for the logo image",
    },
    onProfileClick: {
      action: "profileClicked",
      description: "Function to call when the profile is clicked",
    },
  },
  args: {
    headerNavItems: HEADER_ITEMS,
    bodyNavItems: NAV_ITEMS,
    footerNavItems: FOOTER_ITEMS,
    userName: "John",
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headerNavItems: HEADER_ITEMS,
    bodyNavItems: NAV_ITEMS,
    footerNavItems: FOOTER_ITEMS,
    userName: "John",
    activePath: "/ventes/devis",
    onProfileClick: () => console.log("Profile clicked!"),
  },
  render: (args) => (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f0f0f0', }}>
      <NavigationBar {...args} />

      <div
        style={{
          flex: 1,
          padding: 24,
          overflow: 'auto',
        }}
      >
        <h1>Main application content</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
        </p>
        <p>
          Praesent vestibulum dapibus nibh. Etiam ultrices. Suspendisse in justo
          eu magna luctus suscipit.
        </p>
      </div>
    </div>
  ),
};