import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";

import Header from "./Header";
import Icon from "../Icon";

const meta = {
  title: "Components/Structure/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The title for header",
    },
    primaryButtonText: {
      control: "text",
      description: "The text for the primary action button",
      if: { arg: "primaryAction", exists: true },
    },
    secondaryButtonText: {
      control: "text",
      description: "The text for the secondary action button",
      if: { arg: "secondaryAction", exists: true },
    },
    primaryAction: {
      control: "boolean",
      description: "Enable primary action button",
    },
    secondaryAction: {
      control: "boolean",
      description: "Enable secondary action button",
    },
    settingsAction: {
      control: "boolean",
      description: "Enable settings button",
    },
    moreAction: {
      control: "boolean",
      description: "Enable more options button",
    },
    backAction: {
      control: "boolean",
      description: "Enable back button (mobile only)",
    },
    segmentedControlRight: {
      control: "boolean",
      description: "Show segmented control instead of regular actions",
    },
    "primaryButtonProps.disabled": {
      control: "boolean",
      description: "Disable the primary button",
      if: { arg: "primaryAction" },
    },
    "secondaryButtonProps.disabled": {
      control: "boolean",
      description: "Disable the secondary button",
      if: { arg: "secondaryAction" },
    },
  },
  args: {
    title: "Page Title",
    primaryAction: false,
    primaryButtonText: "Primary Button",
    secondaryAction: false,
    secondaryButtonText: "Secondary Button",
    settingsAction: false,
    moreAction: false,
    backAction: false,
    segmentedControlRight: false,
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    primaryAction: true,
  },
  render: (args) => (
    <Header
      {...args}
      primaryAction={args.primaryAction ? action("primary-action") : undefined}
      secondaryAction={
        args.secondaryAction ? action("secondary-action") : undefined
      }
      settingsAction={
        args.settingsAction ? action("settings-action") : undefined
      }
      moreAction={args.moreAction ? action("more-action") : undefined}
      backAction={args.backAction ? action("back-action") : undefined}
    />
  ),
};

export const WithBothActions: Story = {
  args: {
    title: "Dashboard",
    primaryAction: true,
    primaryButtonText: "Create",
    secondaryAction: true,
    secondaryButtonText: "Export",
    settingsAction: true,
    moreAction: true,
  },
  render: (args) => (
    <Header
      {...args}
      primaryAction={args.primaryAction ? action("primary-action") : undefined}
      secondaryAction={
        args.secondaryAction ? action("secondary-action") : undefined
      }
      settingsAction={
        args.settingsAction ? action("settings-action") : undefined
      }
      moreAction={args.moreAction ? action("more-action") : undefined}
      backAction={args.backAction ? action("back-action") : undefined}
    />
  ),
};

export const WithCustomButtonProps: Story = {
  args: {
    title: "Project Settings",
    primaryAction: true,
    primaryButtonText: "Save",
    primaryButtonProps: {
      disabled: false,
      startIcon: <Icon size={16}>download-04</Icon>,
    },
    secondaryAction: true,
    secondaryButtonText: "Cancel",
    secondaryButtonProps: {
      disabled: false,
      endIcon: <Icon>x</Icon>,
    },
    settingsActionProps: { variant: "tonal", color: "primary" },
    settingsAction: true,
  },
  render: (args) => (
    <Header
      {...args}
      primaryAction={args.primaryAction ? action("primary-action") : undefined}
      secondaryAction={
        args.secondaryAction ? action("secondary-action") : undefined
      }
      settingsAction={
        args.settingsAction ? action("settings-action") : undefined
      }
    />
  ),
};

export const WithDisabledButtons: Story = {
  args: {
    title: "Form in Progress",
    primaryAction: true,
    primaryButtonText: "Submit",
    primaryButtonProps: {
      disabled: true,
      startIcon: <Icon>loader</Icon>,
    },
    secondaryAction: true,
    secondaryButtonText: "Reset",
    secondaryButtonProps: {
      disabled: true,
    },
    settingsAction: true,
  },
  render: (args) => (
    <Header
      {...args}
      primaryAction={args.primaryAction ? action("primary-action") : undefined}
      secondaryAction={
        args.secondaryAction ? action("secondary-action") : undefined
      }
      settingsAction={
        args.settingsAction ? action("settings-action") : undefined
      }
    />
  ),
};

export const WithIconButtons: Story = {
  args: {
    title: "File Manager",
    primaryAction: true,
    primaryButtonText: "Upload",
    primaryButtonProps: {
      startIcon: <Icon>upload</Icon>,
      endIcon: <Icon>arrow-up</Icon>,
    },
    secondaryAction: true,
    secondaryButtonText: "Download",
    secondaryButtonProps: {
      startIcon: <Icon>download</Icon>,
    },
    moreAction: true,
  },
  render: (args) => (
    <Header
      {...args}
      primaryAction={args.primaryAction ? action("primary-action") : undefined}
      secondaryAction={
        args.secondaryAction ? action("secondary-action") : undefined
      }
      moreAction={args.moreAction ? action("more-action") : undefined}
    />
  ),
};

export const WithSegmentedControl: Story = {
  args: {
    title: "Dashboard",
    segmentedControlRight: true,
    segmentedControlProps: {
      actions: [
        { label: "Day", onClick: action("day-selected") },
        { label: "Week", onClick: action("week-selected") },
        { label: "Month", onClick: action("month-selected") },
      ],
      defaultSelected: 1,
    },
    settingsAction: true,
  },
  render: (args) => (
    <Header
      {...args}
      settingsAction={
        args.settingsAction ? action("settings-action") : undefined
      }
    />
  ),
};

export const MobileBehavior: Story = {
  args: {
    title: "Mobile View un peu plus long que juste comme ça",
    primaryAction: true,
    primaryButtonText: "Save",
    primaryButtonProps: {
      startIcon: <Icon size={16}>download-04</Icon>,
    },
    secondaryAction: true,
    secondaryButtonText: "Cancel",
    backAction: true,
    settingsAction: true,
    moreAction: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: (args) => (
    <Header
      {...args}
      primaryAction={args.primaryAction ? action("primary-action") : undefined}
      secondaryAction={
        args.secondaryAction ? action("secondary-action") : undefined
      }
      backAction={args.backAction ? action("back-action") : undefined}
      settingsAction={
        args.settingsAction ? action("settings-action") : undefined
      }
      moreAction={args.moreAction ? action("more-action") : undefined}
    />
  ),
};

export const OnlyPrimaryAction: Story = {
  args: {
    title: "Simple Header",
    primaryAction: true,
    backAction: true,
    primaryButtonText: "Action",
    primaryButtonProps: {
      startIcon: <Icon size={16}>add-01</Icon>,
    },
  },
  render: (args) => (
    <Header
      {...args}
      primaryAction={args.primaryAction ? action("primary-action") : undefined}
      secondaryAction={
        args.secondaryAction ? action("secondary-action") : undefined
      }
      backAction={args.backAction ? action("back-action") : undefined}
      settingsAction={
        args.settingsAction ? action("settings-action") : undefined
      }
      moreAction={args.moreAction ? action("more-action") : undefined}
    />
  ),
};

export const OnlySecondaryAction: Story = {
  args: {
    title: "Alternative Header",
    secondaryAction: true,
    secondaryButtonText: "Secondary",
    secondaryButtonProps: {
      endIcon: <Icon>external-link</Icon>,
    },
  },
  render: (args) => (
    <Header
      {...args}
      primaryAction={args.primaryAction ? action("primary-action") : undefined}
      secondaryAction={
        args.secondaryAction ? action("secondary-action") : undefined
      }
      settingsAction={
        args.settingsAction ? action("settings-action") : undefined
      }
      moreAction={args.moreAction ? action("more-action") : undefined}
      backAction={args.backAction ? action("back-action") : undefined}
    />
  ),
};

export const OnlyUtilityButtons: Story = {
  args: {
    title: "Utility Only",
    settingsAction: true,
    moreAction: true,
  },
  render: (args) => (
    <Header
      {...args}
      primaryAction={args.primaryAction ? action("primary-action") : undefined}
      secondaryAction={
        args.secondaryAction ? action("secondary-action") : undefined
      }
      settingsAction={
        args.settingsAction ? action("settings-action") : undefined
      }
      moreAction={args.moreAction ? action("more-action") : undefined}
      backAction={args.backAction ? action("back-action") : undefined}
    />
  ),
};

export const LongTitle: Story = {
  args: {
    title:
      "This is a very long title that should be truncated with ellipsis when it exceeds the available space in the header component",
    primaryAction: true,
    primaryButtonText: "Action",
    settingsAction: true,
  },
  render: (args) => (
    <Header
      {...args}
      primaryAction={args.primaryAction ? action("primary-action") : undefined}
      secondaryAction={
        args.secondaryAction ? action("secondary-action") : undefined
      }
      settingsAction={
        args.settingsAction ? action("settings-action") : undefined
      }
      moreAction={args.moreAction ? action("more-action") : undefined}
      backAction={args.backAction ? action("back-action") : undefined}
    />
  ),
};
