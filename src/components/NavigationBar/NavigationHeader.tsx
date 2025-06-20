import { styled } from "@cegid/cds-react";
import Icon from "../Icon";
import Box from "../Box";
import Typography from "../Typography";
import IconButton from "../IconButton";
import { ExtendedNavItem, NavItem, NavList } from "./NavigationBar";
import NavItemButton from "./NavItemButton";

const HeaderContainer = styled(Box)(({ theme }) => ({
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

const MenuControlSection = styled(Box)(({ theme }) => ({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  justifyContent: 'center',
  width: '100%',
}));

const MenuToggleWrapper = styled(Box)({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 4px',
  width: '100%',
});

const MenuToggleButtonContainer = styled(Box)({
  alignItems: 'center',
  alignSelf: 'stretch',
  display: 'flex',
  height: '34px',
  padding: '8px 0',
});

const ProfileSection = styled(Box)({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  padding: '0 8px',
  width: '100%',
});

const ProfileWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '8px 8px 8px 0',
  alignItems: 'center',
  gap: theme.spacing(4),
  alignSelf: 'stretch',
}));

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
  onItemClick: (navItem: NavItem) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onToggle: () => void;
};

const NavHeader = ({
  headerNavItems,
  isExpanded,
  logoSrc,
  userName,
  onItemClick,
  onMouseEnter,
  onMouseLeave,
  onToggle,
}: NavHeaderProps) => (
  <HeaderContainer>
    <MenuControlSection>
      <MenuToggleWrapper>
        <MenuToggleButtonContainer>
          <IconButton variant="iconOnly" onClick={onToggle}>
            <Icon color="neutral/10">sidebar-left-01</Icon>
          </IconButton>
        </MenuToggleButtonContainer>
      </MenuToggleWrapper>
    </MenuControlSection>
    <ProfileSection>
      <ProfileWrapper>
        <img
          src={logoSrc}
          alt="Logo Cegid"
          width={24}
          height={24}
        />
        <ProfileContent>
          <Typography variant="bodySSemiBold" color="primary/10">
            Bonjour {userName}
          </Typography>
          <Icon variant="stroke" color="primary/10" size="16px">arrow-down-01</Icon>
        </ProfileContent>
      </ProfileWrapper>
    </ProfileSection>
    <NavList>
      { headerNavItems.map((navItem) => (
          <NavItemButton
            key={navItem.key}
            navItem={navItem}
            isExpanded={isExpanded}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => onItemClick(navItem)}
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