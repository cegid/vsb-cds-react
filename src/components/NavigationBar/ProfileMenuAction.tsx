import { ListItemIcon, ListItemText, MenuItem, styled } from "@cegid/cds-react";
import Typography from "../Typography";
import Icon from "../Icon";
import { neutral } from "../../theme";

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

interface ProfileMenuActionProps {
  label: string;
  icon: string;
  onClick: () => void;
}

const ProfileMenuAction = ({label, icon, onClick}: ProfileMenuActionProps) => (
  <MenuItemStyled onClick={onClick}>
    <ListItemIcon>
      <Icon color='neutral/10'>{icon}</Icon>
    </ListItemIcon>
    <ListItemText
      disableTypography
      primary={
        <Typography variant="bodySRegular" color="neutral/10">
          {label}
        </Typography>
      }
    />
  </MenuItemStyled>
)
export default ProfileMenuAction;