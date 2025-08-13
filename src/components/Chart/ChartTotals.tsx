import React from "react";
import Typography from "../Typography";
import Column from "../Column";
import Row from "../Row";
import Box from "../Box";
import { ChartType } from "./ChartCore";
import { parseCustomColor } from "../../theme";
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
}

const ChartTotals: React.FC<ChartTotalsProps> = ({
  showDetailedTotals,
  totalValue,
  detailedTotals,
  chartType,
  datasets,
}) => {
  if (showDetailedTotals) {
    return (
      <Row gap={11} flexWrap="wrap">
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

          return (
            <Column
              key={`${item.label}-${index}`}
              justifyContent="space-between"
              width="auto"
            >
              <Typography variant="bodyMMedium" color="neutral/30">
                Total
              </Typography>
              <Typography variant="displaySSemiBold" color="neutral/10">
                {item.total.toLocaleString()}
              </Typography>
              <Row alignItems="center" gap={2} mt={1}>
                <Box
                  width={12}
                  height={12}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {getChartIcon(chartType, datasetColor)}
                </Box>
                <Typography variant="bodySMedium" color="neutral/50">
                  {item.label}
                </Typography>
              </Row>
            </Column>
          );
        })}
      </Row>
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
