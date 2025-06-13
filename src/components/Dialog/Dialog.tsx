import Box from "../Box";
import Column from "../Column";
import Row from "../Row";
import Icon from "../Icon";
import Typography from "../Typography";
import Button from "../Button";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { white } from "../../theme";

/**
 * Represents an image that can be either a React element or a string URL
 */
export type DialogImage = React.ReactElement | string;

/**
 * Defines the visual variant of the dialog
 */
export type DialogVariant = "info" | "alert";

/**
 * Props for the Dialog component
 */
export interface DialogProps {
  /**
   * The title text displayed in the dialog header
   */
  title: string;

  /**
   * The visual variant that determines the dialog's appearance and behavior
   * - "info": Centers content and shows image if provided
   * - "alert": Shows an icon and left-aligns content
   * @default "alert"
   */
  variant: DialogVariant;

  /**
   * Optional content to display in the dialog body
   */
  content?: React.ReactElement;

  /**
   * Optional array of action buttons to display at the bottom of the dialog
   */
  actions?: Array<React.ReactElement<typeof Button>>;

  /**
   * Optional image to display in the dialog (only shown for "info" variant)
   */
  image?: DialogImage;
}

const Dialog: React.FC<DialogProps> = (props) => {
  const { title, content, actions, variant = "alert", image } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Responsive styles
  const containerStyles = {
    width: isMobile ? "343px" : "720px",
    ...(isMobile && { background: white }),
  };

  const isInfoVariant = variant === "info";
  const hasActions = actions && actions.length > 0;

  const renderAlertIcon = () => (
    <Box
      backgroundColor="neutral/99"
      width={24}
      height={24}
      borderRadius={2}
      display="flex"
      justifyContent="center"
    >
      <Icon size={14} variant="solid">
        add-01
      </Icon>
    </Box>
  );

  const renderHeader = () => (
    <Row
      gap={4}
      alignItems="center"
      mb={4}
      justifyContent={isInfoVariant ? "center" : ""}
    >
      {variant === "alert" && renderAlertIcon()}
      <Typography variant="bodySSemiBold">{title}</Typography>
    </Row>
  );

  const getStyleForSoloAction = () => {
    if (actions?.length === 1) {
      return { display: "flex", justifyContent: "center" };
    }
  };

  const renderActions = () => {
    if (!hasActions) return null;

    const actionsContainer = (
      <Box
        mt={4}
        mx={6}
        width={isInfoVariant ? "100%" : "auto"}
        justifyContent={isInfoVariant ? "center" : "flex-end"}
        display="flex"
      >
        {isMobile ? (
          <Column gap={4}>
            {actions.map((action, index) => (
              <Box
                key={`mobile-action-${index}-${action.key ?? "button"}`}
                width="100%"
              >
                {action}
              </Box>
            ))}
          </Column>
        ) : (
          <Row gap={4} justifyContent="flex-end" maxWidth={500}>
            {actions.map((action, index) => (
              <Box
                key={`desktop-action-${index}-${action.key ?? "button"}`}
                flex={isInfoVariant ? 1 : "inherit"}
                {...getStyleForSoloAction()}
              >
                {action}
              </Box>
            ))}
          </Row>
        )}
      </Box>
    );

    return actionsContainer;
  };

  return (
    <Box {...containerStyles} p={2} backgroundColor="white" borderRadius={6}>
      <Column
        border={{ color: "neutral/95", style: "solid", width: 1 }}
        backgroundColor="white"
        p={6}
        borderRadius={5}
        alignItems={isInfoVariant ? "center" : ""}
      >
        {isInfoVariant && image}
        {renderHeader()}
        {content && <Box p={4}>{content}</Box>}
        {renderActions()}
      </Column>
    </Box>
  );
};

export default Dialog;
