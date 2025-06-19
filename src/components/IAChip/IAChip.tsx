import React from "react";
import { CustomColorString } from "../../theme";
import Icon from "../Icon";
import Typography from "../Typography";
import Row from "../Row";

export interface IAChipProps {
  backgroundColor: CustomColorString;
  label: React.ReactElement<typeof Typography>;
  icon?: React.ReactElement<typeof Icon>;
}
const IAChip = React.forwardRef<HTMLDivElement, IAChipProps>((props, ref) => {
  const { backgroundColor, label, icon } = props;
  return (
    <Row ref={ref} px={4} backgroundColor={backgroundColor} borderRadius={4} gap={2} width="fit-content">
      {icon} {label}
    </Row>
  );
});

export default IAChip;