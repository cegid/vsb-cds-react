import type { Meta, StoryObj } from "@storybook/react-vite";
import NavigationBar from "./NavigationBar";
import { HEADER_ITEMS, NAV_ITEMS, FOOTER_ITEMS, PROFILE_MENU_ITEMS } from "./constants";
import Box from "../Box";
import Typography from "../Typography";
import Badge from "../Badge";
import Icon from "../Icon";
import Row from "../Row";
import Column from "../Column";
import { Fade } from "@cegid/cds-react";

const meta = {
  title: "🧭 Navigation/NavigationBar",
  component: NavigationBar,
  parameters: {
    layout: "start",
  },
  tags: ["autodocs"],
  argTypes: {
    headerNavItems: {
      control: "object",
      description: "Items to display in the header navigation",
    },
    bodyNavItems: {
      control: "object",
      description: "Items to display in the body navigation",
    },
    footerNavItems: {
      control: "object",
      description: "Items to display in the footer navigation",
    },
    profileMenuItems: {
      control: "object",
      description: "Menu Items to display in the profile menu",
    },
    userFirstName: {
      control: "text",
      description: "FirstName of the user to display in the header",
    },
    userLastName: {
      control: "text",
      description: "LastName of the user to display in the Profile menu",
    },
    userTrigram: {
      control: "text",
      description: "Trigram of the user to display in the Profile menu",
    },
    logoSrc: {
      control: "text",
      description: "Source URL for the logo image",
    },
    onLogOut: {
      action: "logOutClicked !",
      description: "Function called when the logout button is clicked",
    },
  },
  args: {
    headerNavItems: HEADER_ITEMS,
    bodyNavItems: NAV_ITEMS,
    footerNavItems: FOOTER_ITEMS,
    profileMenuItems: PROFILE_MENU_ITEMS,
    userFirstName: "John",
    userLastName: "Doe",
    userTrigram: "JD",
    onLogOut: () => console.log("logOut clicked!"),
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headerNavItems: HEADER_ITEMS,
    bodyNavItems: NAV_ITEMS,
    footerNavItems: FOOTER_ITEMS,
    userFirstName: "John",
    userLastName: "Doe",
    userTrigram: "JD",
    activePath: "/ventes/reglements/incoming",
    onLogOut: () => console.log("logOut clicked!"),
  },
  render: (args) => (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f0f0f0', }}>
      <NavigationBar {...args} />
      <div
        style={{
          flex: 1,
          padding: 24,
          overflow: 'auto',
        }}
      >
        <h1>Main application content</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
        </p>
        <p>
          Praesent vestibulum dapibus nibh. Etiam ultrices. Suspendisse in justo
          eu magna luctus suscipit.
        </p>
      </div>
    </div>
  ),
};

export const WithCustomNotifications: Story = {
  args: {
    headerNavItems: [
      ...HEADER_ITEMS,
      {
        key: 'notifications',
        label: 'Notifications',
        icon: "notification-02",
        path: '/notifications',
        children: [
          {
            key: 'notif-urgent',
            label: 'Facture en retard',
            path: '/notifications/urgent-1',
          },
          {
            key: 'notif-info',
            label: 'Nouveau devis',
            path: '/notifications/info-1',
          },
          {
            key: 'notif-success',
            label: 'Paiement reçu',
            path: '/notifications/success-1',
          },
          {
            key: 'notif-all',
            label: 'Voir toutes les notifications',
            path: '/notifications/all',
          },
        ],
        renderSidebarContent: (parent, navItems) => (
      <Box width="350px">
        {/* Header */}
        <Box
          alignItems="center"
          display="flex"
          height="40px"
          justifyContent="space-between"
          width="100%"
          mb={2}
        >
          <Fade in timeout={800}>
            <Typography variant="bodyMMedium" color="primary/10">
              {parent?.label || ''}
            </Typography>
          </Fade>
        </Box>

        {/* Custom notification cards */}
        <Column gap={2} width="100%">
          <Fade in timeout={800}>
            <Column gap={2}>
              {/* Critical notification */}
              <Box
                p={2}
                borderRadius={2}
                backgroundColor="critical/99"
                border={{ color: "critical/90", width: 1, style: "solid" }}
                sx={{
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: "critical/95",
                  },
                }}
                onClick={() => console.log('Urgent notification clicked')}
              >
                <Row gap={2} alignItems="flex-start">
                  <Icon size={20} color="critical/50" variant="stroke">
                    alert-circle
                  </Icon>
                  <Column gap={1} flex={1}>
                    <Row gap={2} alignItems="center" justifyContent="space-between">
                      <Typography variant="bodyMSemiBold" color="critical/10">
                        Facture en retard
                      </Typography>
                      <Badge color="critical" size="small">
                        <Typography variant="captionRegular" color="inherit">
                          Urgent
                        </Typography>
                      </Badge>
                    </Row>
                    <Typography variant="bodySRegular" color="neutral/50">
                      La facture #F-2024-001 est en retard de 15 jours
                    </Typography>
                    <Typography variant="captionRegular" color="neutral/60">
                      Il y a 2 heures
                    </Typography>
                  </Column>
                </Row>
              </Box>

              {/* Info notification */}
              <Box
                p={2}
                borderRadius={2}
                backgroundColor="info/99"
                border={{ color: "info/90", width: 1, style: "solid" }}
                sx={{
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: "info/95",
                  },
                }}
                onClick={() => console.log('Info notification clicked')}
              >
                <Row gap={2} alignItems="flex-start">
                  <Icon size={20} color="info/50" variant="stroke">
                    file-check-02
                  </Icon>
                  <Column gap={1} flex={1}>
                    <Row gap={2} alignItems="center" justifyContent="space-between">
                      <Typography variant="bodyMSemiBold" color="info/10">
                        Nouveau devis approuvé
                      </Typography>
                      <Badge color="info" size="small">
                        <Typography variant="captionRegular" color="inherit">
                          Info
                        </Typography>
                      </Badge>
                    </Row>
                    <Typography variant="bodySRegular" color="neutral/50">
                      Le devis #D-2024-042 a été approuvé par le client
                    </Typography>
                    <Typography variant="captionRegular" color="neutral/60">
                      Il y a 1 jour
                    </Typography>
                  </Column>
                </Row>
              </Box>

              {/* Success notification */}
              <Box
                p={2}
                borderRadius={2}
                backgroundColor="success/99"
                border={{ color: "success/90", width: 1, style: "solid" }}
                sx={{
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: "success/95",
                  },
                }}
                onClick={() => console.log('Success notification clicked')}
              >
                <Row gap={2} alignItems="flex-start">
                  <Icon size={20} color="success/50" variant="stroke">
                    checkmark-circle-03
                  </Icon>
                  <Column gap={1} flex={1}>
                    <Row gap={2} alignItems="center" justifyContent="space-between">
                      <Typography variant="bodyMSemiBold" color="success/10">
                        Paiement reçu
                      </Typography>
                      <Badge color="success" size="small">
                        <Typography variant="captionRegular" color="inherit">
                          Succès
                        </Typography>
                      </Badge>
                    </Row>
                    <Typography variant="bodySRegular" color="neutral/50">
                      Paiement de 2 500€ reçu pour la facture #F-2024-038
                    </Typography>
                    <Typography variant="captionRegular" color="neutral/60">
                      Il y a 3 jours
                    </Typography>
                  </Column>
                </Row>
              </Box>

              {/* Divider */}
              <Box
                height="1px"
                width="100%"
                backgroundColor="neutral/90"
                my={1}
              />

              {/* View all link */}
              <Box
                p={2}
                borderRadius={2}
                sx={{
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: "neutral/95",
                  },
                }}
                onClick={() => console.log('View all notifications clicked')}
              >
                <Row gap={2} alignItems="center" justifyContent="center">
                  <Typography variant="bodyMSemiBold" color="primary/50">
                    Voir toutes les notifications
                  </Typography>
                  <Icon size={16} color="primary/50" variant="stroke">
                    arrow-right
                  </Icon>
                </Row>
              </Box>
            </Column>
          </Fade>
        </Column>
      </Box>
        ),
      },
    ],
    bodyNavItems: NAV_ITEMS,
    footerNavItems: FOOTER_ITEMS,
    userFirstName: "John",
    userLastName: "Doe",
    userTrigram: "JD",
    activePath: "/ventes/clients",
    onLogOut: () => console.log("logOut clicked!"),
  },
  render: (args) => (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f0f0f0', }}>
      <NavigationBar {...args} />
      <div
        style={{
          flex: 1,
          padding: 24,
          overflow: 'auto',
        }}
      >
        <h1>Navigation avec sidebar de notifications personnalisée</h1>
        <p>
          Cliquez sur l'icône "Notifications" dans le header pour voir la sidebar personnalisée avec:
        </p>
        <ul>
          <li>Des cartes de notification avec différentes couleurs selon la criticité (critical, info, success)</li>
          <li>Des icônes personnalisées pour chaque type de notification</li>
          <li>Des badges de statut</li>
          <li>Des informations détaillées (description + timestamp)</li>
          <li>Des styles au hover pour chaque carte</li>
          <li>Un séparateur et un lien "Voir toutes les notifications" en bas</li>
        </ul>
        <p>
          Cet exemple démontre l'utilisation de la props <code>renderSidebarContent</code> pour créer
          un contenu de sidebar entièrement personnalisé. Cette approche offre un contrôle total sur
          l'affichage et permet de créer des interfaces complexes comme ce panneau de notifications.
        </p>
      </div>
    </div>
  ),
};
