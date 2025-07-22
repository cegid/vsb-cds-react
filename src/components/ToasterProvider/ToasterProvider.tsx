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
  SnackbarSeverity,
} from "../Snackbar/Snackbar";

const MAX = 3;

interface SlideTransitionProps extends TransitionProps {
  children: React.ReactElement;
}

function SlideTransition(props: Readonly<SlideTransitionProps>) {
  return <Slide {...props} />;
}

export interface ToasterOptions {
  /** Severity level of the notification */
  severity?: SnackbarSeverity;
  /** Custom icon to display */
  icon?: React.ReactElement<typeof Icon>;
  /** Action button configuration */
  action?: SnackbarAction;
  /** Callback when notification is closed */
  onClose?: () => void;
  /** Auto-hide duration in milliseconds (default: 5000)*/
  autoHideDuration?: number;
}

interface StackContextValue {
  display: (
    message: SnackbarMessage,
    options: ToasterOptions,
    severity?: SnackbarSeverity
  ) => SnackbarKey;
  close: (key: SnackbarKey) => void;
}

const StackContext = React.createContext<StackContextValue>({
  display: () => -1,
  close: () => {},
});

const StackContextProvider = (props: React.PropsWithChildren) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const keysOnScreen = React.useRef<SnackbarKey[]>([]);
  const stackRef = React.useRef<Function[]>([]);
  const timers = React.useRef<Map<SnackbarKey, NodeJS.Timeout>>(new Map());

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
    // Clear timer if exists
    const timer = timers.current.get(key);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(key);
    }
    consume();
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
      autoHideDuration = 5000,
      ...options
    }: ToasterOptions = {},
    severity: SnackbarSeverity = "info"
  ): SnackbarKey => {
    const key = new Date().getTime() + Math.random();
    const finalSeverity = optionsSeverity || severity;
    const shouldAutoHide = autoHideDuration > 0 && !action;

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
      
      // Set auto-hide timer if enabled and no action present
      if (shouldAutoHide) {
        const timer = setTimeout(() => {
          close(key);
        }, autoHideDuration);
        timers.current.set(key, timer);
      }
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
          vertical: "top",
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
