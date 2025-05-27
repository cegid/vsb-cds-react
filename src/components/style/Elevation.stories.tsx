// ElevationDemo.stories.tsx
import { Card, Divider, Grid, Paper } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";

import { ELEVATION, ELEVATION_CSS } from "../../theme/shadows";
import Typography from "../Typography";
import Box from "../Box";

interface ElevationCardProps {
  level: number;
  name: string;
  cssValue: string;
}

const ElevationCard = ({ level, name, cssValue }: ElevationCardProps) => (
  <Paper
    elevation={level}
    sx={{
      p: 3,
      mb: 2,
      height: "100%",
      borderRadius: 0,
    }}
  >
    <Typography variant="titleLSemiBold">{name}</Typography>
    <Box p={2} backgroundColor="neutral/95" mb={2} mt={2}>
      <Typography variant="bodySRegular">{cssValue}</Typography>
    </Box>
    <Typography variant="bodySSemiBold" color="primary/50">
      elevation={level}
    </Typography>
  </Paper>
);

const ElevationExamples = () => {
  return (
    <Box mb={6}>
      <Typography variant="titleLSemiBold" mb={2}>
        Examples of Using Elevations
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="titleLSemiBold" sx={{ mb: 2 }}>
            Cards with Different Elevations
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            <Card
              elevation={ELEVATION.LEVEL_1}
              sx={{
                width: 180,
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 0,
              }}
            >
              <Typography variant="bodyMSemiBold">Elevation 1</Typography>
            </Card>
            <Card
              elevation={ELEVATION.LEVEL_2}
              sx={{
                width: 180,
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 0,
              }}
            >
              <Typography variant="bodyMSemiBold">Elevation 2</Typography>
            </Card>
            <Card
              elevation={ELEVATION.LEVEL_3}
              sx={{
                width: 180,
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 0,
              }}
            >
              <Typography variant="bodyMSemiBold">Elevation 3</Typography>
            </Card>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="titleLSemiBold" sx={{ mb: 2 }}>
            Using CSS boxShadow Property
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            <Box
              width={180}
              height={120}
              backgroundColor="white"
              boxShadow={ELEVATION_CSS.LEVEL_2}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="bodyMSemiBold">boxShadow Level 2</Typography>
            </Box>
            <Box
              width={180}
              height={120}
              backgroundColor="white"
              boxShadow={ELEVATION_CSS.LEVEL_4}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="bodyMSemiBold">boxShadow Level 4</Typography>
            </Box>
            <Box
              width={180}
              height={120}
              backgroundColor="white"
              boxShadow={ELEVATION_CSS.LEVEL_6}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="bodyMSemiBold">boxShadow Level 6</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const SxExamples = () => (
  <Box mb={6}>
    <Typography variant="titleLSemiBold" mb={2}>
      Code Examples Using the sx Property
    </Typography>
    <Divider sx={{ mb: 3 }} />

    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Typography variant="titleLSemiBold" mb={2}>
          Using Elevation
        </Typography>
        <Paper sx={{ p: 3, borderRadius: 0 }}>
          <Typography variant="bodyMSemiBold" mb={2}>
            With elevation (MUI property)
          </Typography>
          <Box component="pre" p={2} backgroundColor="neutral/95" mb={3}>
            {`<Paper elevation={ELEVATION.LEVEL_2}>
  Content with elevation 2
</Paper>

// or with a direct number
<Card elevation={2}>
  Card content
</Card>`}
          </Box>

          <Typography variant="bodyMSemiBold" mb={2}>
            With boxShadow (sx property)
          </Typography>
          <Box component="pre" p={2} backgroundColor="neutral/95" mb={3}>
            {`<Box sx={{ 
  boxShadow: ELEVATION_CSS.LEVEL_3,
  // other sx properties
}}>
  Content with CSS shadow level 3
</Box>`}
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="titleLSemiBold" mb={2}>
          Common Use Cases
        </Typography>
        <Paper sx={{ p: 3, borderRadius: 0 }}>
          <Typography variant="bodyMSemiBold" mb={2}>
            Card Component with Elevation
          </Typography>
          <Box component="pre" p={2} backgroundColor="neutral/95" mb={3}>
            {`// Usage with a Card component
<Card 
  elevation={ELEVATION.LEVEL_2}
  sx={{
    borderRadius: 0
  }}
>
  Card content
</Card>`}
          </Box>

          <Typography variant="bodyMSemiBold" mb={2}>
            Box Component with boxShadow
          </Typography>
          <Box component="pre" p={2} backgroundColor="neutral/95" mb={3}>
            {`// Usage with any div/Box
<Box
  sx={{
    boxShadow: ELEVATION_CSS.LEVEL_3,
    p: 2,
    borderRadius: 0
  }}
>
  Container content
</Box>`}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

const ElevationDemo = () => {
  return (
    <Box p={3}>
      <Typography variant="titleLSemiBold" mb={1}>
        VSB Elevations
      </Typography>

      <Divider sx={{ mb: 4 }} />
      <Box mb={6}>
        <Typography variant="titleLSemiBold" mb={1}>
          Available Elevation Levels
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <ElevationCard
              level={ELEVATION.LEVEL_0}
              name="LEVEL_0"
              cssValue={ELEVATION_CSS.LEVEL_0}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ElevationCard
              level={ELEVATION.LEVEL_1}
              name="LEVEL_1"
              cssValue={ELEVATION_CSS.LEVEL_1}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ElevationCard
              level={ELEVATION.LEVEL_2}
              name="LEVEL_2"
              cssValue={ELEVATION_CSS.LEVEL_2}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ElevationCard
              level={ELEVATION.LEVEL_3}
              name="LEVEL_3"
              cssValue={ELEVATION_CSS.LEVEL_3}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ElevationCard
              level={ELEVATION.LEVEL_4}
              name="LEVEL_4"
              cssValue={ELEVATION_CSS.LEVEL_4}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ElevationCard
              level={ELEVATION.LEVEL_5}
              name="LEVEL_5"
              cssValue={ELEVATION_CSS.LEVEL_5}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ElevationCard
              level={ELEVATION.LEVEL_6}
              name="LEVEL_6"
              cssValue={ELEVATION_CSS.LEVEL_6}
            />
          </Grid>
        </Grid>
      </Box>
      <ElevationExamples />
      <SxExamples />
    </Box>
  );
};

const meta: Meta = {
  title: "Theme/Elevation Usage",
  component: ElevationDemo,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof ElevationDemo>;

export const Usage: Story = {};
