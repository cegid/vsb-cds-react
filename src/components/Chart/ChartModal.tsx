import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import Column from "../Column";
import ChartCore, { ChartCoreProps } from "./ChartCore";
import ChartTotals from "./ChartTotals";
import ChartLegend from "./ChartLegend";
import Row from "../Row";
import Typography from "../Typography";
import IconButton from "../IconButton";
import Icon from "../Icon";
import Box from "../Box";
import { PaletteNames, parseCustomColor } from "../../theme";

interface DetailedTotal {
  label: string;
  total: number;
  datasetIndex: number;
}

interface ChartModalProps {
  open: boolean;
  onClose: () => void;
  chartProps: ChartCoreProps;
  title: string;
  totalValue: number;
  detailedTotals: DetailedTotal[];
  backgroundColor: PaletteNames;
  showDetailedTotals: boolean;
  hiddenDatasets: Set<number>;
  hiddenDataPoints: Set<number>;
  hoveredDataset: number | null;
  filteredChartData: any;
  onToggleDataset: (index: number) => void;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    maxWidth: "70vw",
    maxHeight: "none",
    margin: 0,
    boxShadow: "none !important",
  },
  "& .MuiPaper-root": {
    boxShadow: "none !important",
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(128, 128, 128, 0.8)",
    backdropFilter: "blur(4px)",
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: 0,
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const ChartModal: React.FC<ChartModalProps> = ({
  open,
  onClose,
  chartProps,
  title,
  totalValue,
  detailedTotals,
  backgroundColor,
  showDetailedTotals,
  hiddenDatasets,
  hiddenDataPoints,
  hoveredDataset,
  filteredChartData,
  onToggleDataset,
  onMouseEnter,
  onMouseLeave,
}) => {
  const isPieOrDoughnut =
    chartProps.type === "pie" || chartProps.type === "doughnut";
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth={true}
      PaperProps={{
        sx: {
          background: parseCustomColor(`${backgroundColor}/95`),
          borderRadius: 4,
        },
      }}
    >
      <StyledDialogContent>
        <Box
          px={12}
          py={11}
          borderRadius={4}
          sx={{
            transition: "background-color 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: parseCustomColor(`${backgroundColor}/95`),
            },
          }}
        >
          <Box position="absolute" top={12} right={12}>
            <IconButton
              color="neutral"
              variant="iconOnly"
              square
              onClick={onClose}
            >
              <Icon size={16} variant="solid">
                cancel-01
              </Icon>
            </IconButton>
          </Box>

          <Column p={6} borderRadius={3} gap={6} backgroundColor="white">
            <Typography variant="displaySSemiBold" color="neutral/10">
              {title}
            </Typography>

            <ChartTotals
              showDetailedTotals={showDetailedTotals}
              totalValue={totalValue}
              detailedTotals={detailedTotals}
              chartType={chartProps.type}
              datasets={chartProps.data.datasets}
              hiddenDatasets={hiddenDatasets}
              hiddenDataPoints={hiddenDataPoints}
              hoveredDataset={hoveredDataset}
              onToggleDataset={onToggleDataset}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />

            {!showDetailedTotals && (isPieOrDoughnut ? (
              <Row gap={6} alignItems="center">
                <Box flex={1}>
                  <ChartCore {...chartProps} data={filteredChartData} />
                </Box>
                <Column gap={2} minWidth="200px">
                  <ChartLegend
                    datasets={chartProps.data.datasets}
                    chartType={chartProps.type}
                    hiddenDatasets={
                      isPieOrDoughnut ? hiddenDataPoints : hiddenDatasets
                    }
                    hoveredDataset={hoveredDataset}
                    onToggleDataset={onToggleDataset}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    labels={chartProps.data.labels}
                  />
                </Column>
              </Row>
            ) : (
              <>
                <ChartLegend
                  datasets={chartProps.data.datasets}
                  chartType={chartProps.type}
                  hiddenDatasets={
                    isPieOrDoughnut ? hiddenDataPoints : hiddenDatasets
                  }
                  hoveredDataset={hoveredDataset}
                  onToggleDataset={onToggleDataset}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  labels={chartProps.data.labels}
                />
                <ChartCore {...chartProps} data={filteredChartData} />
              </>
            ))}
            
            {showDetailedTotals && (
              <ChartCore 
                {...chartProps} 
                data={filteredChartData} 
              />
            )}
          </Column>
        </Box>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default ChartModal;
