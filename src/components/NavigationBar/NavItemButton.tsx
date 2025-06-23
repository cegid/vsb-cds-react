import { ListItem, ListItemButton, ListItemIcon, styled } from "@cegid/cds-react";
import ListItemText from '@mui/material/ListItemText';
import type { ExtendedSubNavItem, ExtendedNavItem, ComponentWithExpandedProp } from "./NavigationBar";
import Icon from "../Icon";
import Typography from "../Typography";
import { primary } from "../../theme";

interface NavItemButtonProps {
  navItem: ExtendedNavItem | ExtendedSubNavItem;
  isExpanded?: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const NavListItemButton = styled(ListItemButton)(() => ({
  padding: 0,
  borderRadius: '8px',
  border: 'none',
  background: 'transparent',
  '&:hover': {
    border: '1px solid white',
    background: `linear-gradient(0deg, ${primary[90]} 0%, #E7F6FF 118.75%)`,
  },

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
  const iconVariant = navItem.isActive ? 'solid' : 'stroke';
  return (
    <ListItem disablePadding onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <NavListItemButton onClick={onClick} title={navItem.label}>
        {navItem.iconLabel && (
          <ListItemIcon>
            <MenuIcon variant={iconVariant} color="primary/10" size="24px" expanded={isExpanded}>
              {navItem.iconLabel}
            </MenuIcon>
          </ListItemIcon>
        )}
        {isExpanded && (
          <ListItemText
            disableTypography
            primary={
              <Typography variant="bodySMedium" color="primary/10">
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
