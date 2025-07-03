import { describe, it, expect, beforeEach } from 'vitest';
import NavigationHelpers from './NavigationHelpers';
import { ExtendedNavItem, MenuItemType, NavItem } from './NavigationBar';

const NAV_ITEMS: NavItem[] = [
  {
    key: 'ventes',
    label: 'Ventes',
    icon: "cashier-02",
    path: '/ventes',
    children: [
      {
        key: 'devis',
        label: 'Devis',
        icon: "estimate-02",
        path: '/ventes/devis',
        onClick: () => {},
      },
      {
        key: 'reglements',
        label: 'Règlements',
        icon: "payment-01",
        path: '/ventes/reglements',
        onClick: () => {},
        children: [
          {
            key: 'reglements-new',
            label: 'Saisir des Règlements',
            icon: "payment-01",
            path: '/ventes/reglements/new',
            onClick: () => {},
          },
          {
            key: 'reglements-late',
            label: 'En retard',
            icon: "payment-01",
            path: '/ventes/reglements/late',
            onClick: () => {},
          },
        ]
      },
    ],
    onClick: () => {},
  },
  {
    key: 'contact',
    label: 'Contacts',
    icon: "contact-01",
    path: '/contact',
    onClick: () => {},
  },
];

describe('NavigationHelpers.buildExtendedNavItem', () => {
  it('should build an ExtendedNavItem with correct type and isActive=false', () => {
    const navItem = NAV_ITEMS[1];
    const navItemExtended = NavigationHelpers.buildExtendedNavItem(navItem, MenuItemType.Nav);
    expect(navItemExtended).toMatchObject({
      ...navItem,
      type: MenuItemType.Nav,
      isActive: false,
    });
  });

  it('should recursively build children as ExtendedNavItems with same type', () => {
    const navItem = NAV_ITEMS[0];
    const navItemExtended = NavigationHelpers.buildExtendedNavItem(navItem, MenuItemType.Nav);
    const devis = navItemExtended.children?.find(child => child.key === 'devis');
    expect(devis).toMatchObject({
      ...devis,
      type: MenuItemType.Nav,
      isActive: false,
    });
  });
});

describe('NavigationHelpers.buildExtendedNavItems', () => {
  it('should build an array of ExtendedNavItems with correct types and isActive=false', () => {
    const extendedNavItems = NavigationHelpers.buildExtendedNavItems(NAV_ITEMS, MenuItemType.Nav);
    expect(extendedNavItems).toHaveLength(2);
    expect(extendedNavItems[0].type).toBe(MenuItemType.Nav);
    expect(extendedNavItems[0].isActive).toBe(false);
    expect(extendedNavItems[1].type).toBe(MenuItemType.Nav);
    expect(extendedNavItems[1].isActive).toBe(false);
  });
});

describe('NavigationHelpers.findByKey', () => {
  let extendedNavItems: ExtendedNavItem[];

  beforeEach(() => {
    extendedNavItems = NavigationHelpers.buildExtendedNavItems(NAV_ITEMS, MenuItemType.Nav);
  });

  it('should find an ExtendedNavItem by key', () => {
    const foundItem = NavigationHelpers.findNavItemByKey(extendedNavItems, 'ventes');
    expect(foundItem).toBeDefined();
    expect(foundItem?.key).toBe('ventes');
  });

  it('should return null if no item is found with the given key', () => {
    const foundItem = NavigationHelpers.findNavItemByKey(extendedNavItems, 'non-existent-key');
    expect(foundItem).toBeNull();
  });

  it('should find a child item by key recursively', () => {
    const foundItem = NavigationHelpers.findNavItemByKey(extendedNavItems, 'reglements-late');
    expect(foundItem).toBeDefined();
    expect(foundItem?.key).toBe('reglements-late');
  });
});

describe('NavigationHelpers.computeActiveNavItems', () => {
  let extendedNavItems: ExtendedNavItem[];

  beforeEach(() => {
    extendedNavItems = NavigationHelpers.buildExtendedNavItems(NAV_ITEMS, MenuItemType.Nav);
  });
  it('should return the new navitems with cliked item on active', () => {
    const clicked = NavigationHelpers.findNavItemByKey(extendedNavItems, 'ventes') as ExtendedNavItem;
    const result = NavigationHelpers.computeActiveNavItems(extendedNavItems, clicked);
    const expectedActiveItem = NavigationHelpers.findNavItemByKey(result, 'ventes');
    expect(expectedActiveItem).toEqual({
      ...clicked,
      isActive: true,
      children: clicked.children?.map(child => ({ ...child, isActive: false })) || [],
    });
  });
  it('if clicked on a child the parent should become active', () => {
    const clicked = NavigationHelpers.findNavItemByKey(extendedNavItems, 'devis') as ExtendedNavItem;
    const result = NavigationHelpers.computeActiveNavItems(extendedNavItems, clicked);
    const parentItem = NavigationHelpers.findNavItemByKey(result, 'ventes');

    expect(parentItem).toEqual({
      ...extendedNavItems[0],
      isActive: true,
      children: extendedNavItems[0].children?.map(child => ({ ...child, isActive: child.key === 'devis' })) || [],
    });
  });
  it('if clicked on a child navItem from a child navItem the parent, grand parent and clicked item should become active', () => {
    const clicked = NavigationHelpers.findNavItemByKey(extendedNavItems, 'reglements-late') as ExtendedNavItem;
    const result = NavigationHelpers.computeActiveNavItems(extendedNavItems, clicked);
    const grandParentItem = NavigationHelpers.findNavItemByKey(result, 'ventes') as ExtendedNavItem;
    const parentItem = NavigationHelpers.findNavItemByKey(result, 'reglements') as ExtendedNavItem;
    const navItemClicked = NavigationHelpers.findNavItemByKey(result, 'reglements-late') as ExtendedNavItem;

    expect(navItemClicked.isActive).toBe(true);
    expect(parentItem.isActive).toBe(true);
    expect(grandParentItem.isActive).toBe(true);
  });
});

describe('NavigationHelpers.findActivePath', () => {
  let extendedNavItems: ExtendedNavItem[]

  beforeEach(() => {
    // On reconstruit à chaque test le tree avec isActive = false par défaut
    extendedNavItems = NavigationHelpers.buildExtendedNavItems(
      NAV_ITEMS,
      MenuItemType.Nav
    )
  });

  it('should return null for an empty array', () => {
    expect(NavigationHelpers.findActivePath([])).toBeNull()
  });

  it('should return ventes, reglements, reglements-late when reglements-late is active', () => {
    const incoming = NavigationHelpers.findNavItemByKey(
      extendedNavItems,
      'reglements-late'
    )!
    incoming.isActive = true

    const activePath = NavigationHelpers.findActivePath(extendedNavItems);

    expect(activePath).toEqual([
      'ventes',
      'reglements',
      'reglements-late'
    ])
  })
});

describe('NavigationHelpers.getExpandedKeysToActive', () => {
  let extendedNavItems: ExtendedNavItem[]

  beforeEach(() => {
    extendedNavItems = NavigationHelpers.buildExtendedNavItems(
      NAV_ITEMS,
      MenuItemType.Nav
    )
  });

  it('should return empty set when no leaf is active', () => {
    const expanded = NavigationHelpers.getExpandedKeysToActive(
      extendedNavItems
    )
    expect(expanded.size).toBe(0)
  });

  it('should return Set(["ventes","reglements"]) when reglements-late is active', () => {
    const lateItem = NavigationHelpers.findNavItemByKey(
      extendedNavItems,
      'reglements-late'
    )!
    lateItem.isActive = true

    const expanded = NavigationHelpers.getExpandedKeysToActive(
      extendedNavItems
    )
    expect(expanded).toEqual(new Set(['ventes', 'reglements']))
  });
})