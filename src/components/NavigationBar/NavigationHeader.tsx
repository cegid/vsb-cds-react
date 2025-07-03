import { ListItem, ListItemText, styled } from "@cegid/cds-react";
import Icon from "../Icon";
import Box from "../Box";
import Typography from "../Typography";
import IconButton from "../IconButton";
import { ComponentWithExpandedProp, ExtendedNavItem, NavList, ProfileMenuItem } from "./NavigationBar";
import NavItemButton, { NavListItemButton, NavListItemIcon } from "./NavItemButton";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import MenuToggleButton from "./MenuToggleButton";

const HeaderContainer = styled(Box, {
  shouldForwardProp: prop => prop !== 'expanded',
})<ComponentWithExpandedProp>(({ theme, expanded }) => ({
  alignItems: expanded ? 'flex-start' : 'center',
  alignSelf: expanded ? 'stretch' : undefined,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  justifyContent: expanded ? undefined : 'center',
}));

const MenuControlSection = styled(Box, {
  shouldForwardProp: prop => prop !== 'expanded',
})<ComponentWithExpandedProp>(({ theme, expanded }) => 
  expanded ?
  {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    justifyContent: 'center',
    width: '100%',
  } 
  : {}
);

const MenuToggleWrapper = styled(Box, {
  shouldForwardProp: prop => prop !== 'expanded',
})<ComponentWithExpandedProp>(({ expanded }) => 
  expanded ?
  {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  }
  : 
  {}
);

const MenuToggleButtonContainer = styled(Box, {
  shouldForwardProp: prop => prop !== 'expanded',
})<ComponentWithExpandedProp>(({ expanded }) => ({
  alignItems: 'center',
  alignSelf: expanded ? 'stretch' : undefined,
  display: 'flex',
  flexDirection: expanded ? undefined : 'column',
  height: '34px',
  justifyContent: expanded ? undefined : 'center',
  padding: '8px 0',
}));

const IconButtonProfile = styled(IconButton)(() => ({
    borderRadius: 0,
    height: 'auto',
    padding: 0,
    width:  'auto',
}));

interface NavHeaderProps {
  headerNavItems:  ExtendedNavItem[];
  isExpanded: boolean;
  logoSrc: string;
  profileMenuItems: ProfileMenuItem[];
  userFirstName: string;
  userLastName: string;
  userTrigram: string;
  onLogOut: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onNavItemClick: (navItem: ExtendedNavItem) => void;
  onToggleExpandNavigation: () => void;
};

const NavHeader = ({
  headerNavItems,
  isExpanded,
  logoSrc,
  profileMenuItems,
  userFirstName,
  userLastName,
  userTrigram,
  onLogOut,
  onMouseEnter,
  onMouseLeave,
  onNavItemClick,
  onToggleExpandNavigation,
}: NavHeaderProps) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleProfileClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HeaderContainer expanded={isExpanded}>
      <MenuControlSection expanded={isExpanded}>
        <MenuToggleWrapper expanded={isExpanded}>
          <MenuToggleButtonContainer expanded={isExpanded}>
            <MenuToggleButton isExpanded={isExpanded} onToggle={onToggleExpandNavigation} />
          </MenuToggleButtonContainer>
        </MenuToggleWrapper>
      </MenuControlSection>
      <NavList expanded={isExpanded}>
        <ListItem disablePadding onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <NavListItemButton onClick={handleProfileClick} title="Accès au profil" active={open} profile={true} sidebar={false} expanded={isExpanded}>
              <NavListItemIcon>
                <img
                  src={logoSrc}
                  alt="Logo Cegid"
                  width={24}
                  height={24}
                />
              </NavListItemIcon>
            {isExpanded && (
              <>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="bodySMedium" color="primary/10" noWrap>
                      Bonjour {userFirstName}
                    </Typography>
                  }
                />
                <IconButtonProfile variant="iconOnly" title="Accès au profil">
                  <Icon variant="stroke" size="16px" color="primary/10">arrow-down-01</Icon>
                </IconButtonProfile>
              </>
            )}
          </NavListItemButton>
      </ListItem>
      </NavList>
      <ProfileMenu
        anchorEl={anchorEl}
        isOpen={open}
        profileMenuItems={profileMenuItems}
        userFirstName={userFirstName}
        userLastName={userLastName}
        userTrigram={userTrigram}
        onClose={handleClose}
        onLogOut={onLogOut}
      />
      <NavList expanded={isExpanded}>
        { headerNavItems
          .filter(navItem => navItem.isVisible ?? true)
          .map((navItem) => (
              <NavItemButton
                key={navItem.key}
                navItem={navItem}
                isExpanded={isExpanded}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={() => onNavItemClick(navItem)}
              />
        ))}
        {/* <ListItem
            key="recherche"
            disablePadding
            onMouseEnter={() => setHoveredNavItem(null)}
            // onClick={() => handleItemClick(navItem)}
          >
            <NavListItemButton>
              <ListItemIcon><MenuIcon variant="stroke" color="primary/10" size="24px">search-01</MenuIcon></ListItemIcon>
              {expanded && (
                <ListItemText 
                  disableTypography
                  primary={
                    <Typography
                      variant="bodySMedium"
                      color="primary/10"
                    >
                    Recherche
                  </Typography>
                  } 
                />
              )}
            </NavListItemButton>
          </ListItem> */}
      </NavList>
    </HeaderContainer>
  )
};

export default NavHeader;