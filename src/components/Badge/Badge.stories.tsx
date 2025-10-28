import type { Meta, StoryObj } from "@storybook/react-vite";
import Badge from "./Badge";
import Box from "../Box";
import Row from "../Row";
import Column from "../Column";
import Typography from "../Typography";
import Icon from "../Icon";

const meta = {
  title: "🌡 Indicators and status/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["tonal", "outlined"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "yellow",
        "critical",
        "neutral",
        "white",
      ],
    },
  },
  args: {
    variant: "outlined",
    size: "medium",
    color: "primary",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Sizes: Story = {
  render: () => (
    <Column gap={20}>
      <Box>
        <Box marginBottom={6}>
          <Typography variant="bodyMSemiBold">small</Typography>
        </Box>
        <Row gap={6} alignItems="center" flexWrap="wrap">
          <Badge size="small" color="primary" />
          <Badge size="small" color="primary">
            1
          </Badge>
          <Badge size="small" color="primary">
            9
          </Badge>
          <Badge size="small" color="secondary" />
          <Badge size="small" color="success">
            !
          </Badge>
          <Badge size="small" color="yellow">
            5
          </Badge>
          <Badge size="small" color="critical">
            X
          </Badge>
          <Badge size="small" color="white" />
          <Badge size="small" color="white">
            9
          </Badge>
        </Row>
      </Box>
      <Box>
        <Box marginBottom={6}>
          <Typography variant="bodyMSemiBold">Medium (Full radius)</Typography>
        </Box>
        <Row gap={6} alignItems="center" flexWrap="wrap">
          <Badge size="medium" variant="outlined" color="primary">
            Badge
          </Badge>
          <Badge size="medium" variant="tonal" color="primary">
            Badge
          </Badge>
          <Badge size="medium" variant="outlined" color="secondary">
            <Row gap={1}>
              <Icon size={10}>add-01</Icon>
              <Typography variant="captionRegular" color="neutral/10">
                3
              </Typography>
            </Row>
          </Badge>
          <Badge size="medium" variant="tonal" color="success">
            Active
          </Badge>
          <Badge size="medium" variant="outlined" color="white">
            White
          </Badge>
        </Row>
      </Box>
      <Box>
        <Box marginBottom={6}>
          <Typography variant="bodyMSemiBold">Large (8px radius)</Typography>
        </Box>
        <Row gap={6} alignItems="center" flexWrap="wrap">
          <Badge size="large" variant="outlined" color="primary">
            Badge
          </Badge>
          <Badge size="large" variant="tonal" color="primary">
            Badge
          </Badge>
          <Badge size="large" variant="outlined" color="secondary">
            <Row gap={1}>
              <Icon size={10}>add-01</Icon>
              <Typography variant="captionRegular" color="neutral/10">
                New
              </Typography>
            </Row>
          </Badge>
          <Badge size="large" variant="tonal" color="critical">
            Error
          </Badge>
          <Badge size="large" variant="outlined" color="white">
            White
          </Badge>
        </Row>
      </Box>
    </Column>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All available sizes: small (circular), medium (full radius), and large (8px radius).",
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <Column gap={20}>
      <Box>
        <Box marginBottom={6}>
          <Typography variant="bodyMSemiBold">Outlined</Typography>
        </Box>
        <Row gap={6} alignItems="center" flexWrap="wrap">
          <Badge variant="outlined" color="primary">
            <Typography variant="captionRegular">Primary</Typography>
          </Badge>
          <Badge variant="outlined" color="secondary">
            <Typography variant="captionRegular">Secondary</Typography>
          </Badge>
          <Badge variant="outlined" color="success">
            <Typography variant="captionRegular">Success</Typography>
          </Badge>
          <Badge variant="outlined" color="yellow">
            <Typography variant="captionRegular">Warning</Typography>
          </Badge>
          <Badge variant="outlined" color="critical">
            <Typography variant="captionRegular">Error</Typography>
          </Badge>
          <Badge variant="outlined" color="neutral">
            <Typography variant="captionRegular">Neutral</Typography>
          </Badge>
          <Badge variant="outlined" color="white">
            <Typography variant="captionRegular">White</Typography>
          </Badge>
        </Row>
      </Box>
      <Box>
        <Box marginBottom={6}>
          <Typography variant="bodyMSemiBold">Tonal</Typography>
        </Box>
        <Row gap={6} alignItems="center" flexWrap="wrap">
          <Badge variant="tonal" color="primary">
            <Typography variant="captionRegular">Primary</Typography>
          </Badge>
          <Badge variant="tonal" color="secondary">
            <Typography variant="captionRegular">Secondary</Typography>
          </Badge>
          <Badge variant="tonal" color="success">
            <Typography variant="captionRegular">Success</Typography>
          </Badge>
          <Badge variant="tonal" color="yellow">
            <Typography variant="captionRegular">Warning</Typography>
          </Badge>
          <Badge variant="tonal" color="critical">
            <Typography variant="captionRegular">Error</Typography>
          </Badge>
          <Badge variant="tonal" color="neutral">
            <Typography variant="captionRegular">Neutral</Typography>
          </Badge>
          <Badge variant="outlined" color="white">
            <Typography variant="captionRegular">White</Typography>
          </Badge>
        </Row>
      </Box>
      <Box>
        <Box marginBottom={6}>
          <Typography variant="bodyMSemiBold">small colors</Typography>
        </Box>
        <Row gap={6} alignItems="center" flexWrap="wrap">
          <Badge size="small" color="primary" />
          <Badge size="small" color="secondary" />
          <Badge size="small" color="success" />
          <Badge size="small" color="yellow" />
          <Badge size="small" color="critical" />
          <Badge size="small" color="neutral" />
          <Badge size="small" color="white" />
          <Badge size="small" color="white">
            1
          </Badge>
        </Row>
      </Box>
    </Column>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All available color variants for outlined, tonal, and small badges.",
      },
    },
  },
};
