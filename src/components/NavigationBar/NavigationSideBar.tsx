import { Paper, Fade, styled } from "@cegid/cds-react";
import Box from "../Box";
import Typography from "../Typography";
import { primary } from "../../theme";
import NavItemButton from "./NavItemButton";
import { ExtendedNavItem, ExtendedSubNavItem, NavList } from "./NavigationBar";

interface SidebarPanelProps {
  open: boolean;
  anchorWidth: number;
}

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
  width: 225,
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
   * - At or above 1535px: Sidebar is positioned relative to the main content
   */
  boxShadow: '2px 0px 6.857px 0px rgba(47, 38, 50, 0.08), 2px 0px 6.857px 0px rgba(47, 38, 50, 0.08)',
  position: 'absolute',
  top: 0,
  left: anchorWidth,

  [theme.breakpoints.up(1535)]: {
    boxShadow: 'none',
    position: 'relative',
    left: 'auto',
    top: 'auto',

    // We switch from transform-based overlay to width-based inline collapse
    // so the sidebar can animate closed without pushing adjacent content.
    opacity: 1,
    overflow: 'hidden',
    padding: open ? 16  : 0,
    pointerEvents: 'auto',
    transform: 'none',
    transition: 'width 200ms ease, padding 200ms ease',
    width: open ? 225 : 0,
  },
}));


interface NavigationSideBarProps {
  anchorWidth: number;
  navItems: NonNullable<ExtendedNavItem['subItems']>;
  open: boolean;
  parent: ExtendedNavItem;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onNavItemClick: (navItem: ExtendedNavItem | ExtendedSubNavItem) => void;
}

const NavigationSideBar = ({ 
  anchorWidth,
  navItems,
  open,
  parent,
  onMouseEnter,
  onMouseLeave,
  onNavItemClick
}: NavigationSideBarProps) => (
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
            {navItems.map((navItem) => (
              <NavItemButton
                key={navItem.key}
                navItem={navItem}
                onClick={() => onNavItemClick(navItem)}
                isSideBar
              />
            ))}
          </NavList>
        </Box>
      </Fade>
    </Box>
  </SidebarPanel>
);

export default NavigationSideBar;