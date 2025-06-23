import { useEffect, useMemo, useState } from 'react';
import { ExtendedNavItem } from './NavigationBar';

/**
 * Hook to manage the state of the sidebar navigation items.
 *
 * Conditions to open the sidebar open:
 * 1. If the hoveredNavItem has subItems, the sidebar should open
 * 2. If the activeNavItem has subItems, the sidebar should remain open
 * 3. If the activeNavItem is a subItem of a navItem with subItems, the sidebar should remain open
 * @param navItems 
 * @param hoveredNavItem 
 * @returns SideBarNavItems and isSideBarOpen
 */
export const useSidebarState = (navItems: ExtendedNavItem[], hoveredNavItem: ExtendedNavItem | null) => {

  const [ isSideBarOpen, setIsSideBarOpen ] = useState<boolean>(false);

  const activeNavItem = useMemo((): ExtendedNavItem | null => (
    navItems.find(item => item.isActive) ?? null
  ), [navItems]);
  
  const sidebarNavItems = useMemo(() => {

    const parentOfActiveChild = navItems.find(
      i => i.subItems?.some(sub => sub.isActive)
    ) ?? null;

    /**
     * By order of priority:
     * 1. If hoveredNavItem has subItems, return them
     * 2. If activeNavItem has subItems, return them
     * 3. If activeNavItem is a subItem, return its parent subItems
     */

    return hoveredNavItem?.subItems
      ?? activeNavItem?.subItems
      ?? parentOfActiveChild?.subItems
      ?? [];
  }, [navItems, hoveredNavItem, activeNavItem]);

  useEffect(() => {
    if (sidebarNavItems.length > 0) {
      setIsSideBarOpen(true);
    } else {
      setIsSideBarOpen(false);
    }
  }, [sidebarNavItems]);

    return { sidebarNavItems, isSideBarOpen, activeNavItem };
};
