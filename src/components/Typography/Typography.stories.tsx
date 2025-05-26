import type { Meta, StoryObj } from '@storybook/react';

import Typography from './Typography';
import Stack from '../Stack';
import Box from '../Box';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'titleLRegular',
        'titleLSemiBold',
        'titleMRegular',
        'titleMSemiBold',
        'titleSRegular',
        'titleSSemiBold',
        'bodyMRegular',
        'bodyMSemiBold',
        'bodySRegular',
        'bodySMedium',
        'bodySSemiBold',
        'bodyXSRegular',
        'bodyXSSemiBold',
      ],
      description: 'The variant to use',
    },
    color: {
      control: 'text',
      description:
        'The color of the component. Can use format "palette/shade" (e.g., "primary/50")',
    },
    align: {
      control: 'select',
      options: ['inherit', 'left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    component: {
      control: 'select',
      options: ['span', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label'],
      description: 'The HTML element or React component to render',
    },
  },
  args: {
    variant: 'bodyMRegular',
    align: 'inherit',
    component: 'span',
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {},
  render: (args) => <Typography {...args}>Default Typography Text</Typography>,
};

export const Variants: Story = {
  render: (args) => (
    <Stack spacing={2}>
      <Typography {...args} variant="titleLSemiBold">
        titleLSemiBold - Weight: 600 - Size: 28px - Line Height: 36px
      </Typography>
      <Typography {...args} variant="titleLRegular">
        titleLRegular - Weight: 400 - Size: 28px - Line Height: 36px
      </Typography>
      <Typography {...args} variant="titleMSemiBold">
        titleMSemiBold - Weight: 600 - Size: 24px - Line Height: 36px
      </Typography>
      <Typography {...args} variant="titleMRegular">
        titleMRegular - Weight: 400 - Size: 24px - Line Height: 36px
      </Typography>
      <Typography {...args} variant="titleSSemiBold">
        titleSSemiBold - Weight: 600 - Size: 20px - Line Height: 32px
      </Typography>
      <Typography {...args} variant="titleSRegular">
        titleSRegular - Weight: 400 - Size: 20px - Line Height: 32px
      </Typography>

      <Box mt={2} />

      <Typography {...args} variant="bodyMSemiBold">
        bodyMSemiBold - Weight: 600 - Size: 16px - Line Height: 24px
      </Typography>
      <Typography {...args} variant="bodyMRegular">
        bodyMRegular - Weight: 400 - Size: 16px - Line Height: 24px
      </Typography>
      <Typography {...args} variant="bodySSemiBold">
        bodySSemiBold - Weight: 600 - Size: 14px - Line Height: 20px
      </Typography>
      <Typography {...args} variant="bodySMedium">
        bodySMedium - Weight: 500 - Size: 14px - Line Height: 20px
      </Typography>
      <Typography {...args} variant="bodySRegular">
        bodySRegular - Weight: 400 - Size: 14px - Line Height: 20px
      </Typography>
      <Typography {...args} variant="bodyXSSemiBold">
        bodyXSSemiBold - Weight: 600 - Size: 12px - Line Height: 16px
      </Typography>
      <Typography {...args} variant="bodyXSRegular">
        bodyXSRegular - Weight: 400 - Size: 12px - Line Height: 16px
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
    <Stack spacing={2} sx={{ width: '100%', maxWidth: '500px' }}>
      <Typography {...args} align="left">
        This text is left aligned. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Typography {...args} align="center">
        This text is center aligned. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Typography {...args} align="right">
        This text is right aligned. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Typography {...args} align="justify">
        This text is justify aligned. Lorem ipsum dolor sit amet, consectetur adipiscing elit. This
        should stretch to fill the entire width of its container when there is enough text.
      </Typography>
    </Stack>
  ),
};

export const Components: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Box>
        <Typography {...args} variant="titleMSemiBold" component="h1">
          H1 - Rendered as h1 element
        </Typography>
        <Typography variant="bodySRegular" component="p" color="neutral/70">
          (Inspect the DOM to see the HTML element)
        </Typography>
      </Box>

      <Box>
        <Typography {...args} variant="titleSSemiBold" component="h2">
          H2 - Rendered as h2 element
        </Typography>
        <Typography variant="bodySRegular" component="p" color="neutral/70">
          (Inspect the DOM to see the HTML element)
        </Typography>
      </Box>

      <Box>
        <Typography {...args} variant="bodyMRegular" component="p">
          This is a paragraph rendered as a p element. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Box>

      <Box>
        <Typography {...args} variant="bodySRegular" component="div">
          This is text rendered as a div element. It maintains the typography styling
          but uses a div container instead of the default span.
        </Typography>
      </Box>

      <Box>
        <Typography {...args} variant="bodyXSRegular" component="label">
          This is rendered as a label element (useful for form labels)
        </Typography>
      </Box>

      <Box>
        <Typography {...args} variant="bodyMRegular" component="span">
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

      <Typography {...args} variant="titleMSemiBold" component="h2">
        Section Title (H2)
      </Typography>

      <Typography {...args} variant="titleSSemiBold" component="h3">
        Subsection Title (H3)
      </Typography>

      <Typography {...args} variant="bodyMRegular" component="p">
        This is body text in a paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris.
      </Typography>

      <Typography {...args} variant="titleSSemiBold" component="h4">
        Sub-subsection Title (H4)
      </Typography>

      <Typography {...args} variant="bodyMRegular" component="p">
        Another paragraph of body text to demonstrate the semantic structure.
        Each element uses the appropriate HTML tag for better accessibility and SEO.
      </Typography>
    </Stack>
  ),
};