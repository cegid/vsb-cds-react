import { Dispatch, SetStateAction, useState } from 'react';
import { MenuItemType, NavItem, SubNavItem, ExtendedNavItem } from './NavigationBar';

export type UseExtendedNavItemsReturn = [
  ExtendedNavItem[],
  Dispatch<SetStateAction<ExtendedNavItem[]>>
];

/**
 * Hook to manage the extended navigation items for the NavigationBar component.
 */
export const useExtendedNavItems = (headerNavItems: NavItem[], bodyNavItems: NavItem[], footerNavItems: NavItem[]): UseExtendedNavItemsReturn => {

    const [navItems, setNavItems] = useState<ExtendedNavItem[]>([
      ...headerNavItems.map((navItem) => ({
        ...navItem,
        type: MenuItemType.Header,
        isActive: false,
        subItems: navItem.subItems?.map((subNavItem: SubNavItem) => ({
          ...subNavItem,
          isActive: false,
        })) ?? [],
      })),
      ...bodyNavItems.map(item => ({
        ...item,
        type: MenuItemType.Nav,
        isActive: false,
        subItems: item.subItems?.map((subNavItem: SubNavItem) => ({
          ...subNavItem,
          isActive: false,
        })) ?? [],
      })),
      ...footerNavItems.map(item => ({
        ...item,
        type: MenuItemType.Footer,
        isActive: false,
        subItems: item.subItems?.map((subNavItem: SubNavItem) => ({
          ...subNavItem,
          isActive: false,
        })) ?? [],
      })),
    ]);

    return [navItems, setNavItems];
}
