import React, { useState, useMemo } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Illustration, illustrationNames, IllustrationName } from "@cegid/vsb-cds-illustrations";
import Column from "../components/Column";
import Row from "../components/Row";
import Typography from "../components/Typography";
import TextField from "../components/TextField";
import Box from "../components/Box";
import Badge from "../components/Badge";

const meta = {
  title: "🎨 Brand expression/Illustrations",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
This story showcases all available illustrations from the @cegid/vsb-cds-illustrations package.

## Installation

\`\`\`bash
npm install @cegid/vsb-cds-illustrations
\`\`\`

## Usage

\`\`\`tsx
import { Illustration } from '@cegid/vsb-cds-illustrations';

<Illustration name="warning" width={200} height={200} />

// Note: If you encounter React version conflicts in Storybook,
// you can import directly from the source:
// import { iconsMap } from '@cegid/vsb-cds-illustrations/src/generated/icons';
\`\`\`

## Available Illustrations

Use the search bar below to filter through ${illustrationNames.length} available illustrations.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const IllustrationGallery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIllustration, setSelectedIllustration] = useState<IllustrationName | null>(null);

  const filteredIllustrations = useMemo(() => {
    if (!searchQuery) return illustrationNames;
    return illustrationNames.filter((name) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const copyToClipboard = (name: IllustrationName) => {
    const code = `<Illustration name="${name}" width={200} height={200} />`;
    navigator.clipboard.writeText(code);
    setSelectedIllustration(name);
    setTimeout(() => setSelectedIllustration(null), 2000);
  };

  return (
    <Column gap={6}>
      {/* Header */}
      <Column gap={2}>
        <Typography variant="displayMSemiBold" color="neutral/10">
          Illustrations Gallery
        </Typography>
        <Typography variant="bodyMRegular" color="neutral/50">
          Browse and search through {illustrationNames.length} illustrations. Click on any illustration to copy its usage code.
        </Typography>
      </Column>

      {/* Search Bar */}
      <TextField
        placeholder="Search illustrations... (e.g., 'warning', 'user', 'document')"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
      />

      {/* Results Count */}
      <Row alignItems="center" gap={2}>
        <Typography variant="bodyMSemiBold" color="neutral/30">
          {filteredIllustrations.length} illustration{filteredIllustrations.length !== 1 ? 's' : ''} found
        </Typography>
        {searchQuery && (
          <Badge color="primary" size="small">
            {searchQuery}
          </Badge>
        )}
      </Row>

      {/* Gallery Grid */}
      {filteredIllustrations.length > 0 ? (
        <Box
          display="grid"
          sx={{
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
            },
            gap: 4,
          }}
        >
          {filteredIllustrations.map((name) => (
            <Column
              key={name}
              gap={2}
              p={4}
              borderRadius={3}
              border={{ width: 1, color: "neutral/90", style: "solid" }}
              alignItems="center"
              justifyContent="center"
              sx={{
                cursor: "pointer",
                transition: "all 0.2s ease",
                position: "relative",
                "&:hover": {
                  borderColor: "primary/60",
                  backgroundColor: "primary/99",
                  transform: "translateY(-4px)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
              }}
              onClick={() => copyToClipboard(name)}
            >
              {/* Copy Confirmation Badge */}
              {selectedIllustration === name && (
                <Box
                  position="absolute"
                  top={2}
                  right={2}
                >
                  <Badge color="success" size="medium">
                    Copied!
                  </Badge>
                </Box>
              )}

              {/* Illustration */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height={120}
              >
                <Illustration name={name} width={100} height={100} />
              </Box>

              {/* Illustration Name */}
              <Typography
                variant="captionRegular"
                color="neutral/50"
                sx={{
                  textAlign: "center",
                  wordBreak: "break-word",
                  fontSize: "11px",
                }}
              >
                {name}
              </Typography>
            </Column>
          ))}
        </Box>
      ) : (
        <Column gap={4} alignItems="center" py={12}>
          <Illustration name="search" width={150} height={150} />
          <Column gap={1} alignItems="center">
            <Typography variant="bodyMSemiBold" color="neutral/30">
              No illustrations found
            </Typography>
            <Typography variant="bodyMRegular" color="neutral/50">
              Try a different search term
            </Typography>
          </Column>
        </Column>
      )}

      {/* Usage Example */}
      <Column
        gap={3}
        p={6}
        borderRadius={3}
        backgroundColor="neutral/99"
        border={{ width: 1, color: "neutral/95", style: "solid" }}
        mt={4}
      >
        <Typography variant="bodyMSemiBold" color="neutral/10">
          Usage Example
        </Typography>
        <Box
          p={4}
          borderRadius={2}
          backgroundColor="neutral/10"
          sx={{
            fontFamily: "monospace",
            fontSize: "14px",
            color: "#f8f8f2",
            overflowX: "auto",
          }}
        >
          <pre style={{ margin: 0 }}>
{`import { Illustration } from '@cegid/vsb-cds-illustrations';

// Basic usage
<Illustration name="warning" />

// Custom size
<Illustration
  name="warning"
  width={200}
  height={200}
/>

// With additional styling
<Illustration
  name="warning"
  width={150}
  height={150}
  className="my-class"
  style={{ opacity: 0.8 }}
/>`}
          </pre>
        </Box>
      </Column>

      {/* Available Props */}
      <Column
        gap={3}
        p={6}
        borderRadius={3}
        backgroundColor="info/99"
        border={{ width: 1, color: "info/95", style: "solid" }}
      >
        <Typography variant="bodyMSemiBold" color="neutral/10">
          Available Props
        </Typography>
        <Column gap={3}>
          <Row gap={2}>
            <Box
              px={2}
              py={1}
              borderRadius={1}
              backgroundColor="info/90"
            >
              <Typography variant="captionRegular" color="info/30" sx={{ fontFamily: "monospace" }}>
                name
              </Typography>
            </Box>
            <Typography variant="bodyMRegular" color="neutral/50">
              <strong>IllustrationName</strong> (required) - Name of the illustration to display
            </Typography>
          </Row>
          <Row gap={2}>
            <Box
              px={2}
              py={1}
              borderRadius={1}
              backgroundColor="info/90"
            >
              <Typography variant="captionRegular" color="info/30" sx={{ fontFamily: "monospace" }}>
                width
              </Typography>
            </Box>
            <Typography variant="bodyMRegular" color="neutral/50">
              <strong>number | string</strong> (optional, default: 141.73) - Width of the illustration
            </Typography>
          </Row>
          <Row gap={2}>
            <Box
              px={2}
              py={1}
              borderRadius={1}
              backgroundColor="info/90"
            >
              <Typography variant="captionRegular" color="info/30" sx={{ fontFamily: "monospace" }}>
                height
              </Typography>
            </Box>
            <Typography variant="bodyMRegular" color="neutral/50">
              <strong>number | string</strong> (optional, default: 141.73) - Height of the illustration
            </Typography>
          </Row>
          <Row gap={2}>
            <Box
              px={2}
              py={1}
              borderRadius={1}
              backgroundColor="info/90"
            >
              <Typography variant="captionRegular" color="info/30" sx={{ fontFamily: "monospace" }}>
                className
              </Typography>
            </Box>
            <Typography variant="bodyMRegular" color="neutral/50">
              <strong>string</strong> (optional) - Additional CSS class name
            </Typography>
          </Row>
          <Row gap={2}>
            <Box
              px={2}
              py={1}
              borderRadius={1}
              backgroundColor="info/90"
            >
              <Typography variant="captionRegular" color="info/30" sx={{ fontFamily: "monospace" }}>
                style
              </Typography>
            </Box>
            <Typography variant="bodyMRegular" color="neutral/50">
              <strong>React.CSSProperties</strong> (optional) - Additional inline styles
            </Typography>
          </Row>
        </Column>
      </Column>
    </Column>
  );
};

export const Gallery: Story = {
  render: () => <IllustrationGallery />,
};
