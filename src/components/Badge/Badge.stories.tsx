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
      options: ["primary", "critical", "neutral", "white"],
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

export const Variants: Story = {
  render: () => (
    <Column gap={20} p={6} backgroundColor="primary/10" borderRadius={4}>
      <Box>
        <Box marginBottom={6}>
          <Typography variant="bodyMSemiBold" color="white">
            small
          </Typography>
        </Box>
        <Row gap={6} alignItems="center" flexWrap="wrap">
          <Badge size="small" color="primary" />
          <Badge size="small" color="primary">
            1
          </Badge>
          <Badge size="small" color="primary">
            <Icon size={10} color="white">
              add-01
            </Icon>
          </Badge>
          <Badge size="small" color="critical"></Badge>
          <Badge size="small" color="critical">
            8
          </Badge>
          <Badge size="small" color="critical">
            <Icon size={10} color="white">
              alert-02
            </Icon>
          </Badge>
          <Badge size="small" color="neutral" />
          <Badge size="small" color="neutral">
            9
          </Badge>
          <Badge size="small" color="neutral">
            <Icon size={10} color="white">
              settings-01
            </Icon>
          </Badge>
          <Badge size="small" color="white" />
          <Badge size="small" color="white">
            9
          </Badge>
          <Badge size="small" color="white">
            <Icon size={10} color="neutral/50">
              checkmark-circle-02
            </Icon>
          </Badge>
        </Row>
      </Box>
      <Box>
        <Box marginBottom={6}>
          <Typography variant="bodyMSemiBold" color="white">
            Medium (Full radius)
          </Typography>
        </Box>
        <Row gap={6} alignItems="center" flexWrap="wrap">
          <Badge size="medium" variant="outlined" color="primary">
            Badge
          </Badge>
          <Badge size="medium" variant="tonal" color="primary">
            Badge
          </Badge>
          <Badge size="medium" variant="outlined" color="primary">
            <Row gap={2} alignItems="center">
              <Icon size={10} color="primary/60">
                add-01
              </Icon>
              <Typography variant="captionRegular" color="primary/60">
                Badge
              </Typography>
            </Row>
          </Badge>
          <Badge size="medium" variant="outlined" color="neutral">
            Badge
          </Badge>
          <Badge size="medium" variant="tonal" color="neutral">
            Badge
          </Badge>
          <Badge size="medium" variant="outlined" color="neutral">
            <Row gap={2} alignItems="center">
              <Icon size={10} color="neutral/50">
                settings-01
              </Icon>
              <Typography variant="captionRegular" color="neutral/50">
                Badge
              </Typography>
            </Row>
          </Badge>
          <Badge size="medium" variant="outlined" color="critical">
            Badge
          </Badge>
          <Badge size="medium" variant="tonal" color="critical">
            Badge
          </Badge>
          <Badge size="medium" variant="outlined" color="critical">
            <Row gap={2} alignItems="center">
              <Icon size={10} color="critical/60">
                alert-02
              </Icon>
              <Typography variant="captionRegular" color="critical/60">
                Badge
              </Typography>
            </Row>
          </Badge>
          <Badge size="medium" variant="outlined" color="white">
            Badge
          </Badge>
          <Badge size="medium" variant="tonal" color="white">
            Badge
          </Badge>
          <Badge size="medium" variant="outlined" color="white">
            <Row gap={2} alignItems="center">
              <Icon size={10} color="white">
                checkmark-circle-02
              </Icon>
              <Typography variant="captionRegular" color="white">
                Badge
              </Typography>
            </Row>
          </Badge>
        </Row>
      </Box>
      <Box>
        <Box marginBottom={6}>
          <Typography variant="bodyMSemiBold" color="white">
            Large (8px radius)
          </Typography>
        </Box>
        <Row gap={6} alignItems="center" flexWrap="wrap">
          <Badge size="large" variant="outlined" color="primary">
            Badge
          </Badge>
          <Badge size="large" variant="tonal" color="primary">
            Badge
          </Badge>
          <Badge size="large" variant="outlined" color="primary">
            <Row gap={2} alignItems="center">
              <Icon size={10} color="primary/60">
                add-01
              </Icon>
              <Typography variant="captionRegular" color="primary/60">
                Badge
              </Typography>
            </Row>
          </Badge>
          <Badge size="large" variant="outlined" color="neutral">
            Badge
          </Badge>
          <Badge size="large" variant="tonal" color="neutral">
            Badge
          </Badge>
          <Badge size="large" variant="outlined" color="neutral">
            <Row gap={2} alignItems="center">
              <Icon size={10} color="neutral/50">
                settings-01
              </Icon>
              <Typography variant="captionRegular" color="neutral/50">
                Badge
              </Typography>
            </Row>
          </Badge>
          <Badge size="large" variant="outlined" color="critical">
            Badge
          </Badge>
          <Badge size="large" variant="tonal" color="critical">
            Badge
          </Badge>
          <Badge size="large" variant="outlined" color="critical">
            <Row gap={2} alignItems="center">
              <Icon size={10} color="critical/60">
                alert-02
              </Icon>
              <Typography variant="captionRegular" color="critical/60">
                Badge
              </Typography>
            </Row>
          </Badge>
          <Badge size="large" variant="outlined" color="white">
            Badge
          </Badge>
          <Badge size="large" variant="tonal" color="white">
            Badge
          </Badge>
          <Badge size="large" variant="outlined" color="white">
            <Row gap={2} alignItems="center">
              <Icon size={10} color="white">
                checkmark-circle-02
              </Icon>
              <Typography variant="captionRegular" color="white">
                Badge
              </Typography>
            </Row>
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
