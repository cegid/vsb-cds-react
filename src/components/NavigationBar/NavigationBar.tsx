import { useEffect, useMemo, useRef, useState } from "react";
import { List, styled } from "@cegid/cds-react";
import Box from "../Box";
import { primary } from "../../theme";
import logo from './logo.svg';
import NavHeader from "./NavigationHeader";
import NavSection from "./NavigationSection";
import NavigationSideBar from "./NavigationSideBar";
import { useExtendedNavItems } from "./useExtendedNavItems";
import { useSidebarState } from "./useNavigationSideBarState";

export interface NavItem {
  icon?: string;
  isDisabled?: boolean;
  isHidden?: boolean;
  key: string;
  label: string;
  subItems?: SubNavItem[];
  onClick: () => void;
}

export type SubNavItem = Omit<NavItem, 'subItems'>;

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


/**
 * Props for the Navigation bar component.
 */
interface NavigationBarProps {
  /** 
   * Array of navigation items displayed in the header section.
   */
  headerNavItems: NavItem[];
  /** 
   * Array of navigation items displayed in the main body section.
   */
  bodyNavItems: NavItem[];
  /** 
   * Array of navigation items displayed in the footer section.
   */
  footerNavItems: NavItem[];
  /**
   *  The name of the current user, displayed in the profile greeting.
   */
  userName: string;
  /**
   *  URL or import source for the logo image displayed in the profile area. By default BIM Logo
   */
  logoSrc?: string;
  /**
   *  Callback invoked when the profile area is clicked (e.g. to open a user menu). 
   */
  onProfileClick: () => void;
}

const NavigationBar = ({headerNavItems, bodyNavItems, footerNavItems, logoSrc = logo, userName, onProfileClick}: NavigationBarProps) => {

  const [navItems, setNavItems] = useExtendedNavItems(headerNavItems, bodyNavItems, footerNavItems);

  const extandedHeaderNavItems = useMemo(() => navItems.filter(item => item.type === MenuItemType.Header), [navItems]);
  const extandedBodyNavItems = useMemo(() => navItems.filter(item => item.type === MenuItemType.Nav), [navItems]);
  const extandedFooterNavItems = useMemo(() => navItems.filter(item => item.type === MenuItemType.Footer), [navItems]);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hoveredNavItem, setHoveredNavItem] = useState<ExtendedNavItem | null>(null);

  const { sidebarNavItems, isSideBarOpen, activeNavItem } = useSidebarState(navItems, hoveredNavItem);

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

  const handleNavItemClick = (navItem: ExtendedNavItem | ExtendedSubNavItem) => {
    /**
     * We re-build navItems on every click to ensure that the active state is correctly set.
     */
    const newNavItems = navItems.map(item => {
      
      // clicked item got subItems
      const isClickedNavItemWithSubItems = item.key === navItem.key && 'subItems' in navItem;
      
      // clicked item is a subItem of a parent item
      const isSubItem = item.subItems?.some(sub => sub.key === navItem.key) ?? false;

      // we build the new subItems array with the active state
      const newSubItems = item.subItems?.map(sub => ({
        ...sub,
        isActive: sub.key === navItem.key,
      })) ?? [];

      return {
        ...item,
        // the parent is active if it is clicked or if it has an active subItem
        isActive: isClickedNavItemWithSubItems || isSubItem,
        subItems: newSubItems,
      };
    })

    setNavItems(newNavItems);
    setHoveredNavItem(null);
    navItem.onClick();
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
          headerNavItems={extandedHeaderNavItems}
          isExpanded={isExpanded}
          logoSrc={logoSrc} 
          userName={userName} 
          onNavItemClick={handleNavItemClick}
          onMouseEnter={() => setHoveredNavItem(null)}
          onToggleExpandNavigation={handleToggleExpandNavigation}
          onProfileClick={onProfileClick}
        />

        <NavSection
          type={MenuItemType.Nav}
          navItems={extandedBodyNavItems}
          isExpanded={isExpanded}
          onNavItemClick={handleNavItemClick}
          onNavMouseEnter={handleNavMouseEnter}
          onNavMouseLeave={handleNavMouseLeave}
        />

        <NavSection
          type={MenuItemType.Footer}
          navItems={extandedFooterNavItems}
          isExpanded={isExpanded}
          onNavItemClick={handleNavItemClick}
          onNavMouseEnter={handleNavMouseEnter}
          onNavMouseLeave={handleNavMouseLeave}
        />
      </NavPanel>

      {isSideBarOpen && (
        <NavigationSideBar
          parent={hoveredNavItem ?? activeNavItem!}
          navItems={sidebarNavItems}
          open={isSideBarOpen}
          anchorWidth={navWidth}
          onMouseEnter={() => window.clearTimeout(hoverTimer.current)}
          onMouseLeave={() => setHoveredNavItem(null)}
          onNavItemClick={handleNavItemClick}
        />
      )}
    </NavContainer>
  );
};

export default NavigationBar;