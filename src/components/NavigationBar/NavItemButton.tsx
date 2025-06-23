import { ListItem, ListItemButton, ListItemIcon, styled } from "@cegid/cds-react";
import ListItemText from '@mui/material/ListItemText';
import type { ExtendedSubNavItem, ExtendedNavItem, ComponentWithExpandedProp } from "./NavigationBar";
import Icon from "../Icon";
import Typography from "../Typography";

interface NavItemButtonProps {
  navItem: ExtendedNavItem | ExtendedSubNavItem;
  isExpanded?: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const NavListItemButton = styled(ListItemButton)(() => ({
  padding: 0,
}));

const MenuIcon = styled(Icon, {
  shouldForwardProp: prop => prop !== 'expanded',
})<ComponentWithExpandedProp>(({ theme, expanded }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  justifyContent: expanded ? undefined : 'center',
  aspectRatio: '1 / 1',
  alignItems: 'center',
  gap: '10px',
}));


const NavItemButton: React.FC<NavItemButtonProps> = ({
  navItem, isExpanded = true, onClick, onMouseEnter, onMouseLeave
}) => {
  const color = navItem.isActive ? 'primary/60' : 'primary/10';
  return (
    <ListItem disablePadding onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <NavListItemButton onClick={onClick}>
        {navItem.iconLabel && (
          <ListItemIcon>
            <MenuIcon variant="stroke" color={color} size="24px" expanded={isExpanded}>
              {navItem.iconLabel}
            </MenuIcon>
          </ListItemIcon>
        )}
        {isExpanded && (
          <ListItemText
            disableTypography
            primary={
              <Typography variant="bodySMedium" color={color}>
                {navItem.label}
              </Typography>
            }
          />
        )}
      </NavListItemButton>
    </ListItem>
  );
};

export default NavItemButton;
