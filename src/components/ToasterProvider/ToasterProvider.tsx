"use client";

import * as React from "react";
import {
  SnackbarProvider,
  useSnackbar,
  SnackbarKey,
  SnackbarProps,
} from "notistack";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "../Slide";
import Icon from "../Icon";
import Snackbar, {
  SnackbarAction,
  SnackbarMessage,
  SnackbarObjectMessage,
  SnackbarSeverity,
} from "../Snackbar/Snackbar";

const MAX = 3;

/**
 * Props for the slide transition component
 */
interface SlideTransitionProps extends TransitionProps {
  children: React.ReactElement;
}

/**
 * Slide transition component for snackbar animations
 */
function SlideTransition(props: Readonly<SlideTransitionProps>) {
  return <Slide {...props} />;
}

/**
 * Options for configuring toaster behavior
 */
export interface ToasterOptions {
  /** Severity level of the notification */
  severity?: SnackbarSeverity;
  /** Custom icon to display */
  icon?: React.ReactElement<typeof Icon>;
  /** Action button configuration */
  action?: SnackbarAction;
  /** Callback when notification is closed */
  onClose?: () => void;
}

/**
 * Context value for managing toaster state
 */
interface StackContextValue {
  display: (
    message: SnackbarMessage,
    options: ToasterOptions,
    severity?: SnackbarSeverity
  ) => SnackbarKey;
  close: (key: SnackbarKey) => void;
}

/**
 * Context for toaster functionality
 */
const StackContext = React.createContext<StackContextValue>({
  display: () => -1,
  close: () => {},
});

/**
 * Provider component that manages toaster state and queue
 */
const StackContextProvider = (props: React.PropsWithChildren) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const keysOnScreen = React.useRef<SnackbarKey[]>([]);
  const stackRef = React.useRef<Function[]>([]);

  /**
   * Consumes the next notification from the queue if under the limit
   */
  const consume = () => {
    if (keysOnScreen.current.length < MAX) {
      const first = stackRef.current.shift();
      first && first();
    }
  };

  /**
   * Handles closing a notification
   */
  const handleClose = (key: SnackbarKey, onClose?: () => void) => () => {
    // Weird error in notistack when calling closeSnackbar sync.
    setTimeout(() => {
      close(key);
      onClose && onClose();
    });
  };

  /**
   * Closes a specific notification
   */
  const close = (key: SnackbarKey) => {
    closeSnackbar(key);
    const index = keysOnScreen.current.indexOf(key);
    if (index > -1) {
      keysOnScreen.current.splice(index, 1);
    }
    consume();
  };

  /**
   * Type guard to check if message is an object message
   */
  const isMessageObject = (
    message: SnackbarMessage
  ): message is SnackbarObjectMessage => {
    return (
      typeof message === "object" &&
      message !== null &&
      "title" in message &&
      "message" in message
    );
  };

  /**
   * Displays a new notification
   */
  const display = (
    message: SnackbarMessage,
    {
      action,
      onClose,
      severity: optionsSeverity,
      ...options
    }: ToasterOptions = {},
    severity: SnackbarSeverity = "info"
  ): SnackbarKey => {
    const key = new Date().getTime() + Math.random();
    const finalSeverity = optionsSeverity || severity;

    const doDisplay = () => {
      enqueueSnackbar("", {
        key,
        persist: true,
        content: (key) => (
          <Snackbar
            message={message}
            action={action}
            onClose={onClose ? handleClose(key, onClose) : undefined}
            severity={finalSeverity}
          />
        ),
      });
      keysOnScreen.current.push(key);
    };

    keysOnScreen.current.length < MAX
      ? doDisplay()
      : stackRef.current.push(doDisplay);

    return key;
  };

  return <StackContext.Provider value={{ display, close }} {...props} />;
};

/**
 * Hook to access toaster functionality
 */
export const useToaster = () => {
  const { display, close } = React.useContext(StackContext);

  const displayInfo = React.useCallback(
    (message: SnackbarMessage, options: ToasterOptions = {}) =>
      display(message, options, "info"),
    [display]
  );

  const displaySuccess = React.useCallback(
    (message: SnackbarMessage, options: ToasterOptions = {}) =>
      display(message, options, "success"),
    [display]
  );

  const displayWarning = React.useCallback(
    (message: SnackbarMessage, options: ToasterOptions = {}) =>
      display(message, options, "warning"),
    [display]
  );

  const displayError = React.useCallback(
    (message: SnackbarMessage, options: ToasterOptions = {}) =>
      display(message, options, "error"),
    [display]
  );

  return {
    displayInfo,
    displaySuccess,
    displayWarning,
    displayError,
    close,
  };
};

/**
 * Props for the ToasterProvider component
 */
interface ToasterProviderProps {
  /** Position where notifications should appear */
  anchorOrigin?: SnackbarProps["anchorOrigin"];
  /** Child components */
  children: React.ReactNode;
}

const ToasterProvider = ({ anchorOrigin, children }: ToasterProviderProps) => {
  return (
    <SnackbarProvider
      anchorOrigin={
        anchorOrigin ?? {
          vertical: "bottom",
          horizontal: "right",
        }
      }
      maxSnack={MAX}
      TransitionComponent={SlideTransition}
    >
      <StackContextProvider>{children}</StackContextProvider>
    </SnackbarProvider>
  );
};

export default ToasterProvider;
