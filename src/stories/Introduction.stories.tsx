import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "../components/Box";
import Typography from "../components/Typography";
import Button from "../components/Button";
import Stack from "../components/Stack";

const meta = {
  title: "Introduction/Getting Started",
  parameters: {
    layout: "padded",
    docs: {
      page: () => (
        <Box p={4}>
          <Typography variant="headingL" mb={4}>
            VSB CDS React
          </Typography>
          
          <Typography variant="bodyLRegular" mb={4} color="neutral/50">
            The BIM! by Cegid theme for the Cegid Design System
          </Typography>
          
          <Typography variant="bodyMRegular" mb={6}>
            VSB CDS React is a specialized extension of the Cegid Design System, providing a comprehensive 
            UI component library optimized for BIM! applications with a custom VSB theme, enhanced components, 
            and modular architecture.
          </Typography>

          <Typography variant="headingM" mb={3}>
            🚀 Quick Start
          </Typography>

          <Typography variant="headingS" mb={2}>
            Installation
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
              npm install @cegid/vsb-cds-react
            </Typography>
          </Box>

          <Typography variant="headingS" mb={2}>
            Peer Dependencies
          </Typography>
          <Typography variant="bodyMRegular" mb={3}>
            Ensure you have the following peer dependencies installed:
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
              {`npm install react@^18.3.1 react-dom@^18.3.1 @mui/material@^5.0.0 \\
  @emotion/react@^11.0.0 @emotion/styled@^11.0.0 @cegid/cds-react@^3.26.1`}
            </Typography>
          </Box>

          <Typography variant="headingS" mb={2}>
            Setup
          </Typography>
          <Typography variant="bodyMRegular" mb={3}>
            Import the required styles and wrap your app with the theme provider:
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
              {`import React from 'react';
import { VSBThemeProvider } from '@cegid/vsb-cds-react';
import '@cegid/vsb-cds-react/fonts.css';
import '@cegid/vsb-cds-react/icons.css';

function App() {
  return (
    <VSBThemeProvider>
      {/* Your app components */}
    </VSBThemeProvider>
  );
}`}
            </Typography>
          </Box>

          <Typography variant="headingM" mb={3}>
            📦 What's Included
          </Typography>

          <Typography variant="headingS" mb={2}>
            46+ UI Components
          </Typography>
          <Typography variant="bodyMRegular" mb={4}>
            Our comprehensive component library includes:
          </Typography>

          <Stack spacing={3} mb={4}>
            <Box>
              <Typography variant="bodyMSemiBold" mb={2}>
                🎛️ Form Controls
              </Typography>
              <Typography variant="bodyMRegular">
                Button (4 variants: contained, outlined, text, tonal), TextField, Select, AutoComplete, 
                Checkbox, Radio, Switch, DatePicker (newly refactored with modular architecture)
              </Typography>
            </Box>

            <Box>
              <Typography variant="bodyMSemiBold" mb={2}>
                🧭 Navigation & Layout
              </Typography>
              <Typography variant="bodyMRegular">
                NavigationBar (responsive with sidebar), Header, Breadcrumbs, Tabs, Stack, Box, Row, Column
              </Typography>
            </Box>

            <Box>
              <Typography variant="bodyMSemiBold" mb={2}>
                📊 Data Display
              </Typography>
              <Typography variant="bodyMRegular">
                Table (with TableBody, TableCell, etc.), List, ListItem, Typography, Icon, Avatar, Badge, Chip
              </Typography>
            </Box>

            <Box>
              <Typography variant="bodyMSemiBold" mb={2}>
                💬 Feedback
              </Typography>
              <Typography variant="bodyMRegular">
                Alert, Dialog, Tooltip, Snackbar, ProgressBar, Status, ToasterProvider (notifications system)
              </Typography>
            </Box>
          </Stack>

          <Typography variant="headingM" mb={3}>
            🎨 Design System
          </Typography>

          <Typography variant="headingS" mb={2}>
            Color Palette
          </Typography>
          <Typography variant="bodyMRegular" mb={3}>
            The VSB theme features carefully crafted color palettes with 11 levels (10-99):
          </Typography>
          <Stack spacing={1} mb={4}>
            <Typography variant="bodyMRegular">• <strong>Primary:</strong> Blue brand colors (#0C51FF to #E8F7FF)</Typography>
            <Typography variant="bodyMRegular">• <strong>Secondary:</strong> Orange brand colors (#ED4D09 to #FFEBD4)</Typography>
            <Typography variant="bodyMRegular">• <strong>Neutral:</strong> Gray scale (#232529 to #F5F6F6)</Typography>
            <Typography variant="bodyMRegular">• <strong>Semantic:</strong> Success, Error, Warning, Info with variations</Typography>
          </Stack>

          <Typography variant="headingS" mb={2}>
            Typography
          </Typography>
          <Typography variant="bodyMRegular" mb={3}>
            Built with <strong>DM Sans</strong> font family:
          </Typography>
          <Stack spacing={1} mb={4}>
            <Typography variant="bodyMRegular">• <strong>Headings:</strong> H1 to H6</Typography>
            <Typography variant="bodyMRegular">• <strong>Body:</strong> Large, Medium, Small</Typography>
            <Typography variant="bodyMRegular">• <strong>Caption</strong> and <strong>Label</strong> variants</Typography>
            <Typography variant="bodyMRegular">• <strong>Weights:</strong> Regular, Medium, SemiBold</Typography>
          </Stack>

          <Typography variant="headingS" mb={2}>
            Spacing System
          </Typography>
          <Typography variant="bodyMRegular" mb={4}>
            Consistent spacing based on 4px multiples: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128
          </Typography>

          <Typography variant="headingM" mb={3}>
            🔧 Recent Improvements
          </Typography>

          <Typography variant="headingS" mb={2}>
            DatePicker Refactoring ✨
          </Typography>
          <Typography variant="bodyMRegular" mb={3}>
            The DatePicker component has been completely refactored with:
          </Typography>
          <Stack spacing={1} mb={6}>
            <Typography variant="bodyMRegular">• <strong>Custom hooks</strong> (useCalendar, useDatePicker) for state management</Typography>
            <Typography variant="bodyMRegular">• <strong>Sub-components</strong> (CalendarGrid, MonthYearSelector, TimeSelector)</Typography>
            <Typography variant="bodyMRegular">• <strong>70% code reduction</strong> in main component</Typography>
            <Typography variant="bodyMRegular">• <strong>Improved maintainability</strong> and testability</Typography>
            <Typography variant="bodyMRegular">• <strong>Enhanced reusability</strong> of sub-components</Typography>
          </Stack>

          <Typography variant="headingM" mb={3}>
            🔗 Links
          </Typography>
          <Stack direction="row" spacing={2} mb={4}>
            <Button 
              variant="contained" 
              onClick={() => window.open('https://my-storybook.chazam.tech/', '_blank')}
            >
              Live Storybook
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => window.open('https://cds-website.azurewebsites.net/', '_blank')}
            >
              Base CDS
            </Button>
          </Stack>

          <Typography variant="bodyMRegular" color="neutral/50">
            ISC © Cegid
          </Typography>
        </Box>
      ),
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const GettingStarted: Story = {
  render: () => null,
};