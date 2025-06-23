import { styled } from '@cegid/cds-react';
import Box from '../Box';
import type { ComponentWithExpandedProp, ExtendedNavItem } from './NavigationBar';
import { MenuItemType, NavList } from './NavigationBar';
import NavItemButton from './NavItemButton';

interface NavSectionProps {
  type: MenuItemType;
  navItems: ExtendedNavItem[];
  isExpanded: boolean;
  onItemClick: (item: ExtendedNavItem) => void;
  onNavMouseEnter: (item: ExtendedNavItem | null) => void;
  onNavMouseLeave: () => void;
}

interface NavSectionContainerProps extends ComponentWithExpandedProp {
  sectionType: MenuItemType;
}

const NavSectionContainer = styled(Box, {
  shouldForwardProp: prop => prop !== 'expanded',
})<NavSectionContainerProps>(({ expanded, sectionType }) => ({
  ...(sectionType === MenuItemType.Nav ? { flex: 1 } : {}),
  alignItems: expanded ? 'flex-start' : 'center',
  alignSelf: expanded ? 'stretch' : undefined,
  display: 'flex',
  flexDirection: 'column',
}));


const NavSection: React.FC<NavSectionProps> = ({
  isExpanded,
  navItems,
  type,
  onItemClick,
  onNavMouseEnter,
  onNavMouseLeave,
}) => {
  return (
    <NavSectionContainer expanded={isExpanded} sectionType={type}>
      <NavList expanded={isExpanded}>
        {navItems.map((navItem) => {
          const hasSubitems = Boolean(navItem.subItems);
          return (
            <NavItemButton
            key={navItem.key}
            navItem={navItem}
            isExpanded={isExpanded}
            onClick={() => onItemClick(navItem)}
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