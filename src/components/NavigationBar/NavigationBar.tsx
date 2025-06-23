import { useEffect, useMemo, useRef, useState } from "react";
import { List, styled } from "@cegid/cds-react";
import Box from "../Box";
import { primary } from "../../theme";
import logo from './logo.svg';
import { HEADER_ITEMS, NAV_ITEMS, FOOTER_ITEMS } from "./constants";
import NavHeader from "./NavigationHeader";
import NavSection from "./NavigationSection";
import NavigationSideBar from "./NavigationSideBar";
import { useExtendedNavItems } from "./useExtendedNavItems";
import { useSidebarState } from "./useNavigationSideBarState";

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

const NavContainer = styled(Box)({
  position: 'relative',
  display: 'flex',
  height: '100vh',
});

export const NavList = styled(List, {
  shouldForwardProp: prop => prop !== 'expanded',
})<ComponentWithExpandedProp>(({ theme, expanded }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: expanded ? undefined : 'flex-start',
  gap: theme.spacing(2),
  padding: 0,
  width: '100%',
}));

export interface ComponentWithExpandedProp {
  expanded: boolean;
}

const NavPanel = styled(Box, {
  shouldForwardProp: prop => prop !== 'expanded',
})<ComponentWithExpandedProp>(({ theme, expanded }) => ({
  display: 'flex',
  width: expanded ? '204px' : '48px' ,
  padding: theme.spacing(4),
  flexDirection: 'column',
  justifyContent: expanded ? 'center' : 'flex-end',
  alignItems: expanded ? 'flex-start' : 'center',
  alignSelf: 'stretch',
  gap: theme.spacing(9),
  flexShrink: expanded ? undefined : 0,
  backgroundColor: primary[95],
  transition: theme.transitions.create('width', { duration: 200 }),
  zIndex: theme.zIndex.drawer + 2,
  overflow: 'hidden',
}));


const NavigationBar: React.FC = () => {

  const [navItems, setNavItems] = useExtendedNavItems(HEADER_ITEMS, NAV_ITEMS, FOOTER_ITEMS);

  const headerNavItems = useMemo(() => navItems.filter(item => item.type === MenuItemType.Header), [navItems]);
  const bodyNavItems = useMemo(() => navItems.filter(item => item.type === MenuItemType.Nav), [navItems]);
  const footerNavItems = useMemo(() => navItems.filter(item => item.type === MenuItemType.Footer), [navItems]);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hoveredNavItem, setHoveredNavItem] = useState<ExtendedNavItem | null>(null);

  const { sidebarNavItems, isSideBarOpen, activeNavItem } = useSidebarState(navItems, hoveredNavItem, isExpanded);

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

  /**
   * Cleanup function to clear the hover timer when the component unmounts.
   */
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

  const handleToggleExpandNavigation = () => {
    setIsExpanded(!isExpanded);
    setHoveredNavItem(null);
  };

  return (
    <NavContainer>
      <NavPanel
        ref={navRef}
        expanded={isExpanded}
      >
        <NavHeader
          headerNavItems={headerNavItems}
          isExpanded={isExpanded}
          logoSrc={logo} 
          userName={"John"} 
          onItemClick={handleItemClick}
          onMouseEnter={() => setHoveredNavItem(null)}
          onToggleExpandNavigation={handleToggleExpandNavigation}
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