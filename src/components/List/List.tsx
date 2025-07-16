import {
  List as CegidList,
  ListProps as CegidListProps,
} from "@cegid/cds-react";
import React from "react";

const List = React.forwardRef<HTMLUListElement, CegidListProps>((props, ref) => {
  return (
    <CegidList
      ref={ref}
      {...props}
      sx={{ display: "flex", flexDirection: "column", gap: 6 }}
    />
  );
});

export default List;
