import { ListItem, ListItemButton, ListItemIcon, styled } from "@cegid/cds-react";
import ListItemText from '@mui/material/ListItemText';
import type { ExtendedSubNavItem, ExtendedNavItem, ComponentWithExpandedProp } from "./NavigationBar";
import Icon from "../Icon";
import Typography from "../Typography";
import { primary } from "../../theme";
export interface NavListItemButtonProp {
  isActive: boolean;
  isSideBar: boolean;
}

const NavListItemButton = styled(ListItemButton, {
  shouldForwardProp: prop => {
    const key = String(prop);
    return !['isActive', 'isSideBar'].includes(key);
  },
})<NavListItemButtonProp>(({ isActive, isSideBar }) => ({
  padding: '0 8px',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'flex-start',
  gap: '8px',
  backgroundColor: isActive ? primary[90] : 'transparent',
  '&:hover': {
    backgroundColor: isSideBar ? primary[95] : primary[90],
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

const NavListItemIcon = styled(ListItemIcon)(() => ({
  alignItems: 'center',
  display: 'flex',
  gap: '10px',
  minWidth: 0,
  padding: 0,
}));

interface NavItemButtonProps {
  navItem: ExtendedNavItem | ExtendedSubNavItem;
  isExpanded?: boolean;
  isSideBar?: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const NavItemButton: React.FC<NavItemButtonProps> = ({
  navItem, isExpanded = true, isSideBar = false, onClick, onMouseEnter, onMouseLeave
}) => {
  const iconVariant = navItem.isActive ? 'solid' : 'stroke';
  return (
    <ListItem disablePadding onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <NavListItemButton onClick={onClick} title={navItem.label} isActive={navItem.isActive} isSideBar={isSideBar}>
        {navItem.iconLabel && (
          <NavListItemIcon>
            <MenuIcon variant={iconVariant} color="primary/10" size="16px" expanded={isExpanded}>
              {navItem.iconLabel}
            </MenuIcon>
          </NavListItemIcon>
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
