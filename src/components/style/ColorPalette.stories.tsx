import {
  Box,
  Divider,
  Grid,
} from '@mui/material';

import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import colorPalettes from '../../../theme/colors';
import Typography from '../Typography/Typography';

interface ColorSampleProps {
  colorName: string;
  colorKey: string;
  colorValue: string;
  textColor?: string;
}

const ColorSample = ({
  colorName,
  colorKey,
  colorValue,
  textColor = '#fff',
}: ColorSampleProps) => {
  return (
    <Box
      sx={{
        backgroundColor: colorValue,
        color: textColor,
        p: 2,
        borderRadius: 0,
        mb: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Typography variant="bodyMSemiBold">{colorName}</Typography>
      <Typography variant="bodySRegular">{colorKey}</Typography>
      <Typography variant="bodySRegular">{colorValue}</Typography>
    </Box>
  );
};

const ColorPaletteSection = ({ paletteName, palette }: { paletteName: string; palette: any }) => (
  <Box sx={{ mb: 5 }}>
    <Typography variant="titleMSemiBold" sx={{ mb: 1, textTransform: 'capitalize' }}>
      {paletteName}
    </Typography>
    <Divider sx={{ mb: 2 }} />
    <Grid container spacing={2}>
      {Object.entries(palette).map(([shade, color]) => {
        const textColor = parseInt(shade) > 70 ? '#000' : '#fff';
        return (
          <Grid item xs={6} sm={4} md={3} lg={2} key={`${paletteName}-${shade}`}>
            <ColorSample
              colorName={`${paletteName} ${shade}`}
              colorKey={`theme.palette.${paletteName}.${shade}`}
              colorValue={color as string}
              textColor={textColor}
            />
          </Grid>
        );
      })}
    </Grid>
  </Box>
);

const ColorDemo = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="titleLSemiBold" sx={{ mb: 1 }}>
        VSB Color Palette
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <ColorPaletteSection paletteName="primary" palette={colorPalettes.primary} />
      <ColorPaletteSection paletteName="secondary" palette={colorPalettes.secondary} />
      <ColorPaletteSection paletteName="neutral" palette={colorPalettes.neutral} />
      <ColorPaletteSection paletteName="success" palette={colorPalettes.success} />
      <ColorPaletteSection paletteName="critical" palette={colorPalettes.critical} />
      <ColorPaletteSection paletteName="yellow" palette={colorPalettes.yellow} />
      <ColorPaletteSection paletteName="banana" palette={colorPalettes.banana} />
      <ColorPaletteSection paletteName="pink" palette={colorPalettes.pink} />
      <ColorPaletteSection paletteName="purple" palette={colorPalettes.purple} />
      <ColorPaletteSection paletteName="plum" palette={colorPalettes.plum} />
      <ColorPaletteSection paletteName="info" palette={colorPalettes.info} />
      <ColorPaletteSection paletteName="beige" palette={colorPalettes.beige} />
    </Box>
  );
};

const meta: Meta = {
  title: 'Theme/Color Palette',
  component: ColorDemo,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof ColorDemo>;

export const Palette: Story = {};