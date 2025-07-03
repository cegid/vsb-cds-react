"use client";

import { useMemo } from "react";
import Box from "../Box";
import Button from "../Button";
import Column from "../Column";
import Icon from "../Icon";
import IconButton from "../IconButton";
import Row from "../Row";
import Typography from "../Typography";

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
  /** Primary title text displayed prominently */
  title: string;
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
    backgroundColor: "critical/99",
    borderColor: "critical/30",
    iconColor: "critical/50",
  },
  success: {
    iconName: "checkmark-circle-02",
    backgroundColor: "success/99",
    borderColor: "success/30",
    iconColor: "success/50",
  },
  info: {
    iconName: "information-circle",
    backgroundColor: "primary/99",
    borderColor: "primary/30",
    iconColor: "primary/60",
  },
  warning: {
    iconName: "alert-02",
    backgroundColor: "yellow/99",
    borderColor: "yellow/30",
    iconColor: "yellow/50",
  },
} as const;

const useIsObjectMessage = (message: SnackbarMessage): message is SnackbarObjectMessage => {
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

const ActionButton = ({ action }: { action: SnackbarAction }) => (
  <Button
    variant="tonal"
    color="neutral"
    onClick={action.onClick}
    size="medium"
  >
    {action.label}
  </Button>
);

const SeverityIcon = ({ severity }: { severity: SnackbarSeverity }) => {
  const config = SEVERITY_CONFIG[severity];
  
  return (
    <Box
      width={24}
      height={24}
      backgroundColor={config.backgroundColor}
      borderRadius={2}
      border={{ color: config.borderColor, opacity: 30 }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexShrink={0}
    >
      <Icon size={16} variant="solid" color={config.iconColor}>
        {config.iconName}
      </Icon>
    </Box>
  );
};

const MessageContent = ({ message }: { message: SnackbarMessage }) => {
  const isObjectMessage = useIsObjectMessage(message);
  
  if (isObjectMessage) {
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
  
  return <>{message}</>;
};

/**
 * Snackbar component for displaying temporary messages with optional actions
 * 
 * @example
 * ```tsx
 * <Snackbar
 *   severity="success"
 *   message="Operation completed successfully"
 *   onClose={() => setShowSnackbar(false)}
 *   action={{
 *     label: "Undo",
 *     onClick: () => handleUndo()
 *   }}
 * />
 * ```
 */
const Snackbar = ({
  severity = "success",
  size = "small",
  message,
  action,
  onClose,
}: Readonly<SnackbarProps>) => {
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
          <SeverityIcon severity={severity} />
        </Box>
        <MessageContent message={message} />
      </Row>
      
      <Row justifyContent="flex-end" width="fit-content" gap={4} flex={1}>
        {action && <ActionButton action={action} />}
        {onClose && <CloseButton onClose={onClose} />}
      </Row>
    </Row>
  );
};

export default Snackbar;