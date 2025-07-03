import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import NavigationBar from "./NavigationBar";
import { HEADER_ITEMS, NAV_ITEMS, FOOTER_ITEMS, PROFILE_MENU_ITEMS } from "./constants";

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
    profileMenuItems: {
      control: "object",
      description: "Menu Items to display in the profile menu",
    },
    userFirstName: {
      control: "text",
      description: "FirstName of the user to display in the header",
    },
    userLastName: {
      control: "text",
      description: "LastName of the user to display in the Profile menu",
    },
    userTrigram: {
      control: "text",
      description: "Trigram of the user to display in the Profile menu",
    },
    logoSrc: {
      control: "text",
      description: "Source URL for the logo image",
    },
    onLogOut: {
      action: "logOutClicked !",
      description: "Function called when the logout button is clicked",
    },
  },
  args: {
    headerNavItems: HEADER_ITEMS,
    bodyNavItems: NAV_ITEMS,
    footerNavItems: FOOTER_ITEMS,
    profileMenuItems: PROFILE_MENU_ITEMS,
    userFirstName: "John",
    userLastName: "Doe",
    userTrigram: "JD",
    onLogOut: () => console.log("logOut clicked!"),
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headerNavItems: HEADER_ITEMS,
    bodyNavItems: NAV_ITEMS,
    footerNavItems: FOOTER_ITEMS,
    userFirstName: "John",
    userLastName: "Doe",
    userTrigram: "JD",
    activePath: "/ventes/reglements/incoming",
    onLogOut: () => console.log("logOut clicked!"),
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