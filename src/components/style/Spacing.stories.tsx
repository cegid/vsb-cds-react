import { Divider, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Box from '../Box';
import Stack from '../Stack';
import Typography from '../Typography';

const SpacingVisualization = () => {
  const theme = useTheme();

  const smallSpacings = [0, 1, 2, 3, 4];
  const mediumSpacings = [5, 6, 7, 8];
  const largeSpacings = [9, 10, 11, 12, 13];

  const getLabel = (value: number) => {
    if (value === 0) return '0';
    if (value === 1) return '2px';
    if (value === 2) return '4px';
    if (value === 3) return '6px';
    if (value === 4) return '8px';
    if (value === 5) return '12px';
    if (value === 6) return '16px';
    if (value === 7) return '20px';
    if (value === 8) return '24px';
    if (value === 9) return '32px';
    if (value === 10) return '40px';
    if (value === 11) return '48px';
    if (value === 12) return '64px';
    if (value === 13) return '80px';
    return `${value}`;
  };

  const SpacingExample = ({ value, label }: { value: number; label: string }) => {
    const spacingValue = theme.spacing(value);

    return (
      <Box mb={3}>
        <Typography variant="bodyMRegular" mb={3}>
          {label}: <code>spacing({value})</code> = <code>{spacingValue}</code>
        </Typography>
        <Paper
          elevation={0}
          sx={{
            height: 24,
            width: value === 0 ? 0 : spacingValue,
            bgcolor: 'secondary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            borderRadius: 1,
          }}
        >
          {value}
        </Paper>
      </Box>
    );
  };

  return (
    <Box maxWidth={800}>
      <Typography variant="titleLSemiBold" mb={3}>
        Spacing System
      </Typography>

      <Box mb={6}>
        <Typography variant="titleLSemiBold" mb={2}>
          Small Spacings
        </Typography>
        <Box pl={2}>
          {smallSpacings.map((value) => (
            <SpacingExample key={value} value={value} label={getLabel(value)} />
          ))}
        </Box>
      </Box>

      <Divider sx={{ mb: 6 }} />

      <Box mb={6}>
        <Typography variant="titleLSemiBold" mb={2}>
          Medium Spacings
        </Typography>
        <Box pl={2}>
          {mediumSpacings.map((value) => (
            <SpacingExample key={value} value={value} label={getLabel(value)} />
          ))}
        </Box>
      </Box>

      <Divider sx={{ mb: 6 }} />

      <Box mb={6} >
        <Typography variant="titleLSemiBold" mb={2}>
          Large Spacings
        </Typography>
        <Box pl={2}>
          {largeSpacings.map((value) => (
            <SpacingExample key={value} value={value} label={getLabel(value)} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const SpacingUsage = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="titleLRegular">Usage Examples in sx</Typography>

      <Box>
        <Typography variant="bodyMRegular" mb={1}>
          Margins with <code>m: 4</code> (8px)
        </Typography>
        <Paper sx={{ bgcolor: 'grey.100', p: 2 }}>
          <Box
            m={4}
            backgroundColor='primary/50'
            width={100}
            height={100}
            display='flex'
            alignItems="center"
            justifyContent="center"
            sx={{
              color: 'white',
            }}
          >
            m: 4
          </Box>
        </Paper>
      </Box>

      <Box>
        <Typography variant="bodyMRegular" mb={1}>
          Padding with <code>p: 6</code> (16px)
        </Typography>
        <Box
          backgroundColor='primary/50'
          display="inline-block"
          sx={{
            color: 'white'
          }}
        >
          <Box
            backgroundColor="primary/50"
            padding={6}
          >
            Content with p: 6
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography variant="bodyMRegular" marginBottom={1}>
          Horizontal spacing with <code>ml: 9</code> (32px) and <code>mr: 5</code> (12px)
        </Typography>
        <Paper sx={{ bgcolor: 'grey.100', p: 2, display: 'flex', alignItems: 'center' }}>
          <Box
            width={50}
            height={50}
            backgroundColor='critical/40'
          />
          <Box
            width={50}
            height={50}
            backgroundColor='primary/50'
            ml={9}
          />
          <Box
            width={50}
            height={50}
            backgroundColor='success/50'
            ml={5}
          />
        </Paper>
      </Box>

      <Box>
        <Typography variant="bodyMRegular" mb={1}>
          Vertical spacing with <code>mt: 7</code> (20px) and <code>mb: 11</code> (48px)
        </Typography>
        <Paper sx={{ bgcolor: 'grey.100', p: 2 }}>
          <Box
            width={100}
            height={20}
            backgroundColor='primary/50'
          />
          <Box
            backgroundColor='secondary/50'
            width={100}
            height={20}
            mt={7}
          />
          <Box
            backgroundColor='plum/50'
            width={100}
            height={20}
            mt={11}
          />
        </Paper>
      </Box>

      <Box>
        <Typography variant="bodyMRegular" mb={1}>
          Gap in a Grid with <code>gap: 8</code> (24px)
        </Typography>
        <Box
          gap={8}
          display={"grid"}
          gridTemplateColumns={'repeat(3, 1fr)'}
          backgroundColor='neutral/90'
          padding={2}
        >
          {[...Array(6)].map((_, index) => (
            <Box
              key={index}
              height={50}
              borderRadius={1}
              backgroundColor='primary/50'
              display='flex'
              alignItems="center"
              justifyContent="center"
              sx={{
                color: 'white',
              }}
            >
              Item {index + 1}
            </Box>
          ))}
        </Box>
      </Box>
    </Stack>
  );
};

const DetailedSpacingUsage = () => {
  return (
    <Box maxWidth={800}>
      <Typography variant="titleLSemiBold">
        Spacing Usage Guide in sx
      </Typography>

      <Paper sx={{ p: 4, mb: 6 }}>
        <Typography variant="titleLSemiBold">
          Basic Syntax
        </Typography>

        <Box mb={3}>
          <Typography variant="bodyMRegular" mb={2}>
            <strong>Format:</strong> <code>property: value</code>
          </Typography>

          <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100' }}>
            <code>{`m={4} // margin of 8px (4 = index in the spacing array)`}</code>
          </Paper>
        </Box>

        <Stack spacing={3}>
          <Box>
            <Typography variant="bodyMSemiBold">
              Available Properties:
            </Typography>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <th align="left" style={{ padding: '8px' }}>
                    Property
                  </th>
                  <th align="left" style={{ padding: '8px' }}>
                    Description
                  </th>
                  <th align="left" style={{ padding: '8px' }}>
                    Example
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>
                    <code>m</code>
                  </td>
                  <td style={{ padding: '8px' }}>Margin on all sides</td>
                  <td style={{ padding: '8px' }}>
                    <code>m: 2</code> = 4px
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>
                    <code>mx</code>
                  </td>
                  <td style={{ padding: '8px' }}>Horizontal margin (left and right)</td>
                  <td style={{ padding: '8px' }}>
                    <code>mx: 3</code> = 6px
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>
                    <code>my</code>
                  </td>
                  <td style={{ padding: '8px' }}>Vertical margin (top and bottom)</td>
                  <td style={{ padding: '8px' }}>
                    <code>my: 5</code> = 12px
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>
                    <code>mt</code>
                  </td>
                  <td style={{ padding: '8px' }}>Top margin</td>
                  <td style={{ padding: '8px' }}>
                    <code>mt: 6</code> = 16px
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>
                    <code>mb</code>
                  </td>
                  <td style={{ padding: '8px' }}>Bottom margin</td>
                  <td style={{ padding: '8px' }}>
                    <code>mb: 9</code> = 32px
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>
                    <code>ml</code>
                  </td>
                  <td style={{ padding: '8px' }}>Left margin</td>
                  <td style={{ padding: '8px' }}>
                    <code>ml: 4</code> = 8px
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>
                    <code>mr</code>
                  </td>
                  <td style={{ padding: '8px' }}>Right margin</td>
                  <td style={{ padding: '8px' }}>
                    <code>mr: 7</code> = 20px
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>
                    <code>p</code>
                  </td>
                  <td style={{ padding: '8px' }}>Padding on all sides</td>
                  <td style={{ padding: '8px' }}>
                    <code>p: 6</code> = 16px
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>
                    <code>px</code>
                  </td>
                  <td style={{ padding: '8px' }}>Horizontal padding</td>
                  <td style={{ padding: '8px' }}>
                    <code>px: 8</code> = 24px
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>
                    <code>py</code>
                  </td>
                  <td style={{ padding: '8px' }}>Vertical padding</td>
                  <td style={{ padding: '8px' }}>
                    <code>py: 2</code> = 4px
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>
                    <code>pt</code>
                  </td>
                  <td style={{ padding: '8px' }}>Top padding</td>
                  <td style={{ padding: '8px' }}>
                    <code>pt: 5</code> = 12px
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>
                    <code>pb</code>
                  </td>
                  <td style={{ padding: '8px' }}>Bottom padding</td>
                  <td style={{ padding: '8px' }}>
                    <code>pb: 6</code> = 16px
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>
                    <code>pl</code>
                  </td>
                  <td style={{ padding: '8px' }}>Left padding</td>
                  <td style={{ padding: '8px' }}>
                    <code>pl: 9</code> = 32px
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '8px' }}>
                    <code>pr</code>
                  </td>
                  <td style={{ padding: '8px' }}>Right padding</td>
                  <td style={{ padding: '8px' }}>
                    <code>pr: 3</code> = 6px
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>

          <Box>
            <Typography variant="bodyMSemiBold">
              Advanced Properties:
            </Typography>

            <Stack spacing={1} mb={2}>
              <Box>
                <code>gap: 4</code> - Space between elements in flex/grid (8px)
              </Box>
              <Box>
                <code>rowGap: 2</code> - Vertical space between rows (4px)
              </Box>
              <Box>
                <code>columnGap: 6</code> - Horizontal space between columns (16px)
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Paper>

      <Paper sx={{ p: 4 }}>
        <Typography variant="titleLSemiBold" mb={3}>
          Best Practices
        </Typography>

        <Stack spacing={2}>
          <Box>
            <Typography variant="bodyMSemiBold">
              1. Prefer System Values
            </Typography>
            <Typography variant="bodyMRegular">
              Always use the indices of the spacing system rather than arbitrary values to maintain
              consistency.
            </Typography>
            <Box display="flex" mt={2}>
              <Box flex={1}>
                <Typography variant="bodySSemiBold" color='success/50'>
                  ✓ CORRECT
                </Typography>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100' }}>
                  <code>{`<Box mt={4} />`}</code>
                </Paper>
              </Box>
              <Box flex={1} ml={2}>
                <Typography variant="bodySSemiBold" color='critical/40'>
                  ✗ INCORRECT
                </Typography>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100' }}>
                  <code>{`<Box sx={{ marginTop: '8px' }} />`}</code>
                </Paper>
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography variant="bodyMSemiBold">
              2. Use Shortcuts
            </Typography>
            <Typography variant="bodyMRegular">
              Shortcuts like <code>mx</code>, <code>my</code>, <code>px</code>, <code>py</code>
              allow you to apply the same spacing horizontally or vertically.
            </Typography>
            <Box display='flex' mt={2}>
              <Box flex={1}>
                <Typography variant="bodySSemiBold" color='success/50'>
                  ✓ CORRECT
                </Typography>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100' }}>
                  <code>{`<Box mx={4} />`}</code>
                </Paper>
              </Box>
              <Box flex={1} ml={2} >
                <Typography variant="bodySSemiBold" color="critical/40">
                  ✗ LESS OPTIMAL
                </Typography>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100' }}>
                  <code>{`<Box sx={{ ml: 4, mr: 4 }} />`}</code>
                </Paper>
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography variant="bodyMSemiBold">
              3. Use Flexbox and Grid with Spacing
            </Typography>
            <Typography variant="bodyMRegular">
              Combine <code>gap</code>, <code>rowGap</code> and <code>columnGap</code> properties
              with flexbox and grid for cleaner layouts.
            </Typography>
            <Box display={"flex"} mt={2}>
              <Box flex={1}>
                <Typography variant="bodySSemiBold" color='success/50'>
                  ✓ CORRECT
                </Typography>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100' }}>
                  <code>{`<Stack spacing={2}>\n  <Item />\n  <Item />\n</Stack>`}</code>
                </Paper>
              </Box>
              <Box flex={1} ml={2}>
                <Typography variant="bodySSemiBold" color='critical/40'>
                  ✗ LESS OPTIMAL
                </Typography>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100' }}>
                  <code>{`<Box>\n  <Item />\n  <Item sx={{ mt: 2 }} />\n</Box>`}</code>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export const SpacingScale: StoryObj = {
  render: () => <SpacingVisualization />,
};

export const SpacingExamples: StoryObj = {
  render: () => <SpacingUsage />,
};

export const SpacingDetailedGuide: StoryObj = {
  render: () => <DetailedSpacingUsage />,
};

export default {
  title: 'Theme/Spacing',
  parameters: {
    layout: 'padded',
  },
} as Meta;
