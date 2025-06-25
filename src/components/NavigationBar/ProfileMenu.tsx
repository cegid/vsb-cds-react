import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, styled } from "@cegid/cds-react";
import Avatar from "../Avatar";
import Typography from "../Typography";
import Icon from "../Icon";
import { neutral } from "../../theme";
import Box from "../Box";
import { ProfileMenuItem } from "./NavigationBar";
import ProfileMenuAction from "./ProfileMenuAction";

const ProfileMenuContainer = styled(Menu)(({ theme }) => ({
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

const NameContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '6px 4px',
  alignItems: 'center',
  gap: theme.spacing(4),
  alignSelf: 'stretch',
}));

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  alignItems: 'center',
  alignSelf: 'stretch',
  borderRadius: '8px',
  display: 'flex',
  gap: theme.spacing(4),
  padding: theme.spacing(4),
  '&:hover': {
    backgroundColor: neutral[99],
  },
  '&:focus': {
    backgroundColor: neutral[99],
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
        <NameContainer>
          <Avatar size="medium" color="primary" trigram={userTrigram} />
          <Typography variant="bodySRegular" color="primary/10">
            {userFirstName} {userLastName}
          </Typography>
        </NameContainer>
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
        <MenuItemStyled onClick={onLogOut}>
          <ListItemIcon>
            <Icon>logout-02</Icon>
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="bodySRegular" color="primary/10">
                Déconnexion
              </Typography>
            }
          />
        </MenuItemStyled>
      </ActionContainer>
    </MenuContentWrapper>
  </ProfileMenuContainer>

);

export default ProfileMenu;