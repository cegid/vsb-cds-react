import { Meta, StoryObj } from "@storybook/react-vite";
import { version } from "../../package.json";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Icon,
  Stack,
  Typography,
  Tab,
  Tabs,
  ToasterProvider,
  useToaster,
  IconButton,
  Row,
  Column,
} from "../components";
import VSBThemeProvider from "../theme/theme";
import { CustomColorString, primary } from "../theme";
import React from "react";

const DocumentationContent = () => {
  const toaster = useToaster();
  const [activeTab, setActiveTab] = React.useState(0);

  const scrollToSection = (sectionId: string, tabIndex: number) => {
    setActiveTab(tabIndex);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const showToast = (type: "success" | "info" | "warning" | "error") => {
    const messages = {
      success: "Command copied to clipboard!",
      info: "Documentation viewed",
      warning: "Watch out for dependencies!",
      error: "Failed to copy to clipboard",
    };

    toaster[`display${type.charAt(0).toUpperCase() + type.slice(1)}`](
      messages[type]
    );
  };

  return (
    <Box maxWidth={1200} mx="auto" p={4}>
      {/* Header Hero Section */}
      <Box
        borderRadius={3}
        p={6}
        mb={6}
        textAlign="center"
        sx={{
          background: `linear-gradient(135deg, ${primary[60]} 0%, ${primary[99]} 100%)`,
          color: "white",
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Avatar size="large" color="primary" icon={<Icon>package</Icon>} />

          <Typography variant="displaySRegular" component="h1" color="white">
            @cegid/vsb-cds-react
          </Typography>

          <Typography
            variant="titleLRegular"
            color="white"
            sx={{ opacity: 0.9, maxWidth: 600 }}
          >
            The BIM! by Cegid design system for React - A complete library of
            modern and accessible UI components
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            justifyContent="center"
          >
            <Chip
              label={"Stable v " + version}
              color="success"
              startIcon={<Icon>check-circle</Icon>}
            />
            <Chip
              label="React 18+"
              color="info"
              startIcon={<Icon>code</Icon>}
            />
            <Chip
              label="TypeScript"
              color="yellow"
              startIcon={<Icon>shield-check</Icon>}
            />
          </Stack>
        </Stack>
      </Box>

      {/* Navigation Tabs */}
      <Box
        borderBottom={{ color: "neutral/95", width: 1, style: "solid" }}
        mb={4}
      >
        <Tabs
          value={activeTab}
          centered
          onChange={(event, newValue) => setActiveTab(newValue)}
        >
          <Tab
            label={<Typography>Installation</Typography>}
            icon={<Icon size={16}>rocket-01</Icon>}
            onClick={() => scrollToSection("installation", 0)}
          />
          <Tab
            label={<Typography>Configuration</Typography>}
            icon={<Icon size={16}>settings-01</Icon>}
            onClick={() => scrollToSection("configuration", 1)}
          />
          <Tab
            label={<Typography>Architecture</Typography>}
            icon={<Icon size={16}>building-01</Icon>}
            onClick={() => scrollToSection("architecture", 2)}
          />
        </Tabs>
      </Box>

      {/* Installation Section */}
      <Box id="installation" mb={6}>
        <Stack spacing={4}>
          <Box>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Icon size={24} color="neutral/10">
                rocket-01
              </Icon>
              <Typography
                variant="headLineMSemiBold"
                component="h2"
                color="neutral/10"
              >
                Installation
              </Typography>
            </Stack>
            <Typography variant="bodyMRegular" color="neutral/70" paragraph>
              Get started quickly with our design system in just a few simple
              steps.
            </Typography>
          </Box>

          <Alert
            variant="info"
            title="Prerequisites"
            description="Make sure you have React 18+ and peer dependencies installed."
          />

          <Box
            backgroundColor="neutral/99"
            p={3}
            borderRadius={2}
            border={{ color: "neutral/90", width: 1, style: "solid" }}
          >
            <Typography variant="bodyMSemiBold" color="neutral/10" gutterBottom>
              Installation via npm
            </Typography>
            <Row
              backgroundColor="neutral/70"
              p={2}
              borderRadius={1}
              position="relative"
              overflow="auto"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="bodySRegular" component="pre" color="white">
                {`npm install @cegid/vsb-cds-react @cegid/cds-react
npm install @emotion/react @emotion/styled @mui/material`}
              </Typography>
              <IconButton
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      "npm install @cegid/vsb-cds-react @cegid/cds-react\nnpm install @emotion/react @emotion/styled @mui/material"
                    );
                    showToast("success");
                  } catch {
                    showToast("error");
                  }
                }}
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "white",
                  zIndex: 10,
                  backgroundColor: "rgba(0,0,0,0.2)",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.3)",
                  },
                }}
              >
                <Icon size={16}>copy-01</Icon>
              </IconButton>
            </Row>
          </Box>
        </Stack>
      </Box>

      {/* Configuration Section */}
      <Box id="configuration" mb={6}>
        <Stack spacing={4}>
          <Box>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Icon size={24} color="neutral/10">
                settings-01
              </Icon>
              <Typography
                variant="headLineMSemiBold"
                component="h2"
                color="neutral/10"
              >
                Configuration
              </Typography>
            </Stack>
            <Typography variant="bodyMRegular" color="neutral/70" paragraph>
              Configure your application with the necessary providers.
            </Typography>
          </Box>

          <Box
            backgroundColor="neutral/99"
            p={3}
            borderRadius={2}
            border={{ color: "neutral/90", width: 1, style: "solid" }}
          >
            <Typography variant="bodyMSemiBold" color="neutral/10" gutterBottom>
              Basic configuration
            </Typography>
            <Box
              backgroundColor="neutral/70"
              p={3}
              borderRadius={1}
              overflow="auto"
              sx={{
                color: "white",
                fontFamily: "monospace",
              }}
            >
              <Typography variant="bodySRegular" component="pre" color="white">
                {`import React from 'react';
import { VSBThemeProvider, ToasterProvider } from '@cegid/vsb-cds-react';
import '@cegid/vsb-cds-react/fonts.css';
import '@cegid/vsb-cds-react/icons.css';

function App() {
  return (
    <VSBThemeProvider>
      <ToasterProvider>
        {/* Your application */}
      </ToasterProvider>
    </VSBThemeProvider>
  );
}`}
              </Typography>
            </Box>
          </Box>

          <Alert
            variant="warning"
            title="Important"
            description="Don't forget to import the CSS files for fonts and icons."
          />
        </Stack>
      </Box>

      {/* Architecture Section */}
      <Box id="architecture" mb={6}>
        <Stack spacing={4}>
          <Box>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Icon size={24} color="neutral/10">
                building-01
              </Icon>
              <Typography
                variant="headLineMSemiBold"
                component="h2"
                color="neutral/10"
              >
                Project Architecture
              </Typography>
            </Stack>
            <Typography variant="bodyMRegular" color="neutral/70" paragraph>
              A modular and extensible structure for an optimal developer
              experience.
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            {[
              {
                title: "Components",
                icon: "puzzle",
                color: "primary",
                items: [
                  "35+ UI components",
                  "Storybook stories",
                  "Integrated tests",
                  "Complete documentation",
                ],
              },
              {
                title: "Theme",
                icon: "colors",
                color: "secondary",
                items: [
                  "Color palette",
                  "Typography",
                  "Spacing",
                  "Shadows & borders",
                ],
              },
              {
                title: "Providers",
                icon: "layers-01",
                color: "success",
                items: [
                  "VSBThemeProvider",
                  "ToasterProvider",
                  "Contexts",
                  "Global configuration",
                ],
              },
            ].map((section, index) => (
              <Box
                key={`section-${section.title}`}
                flex={1}
                p={3}
                borderRadius={2}
                backgroundColor={`${section.color}/95` as CustomColorString}
                border={{
                  color: `${section.color}/80` as CustomColorString,
                  width: 1,
                  style: "solid",
                }}
              >
                <Stack spacing={2} alignItems="center" textAlign="center">
                  <Box
                    width={60}
                    height={60}
                    backgroundColor={`${section.color}/50` as CustomColorString}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      borderRadius: "50%",
                      color: "white",
                    }}
                  >
                    <Icon size={24}>{section.icon}</Icon>
                  </Box>

                  <Typography variant="titleLSemiBold" color="neutral/10">
                    {section.title}
                  </Typography>

                  <Stack spacing={1}>
                    {section.items.map((item, i) => (
                      <Typography
                        key={i}
                        variant="bodySRegular"
                        color="neutral/50"
                      >
                        • {item}
                      </Typography>
                    ))}
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Stack>

          {/* File Structure */}
          <Column
            backgroundColor="neutral/99"
            p={3}
            borderRadius={2}
            border={{ color: "neutral/90", width: 1, style: "solid" }}
          >
            <Typography variant="bodyMSemiBold" color="neutral/10">
              Project Structure
            </Typography>
            <Typography variant="bodyMRegular" color="neutral/70" paragraph>
              Clean and organized file structure for easy navigation and
              maintenance.
            </Typography>
            <Box
              backgroundColor="neutral/70"
              p={3}
              borderRadius={1}
              overflow="auto"
              sx={{
                color: "white",
                fontFamily: "monospace",
              }}
            >
              <Typography variant="bodySRegular" component="pre" color="white">
                {`vsb-cds-react/
├── src/
│   ├── components/           # UI Components
│   │   ├── Alert/           # Alert component
│   │   ├── Avatar/          # Avatar component
│   │   ├── Badge/           # Badge component
│   │   ├── Box/             # Layout Box component
│   │   ├── Button/          # Button component
│   │   ├── Chip/            # Chip component
│   │   ├── Icon/            # Icon component
│   │   ├── Typography/      # Typography component
│   │   └── ...              # 35+ components
│   │
│   ├── theme/               # Theme configuration
│   │   ├── colors.ts        # Color palette
│   │   ├── typography.ts    # Typography styles
│   │   ├── spacing.ts       # Spacing system
│   │   └── theme.tsx        # VSBThemeProvider
│   │
│   ├── stories/             # Storybook documentation
│   │   ├── Documentation.stories.tsx
│   │   └── ...
│   │
│   └── index.ts             # Main exports
│
├── .storybook/              # Storybook configuration
├── package.json             # Dependencies & scripts
└── README.md                # Project documentation`}
              </Typography>
            </Box>
          </Column>
        </Stack>
      </Box>

      {/* Footer */}
      <Box
        textAlign="center"
        py={4}
        mt={6}
        borderTop={{ color: "neutral/90", width: 1, style: "solid" }}
      >
        <Stack spacing={3} alignItems="center">
          <Typography variant="titleLSemiBold" color="neutral/10">
            Ready to get started?
          </Typography>
          <Typography variant="bodyMRegular" color="neutral/70" maxWidth={500}>
            Explore our complete collection of components and start building
            exceptional interfaces with the BIM! by Cegid design system.
          </Typography>

          <Button
            variant="outlined"
            startIcon={<Icon size={16}>github</Icon>}
            component="a"
            href="https://github.com/cegid/vsb-cds-react"
            rel="noopener noreferrer"
          >
            Source code
          </Button>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="captionRegular" color="neutral/60">
              v{version} • Made with
            </Typography>
            <Icon size={12} color="critical/50">
              heart
            </Icon>
            <Typography variant="captionRegular" color="neutral/60">
              by Cegid
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

const Documentation = () => {
  return (
    <VSBThemeProvider>
      <ToasterProvider>
        <Box
          minHeight="100vh"
          backgroundColor="white"
          position="relative"
          zIndex={1}
        >
          <DocumentationContent />
        </Box>
      </ToasterProvider>
    </VSBThemeProvider>
  );
};

const meta: Meta<typeof Documentation> = {
  title: "📖 Documentation/Complete Guide",
  component: Documentation,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "white" },
        { name: "dark", value: "neutral/20" },
      ],
    },
    docs: {
      description: {
        component:
          "Complete installation and usage guide for the VSB CDS React design system",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Documentation>;

export const Documentation_Complete: Story = {
  name: "📖 Complete Documentation",
  parameters: {
    docs: {
      description: {
        story:
          "Interactive documentation presenting the installation, architecture, and usage of the design system components.",
      },
    },
  },
};
