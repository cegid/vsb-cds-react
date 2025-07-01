import { ListItem, ListItemButton, ListItemIcon, styled } from "@cegid/cds-react";
import ListItemText from '@mui/material/ListItemText';
import type { ExtendedSubNavItem, ExtendedNavItem, ComponentWithExpandedProp } from "./NavigationBar";
import Icon from "../Icon";
import Typography from "../Typography";
import { primary } from "../../theme";

export interface NavListItemButtonProp {
  active: boolean;
  sidebar: boolean;
  expanded: boolean;
  profile?: boolean;
}

export const NavListItemButton = styled(ListItemButton, {
  shouldForwardProp: prop => {
    const key = String(prop);
    return !['active', 'sidebar', 'expanded'].includes(key);
  },
})<NavListItemButtonProp>(({ active, sidebar, expanded, profile = false }) => {

  let backgroundColor: string;
  if (!active) {
    backgroundColor = 'transparent';
  } else if (profile) {
    backgroundColor = primary[99];
  } else {
    backgroundColor = primary[90];
  }

  return {
    alignItems: 'center',
    backgroundColor,
    borderRadius: '8px',
    display: 'flex',
    gap: '8px',
    height: '32px',
    justifyContent: expanded ? 'flex-start' : 'center',
    overflow: 'hidden',
    padding: expanded ? '4px' : '4px 8px',
    width: expanded ? undefined : '32px',
    '&:hover': {
      backgroundColor: sidebar ? primary[95] : primary[99],
    },
  }
});

export const MenuIcon = styled(Icon, {
  shouldForwardProp: prop => prop !== 'expanded',
})<ComponentWithExpandedProp>(({ theme, expanded }) => ({
  alignItems: 'center',
  aspectRatio: '1 / 1',
  display: 'flex',
  gap: '10px',
  justifyContent: expanded ? undefined : 'center',
  padding: theme.spacing(2),
}));

export const NavListItemIcon = styled(ListItemIcon)(() => ({
  alignItems: 'center',
  display: 'flex',
  gap: '10px',
  margin: 0,
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
      <NavListItemButton onClick={onClick} title={navItem.label} active={navItem.isActive} sidebar={isSideBar} disabled={navItem.isDisabled} expanded={isExpanded}>
        {navItem.icon && (
          <NavListItemIcon>
            <MenuIcon variant={iconVariant} color="primary/10" size="16px" expanded={isExpanded}>
              {navItem.icon}
            </MenuIcon>
          </NavListItemIcon>
        )}
        {isExpanded && (
          <ListItemText
            disableTypography
            primary={
              <Typography variant="bodySMedium" color="primary/10" noWrap>
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
