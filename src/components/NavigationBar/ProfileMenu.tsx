import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, styled } from "@cegid/cds-react";
import Avatar from "../Avatar";
import Typography from "../Typography";
import Icon from "../Icon";
import { critical, neutral } from "../../theme";
import Box from "../Box";
import { ProfileMenuItem } from "./NavigationBar";
import ProfileMenuAction from "./ProfileMenuAction";

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
}));

const DividerStyled = styled(Divider)(() => ({
  alignItems: 'center',
  alignSelf: 'stretch',
  display: 'flex',
  height: '1px',
  justifyContent: 'center',
}));

const MenuItemAvatarStyled = styled(MenuItem)(() => ({
  cursor: 'default',
  pointerEvents: 'none',
  '&:hover, &:focus': {
    backgroundColor: 'transparent',
  },
  '& .MuiTouchRipple-root': {
    display: 'none',
  },
}));

const MenuItemLogOutStyled = styled(MenuItem)(() => ({
  color: neutral[10],

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
  <Menu
    anchorEl={anchorEl}
    open={isOpen}
    onClose={onClose}
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
  </Menu>

);

export default ProfileMenu;