import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { MenuItemType, NavItem, ExtendedNavItem } from './NavigationBar';
import NavigationHelpers from './NavigationHelpers';

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
      ...NavigationHelpers.buildExtendedNavItems(headerNavItems, MenuItemType.Header),
      ...NavigationHelpers.buildExtendedNavItems(bodyNavItems,   MenuItemType.Nav),
      ...NavigationHelpers.buildExtendedNavItems(footerNavItems, MenuItemType.Footer),
    ];
  }, [headerNavItems, bodyNavItems, footerNavItems]);

  const [navItems, setNavItems] = useState<ExtendedNavItem[]>(initialNavItems);

  useEffect(() => {
    setNavItems(initialNavItems);
  }, [initialNavItems]);

  return [navItems, setNavItems];
}
