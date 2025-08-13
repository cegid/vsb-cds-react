import React from "react";
import Column from "../Column";
import ChartModal from "./ChartModal";
import ChartCore, { ChartCoreProps, ChartType } from "./ChartCore";
import ChartHeader from "./ChartHeader";
import ChartTotals from "./ChartTotals";
import ChartLegend from "./ChartLegend";
import Box from "../Box";
import { PaletteNames } from "../../theme";

export type { ChartType, ChartDataset, CustomChartData } from "./ChartCore";

export const getChartIcon = (
  chartType: ChartType,
  color?: string
): React.ReactNode => {
  const iconStyle = { width: 12, height: 12, fill: "white" };

  switch (chartType) {
    case "bar":
    case "verticalBar":
    case "horizontalBar":
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
  /**
   * Show detailed totals for each dataset label instead of global total
   */
  showDetailedTotals?: boolean;
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ title = "Titre", showDetailedTotals = false, ...chartProps }, ref) => {
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

    const detailedTotals = React.useMemo(() => {
      return chartProps.data.datasets
        .map((dataset, datasetIndex) => {
          if (hiddenDatasets.has(datasetIndex)) return null;
          const total = dataset.data.reduce((sum, value) => sum + value, 0);
          return {
            label: dataset.label || `Dataset ${datasetIndex + 1}`,
            total,
            datasetIndex,
          };
        })
        .filter((item): item is { label: string; total: number; datasetIndex: number } => item !== null);
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

    const handleMouseEnter = (index: number) => {
      setHoveredDataset(index);
    };

    const handleMouseLeave = () => {
      setHoveredDataset(null);
    };

    return (
      <Box p={2} borderRadius={4} backgroundColor="primary/95">
        <Column p={6} borderRadius={3} gap={6} backgroundColor="white">
          <ChartHeader
            title={title}
            onModalOpen={() => setIsModalOpen(true)}
          />
          
          <ChartTotals
            showDetailedTotals={showDetailedTotals}
            totalValue={totalValue}
            detailedTotals={detailedTotals}
            chartType={chartProps.type}
            datasets={chartProps.data.datasets}
          />
          
          <ChartLegend
            datasets={chartProps.data.datasets}
            chartType={chartProps.type}
            hiddenDatasets={hiddenDatasets}
            hoveredDataset={hoveredDataset}
            onToggleDataset={toggleDataset}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <ChartCore ref={ref} {...chartProps} data={filteredChartData} />
          <ChartModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            chartProps={{ ...chartProps, data: filteredChartData }}
            title={title}
            totalValue={totalValue}
            detailedTotals={detailedTotals}
          />
        </Column>
      </Box>
    );
  }
);

Chart.displayName = "Chart";

export default Chart;
