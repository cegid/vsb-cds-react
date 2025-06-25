import { ButtonBase, styled } from "@cegid/cds-react";
import Icon from "../Icon";
import Box from "../Box";
import Typography from "../Typography";
import IconButton from "../IconButton";
import { ComponentWithExpandedProp, ExtendedNavItem, ExtendedSubNavItem, NavList, ProfileMenuItem } from "./NavigationBar";
import NavItemButton from "./NavItemButton";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { primary } from "../../theme";

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
    padding: '0 4px',
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
  gap : expanded ? undefined : '10px',
  height: expanded ? '34px' : '56px',
  justifyContent: expanded ? undefined : 'center',
  padding: '8px 0',
}));

const ProfileSection = styled(ButtonBase, {
  shouldForwardProp: prop => prop !== 'expanded',
})<ComponentWithExpandedProp>(({ expanded }) => 
  expanded ?
  {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 8px',
    width: '100%',
    borderRadius: "9999px",
    '&:hover': {
      backgroundColor: primary[99],
    },
  }
: {
  borderRadius: "9999px",
  '&:hover': {
    backgroundColor: primary[99],
  },
});

const ProfileWrapper = styled(Box, {
  shouldForwardProp: prop => prop !== 'expanded',
})<ComponentWithExpandedProp>(({ theme, expanded }) => 
  expanded ?
  {
    alignItems: 'center',
    alignSelf: 'stretch',
    display: 'flex',
    gap: theme.spacing(4),
    padding: '8px 0',
  }
: {});

const ProfileContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  flex: 1,
  justifyContent: 'space-between',
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
  onNavItemClick: (navItem: ExtendedNavItem | ExtendedSubNavItem) => void;
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
            <IconButton variant="iconOnly" onClick={onToggleExpandNavigation} title="Basculer la navigation">
              <Icon size="14px" color="primary/10">sidebar-left-01</Icon>
            </IconButton>
          </MenuToggleButtonContainer>
        </MenuToggleWrapper>
      </MenuControlSection>
      <ProfileSection expanded={isExpanded} onClick={handleProfileClick}>
        <ProfileWrapper expanded={isExpanded}>
          <img
            src={logoSrc}
            alt="Logo Cegid"
            width={24}
            height={24}
          />
          { isExpanded && (
            <ProfileContent>
              <Typography variant="bodySSemiBold" color="primary/10">
                Bonjour {userFirstName}
              </Typography>
              <IconButtonProfile variant="iconOnly" title="Accès au profil">
                <Icon variant="stroke" size="16px" color="primary/10">arrow-down-01</Icon>
              </IconButtonProfile>
            </ProfileContent>
          )}
        </ProfileWrapper>
      </ProfileSection>
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