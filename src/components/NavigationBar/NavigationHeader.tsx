import { styled } from "@cegid/cds-react";
import Icon from "../Icon";
import Box from "../Box";
import Typography from "../Typography";
import IconButton from "../IconButton";
import { ComponentWithExpandedProp, ExtendedNavItem, ExtendedSubNavItem, NavList } from "./NavigationBar";
import NavItemButton from "./NavItemButton";

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
  display: 'flex',
  height: expanded ? '34px' : '56px',
  padding: '8px 0',
  flexDirection: expanded ? undefined : 'column',
  justifyContent: expanded ? undefined : 'center',
  alignItems: 'center',
  alignSelf: expanded ? 'stretch' : undefined,
  gap : expanded ? undefined : '10px',
}));

const ProfileSection = styled(Box, {
  shouldForwardProp: prop => prop !== 'expanded',
})<ComponentWithExpandedProp>(({ expanded }) => 
  expanded ?
  {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 8px',
    width: '100%',
  }
: {});

const ProfileWrapper = styled(Box, {
  shouldForwardProp: prop => prop !== 'expanded',
})<ComponentWithExpandedProp>(({ theme, expanded }) => 
  expanded ?
  {
    display: 'flex',
    padding: '8px 8px 8px 0',
    alignItems: 'center',
    gap: theme.spacing(4),
    alignSelf: 'stretch',
  }
: {});

const ProfileContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

interface NavHeaderProps {
  headerNavItems:  ExtendedNavItem[];
  isExpanded: boolean;
  logoSrc: string;
  userName: string;
  onNavItemClick: (navItem: ExtendedNavItem | ExtendedSubNavItem) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onToggleExpandNavigation: () => void;
};

const NavHeader = ({
  headerNavItems,
  isExpanded,
  logoSrc,
  userName,
  onNavItemClick,
  onMouseEnter,
  onMouseLeave,
  onToggleExpandNavigation,
}: NavHeaderProps) => (
  <HeaderContainer expanded={isExpanded}>
    <MenuControlSection expanded={isExpanded}>
      <MenuToggleWrapper expanded={isExpanded}>
        <MenuToggleButtonContainer expanded={isExpanded}>
          <IconButton variant="iconOnly" onClick={onToggleExpandNavigation}>
            <Icon size="14px" color="neutral/10">sidebar-left-01</Icon>
          </IconButton>
        </MenuToggleButtonContainer>
      </MenuToggleWrapper>
    </MenuControlSection>
    <ProfileSection expanded={isExpanded}>
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
              Bonjour {userName}
            </Typography>
            <Icon variant="stroke" color="primary/10" size="16px">arrow-down-01</Icon>
          </ProfileContent>
        )}
      </ProfileWrapper>
    </ProfileSection>
    <NavList expanded={isExpanded}>
      { headerNavItems.map((navItem) => (
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
);

export default NavHeader;