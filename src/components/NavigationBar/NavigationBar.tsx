import { useEffect, useMemo, useRef, useState } from "react";
import { List, styled, useMediaQuery } from "@cegid/cds-react";
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
  isVisible?: boolean;
  key: string;
  label: string;
  path: string;
  subItems?: SubNavItem[];
  onClick: () => void;
}

export interface ProfileMenuItem {
  label: string,
  icon: string;
  isVisible?: boolean;
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

const NavContainer = styled(Box)(({ theme }) => ({
  position: 'relative',

  // < 1535px → floating above the main content
  display: 'inline-flex',
  height: '100vh',
  alignItems: 'center',
  flexShrink: 0,

  // ≥ 1535px → standard attached layout
  [theme.breakpoints.up(1535)]: {
    display: 'flex',
    height: '100vh',
  },
}));

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
   * The currently active path in the navigation bar, used to highlight the active item.
   */
  activePath: string;
  /** 
   * Array of navigation items displayed in the main body section.
   */
  bodyNavItems: NavItem[];
  /** 
   * Array of navigation items displayed in the footer section.
   */
  footerNavItems: NavItem[];
  /** 
   * Array of navigation items displayed in the header section.
   */
  headerNavItems: NavItem[];
  /**
   *  URL or import source for the logo image displayed in the profile area. By default BIM Logo
   */
  logoSrc?: string;
  /**
   * Array of profile menu items displayed in the profile menu.
   */
  profileMenuItems: ProfileMenuItem[];
  /**
   *  The firstname of the current user, displayed in the profile greeting.
   */
  userFirstName: string;
  /**
   *  The last of the current user, displayed in the profile menu with the firstName.
   */
  userLastName: string;
  /**
   *  Trigram of the current user.
   */
  userTrigram: string;
  /**
   * Callback function to handle logout action.
   */
  onLogOut: () => void;

}

const computeActiveNavItems = (
  navItems: ExtendedNavItem[],
  clicked: ExtendedNavItem | ExtendedSubNavItem
): ExtendedNavItem[] => {
  return navItems.map((navItem) => {

    // clicked item got subItems
    const isClickedNavItemWithSubItems = navItem.key === clicked.key && 'subItems' in clicked;

    // clicked item is a subItem of a parent item
    const isSubItem = navItem.subItems?.some((sub) => sub.key === clicked.key) ?? false;

    // we build the new subItems array with the active state
    const newSubItems = navItem.subItems?.map((sub) => ({
      ...sub,
      isActive: sub.key === clicked.key,
    })) ?? [];

    return {
      ...navItem,
      isActive: isClickedNavItemWithSubItems || isSubItem,
      subItems: newSubItems,
    };
  });
};

const NavigationBar = ({
  activePath,
  bodyNavItems,
  footerNavItems,
  headerNavItems,
  logoSrc = logo,
  profileMenuItems,
  userFirstName,
  userLastName,
  userTrigram,
  onLogOut,
}: NavigationBarProps) => {

  const [navItems, setNavItems] = useExtendedNavItems(headerNavItems, bodyNavItems, footerNavItems);

  const extandedHeaderNavItems = useMemo(() => navItems.filter(item => item.type === MenuItemType.Header), [navItems]);
  const extandedBodyNavItems = useMemo(() => navItems.filter(item => item.type === MenuItemType.Nav), [navItems]);
  const extandedFooterNavItems = useMemo(() => navItems.filter(item => item.type === MenuItemType.Footer), [navItems]);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hoveredNavItem, setHoveredNavItem] = useState<ExtendedNavItem | null>(null);

  /**
   * Determine if SidePanel should be closed after a click on a nav item (< 1535px)
   * If the screen is large enough, the sidebar will always be open.
   */
  const isLargeScreen = useMediaQuery("(min-width:1535px)");

  const { sidebarNavItems, isSideBarOpen: baseIsSideBarOpen, activeNavItem } = useSidebarState(navItems, hoveredNavItem);

  const isSideBarOpen = isLargeScreen
   ? baseIsSideBarOpen
   : Boolean(hoveredNavItem?.subItems?.length);

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

  /**
   * Effect to handle the initial active path when the component mounts.
   */
  useEffect(() => {
    let activeItem: ExtendedNavItem | ExtendedSubNavItem | null = null;
    for (const parentNavItem of navItems) {
      if (parentNavItem.path === activePath) {
        activeItem = parentNavItem;
        break;
      }
      const subNavItem = parentNavItem.subItems?.find((subNavItem) => subNavItem.path === activePath);
      if (subNavItem) {
        activeItem = subNavItem;
        break;
      }
    }
    if (activeItem) {
      const newNavItems = computeActiveNavItems(navItems, activeItem);

      setNavItems(newNavItems);
    }
  }, []); 


  const handleNavItemClick = (navItem: ExtendedNavItem | ExtendedSubNavItem) => {
    const newNavItems = computeActiveNavItems(navItems, navItem);

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
          userFirstName={userFirstName}
          userLastName={userLastName}
          userTrigram={userTrigram}
          profileMenuItems={profileMenuItems}
          onLogOut={onLogOut}
          onNavItemClick={handleNavItemClick}
          onMouseEnter={() => setHoveredNavItem(null)}
          onToggleExpandNavigation={handleToggleExpandNavigation}
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