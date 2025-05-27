import Typography from "../Typography";
import Button from "../Button";
import IconButton from "../IconButton";
import { MoreVert, Settings } from "@cegid/icons-react";
import Row from "../Row";

export interface HeaderProps {
  title: string;
  buttonText: string;
  primaryAction?: () => void;
  settingsAction?: () => void;
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
