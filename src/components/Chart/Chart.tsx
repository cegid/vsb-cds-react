import React from "react";
import Typography from "../Typography";
import Column from "../Column";
import Row from "../Row";
import IconButton from "../IconButton";
import Icon from "../Icon";
import ChartModal from "./ChartModal";
import ChartCore, { ChartCoreProps, ChartType } from "./ChartCore";
import Box from "../Box";
import { PaletteNames, RADIUS, parseCustomColor } from "../../theme";

export type { ChartType, ChartDataset, CustomChartData } from "./ChartCore";

export const getChartIcon = (
  chartType: ChartType,
  color?: string
): React.ReactNode => {
  const iconStyle = { width: 12, height: 12, fill: "white" };

  switch (chartType) {
    case "bar":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={iconStyle}
        >
          <rect width="12" height="12" rx="4" fill={color} />
        </svg>
      );
    case "line":
      return (
        <svg
          width="12"
          height="4"
          viewBox="0 0 12 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={iconStyle}
        >
          <rect width="12" height="4" rx="2" fill={color} />
        </svg>
      );
    case "pie":
    case "doughnut":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={iconStyle}
        >
          <path
            d="M0 1.33333C0 0.596954 0.596954 0 1.33333 0C7.22437 0 12 4.77563 12 10.6667C12 11.403 11.403 12 10.6667 12H2C0.895431 12 0 11.1046 0 10V1.33333Z"
            fill={color}
          />
        </svg>
      );
  }
};

export interface ChartProps extends ChartCoreProps {
  /**
   * Title displayed in the chart header
   */
  title?: string;
  backgroundColor: PaletteNames;
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ title = "Titre", ...chartProps }, ref) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [hiddenDatasets, setHiddenDatasets] = React.useState<Set<number>>(
      new Set()
    );
    const [hoveredDataset, setHoveredDataset] = React.useState<number | null>(
      null
    );

    const totalValue = React.useMemo(() => {
      return chartProps.data.datasets.reduce((total, dataset, index) => {
        if (hiddenDatasets.has(index)) return total;
        return total + dataset.data.reduce((sum, value) => sum + value, 0);
      }, 0);
    }, [chartProps.data, hiddenDatasets]);

    const filteredChartData = React.useMemo(() => {
      return {
        ...chartProps.data,
        datasets: chartProps.data.datasets.filter(
          (_, index) => !hiddenDatasets.has(index)
        ),
      };
    }, [chartProps.data, hiddenDatasets]);

    const toggleDataset = (index: number) => {
      setHiddenDatasets((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    };

    return (
      <Box p={2} borderRadius={4} backgroundColor="primary/95">
        <Column p={6} borderRadius={3} gap={6} backgroundColor="white">
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
              onClick={() => setIsModalOpen(true)}
            >
              <Icon size={16}>play</Icon>
            </IconButton>
          </Row>
          <Column>
            <Typography variant="bodyMMedium" color="neutral/50">
              Total Value
            </Typography>
            <Typography variant="displaySSemiBold" color="neutral/10">
              {totalValue.toLocaleString()}
            </Typography>
          </Column>
          <Row gap={2} flexWrap="wrap">
            {chartProps.data.datasets.map((dataset, index) => {
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
                  onClick={() => toggleDataset(index)}
                  onMouseEnter={() => setHoveredDataset(index)}
                  onMouseLeave={() => setHoveredDataset(null)}
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
                      {getChartIcon(chartProps.type, datasetColor)}
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
          <ChartCore ref={ref} {...chartProps} data={filteredChartData} />
          <ChartModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            chartProps={{ ...chartProps, data: filteredChartData }}
            title={title}
          />
        </Column>
      </Box>
    );
  }
);

Chart.displayName = "Chart";

export default Chart;
