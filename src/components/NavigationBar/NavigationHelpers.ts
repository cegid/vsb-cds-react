import { ExtendedNavItem, MenuItemType, NavItem } from "./NavigationBar";

class NavigationHelpers {

  /**
   * Computes the active state of navigation items based on the activePathItem item.
   * @param {ExtendedNavItem[]} navItems initial array of nav items
   * @param {ExtendedNavItem} clicked the nav item that was clicked
   * @returns {ExtendedNavItem[]} new array of nav items with updated active states
   */
  static readonly computeActiveNavItems = (navItems: ExtendedNavItem[], activePathItem: ExtendedNavItem): ExtendedNavItem[] => {
  
    if (!activePathItem.path) return navItems;


    return navItems.map((navItem) => {
      const updatedChildren = navItem.children?.length
        ? NavigationHelpers.computeActiveNavItems(navItem.children, activePathItem)
        : [];

      const isActive = navItem.key === activePathItem.key || updatedChildren.some(child => child.isActive);

      return {
        ...navItem,
        isActive,
        children: updatedChildren,
      };
    });
  };

  /**
   * Utility function to build an ExtendedNavItem based on a given navItem and type.
   * @param {NavItem} navItem
   * @param {MenuItemType} type
   * @returns {ExtendedNavItem} an ExtendedNavItem with the specified type and initial state
   */
  static readonly buildExtendedNavItem = (navItem: NavItem, type: MenuItemType): ExtendedNavItem => ({
    ...navItem,
    type,
    isActive: false,
    children: navItem.children?.map((childNavItem) => NavigationHelpers.buildExtendedNavItem(childNavItem, type)) || [],
  });

  /**
   * Utility function to build ExtendedNavItems based on a type and navItems.
   * @param {NavItem[]} navItems
   * @param {MenuItemType} type
   * @returns {ExtendedNavItem[]} an array of ExtendedNavItems
   */
  static readonly buildExtendedNavItems = (navItems: NavItem[], type: MenuItemType): ExtendedNavItem[] => (
    navItems.map((navItem) => NavigationHelpers.buildExtendedNavItem(navItem, type))
  );


  static readonly findNavItemByKey = (navItems: ExtendedNavItem[], key: string): ExtendedNavItem | null => {
    for (const navItem of navItems) {
      if (navItem.key === key) return navItem;
      const childMatch = navItem.children && NavigationHelpers.findNavItemByKey(navItem.children, key);
      if (childMatch) return childMatch;
    }
    return null;
  }

  static readonly findNavItemByPath = (navItems: ExtendedNavItem[], path: string): ExtendedNavItem | null => {
    for (const navItem of navItems) {
      const childMatch = navItem.children && NavigationHelpers.findNavItemByPath(navItem.children, path);
      if (childMatch) return childMatch;
      if (navItem.path === path) return navItem;
    }
    return null;
  }

  static readonly findActivePath = (navItems: ExtendedNavItem[]): string[] | null => {
    for (const navItem of navItems) {
      if (navItem.isActive && (!navItem.children || navItem.children.length === 0)) {
        return [navItem.key];
      }
      if (navItem.children?.length) {
        const childPath = NavigationHelpers.findActivePath(navItem.children);
        if (childPath) {
          return [navItem.key, ...childPath];
        }
      }
    }
    return null;
  }

  static readonly getExpandedKeysToActive = (navItems: ExtendedNavItem[]): Set<string> => {
    const fullPath = NavigationHelpers.findActivePath(navItems) || [];
    // we remove the last key because it is the active item itself
    const ancestorKeys = fullPath.slice(0, -1);
    return new Set(ancestorKeys);
  }

  
}

export default NavigationHelpers;