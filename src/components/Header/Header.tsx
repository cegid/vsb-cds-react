import Typography from "../Typography";
import Button from "../Button";
import IconButton from "../IconButton";
import { MoreVert, Settings } from "@cegid/icons-react";
import Row from "../Row";
import { useTheme, useMediaQuery } from "@mui/material";

export interface HeaderProps {
  /**
   * The main title text displayed in the header.
   * Uses the titleLSemiBold variant with primary/10 color.
   */
  title: string;

  /**
   * The text content displayed inside the primary action button.
   * Only visible when primaryAction is provided.
   */
  primaryButtonText: string;

  /**
   * The text content displayed inside the secondary action button.
   * Only visible when secondaryAction is provided.
   * Only available on desktop
   */
  secondaryButtonText: string;

  /**
   * Optional callback function triggered when the primary button is clicked.
   * When provided, displays a tonal variant button with the buttonText.
   */
  primaryAction?: () => void;

  /**
   * Optional callback function triggered when the secondary button is clicked.
   * When provided, displays a tonal variant button with the secondaryButtonText.
   * Only available on desktop
   */
  secondaryAction?: () => void;

  /**
   * Optional callback function triggered when the settings icon is clicked.
   * When provided, displays a neutral-colored settings icon button.
   */
  settingsAction?: () => void;

  /**
   * Optional callback function triggered when the more options icon is clicked.
   * When provided, displays a neutral-colored vertical dots icon button.
   */
  moreAction?: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const {
    title,
    primaryButtonText,
    primaryAction,
    settingsAction,
    moreAction,
    secondaryButtonText,
    secondaryAction
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Row py={5} px={6} gap={4} alignItems="center" width="100%">
      <Row justifyContent="flex-start">
        <Typography variant="titleLSemiBold" color="primary/10">
          {title}
        </Typography>
      </Row>

      {(primaryAction || settingsAction || moreAction || secondaryAction) && (
        <Row alignItems="center" justifyContent="flex-end" flex={1} gap={2}>
          {isMobile ? (
            <>
              {primaryAction && (
                <Button variant="tonal" onClick={primaryAction}>
                  {primaryButtonText}
                </Button>
              )}
              {settingsAction && (
                <IconButton
                  variant="iconOnly"
                  color="neutral"
                  onClick={settingsAction}
                >
                  <Settings />
                </IconButton>
              )}
              {moreAction && (
                <IconButton variant="iconOnly" color="neutral" onClick={moreAction}>
                  <MoreVert />
                </IconButton>
              )}
            </>
          ) : (
            <>
              {settingsAction && (
                <IconButton
                  variant="tonal"
                  color="neutral"
                  onClick={settingsAction}
                >
                  <Settings />
                </IconButton>
              )}
              {moreAction && (
                <IconButton variant="tonal" color="neutral" onClick={moreAction}>
                  <MoreVert />
                </IconButton>
              )}
              {secondaryAction && (
                <Button variant="tonal" onClick={secondaryAction}>
                  {secondaryButtonText}
                </Button>
              )}
              {primaryAction && (
                <Button variant="tonal" onClick={primaryAction}>
                  {primaryButtonText}
                </Button>
              )}
            </>
          )}
        </Row>
      )}
    </Row>
  );
};

export default Header;