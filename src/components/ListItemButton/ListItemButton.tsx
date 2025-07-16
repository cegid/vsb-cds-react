import { ListItemButton as CegidListItemButton } from "@cegid/cds-react";
import { ListItemButtonProps as CegidListItemButtonProps } from "@cegid/cds-react";
import { styled } from "@mui/material/styles";
import React from "react";
import { neutral, primary, white } from "../../theme";

export interface ListItemButtonProps
  extends Omit<
    CegidListItemButtonProps,
    "disableRipple" | "disableTouchRipple"
  > {}

const StyledListItemButton = styled(
  CegidListItemButton
)<CegidListItemButtonProps>(({ selected }) => ({
  borderRadius: "12px",
  border: `1px solid ${neutral[95]}`,
  backgroundColor: white,

  "&:hover": {
    backgroundColor: neutral[99],
  },

  "&.Mui-selected": {
    backgroundColor: primary[99],
    borderColor: primary[50],

    "&:hover": {
      backgroundColor: primary[95],
    },
  },
}));

const ListItemButton = React.forwardRef<
  HTMLDivElement,
  CegidListItemButtonProps
>((props, ref) => {
  return (
    <StyledListItemButton
      ref={ref}
      {...props}
      disableRipple
      disableTouchRipple
    />
  );
});

export default ListItemButton;
