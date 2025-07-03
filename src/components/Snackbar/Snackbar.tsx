"use client";

import Box from "../Box";
import Button from "../Button";
import Column from "../Column";
import Icon from "../Icon";
import IconButton from "../IconButton";
import Row from "../Row";
import Typography from "../Typography";

export interface SnackbarAction {
  onClick: () => void;
  label: string;
}

export type SnackbarSeverity = "error" | "success" | "warning" | "info";
export type SnackbarSize = "small" | "large";

export type SnackbarMessage = React.ReactNode | SnackbarObjectMessage;

export interface SnackbarObjectMessage {
  title: string;
  message: React.ReactNode;
}
export interface SnackbarProps {
  severity?: SnackbarSeverity;
  size?: SnackbarSize;
  action?: SnackbarAction;
  onClose?: () => void;
  message: SnackbarMessage;
}

const getOncloseAction = (onClose: () => void) => {
  return (
    <IconButton
      variant="tonal"
      square
      color="neutral"
      size="small"
      onClick={onClose}
    >
      <Icon size={14}>cancel-01</Icon>
    </IconButton>
  );
};

const getActions = (action: SnackbarAction) => {
  return (
    <Button
      variant="tonal"
      color="neutral"
      onClick={action.onClick}
      size="medium"
    >
      {action.label}
    </Button>
  );
};

const getMessage = (message: SnackbarMessage) => {
  if (
    typeof message === "object" &&
    message !== null &&
    "title" in message &&
    "message" in message
  ) {
    return (
      <Column>
        <Typography color="neutral/50" variant="bodySMedium">
          {message.title}
        </Typography>
        <Typography color="neutral/50" variant="captionRegular">
          {message.message}
        </Typography>
      </Column>
    );
  }

  return message;
};

const getIcon = (severity: SnackbarSeverity) => {
  switch (severity) {
    case "error":
      return (
        <Box
          width={24}
          height={24}
          backgroundColor="critical/99"
          borderRadius={2}
          border={{ color: "critical/30", opacity: 30 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexShrink={0}
        >
          <Icon size={16} variant="solid" color="critical/50">
            spam
          </Icon>
        </Box>
      );
    case "success":
      return (
        <Box
          width={24}
          height={24}
          backgroundColor="success/99"
          borderRadius={2}
          border={{ color: "success/30", opacity: 30 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexShrink={0}
        >
          <Icon size={16} variant="solid" color="success/50">
            checkmark-circle-02
          </Icon>
        </Box>
      );
    case "info":
      return (
        <Box
          width={24}
          height={24}
          backgroundColor="primary/99"
          borderRadius={2}
          border={{ color: "primary/30", opacity: 30 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexShrink={0}
        >
          <Icon size={16} variant="solid" color="primary/60">
            information-circle
          </Icon>
        </Box>
      );
    case "warning":
      return (
        <Box
          width={24}
          height={24}
          backgroundColor="yellow/99"
          borderRadius={2}
          border={{ color: "yellow/30", opacity: 30 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexShrink={0}
        >
          <Icon size={16} variant="solid" color="yellow/50">
            alert-02
          </Icon>
        </Box>
      );
    default:
      return undefined;
  }
};

const Snackbar = (props: Readonly<SnackbarProps>) => {
  const {
    severity = "success",
    size = "small",
    message,
    action,
    onClose,
  } = props;
  return (
    <Row
      backgroundColor="white"
      flexWrap="wrap"
      px={4}
      py={4}
      borderRadius={2}
      maxWidth={350}
      gap={4}
      alignItems="center"
      sx={{
        whiteSpace: "normal",
        wordBreak: "break-word",
      }}
    >
      <Row gap={4} alignItems="center" width="fit-content">
        <Box height="100%" display="flex" alignSelf="flex-start">
          {getIcon(severity)}
        </Box>
        {getMessage(message)}
      </Row>
      <Row justifyContent="flex-end" width="fit-content" gap={4} flex={1}>
        {action && getActions(action)}
        {onClose && getOncloseAction(onClose)}
      </Row>
    </Row>
  );
};

export default Snackbar;
