import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, styled } from "@cegid/cds-react";
import Avatar from "../Avatar";
import Typography from "../Typography";
import Icon from "../Icon";
import { critical, neutral } from "../../theme";
import Box from "../Box";
import { ProfileMenuItem } from "./NavigationBar";
import ProfileMenuAction from "./ProfileMenuAction";

const ProfileMenuContainer = styled(Menu)(() => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
  },
  '& .MuiPaper-root': {
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    border: `1px solid ${neutral[95]}`,
    borderRadius: '16px',
    boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.04), 0px 2px 4px 0px rgba(0, 0, 0, 0.04)',
    maxWidth: '680px',
    padding: '8px 0',
    width: '232px',
  },
  '& .MuiList-root': {
    padding: 0,
  }
}));

const MenuContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

const ActionContainer = styled(Box)(({ theme }) => ({
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: '0 8px',
}));

const DividerStyled = styled(Divider)(() => ({
  alignItems: 'center',
  alignSelf: 'stretch',
  display: 'flex',
  height: '1px',
  justifyContent: 'center',
}));

const MenuItemAvatarStyled = styled(MenuItem)(({theme}) => ({
  alignItems: 'center',
  alignSelf: 'stretch',
  borderRadius: '8px',
  cursor: 'default',
  display: 'flex',
  gap: theme.spacing(4),
  padding: theme.spacing(4),
  pointerEvents: 'none',

  '&:hover, &:focus': {
    backgroundColor: 'transparent',
  },

  '& .MuiTouchRipple-root': {
    display: 'none',
  },
}));

const MenuItemLogOutStyled = styled(MenuItem)(({ theme }) => ({
  alignItems: 'center',
  alignSelf: 'stretch',
  borderRadius: '8px',
  color: neutral[10],
  display: 'flex',
  gap: theme.spacing(4),
  padding: theme.spacing(4),
  '& .MuiListItemIcon-root': {
    color: neutral[10],
  },

  '&:hover': {
    backgroundColor: critical[99],
    color: critical[50],

    '& .MuiListItemIcon-root': {
      color: critical[50],
    },
  },
  '&:focus': {
    backgroundColor: neutral[99],
    color: critical[50],

    '& .MuiListItemIcon-root': {
      color: critical[50],
    },
  },
}))

interface ProfileMenuProps {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  profileMenuItems: ProfileMenuItem[];
  userFirstName: string;
  userLastName: string
  userTrigram: string;
  onClose: () => void;
  onLogOut: () => void;
}

const ProfileMenu = ({
  anchorEl,
  isOpen,
  profileMenuItems,
  userFirstName,
  userLastName,
  userTrigram,
  onClose,
  onLogOut,
}: ProfileMenuProps) => (
  <ProfileMenuContainer
    anchorEl={anchorEl}
    open={isOpen}
    onClose={onClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
  >
    <MenuContentWrapper>
      <ActionContainer>
        <MenuItemAvatarStyled>
          <ListItemIcon>
            <Avatar size="medium" color="primary" trigram={userTrigram} />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="bodySRegular" color="neutral/10">
                {userFirstName} {userLastName}
              </Typography>
            }
          />
        </MenuItemAvatarStyled>
        { profileMenuItems
          .filter(profileMenuItem => profileMenuItem.isVisible ?? true)
          .map((profileMenuItem) => (
            <ProfileMenuAction
              key={profileMenuItem.label}
              label={profileMenuItem.label}
              icon={profileMenuItem.icon}
              onClick={profileMenuItem.onClick}
            />
        ))}
      </ActionContainer>

      <DividerStyled />

      <ActionContainer>
        <MenuItemLogOutStyled onClick={onLogOut}>
          <ListItemIcon>
            <Icon>logout-02</Icon>
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="bodySRegular">
                Déconnexion
              </Typography>
            }
          />
        </MenuItemLogOutStyled>
      </ActionContainer>
    </MenuContentWrapper>
  </ProfileMenuContainer>

);

export default ProfileMenu;