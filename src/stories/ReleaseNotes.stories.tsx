import { Meta, StoryObj } from "@storybook/react-vite";
import { version } from "../../package.json";
import {
  Alert,
  Box,
  Chip,
  Icon,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  IAChip,
  Column,
  Row,
} from "../components";
import VSBThemeProvider from "../theme/theme";
import { CustomColorString, primary } from "../theme";
import React from "react";

interface ReleaseNote {
  version: string;
  date?: string;
  changes: {
    component?: string;
    type: "new" | "fix" | "enhancement" | "style" | "breaking";
    description: string;
  }[];
}

const releaseNotes: ReleaseNote[] = [
  {
    version: "1.19.10",
    changes: [
      {
        component: "SnackBar",
        type: "enhancement",
        description: "use string padding values",
      }
    ],
  },
  {
    version: "1.19.9",
    changes: [
      {
        component: "SnackBar",
        type: "enhancement",
        description: "change snackbar style",
      }
    ],
  },
  {
    version: "1.19.8",
    changes: [
      {
        component: "Status",
        type: "enhancement",
        description: "add white color",
      }
    ],
  },
  {
    version: "1.19.7",
    changes: [
      {
        type: "fix",
        description: "export color borderNeutral",
      }
    ],
  },
  {
    version: "1.19.6",
    changes: [
      {
        component: "Tokens",
        type: "enhancement",
        description: "add borderNeutral color",
      }
    ],
  },
  {
    version: "1.19.5",
    changes: [
      {
        component: "DatePicker",
        type: "fix",
        description: "change segmented control size to large",
      }
    ],
  },
  {
    version: "1.19.4",
    changes: [
      {
        component: "SegmentedControl",
        type: "enhancement",
        description: "add size props",
      }
    ],
  },
  {
    version: "1.19.2",
    changes: [
      {
        component: "Tab",
        type: "fix",
        description: "prevent layout shift when changing font weight",
      },
      {
        component: "NavigationBar",
        type: "fix",
        description: "sidenav do not close",
      },
      {
        component: "Tab",
        type: "fix",
        description: "add support for HTML attributes including id and aria props",
      },
      {
        component: "ListItem",
        type: "fix",
        description: "set divider border color to #E6E7EA",
      }
    ],
  },
  {
    version: "1.19.2",
    changes: [
      {
        component: "Tab",
        type: "fix",
        description: "prevent layout shift when changing font weight",
      },
      {
        component: "NavigationBar",
        type: "fix",
        description: "sidenav do not close",
      },
      {
        component: "Tab",
        type: "fix",
        description: "add support for HTML attributes including id and aria props",
      },
      {
        component: "ListItem",
        type: "fix",
        description: "set divider border color to #E6E7EA",
      }
    ],
  },
  {
    version: "1.19.1",
    changes: [
      {
        component: "Tab",
        type: "style",
        description: "change background on hover",
      },
      {
        component: "Tabs",
        type: "fix",
        description: "adjust tab width to content size and fix bottom line width",
      },
      {
        component: "SegmentedControl",
        type: "enhancement",
        description: "add grouped actions support with dropdown menu",
      },
      {
        component: "NavigationBar",
        type: "enhancement",
        description: "add renderSidebarContent prop for custom sidebar rendering",
      },
      {
        component: "Select",
        type: "enhancement",
        description: "add outlined prop to control border visibility",
      }
    ],
  },
  {
    version: "1.19.1",
    changes: [
      {
        component: "Select",
        type: "enhancement",
        description: "add outlined prop to control border visibility",
      }
    ],
  },
  {
    version: "1.19.0",
    changes: [
      {
        type: "new",
        description: "Use tokens package",
      },
    ],
  },
  {
    version: "1.18.28",
    changes: [
      {
        component: "IconButton",
        type: "fix",
        description: "Fix icon button size param",
      },
    ],
  },
  {
    version: "1.18.27",
    changes: [
      {
        component: "Switch",
        type: "fix",
        description: "Remove required on isActive switch props",
      },
    ],
  },
  {
    version: "1.18.26",
    changes: [
      {
        component: "TextField",
        type: "fix",
        description:
          "Remove padding on icon when there is no label + fix fullwidth",
      },
    ],
  },
  {
    version: "1.18.25",
    changes: [
      {
        component: "DatePicker",
        type: "enhancement",
        description: "Mobile responsive",
      },
      {
        component: "Switch",
        type: "fix",
        description: "Remove required from disabled props",
      },
    ],
  },
  {
    version: "1.18.24",
    changes: [
      {
        component: "Switch",
        type: "enhancement",
        description:
          "Add value props for autonomous state management of isSwitched + onClick now returns the value of the switch after click",
      },
    ],
  },
  {
    version: "1.18.23",
    changes: [
      {
        component: "TextField",
        type: "fix",
        description: "Fix label color in multiline",
      },
    ],
  },
  {
    version: "1.18.22",
    changes: [
      {
        component: "DatePicker",
        type: "fix",
        description:
          "Fix date selector must follow the default selected of segmented control if specified",
      },
    ],
  },
  {
    version: "1.18.21",
    changes: [
      {
        component: "DatePicker",
        type: "enhancement",
        description:
          "Use time at the moment of date selection (single date without range)",
      },
    ],
  },
  {
    version: "1.18.20",
    changes: [
      {
        component: "Switch",
        type: "fix",
        description: "Remove required character from color props",
      },
      {
        component: "DatePicker",
        type: "enhancement",
        description:
          "Add props for manual control of segmented control and to know its state",
      },
      {
        component: "SegmentedControl",
        type: "enhancement",
        description: "Add delay for rendering in a tooltip",
      },
    ],
  },
  {
    version: "1.18.19",
    changes: [
      {
        component: "Switch",
        type: "enhancement",
        description: "Add color props",
      },
      {
        component: "TextField",
        type: "fix",
        description: "Remove primary color from label on focus",
      },
      {
        component: "DatePicker",
        type: "enhancement",
        description:
          "Add selectedIndex props to manually control the segmented control",
      },
    ],
  },
  {
    version: "1.18.18",
    changes: [
      {
        component: "InputSearch",
        type: "fix",
        description: "Fix input width in fullwidth",
      },
    ],
  },
  {
    version: "1.18.17",
    changes: [
      {
        component: "Tabs/Tab",
        type: "enhancement",
        description: "Add flex 1 for tabs in fullwidth",
      },
    ],
  },
  {
    version: "1.18.16",
    changes: [
      {
        component: "DatePicker",
        type: "enhancement",
        description: "Add space with Date prefix",
      },
    ],
  },
  {
    version: "1.18.15",
    changes: [
      {
        component: "DatePicker",
        type: "fix",
        description:
          "If input value is outside min/max range, position to the nearest available date. Fix: value correctly assigned if only one range is selected",
      },
      {
        component: "SegmentedControl",
        type: "enhancement",
        description: "Add disabled props for actions",
      },
    ],
  },
  {
    version: "1.18.14",
    changes: [
      {
        component: "DatePicker",
        type: "enhancement",
        description:
          "Ability to customize the format of dates displayed in the date picker",
      },
    ],
  },
  {
    version: "1.18.13",
    changes: [
      {
        component: "SegmentedControl",
        type: "enhancement",
        description: "Add color props to choose between dark or light version",
      },
      {
        component: "DatePicker",
        type: "enhancement",
        description:
          "Design improvement for range selection with week/month granularity",
      },
      {
        component: "Chart",
        type: "new",
        description:
          "Add OverlayBarChart sub-component to better handle transparency with grouped bars",
      },
    ],
  },
  {
    version: "1.18.12",
    changes: [
      {
        component: "Chart",
        type: "enhancement",
        description: "Add mixed Charts type for charts with multiple types",
      },
      {
        component: "SegmentedControl",
        type: "enhancement",
        description:
          "Add selectedIndex props to manually manage the active control",
      },
    ],
  },
  {
    version: "1.18.11",
    changes: [
      {
        component: "Chart",
        type: "enhancement",
        description: "Add chart type selector",
      },
    ],
  },
  {
    version: "1.18.10",
    changes: [
      {
        component: "Alert",
        type: "enhancement",
        description: "Update icons to huge icons",
      },
    ],
  },
  {
    version: "1.18.9",
    changes: [
      {
        component: "Header",
        type: "fix",
        description: "Fix width with back action",
      },
      {
        component: "InputSearch",
        type: "fix",
        description:
          "Remove focus on mount and add it only when switching from short to long",
      },
    ],
  },
  {
    version: "1.18.8",
    changes: [
      {
        component: "Alert",
        type: "enhancement",
        description: "Allow customization of title and description",
      },
    ],
  },
  {
    version: "1.18.7",
    changes: [
      {
        component: "DatePicker",
        type: "enhancement",
        description:
          "Add range selection for month, year and week selector, improve popover to not take parent size into account",
      },
    ],
  },
  {
    version: "1.18.4",
    changes: [
      {
        type: "enhancement",
        description: "Build improvement and package size reduction",
      },
    ],
  },
  {
    version: "1.18.3",
    changes: [
      {
        component: "Chart",
        type: "enhancement",
        description: "Add style on lines",
      },
    ],
  },
  {
    version: "1.18.2",
    changes: [
      {
        component: "Chart",
        type: "enhancement",
        description: "Line chart design modification",
      },
      {
        component: "Table",
        type: "style",
        description: "Add style on table pagination",
      },
    ],
  },
  {
    version: "1.18.1",
    changes: [
      {
        component: "DatePicker",
        type: "enhancement",
        description: "Add week granularity",
      },
    ],
  },
  {
    version: "1.18.0",
    changes: [
      {
        type: "new",
        description:
          "Charts (design modifications are in progress for lines), it is currently not possible to combine multiple chart types in one",
      },
    ],
  },
  {
    version: "1.17.7",
    changes: [
      {
        component: "DatePicker",
        type: "enhancement",
        description:
          "Add granularity for date range, allows selection by day / month / year",
      },
    ],
  },
  {
    version: "1.17.3",
    changes: [
      {
        component: "DatePicker",
        type: "enhancement",
        description: "Add props from textfield to allow error text for example",
      },
    ],
  },
  {
    version: "1.17.2",
    changes: [
      {
        component: "Button",
        type: "enhancement",
        description: "Add loading props to display a loader in buttons",
      },
      {
        component: "IconButton",
        type: "enhancement",
        description: "Add loading props to display a loader in buttons",
      },
    ],
  },
  {
    version: "1.17.1",
    changes: [
      {
        component: "DatePicker",
        type: "enhancement",
        description: "Add static props to fix the date selector display",
      },
      {
        component: "Chip",
        type: "fix",
        description: "Fix next error",
      },
      {
        component: "Tabs",
        type: "fix",
        description: "Fix next error",
      },
      {
        component: "Tab",
        type: "enhancement",
        description: "Add disable props to disable a Tab",
      },
    ],
  },
  {
    version: "1.17.0",
    changes: [
      {
        type: "new",
        description:
          "DatePicker, ready to use (check that dayJS package has been installed)",
      },
      {
        component: "Select",
        type: "fix",
        description: "Label color no longer changes on focus",
      },
    ],
  },
  {
    version: "1.16.11",
    changes: [
      {
        component: "SnackBar",
        type: "enhancement",
        description: "Add box shadow",
      },
    ],
  },
  {
    version: "1.16.10",
    changes: [
      {
        component: "SegmentedControl",
        type: "fix",
        description: "Fix auto height",
      },
      {
        component: "Header",
        type: "fix",
        description: "Fix size with segmented control or no title",
      },
    ],
  },
  {
    version: "1.16.9",
    changes: [
      {
        component: "InputSearch",
        type: "enhancement",
        description:
          "Disable is common between input and filter button, focus is forced on input when opening it",
      },
    ],
  },
  {
    version: "1.16.8",
    changes: [
      {
        component: "InputSearch",
        type: "enhancement",
        description: "Add fullwidth props",
      },
    ],
  },
  {
    version: "1.16.7",
    changes: [
      {
        component: "NavigationBar",
        type: "enhancement",
        description:
          "Tooltips only display on items without label, tooltips display on the right",
      },
    ],
  },
  {
    version: "1.16.6",
    changes: [
      {
        component: "Dialog",
        type: "enhancement",
        description: "Make props from CDS available",
      },
    ],
  },
  {
    version: "1.16.5",
    changes: [
      {
        component: "Tabs/Tab",
        type: "fix",
        description: "Many color and design fixes",
      },
    ],
  },
  {
    version: "1.16.4",
    changes: [
      {
        component: "NavigationBar",
        type: "enhancement",
        description:
          "Add createPath and onCreateClick props allowing quick redirection to creation",
      },
    ],
  },
  {
    version: "1.16.3",
    changes: [
      {
        component: "Select",
        type: "fix",
        description: "Remove focus styles in certain cases",
      },
      {
        component: "NavigationBar",
        type: "enhancement",
        description: "Switch tooltips to dark style",
      },
    ],
  },
  {
    version: "1.16.2",
    changes: [
      {
        component: "NavigationBar",
        type: "enhancement",
        description: "Add zoom effect on icon + tooltip change",
      },
    ],
  },
  {
    version: "1.16.0",
    changes: [
      {
        type: "new",
        description: "ProgressBar",
      },
    ],
  },
  {
    version: "1.15.6",
    changes: [
      {
        component: "Alert",
        type: "fix",
        description: "No chevron if no onActionClick",
      },
    ],
  },
  {
    version: "1.15.5",
    changes: [
      {
        component: "Tabs",
        type: "enhancement",
        description: "Add fullwidth props to take 100% of parent size",
      },
    ],
  },
  {
    version: "1.15.4",
    changes: [
      {
        component: "InputSearch",
        type: "enhancement",
        description:
          "Add default size props to choose the default displayed size, clicking the magnifying glass changes the size state from short to long",
      },
      {
        component: "IconButton",
        type: "fix",
        description: "Fix auto size (mobile/desktop)",
      },
    ],
  },
  {
    version: "1.15.3",
    changes: [
      {
        component: "Tab",
        type: "enhancement",
        description:
          "Add startBadge props to add a badge to the left of the label",
      },
    ],
  },
  {
    version: "1.15.2",
    changes: [
      {
        component: "Header",
        type: "enhancement",
        description: "Width of 100 for header content",
      },
    ],
  },
  {
    version: "1.15.1",
    changes: [
      {
        component: "Header",
        type: "enhancement",
        description: "Ability to pass a react node for title",
      },
    ],
  },
  {
    version: "1.15.0",
    changes: [
      {
        type: "new",
        description: "List, ListItem, ListItemButton",
      },
      {
        component: "IconButton",
        type: "fix",
        description:
          "Fix neutral color of contained variant, fix box shadow color of contained, add elevation props",
      },
      {
        type: "fix",
        description: "Minor fixes on colors or radius",
      },
    ],
  },
  {
    version: "1.14.1",
    changes: [
      {
        component: "Status",
        type: "enhancement",
        description: "Light variant default",
      },
    ],
  },
  {
    version: "1.14.0",
    changes: [
      {
        type: "new",
        description:
          "ToasterProvider - implementation example <ToasterProvider anchorOrigin={toasterAnchor}>{children}</ToasterProvider>",
      },
      {
        type: "new",
        description: "Snackbar",
      },
      {
        component: "Button",
        type: "fix",
        description: "Fix background color",
      },
      {
        component: "Box",
        type: "enhancement",
        description: "Add default value to border props (width, style)",
      },
      {
        component: "IconButton",
        type: "enhancement",
        description: "Allow size props",
      },
    ],
  },
  {
    version: "1.13.5",
    changes: [
      {
        component: "Header",
        type: "enhancement",
        description: "Ability to choose icon for settings button",
      },
    ],
  },
  {
    version: "1.13.4",
    changes: [
      {
        component: "Chip",
        type: "fix",
        description: "Fix icon and text color",
      },
    ],
  },
  {
    version: "1.13.3",
    changes: [
      {
        component: "Chip",
        type: "enhancement",
        description: "Return clickable props as deprecated",
      },
    ],
  },
  {
    version: "1.13.2",
    changes: [
      {
        component: "Chip",
        type: "enhancement",
        description: "Return icon props (deprecated), return medium size",
      },
    ],
  },
  {
    version: "1.13.0",
    changes: [
      {
        type: "new",
        description: "Table + all sub-components",
      },
      {
        component: "Chip",
        type: "enhancement",
        description: "Design fix and add avatar + badge as options",
      },
    ],
  },
  {
    version: "1.12.4",
    changes: [
      {
        component: "NavigationBar",
        type: "fix",
        description:
          "Small logic fix on active element rendering linked to a sub-menu with a single child with the same path (very specific case)",
      },
    ],
  },
  {
    version: "1.12.3",
    changes: [
      {
        component: "NavigationBar",
        type: "fix",
        description: "Small logic fix on active element rendering",
      },
    ],
  },
  {
    version: "1.12.2",
    changes: [
      {
        component: "Breadcrumbs",
        type: "fix",
        description: "Fix breadcrumbSegments generation",
      },
    ],
  },
  {
    version: "1.12.1",
    changes: [
      {
        component: "Breadcrumbs",
        type: "fix",
        description: "Fix can properly see sibling sub-menus",
      },
    ],
  },
  {
    version: "1.12.0",
    changes: [
      {
        type: "new",
        description: "Breadcrumbs",
      },
      {
        component: "Menu/MenuItem",
        type: "breaking",
        description:
          "Override menu and menuItem (impacts desktop) and therefore update navigationBar",
      },
    ],
  },
  {
    version: "1.11.21",
    changes: [
      {
        component: "NavigationBar",
        type: "enhancement",
        description:
          "Logic redesign, possibility to have a dropdown in sub-menus",
      },
    ],
  },
  {
    version: "1.11.20",
    changes: [
      {
        component: "NavigationBar",
        type: "fix",
        description: "Fix style on largeScreen breakpoint",
      },
    ],
  },
  {
    version: "1.11.19",
    changes: [
      {
        component: "Status",
        type: "enhancement",
        description: "Ability to pass a custom Icon",
      },
    ],
  },
  {
    version: "1.11.18",
    changes: [
      {
        component: "NavigationBar",
        type: "fix",
        description: "Fix following test session",
      },
    ],
  },
  {
    version: "1.11.17",
    changes: [
      {
        component: "Status",
        type: "fix",
        description: "Fix info neutral success purple colors and font",
      },
    ],
  },
  {
    version: "1.11.16",
    changes: [
      {
        component: "Select",
        type: "enhancement",
        description: "Change chevron Icon",
      },
    ],
  },
  {
    version: "1.11.15",
    changes: [
      {
        component: "TextField",
        type: "fix",
        description: "Fix padding on multiline",
      },
    ],
  },
  {
    version: "1.11.14",
    changes: [
      {
        component: "TextField",
        type: "fix",
        description: "Remove focus style with readonly",
      },
      {
        component: "Select",
        type: "fix",
        description: "Remove focus style with readonly",
      },
      {
        component: "Autocomplete",
        type: "fix",
        description: "Remove focus style with readonly",
      },
      {
        component: "Button",
        type: "fix",
        description: "Fix props naming",
      },
      {
        component: "Dialog",
        type: "enhancement",
        description: "Customize icon for alert variant",
      },
    ],
  },
  {
    version: "1.11.13",
    changes: [
      {
        component: "NavigationBar",
        type: "enhancement",
        description: "Reactivity linked to changes in navigation items",
      },
    ],
  },
  {
    version: "1.11.12",
    changes: [
      {
        component: "Button",
        type: "fix",
        description: "Add white space nowrap for use in other components",
      },
    ],
  },
  {
    version: "1.11.11",
    changes: [
      {
        component: "Header",
        type: "fix",
        description: "Fix back action not appearing with segmented control",
      },
    ],
  },
  {
    version: "1.11.10",
    changes: [
      {
        component: "Button",
        type: "enhancement",
        description: "Add ref props",
      },
      {
        component: "IconButton",
        type: "enhancement",
        description: "Add ref props",
      },
    ],
  },
  {
    version: "1.11.9",
    changes: [
      {
        component: "TextField",
        type: "fix",
        description: "Fix text color + error icon",
      },
      {
        component: "Select",
        type: "fix",
        description: "Fix text color + error icon",
      },
      {
        component: "Autocomplete",
        type: "fix",
        description: "Fix text color + error icon",
      },
      {
        component: "Button",
        type: "fix",
        description: "Fix spacing with start and end icon",
      },
    ],
  },
  {
    version: "1.11.8",
    changes: [
      {
        component: "Alert",
        type: "fix",
        description:
          "Don't display actions if onClose or onActionClick is not defined (Desktop only)",
      },
    ],
  },
  {
    version: "1.11.7",
    changes: [
      {
        component: "NavigationBar",
        type: "fix",
        description: "Update navItems that don't have a path",
      },
    ],
  },
  {
    version: "1.11.6",
    changes: [
      {
        component: "NavigationBar",
        type: "enhancement",
        description: "Add isVisible on profile menu items",
      },
    ],
  },
  {
    version: "1.11.5",
    changes: [
      {
        component: "NavigationBar",
        type: "enhancement",
        description: "Add menu (profilMenu) on user click",
      },
    ],
  },
  {
    version: "1.11.4",
    changes: [
      {
        component: "Header",
        type: "enhancement",
        description: "Add settingsActionProps",
      },
    ],
  },
  {
    version: "1.11.3",
    changes: [
      {
        component: "NavigationBar",
        type: "fix",
        description: "Modify typing associated with navItem + update style",
      },
    ],
  },
  {
    version: "1.11.2",
    changes: [
      {
        component: "Autocomplete",
        type: "enhancement",
        description: "Change error message error icon",
      },
      {
        component: "Select",
        type: "enhancement",
        description: "Change error message error icon",
      },
    ],
  },
  {
    version: "1.11.1",
    changes: [
      {
        component: "Header",
        type: "enhancement",
        description: "If two title lines then icon is aligned with first line",
      },
      {
        component: "Alert",
        type: "fix",
        description: "If no onCloseAction => don't display close icon",
      },
      {
        component: "TextField",
        type: "enhancement",
        description: "Change error message error icon",
      },
    ],
  },
  {
    version: "1.11.0",
    changes: [
      {
        type: "new",
        description: "NavigationBar",
      },
    ],
  },
  {
    version: "1.10.1",
    changes: [
      {
        component: "Dialog",
        type: "fix",
        description:
          "Fix size, allow undefined title + if no action on close => no icon",
      },
    ],
  },
  {
    version: "1.10.0",
    changes: [
      {
        component: "Header",
        type: "enhancement",
        description: "Customize icon for backAction",
      },
      {
        component: "Icon",
        type: "enhancement",
        description: "Default color => inherit",
      },
      {
        component: "IAChip",
        type: "fix",
        description: "Fix size + more customization and story improvement",
      },
    ],
  },
  {
    version: "1.9.0",
    changes: [
      {
        type: "new",
        description: "IAChips",
      },
    ],
  },
  {
    version: "1.8.4",
    changes: [
      {
        component: "Header",
        type: "enhancement",
        description: "Fullwidth management with segmented control",
      },
    ],
  },
  {
    version: "1.8.3",
    changes: [
      {
        component: "Button",
        type: "fix",
        description: "Fix fullwidth management",
      },
    ],
  },
  {
    version: "1.8.2",
    changes: [
      {
        component: "Tabs",
        type: "enhancement",
        description: "Full width management",
      },
    ],
  },
  {
    version: "1.8.1",
    changes: [
      {
        component: "Header",
        type: "fix",
        description:
          "If only startIcon specified without text => Icon button (this behavior will be reviewed post-delivery as too complex)",
      },
      {
        component: "Alert",
        type: "fix",
        description: "Fix XS error alert color",
      },
    ],
  },
  {
    version: "1.8.0",
    changes: [
      {
        type: "new",
        description: "InputSearch",
      },
    ],
  },
  {
    version: "1.7.0",
    changes: [
      {
        component: "TextField",
        type: "enhancement",
        description: "Add error colors + icon",
      },
      {
        component: "Select",
        type: "enhancement",
        description: "Add error colors + icon",
      },
      {
        component: "Autocomplete",
        type: "enhancement",
        description: "Add error colors + icon",
      },
      {
        component: "Button",
        type: "enhancement",
        description: "Add size concept + new 24px size",
      },
    ],
  },
  {
    version: "1.6.12",
    changes: [
      {
        type: "style",
        description: "Add bodyMMedium variant for typography",
      },
    ],
  },
  {
    version: "1.6.11",
    changes: [
      {
        component: "SegmentedControl",
        type: "enhancement",
        description: "Add fullWidth",
      },
      {
        component: "Row",
        type: "enhancement",
        description: "Add ref props",
      },
      {
        component: "Column",
        type: "enhancement",
        description: "Add ref props",
      },
      {
        component: "Header",
        type: "fix",
        description: "Fix title color",
      },
    ],
  },
  {
    version: "1.6.8",
    changes: [
      {
        component: "Tooltip",
        type: "enhancement",
        description: "Export props",
      },
      {
        component: "Header",
        type: "enhancement",
        description: "Customize buttons for color and variant, id optional",
      },
    ],
  },
  {
    version: "1.6.6",
    changes: [
      {
        component: "Dialog",
        type: "enhancement",
        description: "Takes a children + add open on close props",
      },
    ],
  },
  {
    version: "1.6.4",
    changes: [
      {
        component: "Header",
        type: "enhancement",
        description: "Id optional, add aid props for button customization",
      },
    ],
  },
  {
    version: "1.6.3",
    changes: [
      {
        component: "Header",
        type: "fix",
        description: "Fix back icon size, add id props",
      },
    ],
  },
  {
    version: "1.6.2",
    changes: [
      {
        component: "Header",
        type: "enhancement",
        description: "Ability to customize buttons",
      },
    ],
  },
  {
    version: "1.6.1",
    changes: [
      {
        component: "Alert",
        type: "enhancement",
        description:
          "It is possible to no longer display the action button by not specifying the onActionClick props",
      },
    ],
  },
];

const getTypeColor = (type: string): CustomColorString => {
  switch (type) {
    case "new":
      return "success/95";
    case "fix":
      return "critical/95";
    case "enhancement":
      return "info/95";
    case "style":
      return "purple/95";
    case "breaking":
      return "yellow/95";
    default:
      return "neutral/95";
  }
};

const getTypeIcon = (type: string): string => {
  switch (type) {
    case "new":
      return "star";
    case "fix":
      return "wrench-01";
    case "enhancement":
      return "rocket-01";
    case "style":
      return "colors";
    case "breaking":
      return "alert-triangle";
    default:
      return "info-circle";
  }
};

const getTypeLabel = (type: string): string => {
  switch (type) {
    case "new":
      return "New";
    case "fix":
      return "Fix";
    case "enhancement":
      return "Enhancement";
    case "style":
      return "Style";
    case "breaking":
      return "Breaking";
    default:
      return type;
  }
};

const ReleaseNotesContent = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredReleases = React.useMemo(() => {
    if (!searchTerm.trim()) {
      return releaseNotes;
    }

    const lowerSearch = searchTerm.toLowerCase();
    return releaseNotes.filter((release) => {
      // Search in version
      if (release.version.toLowerCase().includes(lowerSearch)) {
        return true;
      }

      // Search in changes
      return release.changes.some(
        (change) =>
          change.component?.toLowerCase().includes(lowerSearch) ||
          change.description.toLowerCase().includes(lowerSearch) ||
          change.type.toLowerCase().includes(lowerSearch)
      );
    });
  }, [searchTerm]);

  const stats = React.useMemo(() => {
    const total = releaseNotes.length;
    const components = new Set<string>();
    const types = {
      new: 0,
      fix: 0,
      enhancement: 0,
      style: 0,
      breaking: 0,
    };

    releaseNotes.forEach((release) => {
      release.changes.forEach((change) => {
        if (change.component) {
          components.add(change.component);
        }
        types[change.type]++;
      });
    });

    return {
      total,
      components: components.size,
      types,
    };
  }, []);

  return (
    <Box maxWidth={1200} mx="auto" p={4}>
      {/* Header */}
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
          <Icon size={48} color="white">
            file-02
          </Icon>

          <Typography variant="displaySRegular" component="h1" color="white">
            Release Notes
          </Typography>

          <Typography
            variant="titleLRegular"
            color="white"
            sx={{ opacity: 0.9, maxWidth: 600 }}
          >
            Complete history of versions and design system changes
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            justifyContent="center"
          >
            <Chip
              label={`Current version: ${version}`}
              color="success"
              startIcon={<Icon size={14}>checkmark-circle-03</Icon>}
            />
            <Chip
              label={`${stats.total} versions`}
              color="info"
              startIcon={<Icon size={14}>layers-01</Icon>}
            />
            <Chip
              label={`${stats.components} components`}
              color="purple"
              startIcon={<Icon size={14}>puzzle</Icon>}
            />
          </Stack>
        </Stack>
      </Box>

      {/* Search */}
      <Box mb={4}>
        <TextField
          fullWidth
          placeholder="Search by version, component or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon size={20}>search-01</Icon>
              </InputAdornment>
            ),
            endAdornment: searchTerm ? (
              <Box sx={{ cursor: "pointer" }} onClick={() => setSearchTerm("")}>
                <Icon size={20}>x-close</Icon>
              </Box>
            ) : (
              <></>
            ),
          }}
        />
        {searchTerm && (
          <Box mt={1}>
            <Typography variant="bodySRegular" color="neutral/50">
              {filteredReleases.length} version(s) found
            </Typography>
          </Box>
        )}
      </Box>

      {/* Releases List */}
      <Stack spacing={3}>
        {filteredReleases.map((release) => (
          <Box
            key={release.version}
            p={4}
            backgroundColor="neutral/99"
            borderRadius={2}
            border={{ color: "neutral/90", width: 1, style: "solid" }}
            sx={{
              transition: "all 0.2s",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderColor: "primary/60",
              },
            }}
          >
            {/* Version Header */}
            <Row
              alignItems="center"
              mb={3}
              pb={2}
              borderBottom={{ color: "neutral/90", width: 1, style: "solid" }}
            >
              <Box
                width={24}
                height={24}
                backgroundColor={
                  release.version === version ? "success/90" : "primary/90"
                }
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  borderRadius: "50%",
                }}
              >
                <Icon
                  size={16}
                  color={
                    release.version === version ? "success/40" : "primary/40"
                  }
                >
                  {release.version === version
                    ? "checkmark-circle-03"
                    : "package"}
                </Icon>
              </Box>

              <Box flex={1} ml={4}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="titleLSemiBold" color="neutral/10">
                    Version {release.version}
                  </Typography>
                  {release.version === version && (
                    <Chip
                      label="Current"
                      color="success"
                      size="small"
                      startIcon={<Icon size={12}>checkmark-circle-03</Icon>}
                    />
                  )}
                </Stack>
                {release.date && (
                  <Typography variant="bodySRegular" color="neutral/50">
                    {release.date}
                  </Typography>
                )}
              </Box>

              <Chip
                label={`${release.changes.length} change${release.changes.length > 1 ? "s" : ""}`}
                color="neutral"
                size="small"
              />
            </Row>

            {/* Changes List */}
            <Column gap={2}>
              {release.changes.map((change, changeIndex) => (
                <Box
                  key={`${release.version}-${changeIndex}`}
                  p={5}
                  backgroundColor="white"
                  borderRadius={1}
                  border={{ color: "neutral/95", width: 1, style: "solid" }}
                >
                  <Column gap={2} alignItems="flex-start">
                    <IAChip
                      label={getTypeLabel(change.type)}
                      backgroundColor={getTypeColor(change.type)}
                      size="small"
                      icon={<Icon size={12}>{getTypeIcon(change.type)}</Icon>}
                    />

                    <Row gap={2} flex={1}>
                      {change.component && (
                        <Typography
                          variant="bodyMSemiBold"
                          color="neutral/10"
                          gutterBottom
                        >
                          {change.component}:
                        </Typography>
                      )}
                      <Typography variant="bodyMRegular" color="neutral/70">
                        {change.description}
                      </Typography>
                    </Row>
                  </Column>
                </Box>
              ))}
            </Column>
          </Box>
        ))}

        {filteredReleases.length === 0 && (
          <Box
            p={6}
            textAlign="center"
            backgroundColor="neutral/99"
            borderRadius={2}
          >
            <Icon size={48} color="neutral/70">
              search-01
            </Icon>
            <Typography variant="titleLRegular" color="neutral/50" mt={2}>
              No version found
            </Typography>
            <Typography variant="bodyMRegular" color="neutral/60" mt={1}>
              Try with other search terms
            </Typography>
          </Box>
        )}
      </Stack>

      {/* Footer */}
      <Box
        textAlign="center"
        py={4}
        mt={6}
        borderTop={{ color: "neutral/90", width: 1, style: "solid" }}
      >
        <Typography variant="captionRegular" color="neutral/60">
          Complete history of {stats.total} design system versions
        </Typography>
      </Box>
    </Box>
  );
};

const ReleaseNotes = () => {
  return (
    <VSBThemeProvider>
      <Box
        minHeight="100vh"
        backgroundColor="white"
        position="relative"
        zIndex={1}
      >
        <ReleaseNotesContent />
      </Box>
    </VSBThemeProvider>
  );
};

const meta: Meta<typeof ReleaseNotes> = {
  title: "📖 Documentation/Release Notes",
  component: ReleaseNotes,
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
          "Complete version history and changes of the @cegid/vsb-cds-react design system",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ReleaseNotes>;

export const AllReleases: Story = {
  name: "📝 All releases",
  parameters: {
    docs: {
      description: {
        story: "Complete history of all versions with search and filtering.",
      },
    },
  },
};
