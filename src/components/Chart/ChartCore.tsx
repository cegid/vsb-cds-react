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
} from "../../theme";
import typography from "../../theme/typography";
import Column from "../Column";
import Row from "../Row";
import { getChartIcon } from "./Chart";
import OverlayBarChart from "./OverlayBarChart";

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
  allValues?: Array<{
    label: string;
    value: string;
    color: string;
    type: string;
  }>;
  mainItem?: {
    label: string;
    value: string;
    color: string;
    type: string;
  };
  otherItems?: Array<{
    label: string;
    value: string;
    color: string;
    type: string;
  }>;
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
  | "doughnut"
  | "mixed";

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
  /** Chart type for mixed charts (bar, line, etc.) */
  type?: string;
  /** Y-axis ID for dual axis charts */
  yAxisID?: string;
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
    const tooltipTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const getChartConfig = () => {
      switch (type) {
        case "verticalBar":
          return { chartType: "bar", indexAxis: "x" as const };
        case "horizontalBar":
          return { chartType: "bar", indexAxis: "y" as const };
        case "bar":
          return { chartType: "bar", indexAxis: "x" as const };
        case "mixed":
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
          if (tooltipTimeoutRef.current) {
            clearTimeout(tooltipTimeoutRef.current);
          }
          
          tooltipTimeoutRef.current = setTimeout(() => {
            const dataPoint = tooltip.dataPoints[0];
            
            let newTooltipData;
            
            if (type === "mixed") {
              // Pour les graphiques mixtes, récupère toutes les valeurs du même label
              const labelIndex = dataPoint.dataIndex;
              const allValues = data.datasets.map((dataset, index) => {
                let color: string;
                const colorSource = dataset.type === "line" 
                  ? (dataset.borderColor || dataset.backgroundColor || '#666666')
                  : (dataset.backgroundColor || '#666666');
                
                if (typeof colorSource === 'string') {
                  color = colorSource;
                } else if (Array.isArray(colorSource) && colorSource.length > 0) {
                  color = colorSource[0];
                } else {
                  color = '#666666';
                }
                
                return {
                  label: dataset.label || `Dataset ${index + 1}`,
                  value: dataset.data[labelIndex]?.toLocaleString() || '0',
                  color: color,
                  type: dataset.type || 'bar'
                };
              });

              // Trouve le type le moins utilisé
              const typeCounts = allValues.reduce((acc, item) => {
                acc[item.type] = (acc[item.type] || 0) + 1;
                return acc;
              }, {} as Record<string, number>);
              
              const leastUsedType = Object.entries(typeCounts)
                .sort(([,a], [,b]) => a - b)[0]?.[0];
              
              // Sépare l'élément principal des autres
              const mainItem = allValues.find(item => item.type === leastUsedType);
              const otherItems = allValues.filter(item => item.type !== leastUsedType);
              
              newTooltipData = {
                chartType: type,
                label: dataPoint.dataset.label || '',
                x: dataPoint.label || '',
                y: dataPoint.formattedValue || '',
                color: dataPoint.dataset.backgroundColor || '',
                allValues: allValues,
                mainItem: mainItem,
                otherItems: otherItems
              };
            } else {
              newTooltipData = {
                chartType: type,
                label: dataPoint.dataset.label || '',
                x: dataPoint.label || '',
                y: dataPoint.formattedValue || '',
                color: dataPoint.dataset.backgroundColor || '',
              };
            }
            
            setTooltipData(prevData => {
              if (!prevData || 
                  prevData.chartType !== newTooltipData.chartType ||
                  prevData.label !== newTooltipData.label ||
                  prevData.x !== newTooltipData.x ||
                  prevData.y !== newTooltipData.y ||
                  prevData.color !== newTooltipData.color ||
                  JSON.stringify(prevData.allValues) !== JSON.stringify(newTooltipData.allValues)) {
                return newTooltipData;
              }
              return prevData;
            });
          }, 10);
        }
      },
      [type, data]
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
        chartType,
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

          if (isPieOrDoughnut) {
            convertedDataset.hoverOffset = 12;
          }

          if (type === "line" || convertedDataset.type === "line") {
            convertedDataset.borderWidth = 3;
            convertedDataset.tension = 0.4;
            convertedDataset.pointRadius = convertedDataset.pointRadius ?? 0;
            convertedDataset.pointHoverRadius = convertedDataset.pointHoverRadius ?? 0;
            convertedDataset.order = 0; // Place les lignes au premier plan
          }
          
          if (convertedDataset.type === "bar") {
            convertedDataset.order = 1; // Place les barres en arrière-plan
          }

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

          const borderWidth = dataset.borderWidth;
          
          convertedDataset.borderWidth = borderWidth;
          if (type !== "line" && convertedDataset.type !== "line") {
            convertedDataset.borderColor = 'transparent';
          }

          convertedDataset.hoverBackgroundColor = convertedDataset.backgroundColor;
          convertedDataset.hoverBorderColor = dataset.borderColor;
          convertedDataset.hoverBorderWidth = borderWidth;

          return convertedDataset;
        }),
      };
    }, [data, useTransparency, hiddenDatasets, hiddenDataPoints, type]);

    const defaultOptions: ChartOptions<any> = React.useMemo(() => ({
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
            ...(type === "line"
              ? {
                  elements: {
                    line: {
                      borderWidth: 3,
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hoverRadius: 0,
                    },
                  },
                }
              : {}),
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
      ...(type === "mixed" ? {
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
            type: 'linear',
            display: true,
            position: 'left',
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
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false,
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
      } : {}),
      ...options,
    }), [
      type,
      chartType,
      indexAxis,
      showVerticalGrid,
      showHorizontalGrid,
      showTooltip,
      externalTooltipHandler,
      options
    ]);

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
        case "mixed":
          // Use custom overlay component for gauge effect
          const hasOverlayBars = data.datasets.some(d => 
            d.type === 'bar' && d.label?.toLowerCase().includes('prévision')
          );
          
          if (hasOverlayBars) {
            const handleOverlayHover = (datasetIndex: number, labelIndex: number, event: MouseEvent, barRect?: { x: number, y: number, width: number, height: number }) => {
              // Simulate Chart.js tooltip structure for mixed charts
              const fakeTooltip = {
                opacity: 1,
                body: ['fake'],
                dataPoints: [{
                  datasetIndex: datasetIndex,
                  dataIndex: labelIndex,
                  dataset: data.datasets[datasetIndex],
                  label: data.labels[labelIndex],
                  formattedValue: data.datasets[datasetIndex].data[labelIndex]?.toLocaleString() || '0'
                }]
              };
              updateTooltipData(fakeTooltip);
              
              // Position the tooltip
              const tooltipEl = tooltipRef.current;
              if (tooltipEl && barRect) {
                const chartContainer = tooltipEl.parentElement;
                if (chartContainer) {
                  const containerRect = chartContainer.getBoundingClientRect();
                  
                  // Get tooltip dimensions
                  tooltipEl.style.display = "block";
                  tooltipEl.style.visibility = "hidden"; // Make visible to measure but hide visually
                  const tooltipRect = tooltipEl.getBoundingClientRect();
                  const tooltipWidth = tooltipRect.width;
                  const tooltipHeight = tooltipRect.height;
                  
                  // Calculate available space
                  const containerWidth = containerRect.width;
                  const containerHeight = containerRect.height;
                  
                  // Bar position relative to container
                  const barCenterX = barRect.x + barRect.width / 2;
                  const barCenterY = barRect.y + barRect.height / 2;
                  const barRightX = barRect.x + barRect.width;
                  const barLeftX = barRect.x;
                  
                  let tooltipX, tooltipY;
                  
                  // Try to position to the right first
                  const spaceRight = containerWidth - barRightX;
                  const spaceLeft = barLeftX;
                  const spaceTop = barRect.y;
                  const spaceBottom = containerHeight - (barRect.y + barRect.height);
                  
                  if (spaceRight >= tooltipWidth + 10) {
                    // Position to the right
                    tooltipX = barRightX + 10;
                    tooltipY = Math.max(10, Math.min(barCenterY - tooltipHeight / 2, containerHeight - tooltipHeight - 10));
                    tooltipEl.style.transform = "none";
                  } else if (spaceLeft >= tooltipWidth + 10) {
                    // Position to the left
                    tooltipX = barLeftX - tooltipWidth - 10;
                    tooltipY = Math.max(10, Math.min(barCenterY - tooltipHeight / 2, containerHeight - tooltipHeight - 10));
                    tooltipEl.style.transform = "none";
                  } else if (spaceTop >= tooltipHeight + 10) {
                    // Position above
                    tooltipX = barCenterX;
                    tooltipY = barRect.y - tooltipHeight - 10;
                    tooltipEl.style.transform = "translateX(-50%)";
                  } else {
                    // Position below
                    tooltipX = barCenterX;
                    tooltipY = barRect.y + barRect.height + 10;
                    tooltipEl.style.transform = "translateX(-50%)";
                  }
                  
                  tooltipEl.style.left = `${tooltipX}px`;
                  tooltipEl.style.top = `${tooltipY}px`;
                  tooltipEl.style.visibility = "visible"; // Make visible again
                }
              }
            };

            const handleOverlayMouseLeave = () => {
              const tooltipEl = tooltipRef.current;
              if (tooltipEl) {
                hideTooltip(tooltipEl);
              }
            };

            return (
              <OverlayBarChart 
                data={data}
                width={width}
                height={height}
                showGrid={showHorizontalGrid}
                onHover={handleOverlayHover}
                onMouseLeave={handleOverlayMouseLeave}
              />
            );
          } else {
            return <Bar {...commonProps} />;
          }
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
          backgroundColor="neutral/10"
          px={5}
          py={4}
          borderRadius={2}
          width="fit-content"
          justifyContent="center"
          alignItems="center"
          display="none"
          minWidth="150px"
        >
          {tooltipData && (
            <Column gap={4}>
              {tooltipData.mainItem ? (
                <>
                  <Column gap={2}>
                    <Row gap={2} alignItems="center">
                      {getChartIcon(
                        tooltipData.mainItem.type === "line" ? "line" : "verticalBar", 
                        parseCustomColor(tooltipData.mainItem.color) || tooltipData.mainItem.color
                      )}
                      <Typography variant="captionRegular" color="white">
                        {tooltipData.mainItem.label}
                      </Typography>
                    </Row>
                    <Typography variant="titleLSemiBold" color="white">
                      {tooltipData.mainItem.value}
                    </Typography>
                  </Column>
                  {tooltipData.otherItems && tooltipData.otherItems.length > 0 && (
                    <Column gap={2}>
                      {tooltipData.otherItems.map((item, index, array) => {
                        const currentStack = item.label.includes('Prévision') ? 
                          item.label.replace('Prévision ', '') : item.label;
                        const nextItem = array[index + 1];
                        const nextStack = nextItem ? (nextItem.label.includes('Prévision') ? 
                          nextItem.label.replace('Prévision ', '') : nextItem.label) : null;
                        const isLastInStack = !nextItem || currentStack !== nextStack;
                        
                        return (
                          <React.Fragment key={index}>
                            <Row gap={5} alignItems="center">
                              {getChartIcon(
                                item.type === "line" ? "line" : "verticalBar", 
                                parseCustomColor(item.color) || item.color
                              )}
                              <Typography variant="captionRegular" color="white" flex={1}>
                                {item.label}
                              </Typography>
                              <Typography variant="captionSemiBold" color="white">
                                {item.value}
                              </Typography>
                            </Row>
                            {isLastInStack && index < array.length - 1 && (
                              <Box height={2} />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </Column>
                  )}
                  
                  <TooltipDivider />
                  <Typography variant="captionSemiBold" color="neutral/80">
                    {tooltipData.x}
                  </Typography>
                </>
              ) : (
                <>
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
                </>
              )}
            </Column>
          )}
        </Box>
      </StyledChartContainer>
    );
  }
);

ChartCore.displayName = "ChartCore";

export default ChartCore;
