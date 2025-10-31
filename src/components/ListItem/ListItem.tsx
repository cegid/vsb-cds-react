import { ListItem as CegidListItem, styled } from "@cegid/cds-react";
import { borderNeutral } from '../../theme';

const ListItem = styled(CegidListItem)({
  "&.MuiListItem-divider": {
    borderBottomColor: borderNeutral,
  },
});

export default ListItem;
