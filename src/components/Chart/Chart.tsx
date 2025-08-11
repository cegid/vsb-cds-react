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
import Icon from "../Icon";
import Row from "../Row";

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

export type ChartType = "line" | "bar" | "pie" | "doughnut";

export interface ChartDataset {
  /**
   * Dataset label displayed in legends and tooltips
   */
  label?: string;
  /**
   * Array of data points for the dataset
   */
  data: number[];
  /**
   * Background color(s) using theme color palette (e.g., "primary/50")
   * Can be a single color or array for multiple data points
   */
  backgroundColor?: CustomColorString | CustomColorString[];
  /**
   * Border color(s) using theme color palette (e.g., "primary/30")
   * Can be a single color or array for multiple data points
   */
  borderColor?: CustomColorString | CustomColorString[];
  /**
   * Width of the border in pixels
   */
  borderWidth?: number;
  /**
   * Line tension for line charts (0 = straight lines, 1 = very curved)
   * @default 0
   */
  tension?: number;
  /**
   * Additional Chart.js dataset properties
   */
  [key: string]: any;
}

export interface CustomChartData {
  /**
   * Array of labels for the chart's x-axis
   */
  labels: string[];
  /**
   * Array of datasets containing the chart data and styling
   */
  datasets: ChartDataset[];
}

export interface ChartProps {
  /**
   * The type of chart to render
   */
  type: ChartType;
  /**
   * Chart data containing labels and datasets with enforced CustomColorString types
   */
  data: CustomChartData;
  /**
   * Chart.js configuration options to override defaults
   */
  options?: ChartOptions<any>;
  /**
   * Width of the chart container in pixels
   */
  width?: number;
  /**
   * Height of the chart container in pixels
   */
  height?: number;
  /**
   * CSS class name for the chart container
   */
  className?: string;
  /**
   * Whether to show vertical grid lines (X-axis)
   * @default false
   */
  showVerticalGrid?: boolean;
  /**
   * Whether to show horizontal grid lines (Y-axis)
   * @default true
   */
  showHorizontalGrid?: boolean;
  /**
   * Background colors for chart datasets using theme color palette
   */
  backgroundColor?: CustomColorString | CustomColorString[];
  /**
   * Whether to show tooltips on hover
   * @default true
   */
  showTooltip?: boolean;
  /**
   * Title displayed in the tooltip
   */
  title?: string;
}

const StyledChartContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
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

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
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
      backgroundColor,
      showTooltip = true,
      title = "Titre",
      ...props
    },
    ref
  ) => {
    const tooltipRef = React.useRef<HTMLDivElement>(null);
    const [tooltipData, setTooltipData] = React.useState<any>(null);
    
    const getChartIcon = (chartType: ChartType): string => {
      switch (chartType) {
        case "bar":
          return "chart-01";
        case "pie":
          return "pie-chart";
        case "doughnut":
          return "pie-chart-08";
        case "line":
          return "chart-line-data-01";
        default:
          return "chart-01";
      }
    };

    const externalTooltipHandler = React.useCallback(
      (context: any) => {
        const { tooltip } = context;
        const tooltipEl = tooltipRef.current;

        if (!tooltipEl) return;

        if (tooltip.opacity === 0) {
          tooltipEl.style.display = "none";
          setTooltipData(null);
           return;
        }

        tooltipEl.style.display = "block";

        if (tooltip.body) {
          const dataPoint = tooltip.dataPoints[0];
          setTooltipData({
            chartType: type.charAt(0).toUpperCase() + type.slice(1),
            label: dataPoint.label,
            value: dataPoint.parsed.y,
          });
        }

        tooltipEl.style.left = tooltip.caretX + "px";
        tooltipEl.style.top = tooltip.caretY + "px";
      },
      [type]
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

          if (backgroundColor) {
            const backgroundColors = Array.isArray(backgroundColor)
              ? backgroundColor
              : [backgroundColor];
            (convertedDataset as any).backgroundColor = parseCustomColor(
              backgroundColors[index % backgroundColors.length]
            );
          }

          return convertedDataset;
        }),
      };
    }, [data, backgroundColor]);
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
                  color: "rgba(0, 0, 0, 0.1)",
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
                  color: "rgba(0, 0, 0, 0.1)",
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
        width={width || "100%"}
        height={height || 400}
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
                <Icon variant="stroke" size={12} color="white">
                  {getChartIcon(type)}
                </Icon>
                <Typography variant="captionSemiBold" color="white">
                  {tooltipData.label}
                </Typography>
              </Row>
              <Typography variant="bodySSemiBold" color="white">
                {tooltipData.value}
              </Typography>
              <TooltipDivider />
              <Typography variant="captionSemiBold" color="neutral/80">
                {title}
              </Typography>
            </Column>
          )}
        </Box>
      </StyledChartContainer>
    );
  }
);

Chart.displayName = "Chart";

export default Chart;
