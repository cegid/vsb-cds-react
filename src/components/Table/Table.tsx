
"use client";

import {
  styled,
  Table as CegidTable,
  TableProps as CegidTableProps,
} from "@cegid/cds-react";
import typography from "../../theme/typography";
import { borderNeutral } from "@cegid/vsb-cds-tokens";
import { forwardRef } from "react";

export interface TableProps extends CegidTableProps {
  /**
   * Si true, affiche une bordure autour du tableau avec des coins arrondis
   * @default false
   */
  bordered?: boolean;
}

const StyledTable = styled(CegidTable)({
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

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ bordered = false, sx, ...props }, ref) => {
    const borderedStyles = bordered
      ? {
          border: "1px solid",
          borderColor: borderNeutral,
          borderCollapse: "separate" as const,
          borderSpacing: 0,
          borderRadius: "16px",
          overflow: "hidden",
          "& .MuiTableHead-root .MuiTableRow-root:first-of-type": {
            "& .MuiTableCell-root:first-of-type": {
              borderTopLeftRadius: "16px",
            },
            "& .MuiTableCell-root:last-of-type": {
              borderTopRightRadius: "16px",
            },
          },
          "& .MuiTableFooter-root .MuiTableRow-root:last-of-type": {
            "& .MuiTableCell-root:first-of-type": {
              borderBottomLeftRadius: "16px",
            },
            "& .MuiTableCell-root:last-of-type": {
              borderBottomRightRadius: "16px",
            },
          },
        }
      : {};

    return (
      <StyledTable
        ref={ref}
        sx={{
          ...borderedStyles,
          ...sx,
        }}
        {...props}
      />
    );
  }
);

Table.displayName = "Table";

export default Table;
