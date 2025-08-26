import React from "react";
import Typography from "../Typography";
import Row from "../Row";
import IconButton from "../IconButton";
import Icon from "../Icon";
import { useTheme, useMediaQuery } from "@mui/material";
import ChartTypeModal from "./ChartTypeModal";
import Box from "../Box";
import { ChartType } from "./ChartCore";

interface ChartHeaderProps {
  title: string;
  onChartModalOpen: () => void;
  currentType: ChartType;
  onTypeChange: (type: ChartType) => void;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({
  title,
  onChartModalOpen,
  currentType,
  onTypeChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isChartTypeModalOpen, setIsChartTypeModalOpen] = React.useState(false);

  const chartTypeSelectionButtonRef = React.useRef<HTMLDivElement>(null);

  const getAvailableTypesCount = (baseType: ChartType) => {
    if (baseType === "pie" || baseType === "doughnut") {
      return 2;
    }
    if (baseType === "verticalBar" || baseType === "horizontalBar" || baseType === "bar") {
      return 3;
    }
    return 1;
  };

  const shouldShowTypeButton = getAvailableTypesCount(currentType) > 1;

  return (
    <Row gap={4}>
      <Typography variant="titleLSemiBold" color="neutral/10" flex={1}>
        {title}
      </Typography>
      {shouldShowTypeButton && (
        <Box ref={chartTypeSelectionButtonRef}>
          <IconButton
            square
            color="neutral"
            variant="tonal"
            onClick={() => setIsChartTypeModalOpen(!isChartTypeModalOpen)}
          >
            <Icon size={16}>pie-chart</Icon>
          </IconButton>
        </Box>
      )}
      <IconButton square color="neutral" variant="tonal">
        <Icon size={16}>more-horizontal</Icon>
      </IconButton>
      {!isMobile && (
        <IconButton
          square
          color="neutral"
          variant="tonal"
          onClick={onChartModalOpen}
        >
          <Icon size={16}>arrow-expand-01</Icon>
        </IconButton>
      )}
      {shouldShowTypeButton && (
        <ChartTypeModal
          open={isChartTypeModalOpen}
          anchorEl={chartTypeSelectionButtonRef.current}
          onClose={() => setIsChartTypeModalOpen(false)}
          currentType={currentType}
          onTypeSelect={onTypeChange}
        />
      )}
    </Row>
  );
};

export default ChartHeader;
