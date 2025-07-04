import { describe, it, expect } from 'vitest';
import type { BreadcrumbsItem } from './Breadcrumbs';
import BreadcrumbsHelpers from './BreadcrumbsHelpers';

const tree: BreadcrumbsItem[] = [
  {
    id: 'ventes',
    label: 'Ventes',
    children: [
      { id: 'devis', label: 'Devis', path: '/devis' },
      { id: 'factures', label: 'Factures', path: '/factures' },
      { id: 'produits', label: 'Produits et Services', path: '/services' },
      {
        id: 'reglements',
        label: 'Règlements',
        children: [
          { id: 'saisir', label: 'Saisir des règlements', path: '/payment/new' },
          { id: 'retard', label: 'Retard', path: '/payment/late' },
          { id: 'avenir', label: 'À venir', path: '/payment/incoming' },
          { id: 'recu', label: 'Reçu', path: '/payment/received' },
        ],
      },
    ],
  },
];

describe('BreadcrumbsHelpers.findPathItems', () => {
  it('should return an empty array if the path is not found', () => {
    const result = BreadcrumbsHelpers.findPathItems(tree, '/unknown');
    expect(result).toEqual([]);
  });

  it('should find a first-level child and return [parent, child]', () => {
    const result = BreadcrumbsHelpers.findPathItems(tree, '/devis');
    expect(result.map((item) => item.id)).toEqual(['ventes', 'devis']);
  });

  it('should find a nested child and return full ancestor path', () => {
    const result = BreadcrumbsHelpers.findPathItems(tree, '/payment/late');
    expect(result.map((item) => item.id)).toEqual([
      'ventes',
      'reglements',
      'retard',
    ]);
  });

  it('should find a direct match at deeper levels', () => {
    const result = BreadcrumbsHelpers.findPathItems(tree, '/payment/received');
    expect(result.map((item) => item.id)).toEqual([
      'ventes',
      'reglements',
      'recu',
    ]);
  });

  it('should handle root items with a path (if any)', () => {
    const extendedTree: BreadcrumbsItem[] = [
      { id: 'home', label: 'Home', path: '/' },
      ...tree,
    ];
    const result = BreadcrumbsHelpers.findPathItems(extendedTree, '/');
    expect(result.map((item) => item.id)).toEqual(['home']);
  });
});

describe('BreadcrumbsHelpers.generateBreadcrumbsSegments', () => {
  it('should return fallback segment when path not found', () => {
    const segments = BreadcrumbsHelpers.generateBreadcrumbsSegments(tree, '/unknown');
    expect(segments).toEqual([]);
  });

  it('should build segments for a first-level child path', () => {
    const segments = BreadcrumbsHelpers.generateBreadcrumbsSegments(tree, '/devis');
    const ids = segments.map((segment) => segment.breadcrumbNode.id);
    expect(ids).toEqual(['ventes', 'devis']);

    expect(segments[0].isActive).toBe(false);
    expect(segments[0].siblings).toEqual([]);
    expect(segments[0].children).toEqual(tree[0].children);

    expect(segments[1].isActive).toBe(true);
    const siblingsIds = segments[1].siblings.map((node) => node.id);
    expect(siblingsIds).toEqual(['factures', 'produits', 'reglements']);
    expect(segments[1].children).toEqual([]);
  });

  it('build segments for a nested path', () => {
    const segments = BreadcrumbsHelpers.generateBreadcrumbsSegments(tree, '/payment/late');
    console.log(segments);
    const ids = segments.map(s => s.breadcrumbNode.id);
    expect(ids).toEqual(['ventes', 'reglements', 'retard']);
    
    // level 1 (reglements)
    const siblingsLevel1 = segments[1].siblings.map(n => n.id);
    expect(siblingsLevel1).toEqual(['devis', 'factures', 'produits']);
    
    // level 2 (retard)
    const siblingsLevel2 = segments[2].siblings.map(n => n.id);
    expect(siblingsLevel2).toEqual(['saisir', 'avenir', 'recu']);
    
    expect(segments[2].isActive).toBe(true);
    expect(segments[2].children).toEqual([]);
  });
});
