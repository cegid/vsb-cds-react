import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "../Box";
import Column from "../Column";
import ChartCore, { ChartCoreProps } from "./ChartCore";
import ChartTotals from "./ChartTotals";
import Row from "../Row";
import Typography from "../Typography";
import IconButton from "../IconButton";
import Icon from "../Icon";

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
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "70vw",
    height: "80vh",
    maxWidth: "none",
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
}) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth={true}
      PaperProps={{ sx: { background: "transparent" } }}
    >
      <StyledDialogContent>
        <Column
          px={11}
          gap={11}
          py={8}
          height="100%"
          width="100%"
          backgroundColor="white"
          borderRadius={5}
        >
          <Row>
            <Typography variant="displaySSemiBold" color="neutral/10" flex={1}>
              {title}
            </Typography>
            <IconButton
              color="neutral"
              variant="tonal"
              square
              onClick={onClose}
            >
              <Icon size={16} variant="solid">
                cancel-01
              </Icon>
            </IconButton>
          </Row>
          <Column
            p={6}
            gap={6}
            padding={2}
            backgroundColor="primary/95"
            borderRadius={4}
            height="100%"
            width="100%"
          >
            <Column
              flex={1}
              minHeight={0}
              height="100%"
              backgroundColor="white"
              borderRadius={3}
              p={8}
              gap={6}
            >
              <ChartTotals
                showDetailedTotals={true}
                totalValue={totalValue}
                detailedTotals={detailedTotals}
                chartType={chartProps.type}
                datasets={chartProps.data.datasets}
              />
              <ChartCore {...chartProps} showTooltip={true} />
            </Column>
          </Column>
        </Column>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default ChartModal;
