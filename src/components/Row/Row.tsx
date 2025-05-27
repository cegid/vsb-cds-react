import React from "react";
import Box, { CustomBoxProps } from "../Box";

export interface RowProps
  extends Omit<CustomBoxProps, "display" | "flexDirection" | "ref"> {
  children: React.ReactNode;
}

const Row: React.FC<RowProps> = (props) => {
  const { children } = props;
  return (
    <Box width="100%" display="flex" flexDirection="row" {...props}>
      {children}
    </Box>
  );
};
export default Row;
