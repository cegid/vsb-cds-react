import React from "react";
import Column from "../Column";
import { ChartType } from "./ChartCore";
import { Popper } from "@cegid/cds-react";
import { ELEVATION_CSS, neutral } from "../../theme";
import Icon from "../Icon";
import Typography from "../Typography";
import Row from "../Row";

interface ChartTypeOption {
  type: ChartType;
  label: string;
  icon: string;
}

const chartTypes: ChartTypeOption[] = [
  { type: "verticalBar", label: "Barres verticales", icon: "chart-01" },
  {
    type: "horizontalBar",
    label: "Barres horizontales",
    icon: "bar-chart-horizontal",
  },
  { type: "line", label: "Courbe", icon: "chart-line-data-01" },
  { type: "pie", label: "Camembert", icon: "pie-chart" },
  { type: "doughnut", label: "Anneau", icon: "pie-chart-08" },
];

interface ChartTypeModalProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onTypeSelect?: (type: ChartType) => void;
  currentType: ChartType;
}

const ChartTypeModal: React.FC<ChartTypeModalProps> = ({
  open,
  anchorEl,
  onClose,
  onTypeSelect,
  currentType,
}) => {
  const getAvailableChartTypes = (baseType: ChartType) => {
    if (baseType === "pie" || baseType === "doughnut") {
      return chartTypes.filter(chart => chart.type === "pie" || chart.type === "doughnut");
    }
    if (baseType === "verticalBar" || baseType === "horizontalBar" || baseType === "bar") {
      return chartTypes.filter(chart => 
        chart.type === "verticalBar" || 
        chart.type === "horizontalBar" || 
        chart.type === "bar"
      );
    }
    return chartTypes.filter(chart => chart.type === baseType);
  };

  const availableTypes = getAvailableChartTypes(currentType);

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      style={{ zIndex: 9999 }}
    >
      <Column
        p={4}
        mt={2}
        borderRadius={4}
        backgroundColor="white"
        border={{ color: "neutral/60", opacity: 30 }}
        boxShadow={ELEVATION_CSS.LEVEL_6}
        gap={2}
      >
        {availableTypes.map((chart) => (
          <Row
            key={chart.type}
            py={2}
            px={4}
            borderRadius={4}
            backgroundColor={
              currentType === chart.type ? "primary/95" : "transparent"
            }
            style={{ 
              cursor: "pointer",
              transition: "background-color 0.2s ease"
            }}
            onMouseEnter={(e) => {
              if (currentType !== chart.type) {
                e.currentTarget.style.backgroundColor = neutral[95];
              }
            }}
            onMouseLeave={(e) => {
              if (currentType !== chart.type) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
            onClick={() => {
              onTypeSelect && onTypeSelect(chart.type);
              onClose();
            }}
            alignItems="center"
            gap={4}
          >
            <Icon size={16} color="neutral/50">
              {chart.icon}
            </Icon>
            <Typography variant="bodySMedium" color="neutral/50">
              {chart.label}
            </Typography>
          </Row>
        ))}
      </Column>
    </Popper>
  );
};

export default ChartTypeModal;
