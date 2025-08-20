import React from "react";
import Typography from "../Typography";
import Row from "../Row";
import IconButton from "../IconButton";
import Icon from "../Icon";
import { useTheme, useMediaQuery } from "@mui/material";

interface ChartHeaderProps {
  title: string;
  onModalOpen: () => void;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({ title, onModalOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Row gap={4}>
      <Typography variant="titleLSemiBold" color="neutral/10" flex={1}>
        {title}
      </Typography>
      <IconButton square color="neutral" variant="tonal">
        <Icon size={16}>more-horizontal</Icon>
      </IconButton>
      {!isMobile && (
        <IconButton
          square
          color="neutral"
          variant="tonal"
          onClick={onModalOpen}
        >
          <Icon size={16}>arrow-expand-01</Icon>
        </IconButton>
      )}
    </Row>
  );
};

export default ChartHeader;