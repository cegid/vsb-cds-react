import type { Meta, StoryObj } from "@storybook/react-vite";
import IAChip from "./IAChip";
import Icon from "../Icon";
import Typography, { ExtendedVariant } from "../Typography";
import { CustomColorString } from "../../theme";

interface IAChipStoryProps {
  backgroundColor: CustomColorString;
  iconColor: CustomColorString;
  labelText: string;
  labelVariant: ExtendedVariant;
  labelColor: CustomColorString;
  icon: string;
}

const iconNames = {
  Aucun: null,
  User: "user",
  Settings: "settings-01",
  Star: "star",
  Home: "home-01",
};

const meta = {
  title: "📊 Data Display/IAChip",
  component: IAChip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Un composant chip polyvalent avec support pour les icônes, différentes tailles et interactions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: {
      control: "text",
      description: "Couleur de fond du chip",
      defaultValue: "primary/99",
    },
    iconColor: {
      control: "text",
      description: "Couleur de l'icône",
      defaultValue: "primary/60",
    },
    labelText: {
      control: "text",
      description: "Texte du label",
      defaultValue: "Mon chip",
    },
    labelVariant: {
      control: "select",
      options: [
        "bodySRegular",
        "bodyMRegular",
        "bodyLRegular",
        "bodyXLRegular",
        "bodySSemiBold",
        "bodyMSemiBold",
        "bodyLSemiBold",
        "bodyXLSemiBold",
        "captionRegular",
        "captionMedium",
        "captionSemiBold",
      ],
      description: "Variant de la typography",
      defaultValue: "bodySRegular",
    },
    labelColor: {
      control: "text",
      description: "Couleur du texte",
      defaultValue: "primary/60",
    },
    icon: {
      control: "select",
      options: Object.keys(iconNames),
      description: "Icône du chip",
      defaultValue: "Aucun",
    },
  },
  args: {
    backgroundColor: "primary/99",
    iconColor: "primary/60",
    labelText: "Mon chip",
    labelVariant: "bodySRegular",
    labelColor: "primary/60",
    icon: "Aucun",
  },
} satisfies Meta<IAChipStoryProps>;

export default meta;
type Story = StoryObj<Meta<IAChipStoryProps>>;

const GetIcon = (iconKey: string, color: CustomColorString) => {
  const iconName = iconNames[iconKey as keyof typeof iconNames];
  if (!iconName) return undefined;

  return (
    <Icon variant="bulk" size={16} color={color}>
      {iconName}
    </Icon>
  );
};

const GetLabel = (
  text: string,
  variant: ExtendedVariant,
  color: CustomColorString
) => {
  return (
    <Typography variant={variant} color={color}>
      {text}
    </Typography>
  );
};

export const Default: Story = {
  render: (args) => (
    <IAChip
      backgroundColor={args.backgroundColor}
      label={GetLabel(args.labelText, args.labelVariant, args.labelColor)}
      icon={GetIcon(args.icon, args.iconColor)}
    />
  ),
};
