import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  styled,
} from "@cegid/cds-react";
import ListItemText from "@mui/material/ListItemText";
import type {
  ExtendedNavItem,
  ComponentWithExpandedProp,
} from "./NavigationBar";
import Icon from "../Icon";
import Typography from "../Typography";
import { primary } from "../../theme";
import { useState, useRef, useEffect } from "react";
import Tooltip from "../Tooltip";
import IconButton from "../IconButton";

export interface NavListItemButtonProp {
  active: boolean;
  sidebar: boolean;
  expanded: boolean;
  profile?: boolean;
  haschildren?: boolean;
}

export const NavListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => {
    const key = String(prop);
    return !["active", "sidebar", "expanded", "haschildren"].includes(key);
  },
})<NavListItemButtonProp>(
  ({ active, sidebar, expanded, profile = false, haschildren = false }) => {
    let backgroundColor: string;
    if (!active) {
      backgroundColor = "transparent";
    } else if (profile) {
      backgroundColor = primary[99];
    } else if (sidebar && haschildren) {
      backgroundColor = primary[95];
    } else {
      backgroundColor = primary[90];
    }

    return {
      alignItems: "center",
      backgroundColor,
      borderRadius: "8px",
      display: "flex",
      gap: "8px",
      height: "32px",
      justifyContent: expanded ? "flex-start" : "center",
      overflow: "hidden",
      padding: expanded ? "4px" : "4px 8px",
      width: expanded ? undefined : "32px",
      "&:hover": {
        backgroundColor: sidebar ? primary[95] : primary[99],
      },
    };
  }
);

export const MenuIcon = styled(Icon, {
  shouldForwardProp: (prop) => prop !== "expanded",
})<ComponentWithExpandedProp>(({ theme, expanded }) => ({
  alignItems: "center",
  aspectRatio: "1 / 1",
  display: "flex",
  gap: "10px",
  justifyContent: expanded ? undefined : "center",
  padding: theme.spacing(2),
  transition: "all 0.2s ease-in-out",
}));

interface CollapseIconProps {
  expandednavitem?: boolean;
}

export const CollapseIcon = styled(Icon, {
  shouldForwardProp: (prop) => prop !== "expandednavitem",
})<CollapseIconProps>(({ expandednavitem }) => ({
  transform: expandednavitem ? "rotate(180deg)" : undefined,
  transition: "transform 0.2s",
}));

export const NavListItemIcon = styled(ListItemIcon)(() => ({
  alignItems: "center",
  display: "flex",
  gap: "10px",
  margin: 0,
  minWidth: 0,
  padding: 0,
  width: "18px",
  justifyContent: "center",
}));

interface NavItemButtonProps {
  navItem: ExtendedNavItem;
  isExpanded?: boolean;
  isExpandedNavItem?: boolean;
  isSideBar?: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const NavItemButton: React.FC<NavItemButtonProps> = ({
  navItem,
  isExpanded = true,
  isSideBar = false,
  isExpandedNavItem = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimer = useRef<number>();
  const iconVariant = navItem.isActive ? "solid" : "stroke";
  const hasChildren =
    Array.isArray(navItem.children) && navItem.children.length > 0;
  const handleMouseEnter = () => {
    setIsHovered(true);
    // Only show tooltip if navigation is collapsed (text is not visible)
    if (!isExpanded) {
      tooltipTimer.current = window.setTimeout(() => {
        setShowTooltip(true);
      }, 1000);
    }
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowTooltip(false);
    window.clearTimeout(tooltipTimer.current);
    onMouseLeave?.();
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(tooltipTimer.current);
    };
  }, []);

  return (
    <ListItem
      disablePadding
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Tooltip title={navItem.label} open={showTooltip} color="dark" placement="right">
        <NavListItemButton
          onClick={onClick}
          active={navItem.isActive}
          sidebar={isSideBar}
          disabled={navItem.isDisabled}
          expanded={isExpanded}
          haschildren={hasChildren}
        >
          {navItem.icon && (
            <NavListItemIcon>
              <MenuIcon
                variant={iconVariant}
                color="primary/10"
                size={isHovered && !navItem.isDisabled ? "18px" : "16px"}
                expanded={isExpanded}
              >
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
          {navItem.createPath && isExpanded && (
            <IconButton
              onClick={() => navItem.onCreateClick}
              variant="iconOnly"
              square
            >
              <Icon variant="stroke" color="primary/10" size="12px">
                add-01
              </Icon>
            </IconButton>
          )}
          {isSideBar && hasChildren && (
            <CollapseIcon
              variant="stroke"
              color="primary/10"
              size="12px"
              expandednavitem={isExpandedNavItem}
            >
              arrow-down-01
            </CollapseIcon>
          )}
        </NavListItemButton>
      </Tooltip>
    </ListItem>
  );
};

export default NavItemButton;
