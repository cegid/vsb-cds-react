import { Paper, Fade, styled } from "@cegid/cds-react";
import Box from "../Box";
import Typography from "../Typography";
import { primary } from "../../theme";
import NavItemButton from "./NavItemButton";
import { ExtendedNavItem, NavItem, NavList } from "./NavigationBar";

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
  boxShadow: "2px 0px 6.857px rgba(47,38,50,0.08), 2px 0px 6.857px rgba(47,38,50,0.08)",
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  height: '100%',
  left: anchorWidth,
  padding: 16,
  pointerEvents: open ? 'auto'  : 'none',
  position: 'absolute',
  top: 0,
  width: 225,
  zIndex: theme.zIndex.drawer + 1,
  
  // ----- Animation ------
  transform: open ? 'translateX(0)' : 'translateX(-100%)',
  opacity:   open ? 1 : 0,
  transition: open
    // opening
    ? 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 50ms ease-out'
    // closing
    : 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease-out',
}));


interface NavigationSideBarProps {
  anchorWidth: number;
  navItems: NonNullable<ExtendedNavItem['subItems']>;
  open: boolean;
  parent: ExtendedNavItem;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onNavItemClick: (navItem: NavItem) => void;
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
          <NavList dense>
            {navItems.map((navItem) => (
              <NavItemButton
                key={navItem.key}
                navItem={navItem}
                onClick={() => onNavItemClick(navItem)}
              />
            ))}
          </NavList>
        </Box>
      </Fade>
    </Box>
  </SidebarPanel>
);

export default NavigationSideBar;