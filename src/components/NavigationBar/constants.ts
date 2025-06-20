import { NavItem } from "./NavigationBar";

export const HEADER_ITEMS: NavItem[] = [
  {
    key: 'accueil',
    label: 'Accueil',
    iconLabel: "home-01",
  },
  {
    key: 'ia',
    label: 'IA de Cegid',
    iconLabel: "ai-brain-03",
  },
];


export const NAV_ITEMS: NavItem[] = [

  {
    key: 'depense',
    label: 'Dépenses',
    iconLabel: "shopping-bag-02",
    subItems: [
      {
        key: 'dépense',
        label: 'Dépenses',
        iconLabel: "estimate-02",
      },
      {
        key: 'fournisseurs',
        label: 'Fournisseurs',
        iconLabel: "invoice-01",
      },
    ],
  },
  {
    key: 'ventes',
    label: 'Ventes',
    iconLabel: "cashier-02",
    subItems: [
      {
        key: 'devis',
        label: 'Devis',
        iconLabel: "estimate-02",
      },
      {
        key: 'factures',
        label: 'Factures',
        iconLabel: "invoice-01",
      },
      {
        key: 'clients',
        label: 'Clients',
        iconLabel: "location-user-01",
      },
      {
        key: 'catalogues',
        label: 'Catalogues',
        iconLabel: "library",
      },
      {
        key: 'reglements',
        label: 'Règlements',
        iconLabel: "payment-01",
      },
    ],
  },
  
  {
    key: 'pro_account',
    label: 'Compte Pro',
    iconLabel: "bank",
  },
  {
    key: 'documents',
    label: 'Documents',
    iconLabel: "file-01",
  },
  {
    key: 'contact',
    label: 'Contacts',
    iconLabel: "contact-01",
  },
];

export const FOOTER_ITEMS: NavItem[] = [
  {
    key: 'support',
    label: 'Support',
    iconLabel: "customer-support",
  },
  {
    key: 'parametres',
    label: 'Paramètres',
    iconLabel: "setting-07",
  },
];