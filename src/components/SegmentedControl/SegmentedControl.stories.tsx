import type { Meta, StoryObj } from "@storybook/react-vite";
import SegmentedControl from "./SegmentedControl";
import Icon from "../Icon";

const meta = {
  title: "🎛️ Inputs and selection/SegmentedControl",
  component: SegmentedControl,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    actions: [
      {
        icon: <Icon size={16}>add-01</Icon>,
        label: "Button",
        onClick: () => {},
      },
      {
        icon: <Icon size={16}>add-01</Icon>,
        label: "Button",
        onClick: () => {},
      },
      {
        icon: <Icon size={16}>add-01</Icon>,
        label: "Button",
        onClick: () => {},
      },
    ],
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const IconOnly: Story = {
  args: {
    actions: [
      {
        icon: <Icon size={16}>add-01</Icon>,
        onClick: () => {},
      },
      {
        icon: <Icon size={16}>add-01</Icon>,
        onClick: () => {},
      },
      {
        icon: <Icon size={16}>add-01</Icon>,
        onClick: () => {},
      },
    ],
  },
};

export const WithDisabledActions: Story = {
  args: {
    actions: [
      {
        label: "Enabled",
        onClick: () => console.log("Enabled action clicked"),
      },
      {
        label: "Disabled",
        onClick: () => console.log("This won't be called"),
        disabled: true,
      },
      {
        label: "Also Enabled",
        onClick: () => console.log("Another enabled action clicked"),
      },
    ],
  },
};

export const WithGroupedActions: Story = {
  args: {
    actions: [
      {
        label: "View",
        icon: <Icon size={16}>view</Icon>,
        onClick: () => console.log("View action clicked"),
      },
      {
        label: "Edit",
        icon: <Icon size={16}>edit-02</Icon>,
        onClick: () => console.log("Edit action clicked"),
      },
      [
        {
          label: "Export PDF",
          icon: <Icon size={16}>file-download-02</Icon>,
          onClick: () => console.log("Export PDF clicked"),
        },
        {
          label: "Export CSV",
          icon: <Icon size={16}>file-download-02</Icon>,
          onClick: () => console.log("Export CSV clicked"),
        },
        {
          label: "Export Excel",
          icon: <Icon size={16}>file-download-02</Icon>,
          onClick: () => console.log("Export Excel clicked"),
        },
      ],
    ],
  },
};

export const MultipleGroupedActions: Story = {
  args: {
    actions: [
      [
        {
          label: "Save",
          icon: <Icon size={16}>save-01</Icon>,
          onClick: () => console.log("Save clicked"),
        },
        {
          label: "Save As",
          icon: <Icon size={16}>save-02</Icon>,
          onClick: () => console.log("Save As clicked"),
        },
        {
          label: "Save All",
          icon: <Icon size={16}>save-01</Icon>,
          onClick: () => console.log("Save All clicked"),
        },
      ],
      [
        {
          label: "Print",
          icon: <Icon size={16}>printer</Icon>,
          onClick: () => console.log("Print clicked"),
        },
        {
          label: "Print Preview",
          icon: <Icon size={16}>view</Icon>,
          onClick: () => console.log("Print Preview clicked"),
        },
      ],
      {
        label: "Share",
        icon: <Icon size={16}>share-07</Icon>,
        onClick: () => console.log("Share clicked"),
      },
    ],
  },
};