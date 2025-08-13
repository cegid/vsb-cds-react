import React from "react";
import Typography from "../Typography";
import Row from "../Row";
import IconButton from "../IconButton";
import Icon from "../Icon";

interface ChartHeaderProps {
  title: string;
  onModalOpen: () => void;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({ title, onModalOpen }) => {
  return (
    <Row gap={4}>
      <Typography variant="titleLSemiBold" color="neutral/10" flex={1}>
        {title}
      </Typography>
      <IconButton square color="neutral" variant="tonal">
        <Icon size={16}>more-horizontal</Icon>
      </IconButton>
      <IconButton
        square
        color="neutral"
        variant="tonal"
        onClick={onModalOpen}
      >
        <Icon size={16}>play</Icon>
      </IconButton>
    </Row>
  );
};

export default ChartHeader;