import { Fragment, useState } from "react";
import { Paper, Fade, styled } from "@cegid/cds-react";
import Box from "../Box";
import Typography from "../Typography";
import { primary } from "../../theme";
import NavItemButton from "./NavItemButton";
import { ExtendedNavItem, NavList } from "./NavigationBar";
import NavigationHelpers from "./NavigationHelpers";

interface SidebarPanelProps {
  open: boolean;
  anchorWidth: number;
}

export const SIDEBAR_WIDTH = '225px';

const SidebarPanel = styled(Paper, {
  shouldForwardProp: prop => prop !== 'open' && prop !== 'anchorWidth',
})<SidebarPanelProps>(({ theme, open, anchorWidth }) => ({
  alignItems: 'flex-start',
  backgroundColor: primary[99],
  borderRadius: '0px 16px 16px 0px', 
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  height: '100%',
  padding: 16,
  pointerEvents: open ? 'auto'  : 'none',
  width: SIDEBAR_WIDTH,
  zIndex: 1190,
  
  // ----- Animation ------
  transform: open ? 'translateX(0)' : 'translateX(-100%)',
  opacity:   open ? 1 : 0,
  transition: open
    // opening
    ? 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 50ms ease-out'
    // closing
    : 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease-out',

  /**
   * Breakpoint handling:
   * - Below 1535px: Sidebar is positioned absolutely to the right of the anchor with a shadow
   * - At or above 1535px: Sidebar is still on position absolute but we simulate relative position by adding margin on NavPanel
   */
  boxShadow: '2px 0px 6.857px 0px rgba(47, 38, 50, 0.08), 2px 0px 6.857px 0px rgba(47, 38, 50, 0.08)',
  position: 'absolute',
  top: 0,
  left: anchorWidth,

  [theme.breakpoints.up(1535)]: {
    boxShadow: 'none',
    left: open ? anchorWidth : 0,
    transition: theme.transitions.create('left', { duration: 200 }),
  },
}));

interface NavigationSideBarProps {
  anchorWidth: number;
  navItems: NonNullable<ExtendedNavItem['children']>;
  open: boolean;
  parent: ExtendedNavItem;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onNavItemClick: (navItem: ExtendedNavItem) => void;
}

const NavigationSideBar = ({ 
  anchorWidth,
  navItems,
  open,
  parent,
  onMouseEnter,
  onMouseLeave,
  onNavItemClick
}: NavigationSideBarProps) => {

  /**
   * Set to keep track of expanded navigation items.
   * This is used to manage the state of which NavItems are expanded in the sidebar.
   */
  const [expandedNavItems, setExpandedNavItems] = useState<Set<string>>(NavigationHelpers.getExpandedKeysToActive(navItems));
  
  const toggleNavItemExpansion = (navItemKey: string) => {
    setExpandedNavItems((prevNavItems) => {
      const newSet = new Set(prevNavItems);
      if (newSet.has(navItemKey)) {
        newSet.delete(navItemKey);
      } else {
        newSet.add(navItemKey);
      }
      return newSet;
    });
  };

  return (
    <SidebarPanel 
      anchorWidth={anchorWidth}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      open={open} 
      square  
    >
      {/* Title */}
      <Box
        alignItems="center"
        display="flex"
        height="40px"
        justifyContent="space-between"
        width="100%"
      >
        <Box display="flex" alignItems="center" gap={4}>
          <Fade
            key={parent?.label || ''}
            in
            timeout={800}
            mountOnEnter
            unmountOnExit
          >
            <Typography variant="bodyMMedium" color="primary/10">
              {parent?.label || ''}
            </Typography>
          </Fade>
        </Box>
      </Box>

      {/* Listing */}
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        padding="8px 0 16px"
        width="100%"
      >
        <Fade
          key={parent?.label || ''}
          in
          timeout={800}
          mountOnEnter
          unmountOnExit
        >
          <Box>
            <NavList dense expanded={true}>
              {navItems.map((navItem) => {
                const hasChildren = !!navItem.children?.length;
                const isExpandedNavItem = expandedNavItems.has(navItem.key);

                return (
                  <Fragment key={navItem.key}>
                      <NavItemButton
                        navItem={navItem}
                        onClick={() => {
                          if (hasChildren) {
                            toggleNavItemExpansion(navItem.key);
                          } else {
                            onNavItemClick(navItem);
                          }
                        }}
                        isSideBar
                        isExpandedNavItem={isExpandedNavItem}
                      />
                      {/* Handle here navItems under a parentNavItem in the sideBar */}
                      {hasChildren && isExpandedNavItem && (
                        <Box ml={5}>
                          {navItem.children!.map((childNavItem) => (
                            <NavItemButton
                              key={childNavItem.key}
                              navItem={childNavItem}
                              isSideBar
                              isExpandedNavItem={expandedNavItems.has(childNavItem.key)}
                              onClick={() => onNavItemClick(childNavItem)}
                            />
                          ))}
                        </Box>
                      )}
                  </Fragment>
                )
              })}
            </NavList>
          </Box>
        </Fade>
      </Box>
    </SidebarPanel>
  )
};

export default NavigationSideBar;