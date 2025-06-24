import { NavItem } from "./NavigationBar";

export const HEADER_ITEMS: NavItem[] = [
  {
    key: 'accueil',
    label: 'Accueil',
    icon: "home-01",
    path: '/',
    onClick: () => console.log('Accueil clicked'),
  },
  {
    key: 'ia',
    label: 'IA de Cegid',
    icon: "ai-brain-03",
    path: '/ai',
    onClick: () => console.log('Ia clicked'),
  },
];


export const NAV_ITEMS: NavItem[] = [

  {
    key: 'depense',
    label: 'Dépenses',
    icon: "shopping-bag-02",
    path: '/depense',
    subItems: [
      {
        key: 'dépense',
        label: 'Dépenses',
        icon: "estimate-02",
        path: '/depense/estimate',
        onClick: () => console.log('dépense (sous item) clicked'),
      },
      {
        key: 'fournisseurs',
        label: 'Fournisseurs',
        icon: "invoice-01",
        path: '/depense/fournisseurs',
        onClick: () => console.log('fournisseurs clicked'),
      },
    ],
    onClick: () => console.log('dépense (parent) clicked'),
  },
  {
    key: 'ventes',
    label: 'Ventes',
    icon: "cashier-02",
    path: '/ventes',
    subItems: [
      {
        key: 'devis',
        label: 'Devis',
        icon: "estimate-02",
        path: '/ventes/devis',
        onClick: () => console.log('devis clicked'),
      },
      {
        key: 'factures',
        label: 'Factures',
        icon: "invoice-01",
        path: '/ventes/factures',
        onClick: () => console.log('facture clicked'),
      },
      {
        key: 'clients',
        label: 'Clients',
        icon: "location-user-01",
        path: '/ventes/clients',
        onClick: () => console.log('client clicked'),
      },
      {
        key: 'catalogues',
        label: 'Catalogues',
        icon: "library",
        path: '/ventes/catalogues',
        onClick: () => console.log('catalogues clicked'),
      },
      {
        key: 'reglements',
        label: 'Règlements',
        icon: "payment-01",
        path: '/ventes/reglements',
        onClick: () => console.log('règlement clicked'),
      },
    ],
    onClick: () => console.log('ventes clicked'),
  },
  
  {
    key: 'pro_account',
    label: 'Compte Pro',
    icon: "bank",
    path: '/pro-account',
    onClick: () => console.log('compte pro clicked'),
    isDisabled: true, // Example of a disabled item
  },
  {
    key: 'documents',
    label: 'Documents',
    icon: "file-01",
    path: '/files',
    onClick: () => console.log('document clicked'),
    isHidden: true, // Example of a hidden item
  },
  {
    key: 'contact',
    label: 'Contacts',
    icon: "contact-01",
    path: '/contact',
    onClick: () => console.log('contact clicked'),
  },
];

export const FOOTER_ITEMS: NavItem[] = [
  {
    key: 'support',
    label: 'Support',
    icon: "customer-support",
    path: '/help',
    onClick: () => console.log('support clicked'),
  },
  {
    key: 'parametres',
    label: 'Paramètres',
    icon: "setting-07",
    path: '/settings',
    onClick: () => console.log('paramètre clicked'),
  },
];