import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "../components/Box";
import Typography from "../components/Typography";
import Stack from "../components/Stack";
import Button from "../components/Button";

const meta = {
  title: "Introduction/Architecture",
  parameters: {
    layout: "padded",
    docs: {
      page: () => (
        <Box p={4}>
          <Typography variant="headingL" mb={4}>
            🏗️ Component Architecture
          </Typography>

          <Typography variant="headingM" mb={3}>
            Project Structure
          </Typography>
          <Box 
            component="pre" 
            p={3} 
            backgroundColor="neutral/95" 
            borderRadius="4px" 
            mb={4}
            sx={{ overflow: 'auto' }}
          >
            <Typography variant="bodySRegular" component="code">
              {`src/
├── components/          # 46+ UI components with Storybook stories
│   ├── Alert/
│   ├── Button/
│   ├── DatePicker/     # Recently refactored with modular architecture
│   │   ├── components/ # Sub-components (CalendarGrid, TimeSelector, etc.)
│   │   ├── hooks/      # Custom hooks (useCalendar, useDatePicker)
│   │   └── DatePicker.tsx
│   ├── NavigationBar/
│   ├── TextField/
│   └── ...
├── theme/              # VSB Design System
│   ├── colors.ts       # Color palettes
│   ├── typography.ts   # Typography system
│   ├── spacing.ts      # Spacing scale
│   ├── shadows.ts      # Elevation system
│   ├── radius.ts       # Border radius tokens
│   ├── fonts/          # DM Sans font files
│   └── icons/          # HugeIcons font files
└── index.ts            # Main entry point`}
            </Typography>
          </Box>

          <Typography variant="headingM" mb={3}>
            Component Categories
          </Typography>

          <Stack spacing={4} mb={6}>
            <Box>
              <Typography variant="headingS" mb={2}>
                🎛️ Form Controls
              </Typography>
              <Stack spacing={1}>
                <Typography variant="bodyMRegular">
                  • Button (4 variants: contained, outlined, text, tonal)
                </Typography>
                <Typography variant="bodyMRegular">
                  • TextField, Select, AutoComplete
                </Typography>
                <Typography variant="bodyMRegular">
                  • Checkbox, Radio, Switch
                </Typography>
                <Typography variant="bodyMRegular">
                  • DatePicker (newly refactored with modular architecture)
                </Typography>
              </Stack>
            </Box>

            <Box>
              <Typography variant="headingS" mb={2}>
                🧭 Navigation & Layout
              </Typography>
              <Stack spacing={1}>
                <Typography variant="bodyMRegular">
                  • NavigationBar (responsive with sidebar)
                </Typography>
                <Typography variant="bodyMRegular">
                  • Header, Breadcrumbs, Tabs
                </Typography>
                <Typography variant="bodyMRegular">
                  • Stack, Box, Row, Column
                </Typography>
              </Stack>
            </Box>

            <Box>
              <Typography variant="headingS" mb={2}>
                📊 Data Display
              </Typography>
              <Stack spacing={1}>
                <Typography variant="bodyMRegular">
                  • Table (with TableBody, TableCell, etc.)
                </Typography>
                <Typography variant="bodyMRegular">
                  • List, ListItem
                </Typography>
                <Typography variant="bodyMRegular">
                  • Typography, Icon, Avatar, Badge, Chip
                </Typography>
              </Stack>
            </Box>

            <Box>
              <Typography variant="headingS" mb={2}>
                💬 Feedback
              </Typography>
              <Stack spacing={1}>
                <Typography variant="bodyMRegular">
                  • Alert, Dialog, Tooltip, Snackbar
                </Typography>
                <Typography variant="bodyMRegular">
                  • ProgressBar, Status
                </Typography>
                <Typography variant="bodyMRegular">
                  • ToasterProvider (notifications system)
                </Typography>
              </Stack>
            </Box>
          </Stack>

          <Typography variant="headingM" mb={3}>
            Modern React Patterns
          </Typography>
          <Typography variant="bodyMRegular" mb={3}>
            Our components follow modern React patterns:
          </Typography>
          <Stack spacing={1} mb={6}>
            <Typography variant="bodyMRegular">• <strong>Functional components</strong> with TypeScript</Typography>
            <Typography variant="bodyMRegular">• <strong>Custom hooks</strong> for business logic</Typography>
            <Typography variant="bodyMRegular">• <strong>Modular architecture</strong> (see DatePicker refactoring)</Typography>
            <Typography variant="bodyMRegular">• <strong>Storybook stories</strong> for documentation and testing</Typography>
            <Typography variant="bodyMRegular">• <strong>Accessibility-first</strong> design</Typography>
          </Stack>

          <Typography variant="headingM" mb={3}>
            Design Tokens
          </Typography>

          <Stack spacing={3} mb={6}>
            <Box>
              <Typography variant="headingS" mb={2}>
                🎨 Color System
              </Typography>
              <Stack spacing={1}>
                <Typography variant="bodyMRegular">• Primary: Blue brand colors (#0C51FF to #E8F7FF)</Typography>
                <Typography variant="bodyMRegular">• Secondary: Orange brand colors (#ED4D09 to #FFEBD4)</Typography>
                <Typography variant="bodyMRegular">• Neutral: Gray scale (#232529 to #F5F6F6)</Typography>
                <Typography variant="bodyMRegular">• Semantic: Success, Error, Warning, Info with variations</Typography>
              </Stack>
            </Box>

            <Box>
              <Typography variant="headingS" mb={2}>
                📝 Typography
              </Typography>
              <Typography variant="bodyMRegular">
                Built with <strong>DM Sans</strong> font family with multiple weights and sizes.
              </Typography>
            </Box>

            <Box>
              <Typography variant="headingS" mb={2}>
                📏 Spacing
              </Typography>
              <Typography variant="bodyMRegular">
                Consistent spacing based on 4px multiples: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128
              </Typography>
            </Box>
          </Stack>

          <Box p={3} backgroundColor="primary/95" borderRadius="4px" mb={4}>
            <Typography variant="bodyMSemiBold" mb={2}>
              💡 Explore Components
            </Typography>
            <Typography variant="bodyMRegular" mb={3}>
              Explore the individual component documentation for detailed usage examples and interactive controls.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button 
                variant="contained" 
                size="small"
                onClick={() => {
                  // Navigation vers une story de composant
                  const sidebar = document.querySelector('[data-item-id="components-buttons-button--docs"]');
                  if (sidebar) {
                    (sidebar as HTMLElement).click();
                  }
                }}
              >
                View Button
              </Button>
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => {
                  const sidebar = document.querySelector('[data-item-id="components-inputs-datepicker--docs"]');
                  if (sidebar) {
                    (sidebar as HTMLElement).click();
                  }
                }}
              >
                View DatePicker
              </Button>
            </Stack>
          </Box>
        </Box>
      ),
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Architecture: Story = {
  render: () => null,
};