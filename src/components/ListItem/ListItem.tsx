import { ListItem as CegidListItem, styled } from "@cegid/cds-react";

const ListItem = styled(CegidListItem)({
  "&.MuiListItem-divider": {
    borderBottomColor: "#E6E7EA",
  },
});

export default ListItem;
