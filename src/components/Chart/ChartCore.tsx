"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import { styled } from "@mui/material/styles";
import Box from "../Box";
import Typography from "../Typography";
import { neutral, CustomColorString, parseCustomColor } from "../../theme";
import typography from "../../theme/typography";
import Column from "../Column";
import Row from "../Row";
import { getChartIcon } from "./Chart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface TooltipData {
  x: string;
  y: string;
  chartType: ChartType;
  label: string;
  color: string;
}

/**
 * Supported chart types for rendering different visualization formats
 */
export type ChartType = "line" | "bar" | "pie" | "doughnut";

/**
 * Configuration for a single dataset within a chart
 */
export interface ChartDataset {
  /** Display label for the dataset */
  label?: string;
  /** Array of numeric values to be plotted */
  data: number[];
  /** Background color(s) for chart elements */
  backgroundColor?: CustomColorString | CustomColorString[];
  /** Border color(s) for chart elements */
  borderColor?: CustomColorString | CustomColorString[];
  /** Width of borders in pixels */
  borderWidth?: number;
  /** Smoothness of line curves (0-1, line charts only) */
  tension?: number;
  /** Additional Chart.js dataset properties */
  [key: string]: any;
}

/**
 * Complete chart data structure containing labels and datasets
 */
export interface CustomChartData {
  /** X-axis labels for the chart */
  labels: string[];
  /** Array of datasets to be rendered */
  datasets: ChartDataset[];
}

/**
 * Props for the ChartCore component
 */
export interface ChartCoreProps {
  /** Type of chart to render */
  type: ChartType;
  /** Chart data including labels and datasets */
  data: CustomChartData;
  /** Chart.js options for customization */
  options?: ChartOptions<any>;
  /** Chart width in pixels or CSS units */
  width?: number | string;
  /** Chart height in pixels or CSS units */
  height?: number | string;
  /** Additional CSS class for styling */
  className?: string;
  /** Whether to display vertical grid lines */
  showVerticalGrid?: boolean;
  /** Whether to display horizontal grid lines */
  showHorizontalGrid?: boolean;
  /** Whether to show interactive tooltips */
  showTooltip?: boolean;
  /** Chart title text */
  title?: string;
}

const StyledChartContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  minWidth: "300px",
  minHeight: "300px",
  "& canvas": {
    maxWidth: "100%",
    height: "auto !important",
  },
}));

const TooltipDivider = styled(Box)(({ theme }) => ({
  height: "1px",
  backgroundColor: neutral[40],
  margin: "0px -12px",
  width: "calc(100% + 24px)",
}));

const ChartCore = React.forwardRef<HTMLDivElement, ChartCoreProps>(
  (
    {
      type,
      data,
      options,
      width,
      height,
      className,
      showVerticalGrid = false,
      showHorizontalGrid = true,
      showTooltip = true,
      title = "Titre",
      ...props
    },
    ref
  ) => {
    const tooltipRef = React.useRef<HTMLDivElement>(null);
    const [tooltipData, setTooltipData] = React.useState<TooltipData | null>(
      null
    );

    const hideTooltip = React.useCallback((tooltipEl: HTMLDivElement) => {
      tooltipEl.style.display = "none";
      setTooltipData(null);
    }, []);

    const updateTooltipData = React.useCallback(
      (tooltip: any) => {
        if (tooltip.body) {
          const dataPoint = tooltip.dataPoints[0];
          setTooltipData({
            chartType: type,
            label: dataPoint.dataset.label,
            x: dataPoint.label,
            y: dataPoint.formattedValue,
            color: dataPoint.dataset.backgroundColor,
          });
        }
      },
      [type]
    );

    const calculateBarTooltipPosition = React.useCallback(
      (
        context: any,
        tooltip: any,
        containerRect: DOMRect,
        tooltipRect: DOMRect
      ) => {
        const chart = context.chart;
        const datasetIndex = tooltip.dataPoints[0].datasetIndex;
        const dataIndex = tooltip.dataPoints[0].dataIndex;
        const element = chart.getDatasetMeta(datasetIndex).data[dataIndex];

        if (!element) return { left: tooltip.caretX, top: tooltip.caretY };

        let left = element.x - tooltipRect.width / 2;
        let top;

        const barTop = Math.min(element.y, element.base);
        const barBottom = Math.max(element.y, element.base);
        const spaceAbove = barTop;
        const spaceBelow = containerRect.height - barBottom;

        if (spaceAbove >= tooltipRect.height + 15) {
          top = barTop - tooltipRect.height - 15;
        } else if (spaceBelow >= tooltipRect.height + 15) {
          top = barBottom + 15;
        } else if (element.x > containerRect.width / 2) {
          left = element.x - element.width / 2 - tooltipRect.width;
          top = element.y - tooltipRect.height / 2;
        } else {
          left = element.x + element.width / 2;
          top = element.y - tooltipRect.height / 2;
        }

        return { left, top };
      },
      []
    );

    const constrainTooltipPosition = React.useCallback(
      (
        position: { left: number; top: number },
        containerRect: DOMRect,
        tooltipRect: DOMRect
      ) => {
        let { left, top } = position;

        if (left + tooltipRect.width > containerRect.width) {
          left = containerRect.width - tooltipRect.width - 10;
        }
        if (left < 0) {
          left = 10;
        }
        if (top + tooltipRect.height > containerRect.height) {
          top = containerRect.height - tooltipRect.height - 10;
        }
        if (top < 0) {
          top = 10;
        }

        return { left, top };
      },
      []
    );

    const externalTooltipHandler = React.useCallback(
      (context: any) => {
        const { tooltip } = context;
        const tooltipEl = tooltipRef.current;

        if (!tooltipEl) return;

        if (tooltip.opacity === 0) {
          hideTooltip(tooltipEl);
          return;
        }

        tooltipEl.style.display = "block";
        updateTooltipData(tooltip);

        const containerEl = tooltipEl.parentElement;
        if (!containerEl) return;

        const containerRect = containerEl.getBoundingClientRect();
        const tooltipRect = tooltipEl.getBoundingClientRect();

        let position = { left: tooltip.caretX, top: tooltip.caretY };

        if (type === "bar" && tooltip.dataPoints[0]) {
          position = calculateBarTooltipPosition(
            context,
            tooltip,
            containerRect,
            tooltipRect
          );
        }

        const finalPosition = constrainTooltipPosition(
          position,
          containerRect,
          tooltipRect
        );

        tooltipEl.style.left = finalPosition.left + "px";
        tooltipEl.style.top = finalPosition.top + "px";
      },
      [
        type,
        hideTooltip,
        updateTooltipData,
        calculateBarTooltipPosition,
        constrainTooltipPosition,
      ]
    );

    const processedData = React.useMemo((): ChartData<any> => {
      return {
        ...data,
        datasets: data.datasets.map((dataset, index) => {
          const convertedDataset = { ...dataset };

          if (dataset.backgroundColor) {
            if (Array.isArray(dataset.backgroundColor)) {
              (convertedDataset as any).backgroundColor =
                dataset.backgroundColor.map(parseCustomColor);
            } else {
              (convertedDataset as any).backgroundColor = parseCustomColor(
                dataset.backgroundColor
              );
            }
          }

          if (dataset.borderColor) {
            if (Array.isArray(dataset.borderColor)) {
              (convertedDataset as any).borderColor =
                dataset.borderColor.map(parseCustomColor);
            } else {
              (convertedDataset as any).borderColor = parseCustomColor(
                dataset.borderColor
              );
            }
          }

          return convertedDataset;
        }),
      };
    }, [data]);

    const defaultOptions: ChartOptions<any> = {
      responsive: true,
      maintainAspectRatio: false,
      onHover: (
        event: { native: { target: HTMLCanvasElement } },
        elements: string | any[]
      ) => {
        const canvas = event.native?.target;
        if (canvas) {
          canvas.style.cursor = elements.length > 0 ? "pointer" : "default";
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
          external: showTooltip ? externalTooltipHandler : undefined,
        },
      },
      ...(type === "line" || type === "bar"
        ? {
            scales: {
              x: {
                grid: {
                  display: showVerticalGrid,
                  color: "#E6E7EA",
                },
                ticks: {
                  padding: 10,
                  color: neutral[50],
                  font: {
                    family: typography.captionSemiBold.fontFamily,
                    size: typography.captionSemiBold.fontSize,
                  },
                },
              },
              y: {
                grid: {
                  display: showHorizontalGrid,
                  color: "#E6E7EA",
                },
                ticks: {
                  padding: 10,
                  color: neutral[50],
                  font: {
                    family: typography.captionSemiBold.fontFamily,
                    size: typography.captionSemiBold.fontSize,
                  },
                },
              },
            },
            ...(type === "bar"
              ? {
                  elements: {
                    bar: {
                      borderRadius: {
                        topLeft: 4,
                        topRight: 4,
                        bottomLeft: 0,
                        bottomRight: 0,
                      },
                    },
                  },
                }
              : {}),
          }
        : {}),
      ...options,
    };

    const renderChart = () => {
      const commonProps = {
        data: processedData,
        options: defaultOptions,
        width,
        height,
      };

      switch (type) {
        case "line":
          return <Line {...commonProps} />;
        case "bar":
          return <Bar {...commonProps} />;
        case "pie":
          return <Pie {...commonProps} />;
        case "doughnut":
          return <Doughnut {...commonProps} />;
        default:
          return <Line {...commonProps} />;
      }
    };

    return (
      <StyledChartContainer
        ref={ref}
        className={className}
        width={width ?? "100%"}
        height={height ?? "100%"}
        {...props}
      >
        {renderChart()}
        <Box
          ref={tooltipRef}
          position="absolute"
          backgroundColor="neutral/20"
          p={5}
          borderRadius={2}
          width="fit-content"
          justifyContent="center"
          alignItems="center"
          display="none"
          minWidth="150px"
        >
          {tooltipData && (
            <Column gap={4}>
              <Row gap={2}>
                {getChartIcon(type, tooltipData.color)}
                <Typography variant="captionSemiBold" color="white">
                  {tooltipData.label}
                </Typography>
              </Row>
              <Typography variant="bodySSemiBold" color="white">
                {tooltipData.y}
              </Typography>
              <TooltipDivider />
              <Typography variant="captionSemiBold" color="neutral/80">
                {tooltipData.x}
              </Typography>
            </Column>
          )}
        </Box>
      </StyledChartContainer>
    );
  }
);

ChartCore.displayName = "ChartCore";

export default ChartCore;
