"use client";

import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import Typography from "../Typography";
import Button, { ButtonColor, ButtonVariant } from "../Button";
import IconButton, { CustomColor } from "../IconButton";
import Row from "../Row";
import Icon from "../Icon";
import SegmentedControl, { SegmentedControlProps } from "../SegmentedControl";
import Box from "../Box";

interface CustomButtonProps {
  id?: string;
  disabled?: boolean;
  color?: ButtonColor;
  variant?: ButtonVariant;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

interface BaseHeaderProps {
  id?: string;
  /** The main title text displayed in the header */
  title: string;
  /** The text content displayed inside the primary action button */
  primaryButtonText?: string;
  /** The text content displayed inside the secondary action button (desktop only) */
  secondaryButtonText?: string;
  /** Callback function triggered when the settings icon is clicked */
  settingsAction?: () => void;
  /** Callback function triggered when the more options icon is clicked */
  moreAction?: () => void;
  /** Callback function triggered when the arrow back options icon is clicked */
  backAction?: () => void;
  /** back action icon customization */
  backIcon?: React.ReactElement<typeof Icon>;
}

type WithPrimaryAction = {
  primaryAction: () => void;
  primaryButtonText?: string;
  primaryButtonProps?: CustomButtonProps;
};

type WithoutPrimaryAction = {
  primaryAction?: never;
  primaryButtonText?: never;
  primaryButtonProps?: never;
};

type WithSecondaryAction = {
  secondaryAction: () => void;
  secondaryButtonText?: string;
  secondaryButtonProps?: CustomButtonProps;
};

type WithoutSecondaryAction = {
  secondaryAction?: never;
  secondaryButtonText?: never;
  secondaryButtonProps?: never;
};

type ActionProps =
  | (WithPrimaryAction & WithSecondaryAction)
  | (WithPrimaryAction & WithoutSecondaryAction)
  | (WithoutPrimaryAction & WithSecondaryAction)
  | (WithoutPrimaryAction & WithoutSecondaryAction);

type CoreHeaderProps = BaseHeaderProps & ActionProps;

type SegmentedHeaderProps = CoreHeaderProps & {
  segmentedControlRight: true;
  segmentedControlProps: SegmentedControlProps;
};

type RegularHeaderProps = CoreHeaderProps & {
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
  alignItems: "flex-start",
};

const ICON_BUTTON_PROPS = {
  variant: "tonal" as const,
  color: "neutral" as const,
  square: true,
};

const HeaderTitle: React.FC<{
  title: string;
  backAction?: () => void;
  isMobile: boolean;
  backIcon?: React.ReactElement<typeof Icon>;
}> = ({ title, backAction, isMobile, backIcon }) => (
  <Row justifyContent="flex-start" gap="20px">
    {backAction && isMobile && (
      <Box pt={1} display="flex" height="fit-content" onClick={backAction}>
        {backIcon}
      </Box>
    )}
    <Typography
      variant="bodyMSemiBold"
      color="neutral/10"
      component="p"
      display="flex"
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

const PrimaryButton: React.FC<{
  text?: string;
  onClick: () => void;
  customProps?: CustomButtonProps;
}> = ({ text, onClick, customProps = {} }) => {
  if (customProps.startIcon && !text) {
    return (
      <IconButton
        {...ICON_BUTTON_PROPS}
        onClick={onClick}
        disabled={customProps.disabled}
        id={customProps.id}
        color={(customProps.color as CustomColor) ?? "primary"}
      >
        {customProps.startIcon}
      </IconButton>
    );
  }

  return (
    <Button
      onClick={onClick}
      disabled={customProps.disabled}
      id={customProps.id}
      color={customProps.color}
      variant={customProps?.variant ?? "contained"}
      startIcon={customProps.startIcon}
      endIcon={customProps.endIcon}
    >
      {text}
    </Button>
  );
};

const SecondaryButton: React.FC<{
  text?: string;
  onClick: () => void;
  customProps?: CustomButtonProps;
}> = ({ text, onClick, customProps = {} }) => {
  if (customProps.startIcon && !text) {
    return (
      <IconButton
        {...ICON_BUTTON_PROPS}
        onClick={onClick}
        disabled={customProps.disabled}
        id={customProps.id}
        color={(customProps.color as CustomColor) ?? "neutral"}
      >
        {customProps.startIcon}
      </IconButton>
    );
  }

  return (
    <Button
      onClick={onClick}
      disabled={customProps.disabled}
      id={customProps.id}
      color={customProps?.color ?? "neutral"}
      variant={customProps?.variant ?? "contained"}
      startIcon={customProps.startIcon}
      endIcon={customProps.endIcon}
    >
      {text}
    </Button>
  );
};

const MobileActions: React.FC<{
  primaryAction?: () => void;
  primaryButtonText?: string;
  primaryButtonProps?: CustomButtonProps;
  settingsAction?: () => void;
  moreAction?: () => void;
}> = ({
  primaryAction,
  primaryButtonText,
  primaryButtonProps,
  settingsAction,
  moreAction,
}) => (
  <>
    {primaryAction && (
      <SecondaryButton
        text={primaryButtonText}
        onClick={primaryAction}
        customProps={primaryButtonProps}
      />
    )}
    {settingsAction && <SettingsButton onClick={settingsAction} />}
    {moreAction && <MoreButton onClick={moreAction} />}
  </>
);

const DesktopActions: React.FC<{
  primaryAction?: () => void;
  primaryButtonText?: string;
  primaryButtonProps?: CustomButtonProps;
  secondaryAction?: () => void;
  secondaryButtonText?: string;
  secondaryButtonProps?: CustomButtonProps;
  settingsAction?: () => void;
  moreAction?: () => void;
}> = ({
  primaryAction,
  primaryButtonText,
  primaryButtonProps,
  secondaryAction,
  secondaryButtonText,
  secondaryButtonProps,
  settingsAction,
  moreAction,
}) => (
  <>
    {settingsAction && <SettingsButton onClick={settingsAction} />}
    {moreAction && <MoreButton onClick={moreAction} />}
    {secondaryAction && (
      <SecondaryButton
        text={secondaryButtonText}
        onClick={secondaryAction}
        customProps={secondaryButtonProps}
      />
    )}
    {primaryAction && (
      <PrimaryButton
        text={primaryButtonText}
        onClick={primaryAction}
        customProps={primaryButtonProps}
      />
    )}
  </>
);

const SegmentedSection: React.FC<{
  segmentedControlProps: SegmentedControlProps;
  settingsAction?: () => void;
}> = ({ segmentedControlProps, settingsAction }) => (
  <Row gap={4} justifyContent="flex-end">
    <SegmentedControl {...segmentedControlProps} />
    {settingsAction && <SettingsButton onClick={settingsAction} />}
  </Row>
);

const RegularActionsSection: React.FC<{
  isMobile: boolean;
  primaryAction?: () => void;
  primaryButtonText?: string;
  primaryButtonProps?: CustomButtonProps;
  secondaryAction?: () => void;
  secondaryButtonText?: string;
  secondaryButtonProps?: CustomButtonProps;
  settingsAction?: () => void;
  moreAction?: () => void;
  backAction?: () => void;
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
    primaryButtonProps,
    settingsAction,
    moreAction,
    secondaryButtonText,
    secondaryAction,
    secondaryButtonProps,
    segmentedControlRight,
    backAction,
    backIcon = (
      <Icon variant="stroke" style="rounded" size={16}>
        arrow-left-02
      </Icon>
    ),
    id,
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Row py={5} px={6} gap={4} alignItems="center" width="100%" id={id}>
      {!segmentedControlRight && (
        <HeaderTitle
          title={title}
          backAction={backAction}
          backIcon={backIcon}
          isMobile={isMobile}
        />
      )}

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
          primaryButtonProps={primaryButtonProps}
          secondaryAction={secondaryAction}
          secondaryButtonText={secondaryButtonText}
          secondaryButtonProps={secondaryButtonProps}
          settingsAction={settingsAction}
          moreAction={moreAction}
        />
      )}
    </Row>
  );
};

export default Header;
