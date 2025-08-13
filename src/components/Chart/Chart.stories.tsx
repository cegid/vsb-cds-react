import type { Meta, StoryObj } from "@storybook/react-vite";

import Chart, { CustomChartData } from "./Chart";
import Stack from "../Stack";
import Box from "../Box";
import WarningDecorator from "../../storycomponents/WarningDecorator";

const sampleLineData: CustomChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: "primary/50",
      backgroundColor: "primary/60",
      tension: 0.4,
    },
    {
      label: "Expenses",
      data: [8000, 12000, 10000, 15000, 14000, 18000],
      borderColor: "critical/50",
      backgroundColor: "critical/95",
      tension: 0.4,
    },
  ],
};

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

const samplePieData: CustomChartData = {
  labels: ["Desktop", "Mobile", "Tablet"],
  datasets: [
    {
      data: [55, 35, 10],
      backgroundColor: ["primary/50", "success/50", "yellow/50"],
      borderColor: ["primary/30", "success/30", "yellow/30"],
      borderWidth: 2,
    },
  ],
};

const sampleDoughnutData: CustomChartData = {
  labels: ["Product A", "Product B", "Product C", "Product D"],
  datasets: [
    {
      data: [30, 25, 25, 20],
      backgroundColor: ["primary/50", "success/50", "yellow/50", "critical/50"],
      borderColor: ["primary/30", "success/30", "yellow/30", "critical/30"],
      borderWidth: 2,
    },
  ],
};

const meta = {
  title: "📊 Data Display/Chart",
  component: Chart,
  decorators: [WarningDecorator],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["line", "bar", "pie", "doughnut"],
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
  },
  args: {
    type: "bar",
    showVerticalGrid: false,
    showHorizontalGrid: true,
    showTooltip: true,
    title: "Titre",
    data: sampleBarData,
  },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BarChart: Story = {
  args: {
    type: "bar",
    data: sampleBarData,
  },
  render: (args) => (
    <Box width={600}>
      <Chart {...args} />
    </Box>
  ),
};

export const LineChart: Story = {
  args: {
    type: "line",
    data: sampleLineData,
  },
  render: (args) => (
    <Box width={450}>
      <Chart {...args} />
    </Box>
  ),
};

export const PieChart: Story = {
  args: {
    type: "pie",
    data: samplePieData,
  },
};

export const DoughnutChart: Story = {
  args: {
    type: "doughnut",
    data: sampleDoughnutData,
  },
};

export const AllChartTypes: Story = {
  args: {
    type: "line",
    data: sampleLineData,
  },
  render: () => (
    <Stack direction="column" spacing={4} width="100%" alignItems="center">
      <Stack
        direction="row"
        spacing={4}
        flexWrap="wrap"
        justifyContent="center"
      >
        <Chart type="line" data={sampleLineData} width={400} height={300} />
        <Chart type="bar" data={sampleBarData} width={400} height={300} />
      </Stack>
      <Stack
        direction="row"
        spacing={4}
        flexWrap="wrap"
        justifyContent="center"
      >
        <Chart type="pie" data={samplePieData} width={300} height={300} />
        <Chart
          type="doughnut"
          data={sampleDoughnutData}
          width={300}
          height={300}
        />
      </Stack>
    </Stack>
  ),
};

export const CustomOptions: Story = {
  args: {
    type: "line",
    data: sampleLineData,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Monthly Revenue vs Expenses",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        legend: {
          position: "bottom",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return "$" + (value as number).toLocaleString();
            },
          },
        },
      },
    },
  },
};

export const Responsive: Story = {
  args: {
    type: "bar",
    data: sampleBarData,
  },
  render: (args) => (
    <div style={{ width: "450px", height: "400px" }}>
      <Chart {...args} />
    </div>
  ),
};
