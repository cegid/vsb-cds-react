import type { Meta, StoryObj } from "@storybook/react-vite";

import Chart, { CustomChartData, ChartAction } from "./Chart";
import Row from "../Row";
import Icon from "../Icon";
import Typography from "../Typography";

const sampleActions: ChartAction[] = [
  {
    label: "Exporter en PDF",
    icon: "file-download-02",
    onClick: () => alert("Export PDF clicked"),
  },
  {
    label: "Copier les données",
    icon: "copy-01",
    onClick: () => alert("Copy data clicked"),
  },
  {
    label: "Partager",
    icon: "share-06",
    onClick: () => alert("Share clicked"),
  },
  {
    label: "Imprimer",
    icon: "printer",
    onClick: () => alert("Print clicked"),
  },
];

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

const sampleMixedData: CustomChartData = {
  labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"],
  datasets: [
    {
      label: "Encaissements",
      data: [600000, 620000, 550000, 700000, 720000, 650000],
      backgroundColor: "primary/60",
      borderColor: "primary/95",
      borderWidth: 0,
      type: "bar",
      yAxisID: "y",
      stack: "Encaissements",
    },
    {
      label: "Prévision Encaissements",
      data: [750000, 780000, 700000, 850000, 900000, 800000],
      backgroundColor: "primary/95",
      borderColor: "primary/95",
      borderWidth: 0,
      type: "bar",
      yAxisID: "y",
      stack: "Encaissements",
    },
    {
      label: "Décaissements",
      data: [450000, 420000, 480000, 500000, 510000, 470000],
      backgroundColor: "secondary/60",
      borderColor: "secondary/95",
      borderWidth: 0,
      type: "bar",
      yAxisID: "y",
      stack: "Décaissements",
    },
    {
      label: "Prévision Décaissements",
      data: [600000, 580000, 620000, 650000, 680000, 630000],
      backgroundColor: "secondary/95",
      borderColor: "secondary/95",
      borderWidth: 0,
      type: "bar",
      yAxisID: "y",
      stack: "Décaissements",
    },
    {
      label: "Solde Net",
      data: [150000, 200000, 70000, 200000, 210000, 180000],
      borderColor: "neutral/60",
      backgroundColor: "white",
      borderWidth: 3,
      type: "line",
      fill: false,
      tension: 0.4,
      yAxisID: "y1",
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
};

const meta = {
  title: "📊 Data and table/Chart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: [
        "verticalBar",
        "horizontalBar",
        "pie",
        "doughnut",
        "line",
        "mixed",
      ],
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
    verticalGridStyle: {
      control: "select",
      options: ["solid", "dashed", "dotted"],
      description: "Style of vertical grid lines: solid (default), dashed [5,5], or dotted [2,2]",
    },
    horizontalGridStyle: {
      control: "select",
      options: ["solid", "dashed", "dotted"],
      description: "Style of horizontal grid lines: solid (default), dashed [5,5], or dotted [2,2]",
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
    moreActions: sampleActions,
  },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MixedChart: Story = {
  args: {
    type: "mixed",
    backgroundColor: "primary",
    data: sampleMixedData,
    title: "Flux de trésorerie avec solde net",
    showVerticalGrid: true,
    showHorizontalGrid: true,
    height: 500,
    width: 800,
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

export const ChartWithActions: Story = {
  args: {
    type: "verticalBar",
    backgroundColor: "primary",
    data: sampleBarData,
    title: "Chart avec actions personnalisées",
    totalsDisplayMode: "detailed",
    moreActions: [
      {
        label: "Exporter en Excel",
        icon: "file-06",
        onClick: () => console.log("Export to Excel"),
      },
      {
        label: "Télécharger en CSV",
        icon: "download-01",
        onClick: () => console.log("Download CSV"),
      },
      {
        label: "Envoyer par email",
        icon: "mail-01",
        onClick: () => console.log("Send by email"),
      },
      {
        label: "Créer un rapport",
        icon: "file-05",
        onClick: () => console.log("Create report"),
      },
      {
        label: "Configurer",
        icon: "settings-01",
        onClick: () => console.log("Configure"),
      },
    ],
  },
  render: (args) => <Chart {...args} />,
};

export const ChartWithFormattedTotals: Story = {
  args: {
    type: "pie",
    backgroundColor: "success",
    data: samplePieData,
    title: "Ventes par région",
    totalsDisplayMode: "simple",
    totalSymbol: "€",
    decimalPlaces: 2,
    compactDisplay: true,
    moreActions: [
      {
        label: "Voir les détails",
        icon: "bar-chart-square-02",
        onClick: () => console.log("View details"),
      },
      {
        label: "Comparer",
        icon: "git-compare",
        onClick: () => console.log("Compare"),
      },
    ],
  },
  render: (args) => <Chart {...args} />,
};

export const ChartWithBadgesSimpleMode: Story = {
  args: {
    type: "verticalBar",
    backgroundColor: "primary",
    data: sampleBarData,
    title: "Chart avec badge en mode simple",
    totalsDisplayMode: "simple",
    totalSymbol: "€",
    compactDisplay: true,
    totalBadges: {
      total: {
        children: (
          <Row gap={1}>
            <Icon size={10} color="primary/60">
              arrow-up-right-01
            </Icon>
            <Typography variant="captionRegular" color="primary/60">
              45%
            </Typography>
          </Row>
        ),
        color: "primary",
        variant: "tonal",
        size: "medium",
      },
    },
  },
  render: (args) => <Chart {...args} />,
};

export const ChartWithBadgesDetailedMode: Story = {
  args: {
    type: "verticalBar",
    backgroundColor: "primary",
    data: sampleBarData,
    title: "Chart avec badges en mode detailed",
    totalsDisplayMode: "detailed",
    totalSymbol: "€",
    compactDisplay: true,
    totalBadges: {
      Sales: {
        children: (
          <Row gap={1}>
            <Icon size={10} color="critical/60">
              arrow-down-right-01
            </Icon>
            <Typography variant="captionRegular" color="critical/60">
              -45%
            </Typography>
          </Row>
        ),
        color: "critical",
        variant: "tonal",
        size: "medium",
      },
      Target: {
        children: (
          <Row gap={1}>
            <Icon size={10} color="critical/60">
              arrow-down-right-01
            </Icon>
            <Typography variant="captionRegular" color="critical/60">
              -45%
            </Typography>
          </Row>
        ),
        color: "critical",
        variant: "tonal",
        size: "medium",
      },
      Marketing: {
        children: (
          <Row gap={1}>
            <Icon size={10} color="primary/60">
              arrow-up-right-01
            </Icon>
            <Typography variant="captionRegular" color="primary/60">
              45%
            </Typography>
          </Row>
        ),
        color: "primary",
        variant: "tonal",
        size: "medium",
      },
      Support: {
        children: (
          <Row gap={1}>
            <Icon size={10} color="critical/60">
              arrow-down-right-01
            </Icon>
            <Typography variant="captionRegular" color="critical/60">
              -45%
            </Typography>
          </Row>
        ),
        color: "critical",
        variant: "tonal",
        size: "medium",
      },
    },
  },
  render: (args) => <Chart {...args} />,
};

const dashedLineData: CustomChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Actual Sales",
      data: [65000, 59000, 80000, 81000, 76000, 85000],
      borderColor: "primary/50",
      backgroundColor: "primary/20",
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
    {
      label: "Forecast",
      data: [70000, 65000, 75000, 85000, 80000, 90000],
      borderColor: "success/50",
      backgroundColor: "transparent",
      borderWidth: 2,
      fill: false,
      tension: 0.4,
      borderDash: [5, 5],
    },
    {
      label: "Target",
      data: [75000, 75000, 75000, 75000, 75000, 75000],
      borderColor: "yellow/50",
      backgroundColor: "transparent",
      borderWidth: 2,
      fill: false,
      tension: 0,
      borderDash: [10, 5],
    },
    {
      label: "Minimum",
      data: [50000, 50000, 50000, 50000, 50000, 50000],
      borderColor: "critical/50",
      backgroundColor: "transparent",
      borderWidth: 2,
      fill: false,
      tension: 0,
      borderDash: [2, 2],
    },
  ],
};

export const DashedLines: Story = {
  args: {
    type: "line",
    data: dashedLineData,
    width: 900,
    height: 400,
    backgroundColor: "neutral",
    title: "Sales with Dashed Lines",
    totalsDisplayMode: "detailed",
    totalSymbol: "€",
    compactDisplay: true,
    moreActions: sampleActions,
    showVerticalGrid: true,
    showHorizontalGrid: true,
    verticalGridStyle: "dotted",
    horizontalGridStyle: "dashed",
  },
  render: (args) => <Chart {...args} />,
};

export const GridStyles: Story = {
  args: {
    type: "line",
    data: sampleLineData,
    width: 900,
    height: 400,
    backgroundColor: "neutral",
    title: "Chart with Grid Styles",
    totalsDisplayMode: "simple",
    totalSymbol: "€",
    compactDisplay: true,
    showVerticalGrid: true,
    showHorizontalGrid: true,
    verticalGridStyle: "dashed",
    horizontalGridStyle: "dotted",
    moreActions: sampleActions,
  },
  render: (args) => <Chart {...args} />,
};
