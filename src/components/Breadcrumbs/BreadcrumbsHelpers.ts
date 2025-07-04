import { BreadcrumbsItem, BreadcrumbSegment } from "./Breadcrumbs";

class BreadcrumbsHelpers {

  /**
   * Find the path items in the breadcrumbs tree that match the current path.
   * @param tree - The breadcrumbs tree to search in.
   * @param currentPath - The current path to find in the tree.
   * @returns An array of BreadcrumbsItem that represent the path from root to the current item.
   */
  static readonly findPathItems = (tree: BreadcrumbsItem[], currentPath: string): BreadcrumbsItem[] => {
    for (const item of tree) {
      // if the item is the current path, return it
      if (item.path === currentPath) {
        return [item];
      }
      // Otherwise, check if the item has children
      if (item.children) {
        const sub = BreadcrumbsHelpers.findPathItems(item.children, currentPath);
        if (sub.length) {
          return [item, ...sub];
        }
      }
    }
    return [];
  }

  /**
   * Generate the breadcrumb segments based on the current path and the breadcrumbs tree.
   * @param tree - The breadcrumbs tree to generate segments from.
   * @param currentPath - The current path to find in the tree.
   * @returns An array of BreadcrumbSegment that represent the segments to display in the breadcrumbs.
   */
  static readonly generateBreadcrumbsSegments = (tree: BreadcrumbsItem[],  currentPath: string): BreadcrumbSegment[] => {
    const pathItems = BreadcrumbsHelpers.findPathItems(tree, currentPath);

    if (pathItems.length === 0) {
      return [];
    }

    return pathItems.map((breadcrumbNode, index) => {
      const isActive = index === pathItems.length - 1;

      const rawSiblings = index === 0 ? tree : pathItems[index - 1].children ?? [];
    
      const siblings = rawSiblings.filter((item) => item.path !== breadcrumbNode.path);

      return {
        breadcrumbNode,
        isActive,
        siblings,
        children: breadcrumbNode.children ?? [],
      };
    });
  }
}

export default BreadcrumbsHelpers;