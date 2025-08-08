import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ChartData } from "chart.js";

import Chart from "./Chart";
import Stack from "../Stack";

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
  },
  args: {
    type: "doughnut",
    height: 400,
  },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleLineData: ChartData<"line"> = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: "#236BF0",
      backgroundColor: "rgba(35, 107, 240, 0.1)",
      tension: 0.4,
    },
    {
      label: "Expenses",
      data: [8000, 12000, 10000, 15000, 14000, 18000],
      borderColor: "#FF6B6B",
      backgroundColor: "rgba(255, 107, 107, 0.1)",
      tension: 0.4,
    },
  ],
};

const sampleBarData: ChartData<"bar"> = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      label: "Sales",
      data: [65000, 59000, 80000, 81000],
      backgroundColor: "#236BF0",
      borderColor: "#1a5bc7",
      borderWidth: 1,
    },
    {
      label: "Target",
      data: [70000, 65000, 75000, 85000],
      backgroundColor: "#28A745",
      borderColor: "#1e7e34",
      borderWidth: 1,
    },
  ],
};

const samplePieData: ChartData<"pie"> = {
  labels: ["Desktop", "Mobile", "Tablet"],
  datasets: [
    {
      data: [55, 35, 10],
      backgroundColor: ["#236BF0", "#28A745", "#FFC107"],
      borderColor: ["#1a5bc7", "#1e7e34", "#e0a800"],
      borderWidth: 2,
    },
  ],
};

const sampleDoughnutData: ChartData<"doughnut"> = {
  labels: ["Product A", "Product B", "Product C", "Product D"],
  datasets: [
    {
      data: [30, 25, 25, 20],
      backgroundColor: ["#236BF0", "#28A745", "#FFC107", "#DC3545"],
      borderColor: ["#1a5bc7", "#1e7e34", "#e0a800", "#c82333"],
      borderWidth: 2,
    },
  ],
};

export const LineChart: Story = {
  args: {
    type: "line",
    data: sampleLineData,
  },
};

export const BarChart: Story = {
  args: {
    type: "bar",
    data: sampleBarData,
  },
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
      <Stack direction="row" spacing={4} flexWrap="wrap" justifyContent="center">
        <Chart type="line" data={sampleLineData} width={400} height={300} />
        <Chart type="bar" data={sampleBarData} width={400} height={300} />
      </Stack>
      <Stack direction="row" spacing={4} flexWrap="wrap" justifyContent="center">
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
    <div style={{ width: "100%", height: "400px", minWidth: "300px" }}>
      <Chart {...args} />
    </div>
  ),
};