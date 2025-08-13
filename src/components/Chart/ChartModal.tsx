import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "../Box";
import Column from "../Column";
import ChartCore, { ChartCoreProps } from "./ChartCore";

interface ChartModalProps {
  open: boolean;
  onClose: () => void;
  chartProps: ChartCoreProps;
  title: string;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "60vw",
    height: "60vh",
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
}) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth={false}
      PaperProps={{ sx: { background: "transparent" } }}
    >
      <StyledDialogContent>
        <Column
          p={6}
          gap={6}
          height="100%"
          padding={2}
          backgroundColor="primary/95"
          borderRadius={4}
        >
          <Box
            flex={1}
            minHeight={0}
            height="100%"
            backgroundColor="white"
            borderRadius={3}
          >
            <ChartCore {...chartProps} showTooltip={true} />
          </Box>
        </Column>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default ChartModal;
