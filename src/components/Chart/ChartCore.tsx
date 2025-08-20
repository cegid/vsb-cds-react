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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import { styled } from "@mui/material/styles";
import Box from "../Box";
import Typography from "../Typography";
import {
  neutral,
  CustomColorString,
  parseCustomColor,
  RADIUS,
} from "../../theme";
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
export type ChartType =
  | "line"
  | "bar"
  | "verticalBar"
  | "horizontalBar"
  | "pie"
  | "doughnut";

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
  /** Hidden datasets for transparency effect */
  hiddenDatasets?: Set<number>;
  /** Hidden data points for transparency effect */
  hiddenDataPoints?: Set<number>;
  /** Whether to use transparency instead of filtering */
  useTransparency?: boolean;
}

const StyledChartContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  minWidth: "280px",
  minHeight: "250px",
  "& canvas": {
    maxWidth: "100%",
    height: "auto !important",
  },
  [theme.breakpoints.down('md')]: {
    minWidth: "250px",
    minHeight: "220px",
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: "200px",
    minHeight: "200px",
  },
  '@media (max-width: 480px)': {
    minWidth: "180px",
    minHeight: "180px",
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
      hiddenDatasets = new Set(),
      hiddenDataPoints = new Set(),
      useTransparency = false,
      ...props
    },
    ref
  ) => {
    const tooltipRef = React.useRef<HTMLDivElement>(null);
    const [tooltipData, setTooltipData] = React.useState<TooltipData | null>(
      null
    );

    const getChartConfig = () => {
      switch (type) {
        case "verticalBar":
          return { chartType: "bar", indexAxis: "x" as const };
        case "horizontalBar":
          return { chartType: "bar", indexAxis: "y" as const };
        case "bar":
          return { chartType: "bar", indexAxis: "x" as const };
        default:
          return { chartType: type, indexAxis: "x" as const };
      }
    };

    const { chartType, indexAxis } = getChartConfig();

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

        if (chartType === "bar" && tooltip.dataPoints[0]) {
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
      const isPieOrDoughnut = type === "pie" || type === "doughnut";
      const currentHiddenDatasets = isPieOrDoughnut ? hiddenDataPoints : hiddenDatasets;

      return {
        ...data,
        datasets: data.datasets.map((dataset, datasetIndex) => {
          const convertedDataset = { ...dataset };

          if (dataset.backgroundColor) {
            if (Array.isArray(dataset.backgroundColor)) {
              (convertedDataset as any).backgroundColor = dataset.backgroundColor.map((color, colorIndex) => {
                const parsedColor = parseCustomColor(color);
                if (!parsedColor) return color;
                if (useTransparency && currentHiddenDatasets.has(isPieOrDoughnut ? colorIndex : datasetIndex)) {
                  if (parsedColor.startsWith('#')) {
                    const r = parseInt(parsedColor.slice(1, 3), 16);
                    const g = parseInt(parsedColor.slice(3, 5), 16);
                    const b = parseInt(parsedColor.slice(5, 7), 16);
                    return `rgba(${r}, ${g}, ${b}, 0.1)`;
                  } else if (parsedColor.startsWith('rgb(')) {
                    return parsedColor.replace('rgb(', 'rgba(').replace(')', ', 0.1)');
                  } else if (parsedColor.startsWith('rgba(')) {
                    return parsedColor.replace(/,\s*[\d.]+\)$/, ', 0.1)');
                  }
                  return parsedColor;
                }
                return parsedColor;
              });
            } else {
              let parsedColor = parseCustomColor(dataset.backgroundColor);
              if (!parsedColor) {
                (convertedDataset as any).backgroundColor = dataset.backgroundColor;
              } else {
                if (useTransparency && currentHiddenDatasets.has(datasetIndex)) {
                  if (parsedColor.startsWith('#')) {
                    const r = parseInt(parsedColor.slice(1, 3), 16);
                    const g = parseInt(parsedColor.slice(3, 5), 16);
                    const b = parseInt(parsedColor.slice(5, 7), 16);
                    parsedColor = `rgba(${r}, ${g}, ${b}, 0.1)`;
                  } else if (parsedColor.startsWith('rgb(')) {
                    parsedColor = parsedColor.replace('rgb(', 'rgba(').replace(')', ', 0.1)');
                  } else if (parsedColor.startsWith('rgba(')) {
                    parsedColor = parsedColor.replace(/,\s*[\d.]+\)$/, ', 0.1)');
                  }
                }
                (convertedDataset as any).backgroundColor = parsedColor;
              }
            }
          }

          if (dataset.borderColor) {
            if (Array.isArray(dataset.borderColor)) {
              (convertedDataset as any).borderColor = dataset.borderColor.map((color, colorIndex) => {
                const parsedColor = parseCustomColor(color);
                if (!parsedColor) return color;
                if (useTransparency && currentHiddenDatasets.has(isPieOrDoughnut ? colorIndex : datasetIndex)) {
                  if (parsedColor.startsWith('#')) {
                    const r = parseInt(parsedColor.slice(1, 3), 16);
                    const g = parseInt(parsedColor.slice(3, 5), 16);
                    const b = parseInt(parsedColor.slice(5, 7), 16);
                    return `rgba(${r}, ${g}, ${b}, 0.1)`;
                  } else if (parsedColor.startsWith('rgb(')) {
                    return parsedColor.replace('rgb(', 'rgba(').replace(')', ', 0.1)');
                  } else if (parsedColor.startsWith('rgba(')) {
                    return parsedColor.replace(/,\s*[\d.]+\)$/, ', 0.1)');
                  }
                  return parsedColor;
                }
                return parsedColor;
              });
            } else {
              let parsedColor = parseCustomColor(dataset.borderColor);
              if (!parsedColor) {
                (convertedDataset as any).borderColor = dataset.borderColor;
              } else {
                if (useTransparency && currentHiddenDatasets.has(datasetIndex)) {
                  if (parsedColor.startsWith('#')) {
                    const r = parseInt(parsedColor.slice(1, 3), 16);
                    const g = parseInt(parsedColor.slice(3, 5), 16);
                    const b = parseInt(parsedColor.slice(5, 7), 16);
                    parsedColor = `rgba(${r}, ${g}, ${b}, 0.1)`;
                  } else if (parsedColor.startsWith('rgb(')) {
                    parsedColor = parsedColor.replace('rgb(', 'rgba(').replace(')', ', 0.1)');
                  } else if (parsedColor.startsWith('rgba(')) {
                    parsedColor = parsedColor.replace(/,\s*[\d.]+\)$/, ', 0.1)');
                  }
                }
                (convertedDataset as any).borderColor = parsedColor;
              }
            }
          }

          return convertedDataset;
        }),
      };
    }, [data, useTransparency, hiddenDatasets, hiddenDataPoints, type]);

    const defaultOptions: ChartOptions<any> = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: window.innerWidth < 480 ? 1 : window.innerWidth < 768 ? 1.2 : 1.5,
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
        ...(type === "pie" || type === "doughnut"
          ? {
              datalabels: {
                display: true,
                color: neutral[10],
                backgroundColor: neutral[99],
                borderColor: "#E6E7EA",
                borderWidth: 1,
                borderRadius: 8,
                padding: {
                  top: 5,
                  bottom: 2,
                  left: 8,
                  right: 8,
                },
                font: {
                  size: typography.captionRegular.fontSize,
                  family: typography.captionRegular.fontFamily,
                },
                formatter: (value: number) => value.toString(),
                textAlign: 'center',
                textBaseline: 'middle',
                anchor: 'center',
                align: 'center',
              },
            }
          : {
              datalabels: {
                display: false,
              },
            }),
      },
      ...(type === "line" || chartType === "bar"
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
            ...(chartType === "bar"
              ? {
                  indexAxis,
                  elements: {
                    bar: {
                      borderRadius:
                        indexAxis === "y"
                          ? {
                              topLeft: 0,
                              topRight: 4,
                              bottomLeft: 0,
                              bottomRight: 4,
                            }
                          : {
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
        case "verticalBar":
        case "horizontalBar":
          return <Bar {...commonProps} />;
        case "pie":
          return <Pie {...commonProps} plugins={[ChartDataLabels]} />;
        case "doughnut":
          return <Doughnut {...commonProps} plugins={[ChartDataLabels]} />;
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
