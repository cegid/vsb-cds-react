import { NavItem, ProfileMenuItem } from "./NavigationBar";

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
    key: 'depense_root',
    label: 'Dépenses',
    icon: "shopping-bag-02",
    path: '/depense',
    children: [
      {
        key: 'dépense',
        label: 'Dépenses',
        icon: "estimate-02",
        path: '/depense',
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
    children: [
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
        createPath: '/ventes/clients/new',
        onCreateClick: () => console.log('Créer un nouveau client'),
      },
      {
        key: 'catalogues',
        label: 'Catalogues',
        icon: "library",
        path: '/ventes/catalogues',
        onClick: () => console.log('catalogues clicked'),
        createPath: '/ventes/catalogues/new',
        onCreateClick: () => console.log('Créer un nouveau catalogue'),
      },
      {
        key: 'reglements',
        label: 'Règlements',
        icon: "payment-01",
        path: '/ventes/reglements',
        onClick: () => console.log('règlement clicked'),
        children: [
          {
            key: 'reglements-new',
            label: 'Saisir des Règlements',
            icon: "payment-01",
            path: '/ventes/reglements/new',
            onClick: () => console.log('reglement new clicked'),
          },
          {
            key: 'reglements-late',
            label: 'En retard',
            icon: "payment-01",
            path: '/ventes/reglements/late',
            onClick: () => console.log('reglement late clicked'),
          },
          {
            key: 'reglements-incoming',
            label: 'A venir',
            icon: "payment-01",
            path: '/ventes/reglements/incoming',
            onClick: () => console.log('reglement incoming clicked'),
          },
          {
            key: 'reglements-received',
            label: 'Reçus',
            icon: "payment-01",
            path: '/ventes/reglements/received',
            onClick: () => console.log('reglement new clicked'),
          },
        ]
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
    isVisible: false, // Example of a hidden item
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

export const PROFILE_MENU_ITEMS: ProfileMenuItem[] = [
  {
    label: 'Changer de dossier',
    icon: 'folder-transfer',
    onClick: () => console.log('Changer de dossier clicked'),
  },
  {
    label: 'Changer de version',
    icon: 'arrow-reload-horizontal',
    isVisible: false, // Example of a hidden item
    onClick: () => console.log('Changer de dossier clicked'),
  },
  {
    label: 'Aide en Ligne',
    icon: 'help-circle',
    onClick: () => console.log('Aide en Ligne clicked'),
  }
];