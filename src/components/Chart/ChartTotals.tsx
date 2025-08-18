import React from "react";
import Typography from "../Typography";
import Column from "../Column";
import Row from "../Row";
import Box from "../Box";
import Icon from "../Icon";
import { ChartType } from "./ChartCore";
import { parseCustomColor, RADIUS } from "../../theme";
import { getChartIcon } from "./Chart";

interface DetailedTotal {
  label: string;
  total: number;
  datasetIndex: number;
}

interface ChartTotalsProps {
  showDetailedTotals: boolean;
  totalValue: number;
  detailedTotals: DetailedTotal[];
  chartType: ChartType;
  datasets: any[];
  hiddenDatasets?: Set<number>;
  hiddenDataPoints?: Set<number>;
  hoveredDataset?: number | null;
  onToggleDataset?: (index: number) => void;
  onMouseEnter?: (index: number) => void;
  onMouseLeave?: () => void;
}

const ChartTotals: React.FC<ChartTotalsProps> = ({
  showDetailedTotals,
  totalValue,
  detailedTotals,
  chartType,
  datasets,
  hiddenDatasets = new Set(),
  hiddenDataPoints = new Set(),
  hoveredDataset = null,
  onToggleDataset = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}) => {
  const isPieOrDoughnut = chartType === "pie" || chartType === "doughnut";
  const currentHiddenDatasets = isPieOrDoughnut ? hiddenDataPoints : hiddenDatasets;
  if (showDetailedTotals) {
    return (
      <Box sx={{ overflowX: 'auto', width: '100%' }}>
        <Row gap={11} flexWrap="nowrap" minWidth="fit-content">
          {detailedTotals.map((item, index) => {
          let datasetColor = "#666666";
          const dataset = datasets[item.datasetIndex];

          if (dataset?.backgroundColor) {
            if (typeof dataset.backgroundColor === "string") {
              datasetColor =
                parseCustomColor(dataset.backgroundColor) ?? "#666666";
            } else if (
              Array.isArray(dataset.backgroundColor) &&
              dataset.backgroundColor[0]
            ) {
              datasetColor =
                parseCustomColor(dataset.backgroundColor[0]) ??
                "#666666";
            }
          }

          const isHidden = currentHiddenDatasets.has(item.datasetIndex);
          const isHovered = hoveredDataset === item.datasetIndex;
          const iconOpacity = isHidden || isHovered ? 0 : 1;
          const eyeIconOpacity = isHidden || isHovered ? 1 : 0;

          return (
            <Column
              key={`${item.label}-${index}`}
              justifyContent="space-between"
              width="auto"
              flexShrink={0}
            >
              <Typography variant="bodyMMedium" color="neutral/30">
                Total
              </Typography>
              <Typography variant="displaySSemiBold" color="neutral/10">
                {item.total.toLocaleString()}
              </Typography>
              <Row 
                alignItems="center" 
                gap={4} 
                mt={1}
                onClick={() => onToggleDataset(item.datasetIndex)}
                onMouseEnter={() => onMouseEnter(item.datasetIndex)}
                onMouseLeave={onMouseLeave}
                sx={{
                  cursor: "pointer",
                }}
              >
                <Box
                  width={12}
                  height={12}
                  display="flex"
                  position="relative"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box
                    position="absolute"
                    display="flex"
                    sx={{
                      opacity: iconOpacity,
                      transition: "opacity 200ms ease-in-out",
                    }}
                  >
                    {getChartIcon(chartType, datasetColor)}
                  </Box>
                  <Box
                    display="flex"
                    sx={{
                      opacity: eyeIconOpacity,
                      transition: "opacity 200ms ease-in-out",
                    }}
                  >
                    <Icon variant="stroke" style="rounded" color="neutral/50" size={12}>
                      {isHidden ? "view-off-slash" : "view"}
                    </Icon>
                  </Box>
                </Box>
                <Typography variant="bodySMedium" color="neutral/50">
                  {item.label}
                </Typography>
              </Row>
            </Column>
          );
        })}
        </Row>
      </Box>
    );
  }

  return (
    <Column>
      <Typography variant="bodyMMedium" color="neutral/50">
        Total Value
      </Typography>
      <Typography variant="displaySSemiBold" color="neutral/10">
        {totalValue.toLocaleString()}
      </Typography>
    </Column>
  );
};

export default ChartTotals;
