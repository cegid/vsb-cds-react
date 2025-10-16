import { styled } from '@cegid/cds-react';
import Box from '../Box';
import type { ComponentWithExpandedProp, ExtendedNavItem } from './NavigationBar';
import { MenuItemType, NavList } from './NavigationBar';
import NavItemButton from './NavItemButton';

/**
 * Props for the NavigationSection component.
 * This component displays a section of navigation items (header, body, or footer).
 */
interface NavSectionProps {
  /**
   * The type of navigation section (header, body, or footer).
   * Determines the styling and positioning of the section.
   */
  type: MenuItemType;
  /**
   * Array of navigation items to display in this section.
   */
  navItems: ExtendedNavItem[];
  /**
   * Whether the navigation bar is expanded (showing labels) or collapsed (icons only).
   */
  isExpanded: boolean;
  /**
   * Callback fired when a navigation item is clicked.
   * @param item - The clicked navigation item
   */
  onNavItemClick: (item: ExtendedNavItem) => void;
  /**
   * Callback fired when the mouse enters a navigation item.
   * Used to open the sidebar with children items or close it if item has no children.
   * @param item - The hovered navigation item, or null to close the sidebar
   */
  onNavMouseEnter: (item: ExtendedNavItem | null) => void;
  /**
   * Callback fired when the mouse leaves a navigation item.
   * Used to trigger the sidebar closing animation after a delay.
   */
  onNavMouseLeave: () => void;
}

/**
 * Props for the styled navigation section container.
 * @internal
 */
interface NavSectionContainerProps extends ComponentWithExpandedProp {
  /**
   * The type of navigation section.
   * Body sections have flex: 1 to take up available space.
   */
  sectiontype: MenuItemType;
}

const NavSectionContainer = styled(Box, {
  shouldForwardProp: prop => prop !== 'expanded',
})<NavSectionContainerProps>(({ expanded, sectiontype }) => ({
  ...(sectiontype === MenuItemType.Nav ? { flex: 1 } : {}),
  alignItems: expanded ? 'flex-start' : 'center',
  alignSelf: expanded ? 'stretch' : undefined,
  display: 'flex',
  flexDirection: 'column',
}));


const NavSection: React.FC<NavSectionProps> = ({
  isExpanded,
  navItems,
  type,
  onNavItemClick,
  onNavMouseEnter,
  onNavMouseLeave,
}) => {
  return (
    <NavSectionContainer expanded={isExpanded} sectiontype={type}>
      <NavList expanded={isExpanded}>
        {navItems
          .filter(navItem => navItem.isVisible ?? true)
          .map((navItem) => {
            const hasChildren = Boolean(navItem.children);
            return (
              <NavItemButton
                key={navItem.key}
                navItem={navItem}
                isExpanded={isExpanded}
                onClick={() => onNavItemClick(navItem)}
                onMouseEnter={() => hasChildren 
                  ? onNavMouseEnter(navItem) 
                  : onNavMouseEnter(null)
                }
                onMouseLeave={onNavMouseLeave}
              />
          )
        })}
      </NavList>
    </NavSectionContainer>
  );
};

export default NavSection;