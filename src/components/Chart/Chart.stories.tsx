import type { Meta, StoryObj } from "@storybook/react-vite";

import Chart, { CustomChartData } from "./Chart";
import WarningDecorator from "../../storycomponents/WarningDecorator";

const sampleBarData: CustomChartData = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      label: "Sales",
      data: [65000, 59000, 80000, 81000],
      backgroundColor: "primary/60",
      borderColor: "primary/50",
      borderWidth: 1,
    },
    {
      label: "Target",
      data: [70000, 65000, 75000, 85000],
      backgroundColor: "success/60",
      borderColor: "success/50",
      borderWidth: 1,
    },
    {
      label: "Others",
      data: [8000, 12000, 10000, 15000],
      borderColor: "yellow/50",
      backgroundColor: "yellow/60",
      borderWidth: 1,
    },
    {
      label: "Marketing",
      data: [25000, 30000, 28000, 35000],
      backgroundColor: "critical/60",
      borderColor: "critical/50",
      borderWidth: 1,
    },
    {
      label: "Support",
      data: [15000, 18000, 20000, 22000],
      backgroundColor: "purple/60",
      borderColor: "purple/50",
      borderWidth: 1,
    },
    {
      label: "Development",
      data: [45000, 50000, 55000, 60000],
      backgroundColor: "info/60",
      borderColor: "info/50",
      borderWidth: 1,
    },
    {
      label: "Operations",
      data: [12000, 14000, 16000, 18000],
      backgroundColor: "beige/60",
      borderColor: "beige/50",
      borderWidth: 1,
    },
    {
      label: "Finance",
      data: [35000, 38000, 42000, 45000],
      backgroundColor: "pink/60",
      borderColor: "pink/50",
      borderWidth: 1,
    },
  ],
};

const sampleHorizontalBarData: CustomChartData = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      label: "Sales",
      data: [65000, 59000, 80000, 81000],
      backgroundColor: "primary/60",
      borderColor: "primary/50",
      borderWidth: 1,
    },
    {
      label: "Target",
      data: [70000, 65000, 75000, 85000],
      backgroundColor: "success/60",
      borderColor: "success/50",
      borderWidth: 1,
    },
    {
      label: "Others",
      data: [8000, 12000, 10000, 15000],
      borderColor: "yellow/50",
      backgroundColor: "yellow/60",
      borderWidth: 1,
    },
    {
      label: "Marketing",
      data: [25000, 30000, 28000, 35000],
      backgroundColor: "critical/60",
      borderColor: "critical/50",
      borderWidth: 1,
    },
    {
      label: "Support",
      data: [15000, 18000, 20000, 22000],
      backgroundColor: "purple/60",
      borderColor: "purple/50",
      borderWidth: 1,
    },
    {
      label: "Development",
      data: [45000, 50000, 55000, 60000],
      backgroundColor: "info/60",
      borderColor: "info/50",
      borderWidth: 1,
    },
    {
      label: "Operations",
      data: [12000, 14000, 16000, 18000],
      backgroundColor: "beige/60",
      borderColor: "beige/50",
      borderWidth: 1,
    },
    {
      label: "Finance",
      data: [35000, 38000, 42000, 45000],
      backgroundColor: "pink/60",
      borderColor: "pink/50",
      borderWidth: 1,
    },
  ],
};

const sampleGroupedBarData: CustomChartData = {
  labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"],
  datasets: [
    {
      label: "Encaissements",
      data: [625000, 658000, 582000, 731000, 768000, 694000],
      backgroundColor: "primary/60",
      borderColor: "primary/95",
      borderWidth: 0,
      stack: "Encaissements",
    },
    {
      label: "Prévision Encaissements",
      data: [640000, 670000, 595000, 745000, 780000, 726000],
      backgroundColor: "primary/95",
      borderColor: "primary/95",
      borderWidth: 0,
      stack: "Encaissements",
    },
    {
      label: "Décaissements",
      data: [500000, 495000, 510000, 525000, 535000, 533000],
      backgroundColor: "secondary/60",
      borderColor: "secondary/95",
      borderWidth: 0,
      stack: "Décaissements",
    },
    {
      label: "Prévision Décaissements",
      data: [515000, 505000, 518000, 530000, 540000, 542000],
      backgroundColor: "secondary/95",
      borderColor: "secondary/95",
      borderWidth: 0,
      stack: "Décaissements",
    },
  ],
};

const samplePieData: CustomChartData = {
  labels: ["Desktop", "Mobile", "Tablet"],
  datasets: [
    {
      data: [55, 35, 10],
      backgroundColor: ["pink/70", "purple/70", "primary/70"],
      borderColor: ["white", "white", "white"],
      borderWidth: 2,
    },
  ],
};

const sampleDoughnutData: CustomChartData = {
  labels: ["Product A", "Product B", "Product C", "Product D"],
  datasets: [
    {
      data: [30, 25, 25, 20],
      backgroundColor: ["pink/70", "purple/70", "primary/70", "secondary/70"],
      borderColor: ["white", "white", "white", "white"],
      borderWidth: 2,
    },
  ],
};

const sampleLineData: CustomChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [65000, 59000, 80000, 81000, 56000, 70000],
      borderColor: "primary/50",
      backgroundColor: "primary/20",
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
    {
      label: "Expenses",
      data: [45000, 48000, 40000, 39000, 46000, 50000],
      borderColor: "critical/50",
      backgroundColor: "critical/20",
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
    {
      label: "Profit",
      data: [20000, 11000, 40000, 42000, 10000, 20000],
      borderColor: "success/50",
      backgroundColor: "success/20",
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
  ],
};

const meta = {
  title: "📊 Data Display/Chart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["verticalBar", "horizontalBar", "pie", "doughnut", "line"],
      description: "The type of chart to display",
    },
    width: {
      control: "number",
      description: "Width of the chart container",
    },
    height: {
      control: "number",
      description: "Height of the chart container",
    },
    showVerticalGrid: {
      control: "boolean",
      description: "Whether to show vertical grid lines (X-axis)",
    },
    showHorizontalGrid: {
      control: "boolean",
      description: "Whether to show horizontal grid lines (Y-axis)",
    },
    showTooltip: {
      control: "boolean",
      description: "Whether to show tooltips on hover",
    },
    title: {
      control: "text",
      description: "Title displayed in the tooltip",
    },
    backgroundColor: {
      control: "text",
      description:
        "Background colors using theme color palette (e.g., 'primary/50')",
    },
    totalsDisplayMode: {
      control: "select",
      options: ["simple", "detailed", "none"],
      description:
        "Display mode for totals: 'simple' (default), 'detailed', or 'none'",
    },
  },
  args: {
    type: "verticalBar",
    backgroundColor: "primary",
    showVerticalGrid: false,
    showHorizontalGrid: true,
    showTooltip: true,
    title: "Titre",
    data: sampleBarData,
    totalsDisplayMode: "simple",
  },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GroupedBarChart: Story = {
  args: {
    type: "verticalBar",
    backgroundColor: "primary",
    data: sampleGroupedBarData,
    title: "Flux de trésorerie",
    showVerticalGrid: true,
    showHorizontalGrid: true,
    height: 500,
    width: 600,
    totalsDisplayMode: "simple",
  },
  render: (args) => <Chart {...args} />,
};

export const VerticalBarChart: Story = {
  args: {
    type: "verticalBar",
    backgroundColor: "primary",
    data: sampleBarData,
  },
  render: (args) => <Chart {...args} />,
};

export const HorizontalBarChart: Story = {
  args: {
    type: "horizontalBar",
    backgroundColor: "primary",
    data: sampleHorizontalBarData,
  },
  render: (args) => <Chart {...args} />,
};

export const PieChart: Story = {
  args: {
    type: "pie",
    backgroundColor: "primary",
    data: samplePieData,
  },
  render: (args) => <Chart {...args} showTooltip={false} />,
};

export const DoughnutChart: Story = {
  args: {
    type: "doughnut",
    backgroundColor: "primary",
    data: sampleDoughnutData,
  },
  render: (args) => <Chart {...args} showTooltip={false} />,
};

export const ChartWithSimpleTotals: Story = {
  args: {
    type: "pie",
    backgroundColor: "primary",
    data: samplePieData,
    totalsDisplayMode: "simple",
    title: "Chart with Simple Totals",
  },
  render: (args) => <Chart {...args} showTooltip={false} />,
};

export const ChartWithDetailedTotals: Story = {
  args: {
    type: "doughnut",
    backgroundColor: "secondary",
    data: sampleDoughnutData,
    totalsDisplayMode: "detailed",
    title: "Chart with Detailed Totals",
  },
  render: (args) => <Chart {...args} showTooltip={false} />,
};

export const ChartWithNoTotals: Story = {
  args: {
    type: "verticalBar",
    backgroundColor: "success",
    data: sampleBarData,
    totalsDisplayMode: "none",
    title: "Chart with No Totals",
  },
  render: (args) => <Chart {...args} />,
};

export const LineChart: Story = {
  args: {
    type: "line",
    backgroundColor: "primary",
    data: sampleLineData,
    title: "Revenue vs Expenses",
    showVerticalGrid: true,
    showHorizontalGrid: true,
    height: 400,
    width: 700,
    totalsDisplayMode: "simple",
  },
  render: (args) => <Chart {...args} />,
};
