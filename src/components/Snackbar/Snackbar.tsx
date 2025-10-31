"use client";

import React, { useMemo } from "react";
import Box from "../Box";
import Icon from "../Icon";
import Row from "../Row";
import Typography from "../Typography";
import { neutral } from "@cegid/vsb-cds-tokens";

/**
 * Represents an action button that can be displayed in the snackbar
 */
export interface SnackbarAction {
  /** Function to execute when the action button is clicked */
  onClick: () => void;
  /** Text label to display on the action button */
  label: string;
}

/**
 * Available severity levels for the snackbar, each with its own visual styling
 */
export type SnackbarSeverity = "error" | "success" | "warning" | "info";

/**
 * Size variants for the snackbar component
 */
export type SnackbarSize = "small" | "large";

/**
 * Object structure for complex messages with title and content
 */
export interface SnackbarObjectMessage {
  /**
   * Primary title text displayed prominently
   * @deprecated This field is no longer used
   */
  title?: string;
  /** Secondary message content, can be any React node */
  message: React.ReactNode;
}

/**
 * Union type for snackbar message content - can be simple React node or structured object
 */
export type SnackbarMessage = React.ReactNode | SnackbarObjectMessage;

/**
 * Props for the Snackbar component
 */
export interface SnackbarProps {
  /** Visual severity level affecting icon and colors. Defaults to "success" */
  severity?: SnackbarSeverity;
  /** Size variant of the snackbar. Defaults to "small" */
  size?: SnackbarSize;
  /** Optional action button configuration */
  action?: SnackbarAction;
  /** Optional close button handler - if provided, shows close button */
  onClose?: () => void;
  /** Message content to display - can be simple text/node or structured object */
  message: SnackbarMessage;
}

const SEVERITY_CONFIG = {
  error: {
    iconName: "spam",
    iconColor: "critical/60",
  },
  success: {
    iconName: "checkmark-circle-02",
    iconColor: "success/60",
  },
  info: {
    iconName: "information-circle",
    iconColor: "primary/60",
  },
  warning: {
    iconName: "alert-02",
    iconColor: "yellow/60",
  },
} as const;

const useIsObjectMessage = (
  message: SnackbarMessage
): message is SnackbarObjectMessage => {
  return useMemo(() => {
    return (
      typeof message === "object" &&
      message !== null &&
      "title" in message &&
      "message" in message
    );
  }, [message]);
};

const CloseButton = ({ onClose }: { onClose: () => void }) => (
  <Box
    p="8px"
    onClick={onClose}
    display="flex"
    alignItems="center"
    sx={{
      cursor: "pointer",
    }}
  >
    <Icon color="white" size={14}>
      cancel-01
    </Icon>
  </Box>
);

const ActionButton = ({ action }: { action: SnackbarAction }) => (
  <Box
    p="8px"
    display="flex"
    alignItems="center"
    sx={{
      cursor: "pointer",
      lineHeight: 1,
    }}
    onClick={action.onClick}
  >
    <Typography variant="bodySSemiBold" color="white" pt={"1px"}>
      {action.label}
    </Typography>
  </Box>
);

const SeverityIcon = ({ severity }: { severity: SnackbarSeverity }) => {
  const config = SEVERITY_CONFIG[severity];
  return (
    <Box display="flex">
      <Icon size={16} variant="solid" color={config.iconColor}>
        {config.iconName}
      </Icon>
    </Box>
  );
};

const MessageContent = ({ message }: { message: SnackbarMessage }) => {
  const isObjectMessage = useIsObjectMessage(message);

  const ellipsisStyles = {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  if (isObjectMessage) {
    return (
      <Typography
        color="white"
        variant="captionRegular"
        sx={ellipsisStyles}
      >
        {message.message}
      </Typography>
    );
  }

  if (typeof message === "string") {
    return (
      <Typography
        color="white"
        variant="bodySMedium"
        sx={ellipsisStyles}
      >
        {message}
      </Typography>
    );
  }

  return (
    <Box sx={ellipsisStyles}>
      {message}
    </Box>
  );
};

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  ({ severity = "success", size = "small", message, action, onClose }, ref) => {
    return (
      <Row
        ref={ref}
        backgroundColor="neutral/10"
        px="8px"
        py="12px"
        borderRadius={2}
        maxWidth={350}
        gap="8px"
        alignItems="center"
        boxShadow={`0 0 25px 0 ${neutral[95]}`}
      >
        <SeverityIcon severity={severity} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <MessageContent message={message} />
        </Box>
        {action && <ActionButton action={action} />}
        {onClose && <CloseButton onClose={onClose} />}
      </Row>
    );
  }
);

Snackbar.displayName = "Snackbar";

export default Snackbar;
