import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import Icon, { IconStyle, IconVariant } from "./Icon";
import Box from "../Box";
import Typography from "../Typography";
import { CustomColorString } from "../../theme/colors";

// Import de la liste des icônes pré-générée utilisez "npm run extract-icons" pour la mettre à jour
import iconsList from "../../theme/icons/icons-list.json";

const meta = {
  title: "📊 Data Display/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Icon component using Huge Icons Pro fonts. Supports multiple variants (bulk, duotone, solid, stroke, twotone) and styles (rounded, sharp, standard) with customizable colors and sizes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The icon name (e.g., 'add-circle', 'user', 'settings-01')",
      table: {
        type: { summary: "string" },
      },
    },
    color: {
      control: "text",
      description:
        'The color of the component. Can use format "palette/shade" (e.g., "primary/50")',
      table: {
        type: { summary: "CustomColorString" },
      },
    },
    size: {
      control: "number",
      description: "The size of the component in pixels or CSS unit",
      table: {
        type: { summary: "number | string" },
        defaultValue: { summary: "24" },
      },
    },
    variant: {
      control: "select",
      options: ["bulk", "duotone", "solid", "stroke", "twotone"],
      description: "Icon variant style",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "stroke" },
      },
    },
    style: {
      control: "select",
      options: ["rounded", "sharp", "standard"],
      description: "Icon corner style",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "rounded" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        type: { summary: "string" },
      },
    },
  },
  args: {
    children: "add-circle",
    color: "primary/50",
    size: 24,
    variant: "stroke",
    style: "rounded",
  },
} satisfies Meta<typeof Icon>;

const useHugeIconsList = () => {
  const [icons, setIcons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (iconsList && Array.isArray(iconsList) && iconsList.length > 0) {
          setIcons(iconsList);
          console.log(
            `${iconsList.length} icônes chargées depuis icons-list.json`
          );
        } else {
          console.warn(
            "Liste des icônes JSON vide ou invalide, utilisation du fallback"
          );
          setIcons(getFallbackIconsList());
        }
      } catch (error) {
        console.error(
          "Erreur lors du chargement de la liste des icônes:",
          error
        );
        setIcons(getFallbackIconsList());
      }
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { icons, loading };
};

const getFallbackIconsList = (): string[] => [
  "user",
  "user-circle",
  "add-01",
  "add-02",
  "add-circle",
  "settings-01",
  "settings-02",
  "mail-01",
  "mail-02",
  "home-01",
  "search-01",
  "star",
  "favourite",
  "calendar-01",
  "clock-01",
  "notification-02",
  "camera-01",
  "folder-01",
  "download-01",
  "upload-01",
  "share-01",
  "edit-01",
  "delete-01",
  "tick-01",
  "cancel-circle",
];

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => <Icon {...args}>{args.children}</Icon>,
};

export const IconExplorer: Story = {
  render: () => {
    const { icons, loading } = useHugeIconsList();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("add-circle");
    const [selectedVariant, setSelectedVariant] =
      useState<IconVariant>("stroke");
    const [selectedStyle, setSelectedStyle] = useState<IconStyle>("rounded");
    const [selectedColor, setSelectedColor] = useState("primary/50");
    const [selectedSize, setSelectedSize] = useState(32);

    const filteredIcons = icons.filter((icon) =>
      icon.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={400}
        >
          <Typography variant="bodyMRegular">
            Chargement des icônes...
          </Typography>
        </Box>
      );
    }

    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={24}
        width="100%"
        maxWidth={900}
      >
        <Box display="flex" flexDirection="column" gap={16}>
          <Typography variant="bodySSemiBold">
            Icon Explorer ({icons.length} icônes disponibles)
          </Typography>

          <Box>
            <input
              type="text"
              placeholder="Search icons (e.g., user, settings, mail, heart...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </Box>

          <Box display="flex" gap={16} alignItems="center" flexWrap="wrap">
            <Box>
              <Typography variant="captionSemiBold">Variant:</Typography>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value as any)}
                style={{
                  marginLeft: "8px",
                  padding: "6px 12px",
                  borderRadius: "4px",
                }}
              >
                <option value="bulk">Bulk</option>
                <option value="duotone">Duotone</option>
                <option value="solid">Solid</option>
                <option value="stroke">Stroke</option>
                <option value="twotone">Twotone</option>
              </select>
            </Box>

            <Box>
              <Typography variant="captionSemiBold">Style:</Typography>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value as any)}
                style={{
                  marginLeft: "8px",
                  padding: "6px 12px",
                  borderRadius: "4px",
                }}
              >
                <option value="rounded">Rounded</option>
                <option value="sharp">Sharp</option>
                <option value="standard">Standard</option>
              </select>
            </Box>

            <Box>
              <Typography variant="captionSemiBold">Color:</Typography>
              <input
                type="text"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                placeholder="primary/50"
                style={{
                  marginLeft: "8px",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  width: "120px",
                }}
              />
            </Box>

            <Box>
              <Typography variant="captionSemiBold">Size:</Typography>
              <input
                type="number"
                value={selectedSize}
                onChange={(e) => setSelectedSize(Number(e.target.value))}
                min="12"
                max="64"
                style={{
                  marginLeft: "8px",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  width: "80px",
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap={12}
          alignItems="center"
          padding={24}
          backgroundColor="neutral/90"
          borderRadius="8px"
        >
          <Typography variant="bodySSemiBold">Preview</Typography>
          <Icon
            variant={selectedVariant}
            style={selectedStyle}
            color={selectedColor as CustomColorString}
            size={selectedSize}
          >
            {selectedIcon}
          </Icon>
          <Box textAlign="center">
            <Typography
              variant="captionRegular"
              padding="4px"
              borderRadius="4px"
            >
              &lt;Icon variant="{selectedVariant}" style="{selectedStyle}"
              color="{selectedColor}" size={selectedSize}&gt;
            </Typography>
            <Typography
              variant="captionRegular"
              borderRadius="4px"
              marginTop="4px"
            >
              {selectedIcon}
            </Typography>
            <Typography
              variant="captionRegular"
              padding="4px"
              borderRadius="4px"
            >
              &lt;/Icon&gt;
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="bodySSemiBold" marginBottom={12}>
            Available Icons ({filteredIcons.length})
            {searchTerm && (
              <Typography
                variant="captionRegular"
                component="span"
                marginLeft={8}
              >
                - Filtered by "{searchTerm}"
              </Typography>
            )}
          </Typography>
          <Box
            display="flex"
            gap={8}
            overflow="auto"
            flexWrap="wrap"
            justifyContent="center"
            maxWidth={900}
            maxHeight={900}
            padding={16}
            border={{ width: 1, style: "solid", color: "neutral/40" }}
            borderRadius="8px"
            backgroundColor="white"
          >
            {filteredIcons.length === 0 ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={200}
                width="100%"
              >
                <Typography variant="bodyMRegular" color="neutral/50">
                  Aucune icône trouvée pour "{searchTerm}"
                </Typography>
              </Box>
            ) : (
              filteredIcons.map((iconName) => (
                <Box
                  key={iconName}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                  gap={8}
                  width={120}
                  height={120}
                  borderRadius="6px"
                  border={
                    selectedIcon === iconName
                      ? { width: 2, style: "solid", color: "primary/10" }
                      : { width: 1, style: "solid", color: "neutral/40" }
                  }
                  backgroundColor={
                    selectedIcon === iconName ? "neutral/90" : "white"
                  }
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor:
                        selectedIcon === iconName ? "#f3f8ff" : "#f5f5f5",
                      borderColor:
                        selectedIcon === iconName ? "#1976d2" : "#ccc",
                    },
                  }}
                  onClick={() => setSelectedIcon(iconName)}
                >
                  <Icon
                    variant={selectedVariant}
                    style={selectedStyle}
                    size={24}
                    color="neutral/40"
                  >
                    {iconName}
                  </Icon>
                  <Typography
                    variant="captionRegular"
                    textAlign="center"
                    position="absolute"
                    bottom="8px"
                    component="p"
                    color={
                      selectedIcon === iconName ? "primary/50" : "neutral/50"
                    }
                  >
                    {iconName}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
    );
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Interactive icon explorer for finding and testing Huge Icons Pro. Search through available icons, customize their appearance, and generate code snippets ready to use in your components.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <Box display="flex" gap={16} alignItems="center">
      <Box display="flex" flexDirection="column" alignItems="center" gap={8}>
        <Icon variant="bulk" size={32}>
          user
        </Icon>
        <Typography variant="captionRegular">Bulk</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap={8}>
        <Icon variant="duotone" size={32}>
          user
        </Icon>
        <Typography variant="captionRegular">Duotone</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap={8}>
        <Icon variant="solid" size={32}>
          user
        </Icon>
        <Typography variant="captionRegular">Solid</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap={8}>
        <Icon variant="stroke" size={32}>
          user
        </Icon>
        <Typography variant="captionRegular">Stroke</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap={8}>
        <Icon variant="twotone" size={32}>
          user
        </Icon>
        <Typography variant="captionRegular">Twotone</Typography>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different icon variants available: bulk, duotone, solid, stroke, and twotone.",
      },
    },
  },
};

export const Styles: Story = {
  render: () => (
    <Box display="flex" gap={16} alignItems="center">
      <Box display="flex" flexDirection="column" alignItems="center" gap={8}>
        <Icon variant="solid" style="rounded" size={32}>
          settings-01
        </Icon>
        <Typography variant="captionRegular">Rounded</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap={8}>
        <Icon variant="solid" style="sharp" size={32}>
          settings-01
        </Icon>
        <Typography variant="captionRegular">Sharp</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap={8}>
        <Icon variant="solid" style="standard" size={32}>
          settings-01
        </Icon>
        <Typography variant="captionRegular">Standard</Typography>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different icon corner styles: rounded, sharp, and standard.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Box display="flex" gap={16} alignItems="center">
      <Box display="flex" flexDirection="column" alignItems="center" gap={8}>
        <Icon size={16}>star</Icon>
        <Typography variant="captionRegular">16px</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap={8}>
        <Icon size={24}>star</Icon>
        <Typography variant="captionRegular">24px</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap={8}>
        <Icon size={32}>star</Icon>
        <Typography variant="captionRegular">32px</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap={8}>
        <Icon size={48}>star</Icon>
        <Typography variant="captionRegular">48px</Typography>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icons can be displayed in different sizes.",
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <Box display="flex" gap={16} alignItems="center">
      <Icon color="primary/50" size={32}>
        heart
      </Icon>
      <Icon color="secondary/50" size={32}>
        heart
      </Icon>
      <Icon color="success/50" size={32}>
        heart
      </Icon>
      <Icon color="yellow/50" size={32}>
        heart
      </Icon>
      <Icon color="critical/50" size={32}>
        heart
      </Icon>
      <Icon color="info/50" size={32}>
        heart
      </Icon>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icons support different color themes from the design system.",
      },
    },
  },
};
