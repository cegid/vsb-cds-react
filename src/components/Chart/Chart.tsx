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

export interface ChartProps {
  type: ChartType;
  data: ChartData<any>;
  options?: ChartOptions<any>;
  width?: number;
  height?: number;
  className?: string;
}

const StyledChartContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  "& canvas": {
    maxWidth: "100%",
    height: "auto !important",
  },
}));

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ type, data, options, width, height, className, ...props }, ref) => {
    const defaultOptions: ChartOptions<any> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#fff",
          bodyColor: "#fff",
          cornerRadius: 8,
          padding: 12,
        },
      },
      ...(type === "line" || type === "bar"
        ? {
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  padding: 10,
                },
              },
              y: {
                grid: {
                  color: "rgba(0, 0, 0, 0.1)",
                },
                ticks: {
                  padding: 10,
                },
              },
            },
          }
        : {}),
      ...options,
    };

    const renderChart = () => {
      const commonProps = {
        data,
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
      </StyledChartContainer>
    );
  }
);

Chart.displayName = "Chart";

export default Chart;