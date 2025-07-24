# VSB CDS React

[![Version](https://img.shields.io/npm/v/@cegid/vsb-cds-react)](https://www.npmjs.com/package/@cegid/vsb-cds-react)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

> The BIM! by Cegid theme for the Cegid Design System

VSB CDS React is a specialized extension of the Cegid Design System, providing a comprehensive UI component library optimized for BIM! applications with a custom VSB theme, enhanced components, and modular architecture.

## 🚀 Quick Start

### Installation

```bash
npm install @cegid/vsb-cds-react
```

### Peer Dependencies

Ensure you have the following peer dependencies installed:

```bash
npm install react@^18.3.1 react-dom@^18.3.1 @mui/material@^5.0.0 @emotion/react@^11.0.0 @emotion/styled@^11.0.0 @cegid/cds-react@^3.26.1
```

### Setup

Import the required styles and wrap your app with the theme provider:

```tsx
import React from 'react';
import { VSBThemeProvider } from '@cegid/vsb-cds-react';
import '@cegid/vsb-cds-react/fonts.css';
import '@cegid/vsb-cds-react/icons.css';

function App() {
  return (
    <VSBThemeProvider>
      {/* Your app components */}
    </VSBThemeProvider>
  );
}

export default App;
```

## 📦 What's Included

### 46+ UI Components

Our comprehensive component library includes:

#### **Form Controls**
- Button (4 variants: contained, outlined, text, tonal)
- TextField, Select, AutoComplete
- Checkbox, Radio, Switch
- DatePicker (newly refactored with modular architecture)

#### **Navigation & Layout**
- NavigationBar (responsive with sidebar)
- Header, Breadcrumbs, Tabs
- Stack, Box, Row, Column

#### **Data Display**
- Table (with TableBody, TableCell, etc.)
- List, ListItem
- Typography, Icon, Avatar, Badge, Chip

#### **Feedback**
- Alert, Dialog, Tooltip, Snackbar
- ProgressBar, Status
- ToasterProvider (notifications system)

## 🎨 Design System

### Color Palette

The VSB theme features carefully crafted color palettes with 11 levels (10-99):

- **Primary**: Blue brand colors (#0C51FF to #E8F7FF)
- **Secondary**: Orange brand colors (#ED4D09 to #FFEBD4)  
- **Neutral**: Gray scale (#232529 to #F5F6F6)
- **Semantic**: Success, Error, Warning, Info with variations

### Typography

Built with **DM Sans** font family:

- **Headings**: H1 to H6
- **Body**: Large, Medium, Small
- **Caption** and **Label** variants
- **Weights**: Regular, Medium, SemiBold

### Spacing System

Consistent spacing based on 4px multiples: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128

## 💡 Usage Examples

### Basic Button

```tsx
import { Button, Icon } from '@cegid/vsb-cds-react';

// Primary button
<Button variant="contained" color="primary">
  Save Changes
</Button>

// Button with icon
<Button 
  variant="outlined" 
  startIcon={<Icon>add-01</Icon>}
  size="medium"
>
  Add Item
</Button>
```

### Navigation Bar

```tsx
import { NavigationBar } from '@cegid/vsb-cds-react';

<NavigationBar
  headerNavItems={[
    { label: 'Dashboard', href: '/dashboard', icon: 'home-01' },
    { label: 'Projects', href: '/projects', icon: 'folder-01' }
  ]}
  bodyNavItems={[
    { label: 'Settings', href: '/settings', icon: 'settings-01' }
  ]}
  userFirstName="John"
  userLastName="Doe" 
  userTrigram="JD"
  onLogOut={() => handleLogout()}
/>
```

### Form Fields

```tsx
import { TextField, Select, DatePicker } from '@cegid/vsb-cds-react';

<TextField
  label="Project Name"
  placeholder="Enter project name"
  value={projectName}
  onChange={(e) => setProjectName(e.target.value)}
/>

<DatePicker
  label="Due Date"
  value={dueDate}
  onChange={(date) => setDueDate(date)}
  locale="fr"
/>
```

### Notifications

```tsx
import { ToasterProvider, useToaster } from '@cegid/vsb-cds-react';

// Wrap your app
<ToasterProvider>
  <App />
</ToasterProvider>

// Use in components
const { showToast } = useToaster();

showToast('Success message', { severity: 'success' });
```

## 🛠️ Development

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Scripts

```bash
# Start Storybook development server
npm run storybook

# Build the library
npm run build

# Build for development
npm run build:dev

# Build Storybook static site
npm run build-storybook
```

### Project Structure

```
src/
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
└── index.ts            # Main entry point
```

### Component Architecture

Our components follow modern React patterns:

- **Functional components** with TypeScript
- **Custom hooks** for business logic
- **Modular architecture** (see DatePicker refactoring)
- **Storybook stories** for documentation and testing
- **Accessibility-first** design

### Recent Improvements

#### DatePicker Refactoring ✨

The DatePicker component has been completely refactored with:

- **Custom hooks** (`useCalendar`, `useDatePicker`) for state management
- **Sub-components** (`CalendarGrid`, `MonthYearSelector`, `TimeSelector`)
- **70% code reduction** in main component
- **Improved maintainability** and testability
- **Enhanced reusability** of sub-components

## 🧪 Storybook

Explore all components and their variations in our interactive Storybook:

**Live Demo**: [https://my-storybook.chazam.tech/](https://my-storybook.chazam.tech/)

Or run locally:
```bash
npm run storybook
```

Visit `http://localhost:6006` to see:
- Live component examples
- Interactive controls
- Documentation
- Accessibility testing
- Multiple variants and states

## 📝 Contributing

### Development Workflow

1. Create your feature branch: `git checkout -b feature/my-new-feature`
2. Make your changes and add stories
3. Test your component in Storybook
4. Run build to ensure no TypeScript errors
5. Submit a pull request

### Component Guidelines

- Follow existing patterns and naming conventions
- Include comprehensive TypeScript types
- Add Storybook stories with multiple variants
- Ensure accessibility compliance
- Follow the VSB design system tokens

## 🔧 Technical Details

### Build Configuration

- **TypeScript**: ES2020 target with strict mode
- **Vite**: Modern build tooling with ES/CJS output
- **External Dependencies**: React, MUI, and Emotion are externalized
- **Assets**: Fonts and icons automatically copied to dist

### Browser Support

- Chrome ≥ 88
- Firefox ≥ 88  
- Safari ≥ 14
- Edge ≥ 88

## 📄 License

ISC © Cegid

## 🔗 Related Packages

- [`@cegid/cds-react`](https://cds-website.azurewebsites.net/) - Base Cegid Design System

---

For more information and detailed documentation, visit our [Live Storybook](https://my-storybook.chazam.tech/) or check the individual component stories.