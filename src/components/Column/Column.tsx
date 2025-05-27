import React from "react";
import Box, { CustomBoxProps } from "../Box";

export interface ColumnProps
  extends Omit<CustomBoxProps, "display" | "flexDirection" | "ref"> {
  /**
   * The content to be rendered inside the column container.
   * Elements will be stacked vertically in column direction with full width.
   */
  children: React.ReactNode;
}

const Column: React.FC<ColumnProps> = (props) => {
  const { children } = props;
  return (
    <Box width="100%" display="flex" flexDirection="column" {...props}>
      {children}
    </Box>
  );
};
export default Column;
