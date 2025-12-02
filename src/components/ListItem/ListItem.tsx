import React from "react";
import { ListItem as CegidListItem, styled } from "@cegid/cds-react";
import { borderNeutral } from '../../theme';

const ListItem: React.FC<React.ComponentProps<typeof CegidListItem>> = styled(CegidListItem)({
  "&.MuiListItem-divider": {
    borderBottomColor: borderNeutral,
  },
});

export default ListItem;
