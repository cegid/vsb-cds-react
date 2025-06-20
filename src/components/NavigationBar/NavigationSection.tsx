import Box from '../Box';
import type { ExtendedNavItem } from './NavigationBar';
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

const NavSection: React.FC<NavSectionProps> = ({
  isExpanded,
  navItems,
  type,
  onItemClick,
  onNavMouseEnter,
  onNavMouseLeave,
}) => {
  return (
    <Box
      alignItems="flex-start"
      alignSelf="stretch"
      display="flex"
      flexDirection="column"
      gap={2}
      {...(type === MenuItemType.Nav ? { flex: 1 } : {})} 
    >
      <NavList>
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
    </Box>
  );
};

export default NavSection;