"use client";

import React from "react";
import Column from "../Column";
import ChartModal from "./ChartModal";
import ChartCore, { ChartCoreProps, ChartType } from "./ChartCore";
import ChartHeader, { ChartAction } from "./ChartHeader";
import ChartTotals from "./ChartTotals";
import ChartLegend from "./ChartLegend";
import Box from "../Box";
import { PaletteNames, parseCustomColor } from "../../theme";
import Row from "../Row";
import { BadgeProps } from "../Badge";

export type { ChartType, ChartDataset, CustomChartData } from "./ChartCore";
export type { ChartAction } from "./ChartHeader";

export type TotalsDisplayMode = "simple" | "detailed" | "none";

export const getChartIcon = (
  chartType: ChartType,
  color?: string
): React.ReactNode => {
  const iconStyle = { width: 12, height: 12, display: "block" };

  switch (chartType) {
    case "bar":
    case "verticalBar":
    case "horizontalBar":
    case "mixed":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={iconStyle}
        >
          <rect width="12" height="12" rx="4" fill={color || "#666666"} />
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
          <rect width="12" height="4" rx="2" fill={color || "#666666"} />
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
            fill={color || "#666666"}
          />
        </svg>
      );
    default:
      // Fallback: retourne une icône de barre par défaut
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={iconStyle}
        >
          <rect width="12" height="12" rx="4" fill={color || "#666666"} />
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
   * Display mode for totals: "simple" (default), "detailed", or "none"
   */
  totalsDisplayMode?: TotalsDisplayMode;
  /**
   * Symbol to display after the total value (e.g., "€", "$", "%")
   */
  totalSymbol?: string;
  /**
   * Number of decimal places to display for totals
   * @default undefined (uses default toLocaleString behavior)
   */
  decimalPlaces?: number;
  /**
   * Enable compact display for large numbers (1000 -> 1k, 1000000 -> 1M, etc.)
   * Maximum 4 digits before decimal point
   * @default false
   */
  compactDisplay?: boolean;
  /**
   * Additional actions displayed in the more menu
   */
  moreActions?: ChartAction[];
  /**
   * Badges to display next to totals. In simple mode, use a special key like "total" for the global total.
   * In detailed mode, use dataset labels as keys to assign badges to specific datasets.
   *
   * @example
   * // Simple mode - single badge for the total
   * <Chart totalBadges={{ "total": { children: "+12%", color: "success" } }} />
   *
   * @example
   * // Detailed mode - badges per dataset
   * <Chart
   *   totalsDisplayMode="detailed"
   *   totalBadges={{
   *     "Sales": { children: "+15%", color: "success" },
   *     "Target": { children: "New", color: "primary" },
   *     "Marketing": { children: "-5%", color: "critical" }
   *   }}
   * />
   */
  totalBadges?: Record<string, BadgeProps>;
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  (
    {
      title = "Titre",
      totalsDisplayMode = "simple",
      backgroundColor,
      totalSymbol,
      decimalPlaces,
      compactDisplay,
      moreActions,
      totalBadges,
      ...chartProps
    },
    ref
  ) => {
    const [isChartModalOpen, setIsChartModalOpen] = React.useState(false);
    const [currentChartType, setCurrentChartType] = React.useState<ChartType>(
      chartProps.type
    );

    const [hiddenDatasets, setHiddenDatasets] = React.useState<Set<number>>(
      new Set()
    );
    const [hiddenDataPoints, setHiddenDataPoints] = React.useState<Set<number>>(
      new Set()
    );
    const [hoveredDataset, setHoveredDataset] = React.useState<number | null>(
      null
    );
    const [isMobileLayout, setIsMobileLayout] = React.useState(false);

    const containerRef = React.useRef<HTMLDivElement>(null);

    const isPieOrDoughnut =
      currentChartType === "pie" || currentChartType === "doughnut";

    React.useEffect(() => {
      const checkMobileLayout = () => {
        if (containerRef.current && isPieOrDoughnut) {
          const containerWidth = containerRef.current?.offsetWidth || 0;
          setIsMobileLayout(containerWidth < 600);
        }
      };

      checkMobileLayout();
      window.addEventListener("resize", checkMobileLayout);
      return () => window.removeEventListener("resize", checkMobileLayout);
    }, [isPieOrDoughnut]);

    const totalValue = React.useMemo(() => {
      if (isPieOrDoughnut) {
        const dataset = chartProps.data.datasets[0];
        if (!dataset) return 0;
        return dataset.data.reduce((sum, value, index) => {
          if (hiddenDataPoints.has(index)) return sum;
          return sum + value;
        }, 0);
      }

      return chartProps.data.datasets.reduce((total, dataset, index) => {
        if (hiddenDatasets.has(index)) return total;
        return total + dataset.data.reduce((sum, value) => sum + value, 0);
      }, 0);
    }, [chartProps.data, hiddenDatasets, hiddenDataPoints, isPieOrDoughnut]);

    const detailedTotals = React.useMemo(() => {
      if (totalsDisplayMode === "none") return [];

      if (isPieOrDoughnut) {
        const dataset = chartProps.data.datasets[0];
        if (!dataset) return [];

        if (totalsDisplayMode === "detailed") {
          return dataset.data.map((value, index) => ({
            label: chartProps.data.labels[index] || `Item ${index + 1}`,
            total: value,
            datasetIndex: index,
          }));
        } else {
          return dataset.data
            .map((value, index) => {
              if (hiddenDataPoints.has(index)) return null;
              return {
                label: chartProps.data.labels[index] || `Item ${index + 1}`,
                total: value,
                datasetIndex: index,
              };
            })
            .filter(
              (
                item
              ): item is {
                label: string;
                total: number;
                datasetIndex: number;
              } => item !== null
            );
        }
      }

      if (totalsDisplayMode === "detailed") {
        return chartProps.data.datasets.map((dataset, datasetIndex) => {
          const total = dataset.data.reduce((sum, value) => sum + value, 0);
          return {
            label: dataset.label || `Dataset ${datasetIndex + 1}`,
            total,
            datasetIndex,
          };
        });
      } else {
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
          .filter(
            (
              item
            ): item is { label: string; total: number; datasetIndex: number } =>
              item !== null
          );
      }
    }, [
      chartProps.data,
      hiddenDatasets,
      hiddenDataPoints,
      isPieOrDoughnut,
      totalsDisplayMode,
    ]);

    const filteredChartData = React.useMemo(() => {
      if (isPieOrDoughnut) {
        const originalDataset = chartProps.data.datasets[0];
        if (!originalDataset) return chartProps.data;

        const filteredData = originalDataset.data.filter(
          (_, index) => !hiddenDataPoints.has(index)
        );
        const filteredLabels = chartProps.data.labels.filter(
          (_, index) => !hiddenDataPoints.has(index)
        );

        let filteredBackgroundColor = originalDataset.backgroundColor;
        let filteredBorderColor = originalDataset.borderColor;

        if (Array.isArray(originalDataset.backgroundColor)) {
          filteredBackgroundColor = originalDataset.backgroundColor.filter(
            (_, index) => !hiddenDataPoints.has(index)
          );
        }

        if (Array.isArray(originalDataset.borderColor)) {
          filteredBorderColor = originalDataset.borderColor.filter(
            (_, index) => !hiddenDataPoints.has(index)
          );
        }

        return {
          labels: filteredLabels,
          datasets: [
            {
              ...originalDataset,
              data: filteredData,
              backgroundColor: filteredBackgroundColor,
              borderColor: filteredBorderColor,
            },
          ],
        };
      }

      return {
        ...chartProps.data,
        datasets: chartProps.data.datasets.filter(
          (_, index) => !hiddenDatasets.has(index)
        ),
      };
    }, [
      chartProps.data,
      hiddenDatasets,
      hiddenDataPoints,
      isPieOrDoughnut,
      totalsDisplayMode,
    ]);

    const toggleDataset = (index: number) => {
      if (isPieOrDoughnut) {
        setHiddenDataPoints((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(index)) {
            newSet.delete(index);
          } else {
            newSet.add(index);
          }
          return newSet;
        });
      } else {
        setHiddenDatasets((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(index)) {
            newSet.delete(index);
          } else {
            newSet.add(index);
          }
          return newSet;
        });
      }
    };

    const handleMouseEnter = (index: number) => {
      setHoveredDataset(index);
    };

    const handleMouseLeave = () => {
      setHoveredDataset(null);
    };

    return (
      <Box
        p={2}
        borderRadius={4}
        border={{ color: "borderNeutral" }}
        sx={{
          transition: "background-color 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: parseCustomColor(`${backgroundColor}/95`),
          },
        }}
      >
        <Column
          ref={containerRef}
          p={6}
          borderRadius={3}
          gap={6}
          backgroundColor="white"
        >
          <ChartHeader
            title={title}
            onChartModalOpen={() => setIsChartModalOpen(true)}
            currentType={currentChartType}
            onTypeChange={setCurrentChartType}
            moreActions={moreActions}
          />

          {totalsDisplayMode !== "none" && (
            <ChartTotals
              showDetailedTotals={totalsDisplayMode === "detailed"}
              totalValue={totalValue}
              detailedTotals={detailedTotals}
              chartType={currentChartType}
              datasets={chartProps.data.datasets}
              hiddenDatasets={hiddenDatasets}
              hiddenDataPoints={hiddenDataPoints}
              hoveredDataset={hoveredDataset}
              onToggleDataset={toggleDataset}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              totalSymbol={totalSymbol}
              decimalPlaces={decimalPlaces}
              compactDisplay={compactDisplay}
              totalBadges={totalBadges}
            />
          )}

          {totalsDisplayMode !== "detailed" &&
            (currentChartType === "pie" || currentChartType === "doughnut" ? (
              !isMobileLayout ? (
                <Row gap={6} alignItems="center">
                  <Box flex={1}>
                    <ChartCore
                      ref={ref}
                      {...chartProps}
                      type={currentChartType}
                      data={filteredChartData}
                    />
                  </Box>
                  <Column gap={2} minWidth="200px" width="auto">
                    <ChartLegend
                      datasets={chartProps.data.datasets}
                      chartType={currentChartType}
                      hiddenDatasets={
                        isPieOrDoughnut ? hiddenDataPoints : hiddenDatasets
                      }
                      hoveredDataset={hoveredDataset}
                      onToggleDataset={toggleDataset}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      labels={chartProps.data.labels}
                    />
                  </Column>
                </Row>
              ) : (
                <>
                  <ChartLegend
                    datasets={chartProps.data.datasets}
                    chartType={currentChartType}
                    hiddenDatasets={
                      isPieOrDoughnut ? hiddenDataPoints : hiddenDatasets
                    }
                    hoveredDataset={hoveredDataset}
                    onToggleDataset={toggleDataset}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    labels={chartProps.data.labels}
                    isMobileLayout={isMobileLayout}
                  />
                  <ChartCore
                    ref={ref}
                    {...chartProps}
                    type={currentChartType}
                    data={filteredChartData}
                  />
                </>
              )
            ) : (
              <>
                <ChartLegend
                  datasets={chartProps.data.datasets}
                  chartType={currentChartType}
                  hiddenDatasets={
                    isPieOrDoughnut ? hiddenDataPoints : hiddenDatasets
                  }
                  hoveredDataset={hoveredDataset}
                  onToggleDataset={toggleDataset}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  labels={chartProps.data.labels}
                />
                <ChartCore
                  ref={ref}
                  {...chartProps}
                  type={currentChartType}
                  data={filteredChartData}
                />
              </>
            ))}

          {totalsDisplayMode === "detailed" && (
            <ChartCore
              ref={ref}
              {...chartProps}
              type={currentChartType}
              data={filteredChartData}
            />
          )}
          <ChartModal
            open={isChartModalOpen}
            onClose={() => setIsChartModalOpen(false)}
            chartProps={chartProps}
            title={title}
            totalValue={totalValue}
            detailedTotals={detailedTotals}
            backgroundColor={backgroundColor}
            totalsDisplayMode={totalsDisplayMode}
            hiddenDatasets={hiddenDatasets}
            hiddenDataPoints={hiddenDataPoints}
            hoveredDataset={hoveredDataset}
            filteredChartData={filteredChartData}
            onToggleDataset={toggleDataset}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            totalSymbol={totalSymbol}
            decimalPlaces={decimalPlaces}
            compactDisplay={compactDisplay}
            totalBadges={totalBadges}
          />
        </Column>
      </Box>
    );
  }
);

Chart.displayName = "Chart";

export default Chart;
