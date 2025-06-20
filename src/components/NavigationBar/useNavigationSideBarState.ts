import { useMemo } from 'react';
import { ExtendedNavItem } from './NavigationBar';

/**
 * Hook to manage the state of the sidebar navigation items.
 *
 * Conditions to maintain the sidebar open:
 * 1. If the hoveredNavItem has subItems, the sidebar should remain open
 * 2. If the activeNavItem has subItems, the sidebar should remain open
 * 3. If the activeNavItem is a subItem of a navItem with subItems, the sidebar should remain open
 * @param navItems 
 * @param hoveredNavItem 
 * @param isExpanded 
 * @returns SideBarNavItems and isSideBarOpen
 */
export const useSidebarState = (navItems: ExtendedNavItem[], hoveredNavItem: ExtendedNavItem | null, isExpanded: boolean) => (
  useMemo(() => {
    const activeNavItem = navItems.find(i => i.isActive) ?? null;

    const parentOfActiveChild = navItems.find(
      i => i.subItems?.some(sub => sub.isActive)
    ) ?? null;

    const sidebarNavItems =
      // priority on Hover
      hoveredNavItem?.subItems
      // if no hover, check active item
      ?? activeNavItem?.subItems
      // if it's a subItem, check its parent
      ?? parentOfActiveChild?.subItems
      ?? [];

    const isSideBarOpen = isExpanded && sidebarNavItems.length > 0;

    return { sidebarNavItems, isSideBarOpen, activeNavItem };
  }, [navItems, hoveredNavItem, isExpanded])
);
