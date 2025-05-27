import Typography from "../Typography";
import Button from "../Button";
import IconButton from "../IconButton";
import { MoreVert, Settings } from "@cegid/icons-react";
import Row from "../Row";

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
  buttonText: string;

  /**
   * Optional callback function triggered when the primary button is clicked.
   * When provided, displays a tonal variant button with the buttonText.
   */
  primaryAction?: () => void;

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
  const { title, buttonText, primaryAction, settingsAction, moreAction } =
    props;
  return (
    <Row py={5} px={6} gap={4} alignItems="center" width="100%">
      <Row justifyContent="flex-start">
        <Typography variant="titleLSemiBold" color="primary/10">
          {title}
        </Typography>
      </Row>
      {(primaryAction || settingsAction || moreAction) && (
        <Row alignItems="center" justifyContent="flex-end" flex={1}>
          {primaryAction && (
            <Button variant="tonal" onClick={primaryAction}>
              {buttonText}
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
        </Row>
      )}
    </Row>
  );
};

export default Header;
