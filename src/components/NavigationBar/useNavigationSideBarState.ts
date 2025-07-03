import { useEffect, useMemo, useState } from 'react';
import { ExtendedNavItem } from './NavigationBar';

/**
 * Hook to manage the state of the sidebar navigation items.
 *
 * Conditions to open the sidebar open:
 * 1. If the hoveredNavItem has children, the sidebar should open
 * 2. If the activeNavItem has children, the sidebar should remain open
 * 3. If the activeNavItem is a childNavItem of a navItem with children, the sidebar should remain open
 * @param navItems 
 * @param hoveredNavItem 
 * @returns SideBarNavItems and isSideBarOpen
 */
export const useSidebarState = (navItems: ExtendedNavItem[], hoveredNavItem: ExtendedNavItem | null) => {

  const [ isSideBarOpen, setIsSideBarOpen ] = useState<boolean>(false);

  const activeNavItem = useMemo((): ExtendedNavItem | null => (
    navItems.find((navItem) => navItem.isActive) ?? null
  ), [navItems]);

  const sidebarNavItems = useMemo(() => {

    const parentOfActiveChild = navItems.find((navItem) => navItem.children?.some((childNavItem) => childNavItem.isActive)
    ) ?? null;

    /**
     * By order of priority:
     * 1. If hoveredNavItem has children, return them
     * 2. If activeNavItem has children, return them
     * 3. If activeNavItem is a childNavItem, return its parent chidren
     */

    return hoveredNavItem?.children
      ?? activeNavItem?.children
      ?? parentOfActiveChild?.children
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
