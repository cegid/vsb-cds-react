import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { MenuItemType, NavItem, SubNavItem, ExtendedNavItem } from './NavigationBar';

/**
 * Maps a list of NavItem into ExtendedNavItem with the given type,
 * initializing all isActive flags to false.
 */
export function mapSection(
  items: NavItem[],
  type: MenuItemType
): ExtendedNavItem[] {
  return items.map((navItem) => ({
    ...navItem,
    type,
    isActive: false,
    subItems:
      navItem.subItems?.map((sub: SubNavItem) => ({
        ...sub,
        isActive: false,
      })) ?? [],
  }));
}

export type UseExtendedNavItemsReturn = [
  ExtendedNavItem[],
  Dispatch<SetStateAction<ExtendedNavItem[]>>
];

/**
 * Hook to manage the extended navigation items for the NavigationBar component.
 */
export const useExtendedNavItems = (headerNavItems: NavItem[], bodyNavItems: NavItem[], footerNavItems: NavItem[]): UseExtendedNavItemsReturn => {

  const initialNavItems = useMemo<ExtendedNavItem[]>(() => {
    return [
      ...mapSection(headerNavItems, MenuItemType.Header),
      ...mapSection(bodyNavItems,   MenuItemType.Nav),
      ...mapSection(footerNavItems, MenuItemType.Footer),
    ];
  }, [headerNavItems, bodyNavItems, footerNavItems]);

  const [navItems, setNavItems] = useState<ExtendedNavItem[]>(initialNavItems);

  useEffect(() => {
    setNavItems(initialNavItems);
  }, [initialNavItems]);

  return [navItems, setNavItems];
}
