import { useRef, useState } from "react";
import { List, ListItem, ListItemButton, ListItemIcon, Paper, styled } from "@cegid/cds-react";
import ListItemText from '@mui/material/ListItemText';
import Icon from "../Icon";
import Box from "../Box";
import Typography from "../Typography";
import { primary } from "../../theme";
import theme from "@cegid/cds-react/styles/defaultTheme";


export interface SubNavItem {
  key: string;
  label: string;
  iconLabel?: string;
  isActive: boolean;
}

export interface NavItem {
  key: string;
  label: string;
  iconLabel?: string;
  subItems?: SubNavItem[];
  badge?: React.ReactNode;
  isActive: boolean;
}


const HEADER_ITEMS: NavItem[] = [
  {
    key: 'recherche',
    label: 'Recherche',
    iconLabel: "search-01",
    isActive: false
  },
  {
    key: 'accueil',
    label: 'Accueil',
    iconLabel: "home-01",
    isActive: false
  },
  {
    key: 'ia',
    label: 'IA de Cegid',
    iconLabel: "ai-brain-03",
    isActive: false
  },
];


const NAV_ITEMS: NavItem[] = [

  {
    key: 'depense',
    label: 'Dépenses',
    iconLabel: "shopping-bag-02",
    subItems: [
      {
        key: 'dépense',
        label: 'Dépenses',
        iconLabel: "estimate-02",
        isActive: false
      },
      {
        key: 'fournisseurs',
        label: 'Fournisseurs',
        iconLabel: "invoice-01",
        isActive: false
      },
    ],
    isActive: false
  },
  {
    key: 'ventes',
    label: 'Ventes',
    iconLabel: "cashier-02",
    subItems: [
      {
        key: 'devis',
        label: 'Devis',
        iconLabel: "estimate-02",
        isActive: false
      },
      {
        key: 'factures',
        label: 'Factures',
        iconLabel: "invoice-01",
        isActive: false
      },
      {
        key: 'clients',
        label: 'Clients',
        iconLabel: "location-user-01",
        isActive: false
      },
      {
        key: 'catalogues',
        label: 'Catalogues',
        iconLabel: "library",
        isActive: false
      },
      {
        key: 'reglements',
        label: 'Règlements',
        iconLabel: "payment-01",
        isActive: false
      },
    ],
    isActive: false
  },
  
  {
    key: 'bank',
    label: 'Banque',
    iconLabel: "bank",
    isActive: false
  },
  {
    key: 'documents',
    label: 'Documents',
    iconLabel: "file-01",
    isActive: false
  },
  {
    key: 'contact',
    label: 'Contacts',
    iconLabel: "contact-01",
    isActive: false
  },
];

const FOOTER_ITEMS: NavItem[] = [
  {
    key: 'support',
    label: 'Support',
    iconLabel: "customer-support",
    isActive: false
  },
  {
    key: 'parametres',
    label: 'Paramètres',
    iconLabel: "setting-07",
    isActive: false
  },
];

const NavContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  height: '100vh',
}));

interface NavPanelProps {
  expanded: boolean;
}

const MenuIcon = styled(Icon)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  alignItems: 'center',
  gap: '10px',
}));

const NavListItemButton = styled(ListItemButton)(() => ({
  padding: 0,
}));

const NavList = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  width: '100%',
}));

const NavPanel = styled(Box, {
  shouldForwardProp: prop => prop !== 'expanded',
})<NavPanelProps>(({ theme, expanded }) => ({
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  backgroundColor: primary[95],
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(9),
  justifyContent: 'center',
  padding: theme.spacing(4),
  transition: theme.transitions.create('width', { duration: 200 }),
  width: '204px',
  // width: expanded ? 204 : 48,
}));

interface SidebarPanelProps {
  open: boolean;
  anchorWidth: number;
}
const SidebarPanel = styled(Paper, {
  shouldForwardProp: prop => prop !== 'open' && prop !== 'anchorWidth',
})<SidebarPanelProps>(({ theme, open, anchorWidth }) => ({
  position: 'absolute',
  top: 0,
  left: anchorWidth,
  width: 225,
  height: '100%',
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 8,
  borderRadius: '0px 16px 16px 0px', 
  backgroundColor: primary[99],
  boxShadow: `
    2px 0px 6.857px rgba(47,38,50,0.08),
    2px 0px 6.857px rgba(47,38,50,0.08)
  `,
  transition: theme.transitions.create(['opacity','transform'],{ duration:200 }),
  opacity: open ? 1 : 0,
  transform: open ? 'translateX(0)' : 'translateX(-8px)',
  pointerEvents: open ? 'auto' : 'none',
  zIndex: theme.zIndex.drawer + 1,
}));

interface SidebarProps {
  anchorWidth: number;
  navItems: NonNullable<NavItem['subItems']>;
  open: boolean;
  parent: NavItem;
  onMouseLeave?: () => void;
  onNavItemClick: (navItem: NavItem) => void;
}
const Sidebar = ({ 
  anchorWidth,
  navItems,
  open,
  parent,
  onMouseLeave,
  onNavItemClick
}: SidebarProps) => (
  <SidebarPanel 
    anchorWidth={anchorWidth}
    onMouseLeave={onMouseLeave}
    open={open} 
    square  
  >
    {/* TITRE */}
    <Box
      alignItems="center"
      display="flex"
      height="40px"
      justifyContent="space-between"
      width="100%"
    >
      <Box display="flex" alignItems="center" gap={4}>
        <Typography variant="bodyMMedium" color="primary/10">
          {parent.label}
        </Typography>
      </Box>
      <Icon variant="stroke" color="primary/10" size="16px">
        arrow-left-05
      </Icon>
    </Box>

    {/* LISTE */}
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      padding="8px 0 16px"
      width="100%"
    >
      <NavList dense>
        {navItems.map((navItem) => {
          const navItemColor = navItem.isActive ? "primary/60" : "primary/10";
          return (
            <ListItem
              key={navItem.key}
              onClick={() => onNavItemClick(navItem)}
              disablePadding
              >
              <NavListItemButton onClick={() => console.log('navigate to', navItem.key)}>
                {navItem.iconLabel && <ListItemIcon><MenuIcon variant="stroke" color={ navItemColor } size="24px">{navItem.iconLabel}</MenuIcon></ListItemIcon> }
                <ListItemText 
                  disableTypography
                  primary={
                    <Typography
                      variant="bodySMedium"
                      color={ navItemColor }
                    >
                    {navItem.label}
                  </Typography>
                  } 
                />
              </NavListItemButton>
            </ListItem>
          )
        })}
      </NavList>
    </Box>
  </SidebarPanel>
);


const NavigationBar: React.FC = () => {

  const [navItems, setNavItems] = useState<NavItem[]>([]);

  const [expanded, setExpanded] = useState<boolean>(true);
  const [hoveredNavItem, setHoveredNavItem] = useState<NavItem | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const navWidth = expanded ? 204 : 48;

  const handleItemClick = (navItem: NavItem) => {
    const newNavItems = navItems.map((item) => {
      if (item.key === navItem.key) {
        return { ...item, isActive: true };
      }
      if (item.subItems?.some((subItem) => subItem.key === navItem.key)) {
        const newSubItems = item.subItems.map((subItem) => {
          if (subItem.key === navItem.key) {
            return { ...subItem, isActive: true };
          }
          return { ...subItem, isActive: false };
        });
        return { ...item, subItems: newSubItems, isActive: true };
      }
      return { ...item, isActive: false };
    });

    setNavItems(newNavItems);
    setHoveredNavItem(null);
  };

  
  /**
   * Conditions to maintain the sidebar open:
   * 1. If the hoveredNavItem has subItems, the sidebar should remain open
   * 2. If the activeNavItem has subItems, the sidebar should remain open
   * 3. If the activeNavItem is a subItem of a navItem with subItems, the sidebar should remain open
   */
  const activeNavItem = navItems.find((navItem) => navItem.isActive);

  const parentOfActiveChild = navItems.find((navItem) => navItem.subItems?.some((child) => child.isActive)) ?? null;
  
  const sidebarNavItems =
  // priority on Hover
  hoveredNavItem?.subItems
  // if no hover, check active item
  ?? activeNavItem?.subItems
  // if it's a subItem, check its parent
  ?? parentOfActiveChild?.subItems
  ?? [];

  return (
    <NavContainer>
      <NavPanel
        ref={navRef}
        expanded={expanded}
        onMouseEnter={() => setExpanded(true)}
      >
        {/* Titre */}
        <Box
          alignItems="center"
          alignSelf="stretch"
          display="flex"
          justifyContent="space-between"
          padding="8px 0"
        >
          <img src='./Bim_logo.svg' alt="Bim Logo" width="32" height="32" />
          <Icon variant="stroke" color="primary/10" size="16px">
            arrow-left-05
          </Icon>
        </Box>

        {/* Header */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap={2}
          alignSelf="stretch"
        >
          <NavList>
            { HEADER_ITEMS.map((navItem) => {
              const navItemColor = navItem.isActive ? "primary/60" : "primary/10";

              return (
                <ListItem
                  key={navItem.key}
                  disablePadding
                  onMouseEnter={() => setHoveredNavItem(null)}
                  onClick={() => handleItemClick(navItem)}
                >
                  <NavListItemButton>
                    {navItem.iconLabel && <ListItemIcon><MenuIcon variant="stroke" color={ navItemColor } size="24px">{navItem.iconLabel}</MenuIcon></ListItemIcon> }
                    {expanded && (
                      <ListItemText 
                        disableTypography
                        primary={
                          <Typography
                            variant="bodySMedium"
                            color={ navItemColor }
                          >
                          {navItem.label}
                        </Typography>
                        } 
                      />
                    )}
                  </NavListItemButton>
                </ListItem>
              );
            })}
          </NavList>

        </Box>


        {/* Listing des navItems */}
        <Box
          alignItems="flex-start"
          alignSelf="stretch"
          display="flex"
          flex={1}
          flexDirection="column"
          gap={2}
        >
          <NavList>
            { NAV_ITEMS.map((navItem) => {
              const hasSubitems = Boolean(navItem.subItems);

              const navItemColor = navItem.isActive ? "primary/60" : "primary/10";

              return (
                <ListItem
                  key={navItem.key}
                  disablePadding
                  onMouseEnter={() => hasSubitems ? setHoveredNavItem(navItem) : setHoveredNavItem(null)}
                  onClick={() => handleItemClick(navItem)}
                >
                  <NavListItemButton>
                    {navItem.iconLabel && <ListItemIcon><MenuIcon variant="stroke" color={ navItemColor } size="24px">{navItem.iconLabel}</MenuIcon></ListItemIcon> }
                    {expanded && (
                      <ListItemText 
                        disableTypography
                        primary={
                          <Typography
                            variant="bodySMedium"
                            color={ navItemColor }
                          >
                          {navItem.label}
                        </Typography>
                        } 
                      />
                    )}
                  </NavListItemButton>
                </ListItem>
              );
            })}
          </NavList>
        </Box>

        {/* Footer Configuration */}
        <Box
          alignItems="flex-start"
          alignSelf="stretch"
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <NavList>
            { FOOTER_ITEMS.map((navItem) => {
              const hasSubitems = Boolean(navItem.subItems);

              const navItemColor = navItem.isActive ? "primary/60" : "primary/10";

              return (
                <ListItem
                  key={navItem.key}
                  disablePadding
                  onMouseEnter={() => hasSubitems ? setHoveredNavItem(navItem) : setHoveredNavItem(null)}
                  onClick={() => handleItemClick(navItem)}
                >
                  <NavListItemButton>
                    {navItem.iconLabel && <ListItemIcon><MenuIcon variant="stroke" color={ navItemColor } size="24px">{navItem.iconLabel}</MenuIcon></ListItemIcon> }
                    {expanded && (
                      <ListItemText 
                        disableTypography
                        primary={
                          <Typography
                            variant="bodySMedium"
                            color={ navItemColor }
                          >
                          {navItem.label}
                        </Typography>
                        } 
                      />
                    )}
                  </NavListItemButton>
                </ListItem>
              );
            })}
          </NavList>
        </Box>
      </NavPanel>

      {expanded && sidebarNavItems.length > 0 && (
        <Sidebar
          parent={hoveredNavItem ?? activeNavItem!}
          navItems={sidebarNavItems}
          open
          anchorWidth={navWidth}
          onMouseLeave={() => setHoveredNavItem(null)}
          onNavItemClick={handleItemClick}
        />
      )}
    </NavContainer>
  );
};

export default NavigationBar;