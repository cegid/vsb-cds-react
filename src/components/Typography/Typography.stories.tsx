import type { Meta, StoryObj } from "@storybook/react-vite";

import Typography from "./Typography";
import Stack from "../Stack";
import Box from "../Box";

const meta = {
  title: "🎨 Styles/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "displayMRegular",
        "displayMSemiBold",
        "displaySRegular",
        "displaySSemiBold",
        "headLineMRegular",
        "headLineMSemiBold",
        "headLineSRegular",
        "headLineSSemiBold",
        "titleLRegular",
        "titleLSemiBold",
        "bodyMRegular",
        "bodyMSemiBold",
        "bodyMMedium",
        "bodySRegular",
        "bodySMedium",
        "bodySSemiBold",
        "captionSemiBold",
        "captionRegular",
      ],
      description: "The variant to use",
    },
    color: {
      control: "text",
      description:
        'The color of the component. Can use format "palette/shade" (e.g., "primary/50")',
    },
    align: {
      control: "select",
      options: ["inherit", "left", "center", "right", "justify"],
      description: "Text alignment",
    },
    component: {
      control: "select",
      options: [
        "span",
        "p",
        "div",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "label",
      ],
      description: "The HTML element or React component to render",
    },
  },
  args: {
    variant: "bodyMRegular",
    align: "inherit",
    component: "span",
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {},
  render: (args) => (
    <Typography {...args}>
      Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional,
      from historic temples to neon-lit skyscrapers.
    </Typography>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <Stack spacing={2}>
      {/* Display variants */}
      <Typography {...args} variant="displayMRegular">
        displayMRegular - Size: 45px - Line Height: 52px - Regular
      </Typography>
      <Typography {...args} variant="displayMSemiBold">
        displayMSemiBold - Size: 45px - Line Height: 52px - SemiBold
      </Typography>
      <Typography {...args} variant="displaySRegular">
        displaySRegular - Size: 36px - Line Height: 44px - Regular
      </Typography>
      <Typography {...args} variant="displaySSemiBold">
        displaySSemiBold - Size: 36px - Line Height: 44px - SemiBold
      </Typography>

      <Box mt={2} />

      {/* Headline variants */}
      <Typography {...args} variant="headLineMRegular">
        headLineMRegular - Size: 28px - Line Height: 36px - Regular
      </Typography>
      <Typography {...args} variant="headLineMSemiBold">
        headLineMSemiBold - Size: 28px - Line Height: 36px - SemiBold
      </Typography>
      <Typography {...args} variant="headLineSRegular">
        headLineSRegular - Size: 24px - Line Height: 36px - Regular
      </Typography>
      <Typography {...args} variant="headLineSSemiBold">
        headLineSSemiBold - Size: 24px - Line Height: 36px - SemiBold
      </Typography>

      <Box mt={2} />

      {/* Title variants */}
      <Typography {...args} variant="titleLRegular">
        titleLRegular - Size: 20px - Line Height: 32px - Regular
      </Typography>
      <Typography {...args} variant="titleLSemiBold">
        titleLSemiBold - Size: 20px - Line Height: 32px - SemiBold
      </Typography>

      <Box mt={2} />

      {/* Body variants */}
      <Typography {...args} variant="bodyMRegular">
        bodyMRegular - Size: 16px - Line Height: 24px - Regular
      </Typography>
      <Typography {...args} variant="bodyMMedium">
        bodyMMedium - Size: 16px - Line Height: 24px - Medium
      </Typography>
      <Typography {...args} variant="bodyMSemiBold">
        bodyMSemiBold - Size: 16px - Line Height: 24px - SemiBold
      </Typography>
      <Typography {...args} variant="bodySRegular">
        bodySRegular - Size: 14px - Line Height: 20px - Regular
      </Typography>
      <Typography {...args} variant="bodySMedium">
        bodySMedium - Size: 14px - Line Height: 20px - Medium
      </Typography>
      <Typography {...args} variant="bodySSemiBold">
        bodySSemiBold - Size: 14px - Line Height: 20px - SemiBold
      </Typography>

      <Box mt={2} />

      {/* Caption variants */}
      <Typography {...args} variant="captionRegular">
        captionRegular - Size: 12px - Line Height: 16px - Regular
      </Typography>
      <Typography {...args} variant="captionSemiBold">
        captionSemiBold - Size: 12px - Line Height: 16px - SemiBold
      </Typography>
    </Stack>
  ),
};

export const CustomColors: Story = {
  render: (args) => (
    <Stack spacing={2}>
      <Typography {...args} color="primary/50">
        primary/50 - Brand primary color
      </Typography>
      <Typography {...args} color="primary/70">
        primary/70 - Lighter primary
      </Typography>
      <Typography {...args} color="primary/90">
        primary/90 - Very light primary
      </Typography>
      <Typography {...args} color="secondary/50">
        secondary/50 - Brand secondary color
      </Typography>
      <Typography {...args} color="secondary/70">
        secondary/70 - Lighter secondary
      </Typography>
      <Typography {...args} color="neutral/50">
        neutral/50 - Neutral mid tone
      </Typography>
      <Typography {...args} color="neutral/70">
        neutral/70 - Lighter neutral
      </Typography>
      <Typography {...args} color="critical/50">
        critical/50 - Error/critical color
      </Typography>
      <Typography {...args} color="success/50">
        success/50 - Success color
      </Typography>
      <Typography {...args} color="info/50">
        info/50 - Information color
      </Typography>
    </Stack>
  ),
};

export const Alignment: Story = {
  render: (args) => (
    <Stack spacing={2} sx={{ width: "100%", maxWidth: "500px" }}>
      <Typography {...args} align="left">
        This text is left aligned. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit.
      </Typography>
      <Typography {...args} align="center">
        This text is center aligned. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit.
      </Typography>
      <Typography {...args} align="right">
        This text is right aligned. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit.
      </Typography>
      <Typography {...args} align="justify">
        This text is justify aligned. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. This should stretch to fill the entire width of its
        container when there is enough text.
      </Typography>
    </Stack>
  ),
};

export const Components: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Box>
        <Typography {...args} variant="titleLSemiBold" component="h1">
          H1 - Rendered as h1 element
        </Typography>
        <Typography variant="bodySRegular" component="p" color="neutral/70">
          (Inspect the DOM to see the HTML element)
        </Typography>
      </Box>

      <Box>
        <Typography {...args} variant="titleLSemiBold" component="h2">
          H2 - Rendered as h2 element
        </Typography>
        <Typography variant="bodySRegular" component="p" color="neutral/70">
          (Inspect the DOM to see the HTML element)
        </Typography>
      </Box>

      <Box>
        <Typography {...args} variant="bodyMRegular" component="p">
          This is a paragraph rendered as a p element. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua.
        </Typography>
      </Box>

      <Box>
        <Typography {...args} variant="bodySRegular" component="div">
          This is text rendered as a div element. It maintains the typography
          styling but uses a div container instead of the default span.
        </Typography>
      </Box>

      <Box>
        <Typography {...args} variant="caption" component="label">
          This is rendered as a label element (useful for form labels)
        </Typography>
      </Box>

      <Box>
        <Typography {...args} variant="caption" component="span">
          This is the default span element rendering.
        </Typography>
      </Box>
    </Stack>
  ),
};

export const SemanticHeaders: Story = {
  render: (args) => (
    <Stack spacing={2}>
      <Typography {...args} variant="titleLSemiBold" component="h1">
        Main Title (H1)
      </Typography>

      <Typography {...args} variant="titleLSemiBold" component="h2">
        Section Title (H2)
      </Typography>

      <Typography {...args} variant="titleLSemiBold" component="h3">
        Subsection Title (H3)
      </Typography>

      <Typography {...args} variant="bodyMRegular" component="p">
        This is body text in a paragraph. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris.
      </Typography>

      <Typography {...args} variant="titleLSemiBold" component="h4">
        Sub-subsection Title (H4)
      </Typography>

      <Typography {...args} variant="bodyMRegular" component="p">
        Another paragraph of body text to demonstrate the semantic structure.
        Each element uses the appropriate HTML tag for better accessibility and
        SEO.
      </Typography>
    </Stack>
  ),
};
