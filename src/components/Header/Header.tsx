import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import Typography from "../Typography";
import Button from "../Button";
import IconButton from "../IconButton";
import Row from "../Row";
import Icon from "../Icon";
import SegmentedControl, { SegmentedControlProps } from "../SegmentedControl";

interface BaseHeaderProps {
  /** The main title text displayed in the header */
  title: string;
  /** The text content displayed inside the primary action button */
  primaryButtonText: string;
  /** The text content displayed inside the secondary action button (desktop only) */
  secondaryButtonText: string;
  /** Callback function triggered when the primary button is clicked */
  primaryAction?: () => void;
  /** Callback function triggered when the secondary button is clicked (desktop only) */
  secondaryAction?: () => void;
  /** Callback function triggered when the settings icon is clicked */
  settingsAction?: () => void;
  /** Callback function triggered when the more options icon is clicked */
  moreAction?: () => void;
}

type SegmentedHeaderProps = BaseHeaderProps & {
  segmentedControlRight: true;
  segmentedControlProps: SegmentedControlProps;
};

type RegularHeaderProps = BaseHeaderProps & {
  segmentedControlRight?: false;
  segmentedControlProps?: never;
};

export type HeaderProps = SegmentedHeaderProps | RegularHeaderProps;

const TITLE_STYLES = {
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordBreak: "break-word" as const,
  hyphens: "auto" as const,
  display: "-webkit-box",
};

const ICON_BUTTON_PROPS = {
  variant: "tonal" as const,
  color: "neutral" as const,
  square: true,
};

const HeaderTitle: React.FC<{ title: string }> = ({ title }) => (
  <Row justifyContent="flex-start">
    <Typography
      variant="titleLSemiBold"
      color="primary/10"
      component="p"
      sx={TITLE_STYLES}
    >
      {title}
    </Typography>
  </Row>
);

const SettingsButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <IconButton {...ICON_BUTTON_PROPS} onClick={onClick}>
    <Icon size={16} color="neutral/10">
      setting-07
    </Icon>
  </IconButton>
);

const MoreButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <IconButton {...ICON_BUTTON_PROPS} onClick={onClick}>
    <Icon size={16} color="neutral/10">
      more-horizontal
    </Icon>
  </IconButton>
);

const PrimaryButton: React.FC<{ text: string; onClick: () => void }> = ({
  text,
  onClick,
}) => (
  <Button variant="contained" onClick={onClick}>
    {text}
  </Button>
);

const SecondaryButton: React.FC<{ text: string; onClick: () => void }> = ({
  text,
  onClick,
}) => (
  <Button variant="contained" color="neutral" onClick={onClick}>
    {text}
  </Button>
);

const MobileActions: React.FC<{
  primaryAction?: () => void;
  primaryButtonText: string;
  settingsAction?: () => void;
  moreAction?: () => void;
}> = ({ primaryAction, primaryButtonText, settingsAction, moreAction }) => (
  <>
    {primaryAction && (
      <SecondaryButton text={primaryButtonText} onClick={primaryAction} />
    )}
    {settingsAction && <SettingsButton onClick={settingsAction} />}
    {moreAction && <MoreButton onClick={moreAction} />}
  </>
);

const DesktopActions: React.FC<{
  primaryAction?: () => void;
  primaryButtonText: string;
  secondaryAction?: () => void;
  secondaryButtonText: string;
  settingsAction?: () => void;
  moreAction?: () => void;
}> = ({
  primaryAction,
  primaryButtonText,
  secondaryAction,
  secondaryButtonText,
  settingsAction,
  moreAction,
}) => (
  <>
    {settingsAction && <SettingsButton onClick={settingsAction} />}
    {moreAction && <MoreButton onClick={moreAction} />}
    {secondaryAction && (
      <SecondaryButton text={secondaryButtonText} onClick={secondaryAction} />
    )}
    {primaryAction && (
      <PrimaryButton text={primaryButtonText} onClick={primaryAction} />
    )}
  </>
);

const SegmentedSection: React.FC<{
  segmentedControlProps: SegmentedControlProps;
  settingsAction?: () => void;
}> = ({ segmentedControlProps, settingsAction }) => (
  <Row gap={4}>
    <SegmentedControl {...segmentedControlProps} />
    {settingsAction && <SettingsButton onClick={settingsAction} />}
  </Row>
);

const RegularActionsSection: React.FC<{
  isMobile: boolean;
  primaryAction?: () => void;
  primaryButtonText: string;
  secondaryAction?: () => void;
  secondaryButtonText: string;
  settingsAction?: () => void;
  moreAction?: () => void;
}> = ({ isMobile, ...actions }) => {
  const hasAnyAction =
    actions.primaryAction ||
    actions.settingsAction ||
    actions.moreAction ||
    actions.secondaryAction;

  if (!hasAnyAction) return null;

  return (
    <Row alignItems="center" justifyContent="flex-end" flex={1} gap={2}>
      {isMobile ? (
        <MobileActions {...actions} />
      ) : (
        <DesktopActions {...actions} />
      )}
    </Row>
  );
};

const Header: React.FC<HeaderProps> = (props) => {
  const {
    title,
    primaryButtonText,
    primaryAction,
    settingsAction,
    moreAction,
    secondaryButtonText,
    secondaryAction,
    segmentedControlRight,
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Row py={5} px={6} gap={4} alignItems="center" width="100%">
      {!segmentedControlRight && <HeaderTitle title={title} />}

      {segmentedControlRight ? (
        <SegmentedSection
          segmentedControlProps={props.segmentedControlProps}
          settingsAction={settingsAction}
        />
      ) : (
        <RegularActionsSection
          isMobile={isMobile}
          primaryAction={primaryAction}
          primaryButtonText={primaryButtonText}
          secondaryAction={secondaryAction}
          secondaryButtonText={secondaryButtonText}
          settingsAction={settingsAction}
          moreAction={moreAction}
        />
      )}
    </Row>
  );
};

export default Header;
