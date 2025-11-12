import type { Meta, StoryObj } from "@storybook/react";
import ButtonSplit from "./ButtonSplit";
import type { ButtonSplitProps } from "./ButtonSplit";

const meta = {
  title: "Components/ButtonSplit",
  component: ButtonSplit,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["contained", "outlined", "text", "tonal"],
      description: "The variant of the button",
    },
    color: {
      control: "select",
      options: ["primary", "neutral"],
      description: "The color of the button",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large", "auto"],
      description: "The size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    isLoading: {
      control: "boolean",
      description: "Shows a loading state",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the button should take full width",
    },
  },
} satisfies Meta<typeof ButtonSplit>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultMenuItems = [
  {
    label: "Option 1",
    icon: "save-01",
    onClick: () => console.log("Option 1 clicked"),
  },
  {
    label: "Option 2",
    icon: "edit-05",
    onClick: () => console.log("Option 2 clicked"),
  },
  {
    label: "Option 3",
    icon: "trash-01",
    onClick: () => console.log("Option 3 clicked"),
  },
  {
    label: "Disabled Option",
    icon: "x",
    onClick: () => console.log("Should not be called"),
    disabled: true,
  },
];

export const Primary: Story = {
  args: {
    children: "Button",
    variant: "contained",
    color: "primary",
    size: "large",
    startIcon: "home-05",
    menuItems: defaultMenuItems,
    onClick: () => console.log("Main button clicked"),
  },
};


export const Small: Story = {
  args: {
    children: "Button",
    variant: "contained",
    color: "primary",
    size: "small",
    startIcon: "home-05",
    menuItems: defaultMenuItems,
    onClick: () => console.log("Main button clicked"),
  },
};

export const Medium: Story = {
  args: {
    children: "Button",
    variant: "contained",
    color: "primary",
    size: "medium",
    startIcon: "home-05",
    menuItems: defaultMenuItems,
    onClick: () => console.log("Main button clicked"),
  },
};

export const Large: Story = {
  args: {
    children: "Button",
    variant: "contained",
    color: "primary",
    size: "large",
    startIcon: "home-05",
    menuItems: defaultMenuItems,
    onClick: () => console.log("Main button clicked"),
  },
};

export const WithoutIcon: Story = {
  args: {
    children: "Button",
    variant: "contained",
    color: "primary",
    size: "large",
    menuItems: defaultMenuItems,
    onClick: () => console.log("Main button clicked"),
  },
};

export const Disabled: Story = {
  args: {
    children: "Button",
    variant: "contained",
    color: "primary",
    size: "large",
    startIcon: "home-05",
    menuItems: defaultMenuItems,
    onClick: () => console.log("Main button clicked"),
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: "Button",
    variant: "contained",
    color: "primary",
    size: "large",
    startIcon: "home-05",
    menuItems: defaultMenuItems,
    onClick: () => console.log("Main button clicked"),
    isLoading: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: "Button",
    variant: "contained",
    color: "primary",
    size: "large",
    startIcon: "home-05",
    menuItems: defaultMenuItems,
    onClick: () => console.log("Main button clicked"),
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Neutral: Story = {
  args: {
    children: "Button",
    variant: "contained",
    color: "neutral",
    size: "large",
    startIcon: "home-05",
    menuItems: defaultMenuItems,
    onClick: () => console.log("Main button clicked"),
  },
};

export const Outlined: Story = {
  args: {
    children: "Button",
    variant: "outlined",
    color: "primary",
    size: "large",
    startIcon: "home-05",
    menuItems: defaultMenuItems,
    onClick: () => console.log("Main button clicked"),
  },
};

export const Tonal: Story = {
  args: {
    children: "Button",
    variant: "tonal",
    color: "primary",
    size: "large",
    startIcon: "home-05",
    menuItems: defaultMenuItems,
    onClick: () => console.log("Main button clicked"),
  },
};

export const Text: Story = {
  args: {
    children: "Button",
    variant: "text",
    color: "primary",
    size: "large",
    startIcon: "home-05",
    menuItems: defaultMenuItems,
    onClick: () => console.log("Main button clicked"),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h3>Colors (Contained)</h3>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <ButtonSplit
          color="primary"
          variant="contained"
          size="large"
          startIcon="home-05"
          menuItems={defaultMenuItems}
          onClick={() => console.log("Primary clicked")}
        >
          Primary
        </ButtonSplit>
        <ButtonSplit
          color="neutral"
          variant="contained"
          size="large"
          startIcon="home-05"
          menuItems={defaultMenuItems}
          onClick={() => console.log("Neutral clicked")}
        >
          Neutral
        </ButtonSplit>
      </div>

      <h3>Variants (Primary)</h3>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <ButtonSplit
          color="primary"
          variant="contained"
          size="large"
          startIcon="home-05"
          menuItems={defaultMenuItems}
          onClick={() => console.log("Contained clicked")}
        >
          Contained
        </ButtonSplit>
        <ButtonSplit
          color="primary"
          variant="outlined"
          size="large"
          startIcon="home-05"
          menuItems={defaultMenuItems}
          onClick={() => console.log("Outlined clicked")}
        >
          Outlined
        </ButtonSplit>
        <ButtonSplit
          color="primary"
          variant="tonal"
          size="large"
          startIcon="home-05"
          menuItems={defaultMenuItems}
          onClick={() => console.log("Tonal clicked")}
        >
          Tonal
        </ButtonSplit>
        <ButtonSplit
          color="primary"
          variant="text"
          size="large"
          startIcon="home-05"
          menuItems={defaultMenuItems}
          onClick={() => console.log("Text clicked")}
        >
          Text
        </ButtonSplit>
      </div>

      <h3>Sizes (Medium = 32px, Large = 40px)</h3>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <ButtonSplit
          color="primary"
          variant="contained"
          size="small"
          startIcon="home-05"
          menuItems={defaultMenuItems}
          onClick={() => console.log("Small clicked")}
        >
          Small
        </ButtonSplit>
        <ButtonSplit
          color="primary"
          variant="contained"
          size="medium"
          startIcon="home-05"
          menuItems={defaultMenuItems}
          onClick={() => console.log("Medium clicked")}
        >
          Medium (32px)
        </ButtonSplit>
        <ButtonSplit
          color="primary"
          variant="contained"
          size="large"
          startIcon="home-05"
          menuItems={defaultMenuItems}
          onClick={() => console.log("Large clicked")}
        >
          Large (40px)
        </ButtonSplit>
      </div>

      <h3>States</h3>
      <div style={{ display: "flex", gap: "16px" }}>
        <ButtonSplit
          color="primary"
          variant="contained"
          size="large"
          startIcon="home-05"
          menuItems={defaultMenuItems}
          onClick={() => console.log("Normal clicked")}
        >
          Normal
        </ButtonSplit>
        <ButtonSplit
          color="primary"
          variant="contained"
          size="large"
          startIcon="home-05"
          menuItems={defaultMenuItems}
          onClick={() => console.log("Disabled clicked")}
          disabled
        >
          Disabled
        </ButtonSplit>
        <ButtonSplit
          color="primary"
          variant="contained"
          size="large"
          startIcon="home-05"
          menuItems={defaultMenuItems}
          onClick={() => console.log("Loading clicked")}
          isLoading
        >
          Loading
        </ButtonSplit>
      </div>
    </div>
  ),
};
