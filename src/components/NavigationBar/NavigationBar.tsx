import { useEffect, useMemo, useRef, useState } from "react";
import { List, styled, useMediaQuery } from "@cegid/cds-react";
import Box from "../Box";
import { primary } from "../../theme";
import logo from './logo.svg';
import NavHeader from "./NavigationHeader";
import NavSection from "./NavigationSection";
import NavigationSideBar, { SIDEBAR_WIDTH } from "./NavigationSideBar";
import { useExtendedNavItems } from "./useExtendedNavItems";
import { useSidebarState } from "./useNavigationSideBarState";
import NavigationHelpers from "./NavigationHelpers";

export interface NavItem {
  icon?: string;
  isDisabled?: boolean;
  isVisible?: boolean;
  key: string;
  label: string;
  path?: string;
  children?: NavItem[];
  onClick?: () => void;
  createPath?: string;
  onCreateClick?: () => void;
}

export interface ProfileMenuItem {
  label: string,
  icon: string;
  isVisible?: boolean;
  onClick: () => void;
}

export interface ExtendedNavItem extends NavItem {
  type: MenuItemType;
  isActive: boolean;
  children?: ExtendedNavItem[];
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

export interface NavPanelProps extends ComponentWithExpandedProp {
  sidebaropen?: boolean;
}

const NavPanel = styled(Box, {
  shouldForwardProp: prop => {
    const key = String(prop);
    return !['expanded', 'sidebaropen'].includes(key);
  },
})<NavPanelProps>(({ theme, expanded, sidebaropen = false })  => ({
  display: 'flex',
  width: expanded ? '204px' : '48px' ,
  padding: theme.spacing(4),
  flexDirection: 'column',
  justifyContent: expanded ? 'center' : 'flex-end',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  gap: theme.spacing(9),
  flexShrink: expanded ? undefined : 0,
  backgroundColor: primary[95],
  overflow: 'hidden',
  zIndex: 1200,
  
  // Animation for expanding and collapsing the navigation panel
  transition: theme.transitions.create('width', { duration: 200 }),

  [theme.breakpoints.up(1535)]: {
    /**
     * At or above 1535px we play on margin-right to simulate a relative position for the sidebar
     */
    marginRight: sidebaropen ? SIDEBAR_WIDTH : 0,
  },

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
   : Boolean(hoveredNavItem?.children?.length);

  const hoverTimer = useRef<number>();
  const closeTimer = useRef<number>();
  
  const navRef = useRef<HTMLDivElement>(null);
  const navWidth = isExpanded ? 204 : 48;

  const handleNavMouseEnter = (item: ExtendedNavItem | null) => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(hoverTimer.current);
    
    if (hoveredNavItem !== item) {
      hoverTimer.current = window.setTimeout(() => {
        setHoveredNavItem(item);
      }, 400);
    }
  };

  const handleNavMouseLeave = () => {
    window.clearTimeout(hoverTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setHoveredNavItem(null);
    }, 300);
  };

  /**
   * Cleanup function to clear all timers when the component unmounts.
   */
  useEffect(() => () => {
    window.clearTimeout(hoverTimer.current);
    window.clearTimeout(closeTimer.current);
  }, []);

  /**
   * Effect to handle the active path based on the current activePath.
   */
  useEffect(() => {
    const activePathItem = NavigationHelpers.findNavItemByPath(navItems, activePath);
    if (activePathItem) {
      const newNavItems = NavigationHelpers.computeActiveNavItems(navItems, activePathItem);
      setNavItems(newNavItems);
    }
  }, [activePath]); 


  const handleNavItemClick = (navItem: ExtendedNavItem) => {
    window.clearTimeout(hoverTimer.current);
    window.clearTimeout(closeTimer.current);
    setHoveredNavItem(null);
    navItem?.onClick?.();
  };

  const handleToggleExpandNavigation = () => {
    window.clearTimeout(hoverTimer.current);
    window.clearTimeout(closeTimer.current);
    setIsExpanded(!isExpanded);
    setHoveredNavItem(null);
  };

  const handleSidebarMouseEnter = () => {
    window.clearTimeout(closeTimer.current);
  };

  const handleSidebarMouseLeave = () => {
    window.clearTimeout(hoverTimer.current);
    window.clearTimeout(closeTimer.current);
    setHoveredNavItem(null);
  };

  return (
    <NavContainer>
      <NavPanel
        ref={navRef}
        expanded={isExpanded}
        sidebaropen={isSideBarOpen}
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

      <NavigationSideBar
        key={activeNavItem?.key}
        parent={hoveredNavItem ?? activeNavItem!}
        navItems={sidebarNavItems}
        open={isSideBarOpen}
        anchorWidth={navWidth}
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
        onNavItemClick={handleNavItemClick}
      />
    </NavContainer>
  );
};

export default NavigationBar;