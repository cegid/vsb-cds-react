import React from "react";
import Typography from "../Typography";
import Row from "../Row";
import IconButton from "../IconButton";
import Icon from "../Icon";
import { useTheme, useMediaQuery } from "@mui/material";
import ChartTypeModal from "./ChartTypeModal";
import ChartMoreActionsPopper from "./ChartMoreActionsPopper";
import Box from "../Box";
import { ChartType } from "./ChartCore";

export interface ChartAction {
  label: string;
  onClick: () => void;
  icon?: string;
}

interface ChartHeaderProps {
  title: string;
  onChartModalOpen: () => void;
  currentType: ChartType;
  onTypeChange: (type: ChartType) => void;
  moreActions?: ChartAction[];
}

const ChartHeader: React.FC<ChartHeaderProps> = ({
  title,
  onChartModalOpen,
  currentType,
  onTypeChange,
  moreActions = [],
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isChartTypeModalOpen, setIsChartTypeModalOpen] = React.useState(false);
  const [isMoreActionsOpen, setIsMoreActionsOpen] = React.useState(false);

  const chartTypeSelectionButtonRef = React.useRef<HTMLDivElement>(null);
  const moreActionsButtonRef = React.useRef<HTMLDivElement>(null);

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
      {moreActions.length > 0 && (
        <Box ref={moreActionsButtonRef}>
          <IconButton
            square
            color="neutral"
            variant="tonal"
            onClick={() => setIsMoreActionsOpen(!isMoreActionsOpen)}
          >
            <Icon size={16}>more-horizontal</Icon>
          </IconButton>
        </Box>
      )}
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
      {moreActions.length > 0 && (
        <ChartMoreActionsPopper
          open={isMoreActionsOpen}
          anchorEl={moreActionsButtonRef.current}
          onClose={() => setIsMoreActionsOpen(false)}
          actions={moreActions}
        />
      )}
    </Row>
  );
};

export default ChartHeader;
