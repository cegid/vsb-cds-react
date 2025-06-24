import { styled } from '@cegid/cds-react';
import Box from '../Box';
import type { ComponentWithExpandedProp, ExtendedNavItem, ExtendedSubNavItem } from './NavigationBar';
import { MenuItemType, NavList } from './NavigationBar';
import NavItemButton from './NavItemButton';

interface NavSectionProps {
  type: MenuItemType;
  navItems: ExtendedNavItem[];
  isExpanded: boolean;
  onNavItemClick: (item: ExtendedNavItem | ExtendedSubNavItem) => void;
  onNavMouseEnter: (item: ExtendedNavItem | null) => void;
  onNavMouseLeave: () => void;
}

interface NavSectionContainerProps extends ComponentWithExpandedProp {
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
          .filter(navItem => !navItem.isHidden)
          .map((navItem) => {
            const hasSubitems = Boolean(navItem.subItems);
            return (
              <NavItemButton
                key={navItem.key}
                navItem={navItem}
                isExpanded={isExpanded}
                onClick={() => onNavItemClick(navItem)}
                onMouseEnter={() => hasSubitems 
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