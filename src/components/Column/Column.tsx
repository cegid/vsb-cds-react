import React from "react";
import Box, { CustomBoxProps } from "../Box";

export interface ColumnProps
  extends Omit<CustomBoxProps, "display" | "flexDirection"> {
  children: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ children }) => {
  return (
    <Box width="100%" display="flex" flexDirection="column">
      {children}
    </Box>
  );
};
export default Column;
