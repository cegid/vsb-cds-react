import { ListItemIcon, ListItemText, MenuItem } from "@cegid/cds-react";
import Typography from "../Typography";
import Icon from "../Icon";
interface ProfileMenuActionProps {
  label: string;
  icon: string;
  onClick: () => void;
}

const ProfileMenuAction = ({label, icon, onClick}: ProfileMenuActionProps) => (
  <MenuItem onClick={onClick}>
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
  </MenuItem>
)
export default ProfileMenuAction;