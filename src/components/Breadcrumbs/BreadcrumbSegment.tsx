import { Fragment, useState } from "react";
import Box from "../Box";
import Icon from "../Icon";
import Typography from "../Typography";
import { BreadcrumbSegment } from "./Breadcrumbs";
import { Menu, MenuItem, styled } from "@cegid/cds-react";

interface BreadcrumbSegmentItemProps {
  segment: BreadcrumbSegment;
  shouldDisplayLogo: boolean;
}

const LinkStyled = styled(Typography)(() => ({
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

interface CollapseIconProps {
  expandedsibling: boolean;
}

export const CollapseIcon = styled(Icon, {
  shouldForwardProp: prop => prop !== 'expandedsibling',
})<CollapseIconProps>(({ expandedsibling }) => ({
  marginLeft: 'auto',
  transform: expandedsibling ? 'rotate(180deg)' : undefined,
  transition: 'transform 0.2s',
}));

const BreadcrumbSegmentItem = ({segment, shouldDisplayLogo = false}: BreadcrumbSegmentItemProps) => {
  const { breadcrumbNode, isActive, siblings } = segment;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expandedSiblings, setExpandedSiblings] = useState<Set<string>>(new Set());

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
        {siblings.map((sibling) => {

          const hasChildren = (sibling.children || []).length > 0;
          const isExpanded = expandedSiblings.has(sibling.id);

          const handleClick = () => {
            if (hasChildren) {
              setExpandedSiblings(prev => {
                const newSet = new Set(prev);
                if (isExpanded) {
                  newSet.delete(sibling.id);
                } else {
                  newSet.add(sibling.id);
                }
                return newSet;
              });
            } else {
              handleCloseSegmentMenu();
              sibling.onClick?.();
            }
          }

          return (
            <Fragment key={sibling.id}>
              <MenuItem onClick={handleClick}>
                {sibling.icon && (
                  <Icon
                    variant="stroke"
                    color="primary/10"
                    size="16px"
                  >
                    { sibling.icon }
                  </Icon>
                )}
                <Typography variant="bodySRegular" color="primary/10">
                  {sibling.label}
                </Typography>
                {hasChildren && (
                  <CollapseIcon expandedsibling={isExpanded} color="primary/10" size="16px">
                    arrow-down-01
                  </CollapseIcon>
                )}
                </MenuItem>
                {isExpanded && hasChildren && sibling.children && (
                  <Box pl={4}>
                    {sibling.children.map((child) => (
                      <MenuItem
                        key={child.id}
                        onClick={() => {
                          handleCloseSegmentMenu();
                          child.onClick?.();
                        }}
                      >
                          {child.icon && (
                            <Icon
                              variant="stroke"
                              color="primary/10"
                              size="16px"
                            >
                              { child.icon }
                            </Icon>
                          )}
                        <Typography variant="bodySRegular" color="primary/10">
                          {child.label}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Box>
                )}
            </Fragment>
          )
        })}
      </Menu>
    </>
  );

};

export default BreadcrumbSegmentItem;