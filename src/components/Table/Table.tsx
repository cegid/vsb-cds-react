
"use client";

import {
  styled,
  Table as CegidTable,
  TableProps as CegidTableProps,
} from "@cegid/cds-react";
import typography from "../../theme/typography";

export interface TableProps extends CegidTableProps {}

export const Table = styled(CegidTable)({
  "& .MuiTableCell-root": {
    border: "none",
    background: "transparent !important",
    ...typography.bodyMMedium,
  },
  "& .MuiTableRow-root:not(:last-child)": {
    "& .MuiTableCell-root": {
      borderBottom: "1px solid #E4E6E9",
      background: "transparent",
    },
  },
  "& .MuiTableHead-root .MuiTableRow-root .MuiTableCell-root": {
    borderTop: "none",
    borderBottom: "1px solid #E4E6E9",
    background: "transparent",
  },
  "& .MuiTableFooter-root .MuiTableRow-root .MuiTableCell-root": {
    borderTop: "1px solid #E4E6E9",
    borderBottom: "none",
    background: "transparent",
  },
});


Table.displayName = "Table";

export default Table;
