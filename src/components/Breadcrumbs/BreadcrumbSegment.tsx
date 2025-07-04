import { useState } from "react";
import Box from "../Box";
import Icon from "../Icon";
import Typography from "../Typography";
import { BreadcrumbSegment } from "./Breadcrumbs";
import { Menu, MenuItem, styled } from "@cegid/cds-react";

interface BreadcrumbSegmentItemProps {
  segment: BreadcrumbSegment;
  shouldDisplayLogo: boolean;
}

const LinkStyled = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  textDecoration: "none",
  "&:hover": { textDecoration: "underline" },
}));

interface MenuButtonProps {
  menuopen: boolean;
}

const MenuButton = styled(Box, {
  shouldForwardProp: prop => prop !== 'menuopen',
})<MenuButtonProps>(({ menuopen }) => ({
  alignItems: 'center',
  borderRadius: '4px',
  backgroundColor: menuopen
  ? 'rgba(0, 44, 82, 0.06)'
  : 'transparent',
  cursor: 'pointer',
  display: 'flex',
  gap: '4px',
  padding: '2px 4px',
  '&:hover': {
    backgroundColor: 'rgba(0, 44, 82, 0.06)',
  },
}));

const BreadcrumbSegmentItem = ({segment, shouldDisplayLogo = false}: BreadcrumbSegmentItemProps) => {
  const { breadcrumbNode, isActive, siblings } = segment;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isOpen = Boolean(anchorEl);

  const handleOpenSegmentMenu = (e: React.MouseEvent<HTMLElement>) => {
    const hasSiblings = siblings.length > 0;
    if (!hasSiblings) return;
    setAnchorEl(e.currentTarget);
  };
  const handleCloseSegmentMenu = () => {
    setAnchorEl(null);
  };

  const color = isActive ? "primary/10" : "neutral/50";
  const variant = isActive ? "captionSemiBold" : "captionRegular";

  const handleLinkClick = () => {
    breadcrumbNode.onClick?.();
  };

  return (
    <>
      <Box display="flex" alignItems="center" gap="2px" onClick={handleOpenSegmentMenu}>
        {shouldDisplayLogo && breadcrumbNode.icon && (
          <Icon size="12px">
            {breadcrumbNode.icon}
          </Icon>
        )}
        {siblings.length > 0 && (
          <MenuButton menuopen={isOpen}>
            <Typography variant={ variant } color={ color }>{breadcrumbNode.label}</Typography>
            <Icon
              variant="stroke"
              color={ color }
              size="16px"
            >
              arrow-down-01
            </Icon>
          </MenuButton>
        )}
        {siblings.length === 0 && !shouldDisplayLogo && (
          <LinkStyled variant={ variant } color={ color } onClick={handleLinkClick}>{breadcrumbNode.label}</LinkStyled>
        )}
        {shouldDisplayLogo && (
          <Typography variant={ variant } color={ color }>{breadcrumbNode.label}</Typography>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleCloseSegmentMenu}
      >
        {siblings.map((sibling) => (
          <MenuItem
            key={sibling.id}
            onClick={() => {
              handleCloseSegmentMenu();
              sibling.onClick?.();
            }}
          >
          {sibling.icon && (
            <Icon
              variant="stroke"
              color="primary/10"
              size="16px"
            >
              arrow-down-01
            </Icon>
          )}
          <Typography variant="bodySRegular" color="primary/10">
            {sibling.label}
          </Typography>
        </MenuItem>

        ))}
      </Menu>
    </>
  );

};

export default BreadcrumbSegmentItem;