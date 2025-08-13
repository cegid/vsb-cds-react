import React from "react";
import Typography from "../Typography";
import Row from "../Row";
import Box from "../Box";
import Icon from "../Icon";
import { ChartType } from "./ChartCore";
import { RADIUS, parseCustomColor } from "../../theme";
import { getChartIcon } from "./Chart";

interface ChartLegendProps {
  datasets: any[];
  chartType: ChartType;
  hiddenDatasets: Set<number>;
  hoveredDataset: number | null;
  onToggleDataset: (index: number) => void;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
}

const ChartLegend: React.FC<ChartLegendProps> = ({
  datasets,
  chartType,
  hiddenDatasets,
  hoveredDataset,
  onToggleDataset,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <Row gap={2} flexWrap="wrap">
      {datasets.map((dataset, index) => {
        let datasetColor = "#666666";

        if (
          dataset.backgroundColor &&
          typeof dataset.backgroundColor === "string"
        ) {
          datasetColor =
            parseCustomColor(dataset.backgroundColor) ?? "white";
        } else if (
          dataset.backgroundColor &&
          Array.isArray(dataset.backgroundColor) &&
          dataset.backgroundColor[0]
        ) {
          datasetColor =
            parseCustomColor(dataset.backgroundColor[0]) ?? "white";
        }

        return (
          <Row
            alignItems="center"
            key={`${dataset.label}-${index}`}
            gap={4}
            backgroundColor="white"
            border={{ color: "neutral/60", opacity: 30 }}
            py={2}
            px={4}
            width={"auto"}
            borderRadius={RADIUS.FULL}
            onClick={() => onToggleDataset(index)}
            onMouseEnter={() => onMouseEnter(index)}
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
                sx={{
                  opacity: hiddenDatasets.has(index)
                    ? 0
                    : hoveredDataset === index
                    ? 0
                    : 1,
                  transition: "opacity 200ms ease-in-out",
                }}
              >
                {getChartIcon(chartType, datasetColor)}
              </Box>
              <Box
                sx={{
                  opacity: hiddenDatasets.has(index)
                    ? 1
                    : hoveredDataset === index
                    ? 1
                    : 0,
                  transition: "opacity 200ms ease-in-out",
                }}
              >
                <Icon
                  variant="stroke"
                  style="rounded"
                  color="neutral/50"
                  size={12}
                >
                  {hiddenDatasets.has(index) ? "view-off-slash" : "view"}
                </Icon>
              </Box>
            </Box>
            <Typography variant="bodySMedium" color="neutral/50">
              {dataset.label}
            </Typography>
          </Row>
        );
      })}
    </Row>
  );
};

export default ChartLegend;