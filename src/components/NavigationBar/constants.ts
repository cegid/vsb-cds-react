import { NavItem } from "./NavigationBar";

export const HEADER_ITEMS: NavItem[] = [
  {
    key: 'accueil',
    label: 'Accueil',
    icon: "home-01",
    onClick: () => console.log('Accueil clicked'),
  },
  {
    key: 'ia',
    label: 'IA de Cegid',
    icon: "ai-brain-03",
    onClick: () => console.log('Ia clicked'),
  },
];


export const NAV_ITEMS: NavItem[] = [

  {
    key: 'depense',
    label: 'Dépenses',
    icon: "shopping-bag-02",
    subItems: [
      {
        key: 'dépense',
        label: 'Dépenses',
        icon: "estimate-02",
        onClick: () => console.log('dépense (sous item) clicked'),
      },
      {
        key: 'fournisseurs',
        label: 'Fournisseurs',
        icon: "invoice-01",
        onClick: () => console.log('fournisseurs clicked'),
      },
    ],
    onClick: () => console.log('dépense (parent) clicked'),
  },
  {
    key: 'ventes',
    label: 'Ventes',
    icon: "cashier-02",
    subItems: [
      {
        key: 'devis',
        label: 'Devis',
        icon: "estimate-02",
        onClick: () => console.log('devis clicked'),
      },
      {
        key: 'factures',
        label: 'Factures',
        icon: "invoice-01",
        onClick: () => console.log('facture clicked'),
      },
      {
        key: 'clients',
        label: 'Clients',
        icon: "location-user-01",
        onClick: () => console.log('client clicked'),
      },
      {
        key: 'catalogues',
        label: 'Catalogues',
        icon: "library",
        onClick: () => console.log('catalogues clicked'),
      },
      {
        key: 'reglements',
        label: 'Règlements',
        icon: "payment-01",
        onClick: () => console.log('règlement clicked'),
      },
    ],
    onClick: () => console.log('ventes clicked'),
  },
  
  {
    key: 'pro_account',
    label: 'Compte Pro',
    icon: "bank",
    onClick: () => console.log('compte pro clicked'),
    isDisabled: true, // Example of a disabled item
  },
  {
    key: 'documents',
    label: 'Documents',
    icon: "file-01",
    onClick: () => console.log('document clicked'),
    isHidden: true, // Example of a hidden item
  },
  {
    key: 'contact',
    label: 'Contacts',
    icon: "contact-01",
    onClick: () => console.log('contact clicked'),
  },
];

export const FOOTER_ITEMS: NavItem[] = [
  {
    key: 'support',
    label: 'Support',
    icon: "customer-support",
    onClick: () => console.log('support clicked'),
  },
  {
    key: 'parametres',
    label: 'Paramètres',
    icon: "setting-07",
    onClick: () => console.log('paramètre clicked'),
  },
];