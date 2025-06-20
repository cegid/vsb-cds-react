import { useEffect, useRef, useState } from "react";
import { List, styled } from "@cegid/cds-react";
import Box from "../Box";
import { primary } from "../../theme";
import logo from './logo.svg';
import { HEADER_ITEMS, NAV_ITEMS, FOOTER_ITEMS } from "./constants";
import NavHeader from "./NavigationHeader";
import NavSection from "./NavigationSection";
import NavigationSideBar from "./NavigationSideBar";

export interface SubNavItem {
  key: string;
  label: string;
  iconLabel?: string;
}

export interface NavItem {
  key: string;
  label: string;
  iconLabel?: string;
  subItems?: SubNavItem[];
}

export interface ExtendedSubNavItem extends SubNavItem {
  isActive: boolean;
}

export interface ExtendedNavItem extends NavItem {
  type: MenuItemType;
  isActive: boolean;
  subItems?: ExtendedSubNavItem[];
}


export enum MenuItemType {
  Header = 'header',
  Nav    = 'nav',
  Footer = 'footer',
}

const NavContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  height: '100vh',
}));

interface NavPanelProps {
  expanded: boolean;
}

export const NavList = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: 0,
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
  zIndex: theme.zIndex.drawer + 2,
  overflow: 'hidden',
  // width: expanded ? 204 : 48,
}));


const NavigationBar: React.FC = () => {

  const [navItems, setNavItems] = useState<ExtendedNavItem[]>([
    ...HEADER_ITEMS.map(item => ({
      ...item,
      type: MenuItemType.Header,
      isActive: false,
      subItems: item.subItems?.map(subItem => ({
        ...subItem,
        isActive: false,
      })) ?? [],
    })),
    ...NAV_ITEMS.map(item => ({
      ...item,
      type: MenuItemType.Nav,
      isActive: false,
      subItems: item.subItems?.map(subItem => ({
        ...subItem,
        isActive: false,
      })) ?? [],
    })),
    ...FOOTER_ITEMS.map(item => ({
      ...item,
      type: MenuItemType.Footer,
      isActive: false,
      subItems: item.subItems?.map(subItem => ({
        ...subItem,
        isActive: false,
      })) ?? [],
    })),
  ]);

  const headerNavItems = navItems.filter(item => item.type === MenuItemType.Header);
  const bodyNavItems = navItems.filter(item => item.type === MenuItemType.Nav);
  const footerNavItems = navItems.filter(item => item.type === MenuItemType.Footer);

  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [hoveredNavItem, setHoveredNavItem] = useState<ExtendedNavItem | null>(null);


  // Hover timer to delay a little the opening of the sidebar
  const hoverTimer = useRef<number>();  
  
  const navRef = useRef<HTMLDivElement>(null);
  const navWidth = isExpanded ? 204 : 48;

  const handleNavMouseEnter = (item: ExtendedNavItem | null) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => {
      setHoveredNavItem(item);
    }, 400);
  };

  const handleNavMouseLeave = () => {
    window.clearTimeout(hoverTimer.current);
  };

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const handleItemClick = (navItem: NavItem) => {
    const newNavItems = navItems.map(item => {
      // Est-ce que j’ai cliqué sur ce parent ?
      const isParentClicked = item.key === navItem.key && 'subItems' in navItem;
      // Est-ce que j’ai cliqué sur un de ses sous-items ?
      const isSubClicked = item.subItems?.some(sub => sub.key === navItem.key) ?? false;

      // On reconstruit toujours les subItems en resetant tout, sauf celui cliqué
      const newSubItems = item.subItems?.map(sub => ({
        ...sub,
        isActive: sub.key === navItem.key,
      })) ?? [];

      return {
        ...item,
        // Le parent est actif si on a cliqué dessus ou sur un de ses subItems
        isActive: isParentClicked || isSubClicked,
        subItems: newSubItems,
      };
    })

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

  const isSideBarOpen = isExpanded && sidebarNavItems.length > 0;

  return (
    <NavContainer>
      <NavPanel
        ref={navRef}
        expanded={isExpanded}
        onMouseEnter={() => setIsExpanded(true)}
      >
        <NavHeader
          headerNavItems={headerNavItems}
          isExpanded={isExpanded}
          logoSrc={logo} 
          userName={"John"} 
          onItemClick={handleItemClick}
          onMouseEnter={() => setHoveredNavItem(null)}
          onToggle={() => console.log('toggleNavBar')}
        />

        <NavSection
          type={MenuItemType.Nav}
          navItems={bodyNavItems}
          isExpanded={isExpanded}
          onItemClick={handleItemClick}
          onNavMouseEnter={handleNavMouseEnter}
          onNavMouseLeave={handleNavMouseLeave}
        />

        <NavSection
          type={MenuItemType.Footer}
          navItems={footerNavItems}
          isExpanded={isExpanded}
          onItemClick={handleItemClick}
          onNavMouseEnter={handleNavMouseEnter}
          onNavMouseLeave={handleNavMouseLeave}
        />
      </NavPanel>

      {isExpanded && (
        <NavigationSideBar
          parent={hoveredNavItem ?? activeNavItem!}
          navItems={sidebarNavItems}
          open={isSideBarOpen}
          anchorWidth={navWidth}
          onMouseEnter={() => window.clearTimeout(hoverTimer.current)}
          onMouseLeave={() => setHoveredNavItem(null)}
          onNavItemClick={handleItemClick}
        />
      )}
    </NavContainer>
  );
};

export default NavigationBar;