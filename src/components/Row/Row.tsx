"use client";

import React from "react";
import Box, { CustomBoxProps } from "../Box";

export interface RowProps
  extends Omit<CustomBoxProps, "display" | "flexDirection" | "ref"> {
  /**
   * The content to be rendered inside the row container.
   * Elements will be arranged horizontally in row direction with full width.
   */
  children?: React.ReactNode;
}

const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const { children } = props;
  return (
    <Box width="100%" display="flex" flexDirection="row" {...props} ref={ref}>
      {children}
    </Box>
  );
});
export default Row;
