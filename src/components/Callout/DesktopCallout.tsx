import React from "react";
import { CalloutImage, CalloutProps, VARIANT_CONFIG } from "./Callout";
import Button from "../Button";
import Column from "../Column";
import Typography from "../Typography";
import Row from "../Row";
import Box, { BorderProps } from "../Box";
import Icon from "../Icon";

const DesktopCallout: React.FC<CalloutProps> = ({
  title,
  description,
  buttonLabel,
  buttonActionClick,
  variant = "info",
  image,
  onClose,
  size = "M",
}) => {
  const config = VARIANT_CONFIG[variant];
  const isMediumSize = size === "M";
  const isExtraSmallSize = size === "XS";

  const borderStyle: BorderProps = {
    style: "solid",
    width: 1.5,
    color: config.border,
    opacity: 30,
  };

  const renderImage = (image: CalloutImage) => {
    const imageProps = {
      width: 40,
      height: 40,
      style: { width: "40px", height: "40px" },
    };

    if (typeof image === "string") {
      return (
        <img
          src={image}
          alt={title}
          style={{
            ...imageProps.style,
            objectFit: "contain" as const,
          }}
        />
      );
    }

    return React.cloneElement(image, {
      ...imageProps,
      style: { ...imageProps.style, ...image.props.style },
    });
  };

  const renderContent = () => (
    <Column>
      {isMediumSize && (
        <Typography variant="bodySSemiBold" color="neutral/10">
          {title}
        </Typography>
      )}
      <Typography
        variant={isMediumSize ? "captionRegular" : "bodyMRegular"}
        color={isMediumSize ? "neutral/50" : "neutral/10"}
      >
        {description}
      </Typography>
    </Column>
  );

  const renderMediumSizeButtons = () => (
    <>
      <Button
        variant="contained"
        onClick={buttonActionClick}
        color={variant === "warning" ? "neutral" : variant}
      >
        {buttonLabel}
      </Button>
      <Button
        variant="outlined"
        onClick={onClose}
        color={variant === "warning" ? "neutral" : variant}
      >
        Fermer
      </Button>
    </>
  );

  const renderChevronButton = () => (
    <Box
      sx={{ cursor: "pointer" }}
      onClick={buttonActionClick}
      display="flex"
      alignItems="center"
    >
      <Icon size={16}>arrow-right-01</Icon>
    </Box>
  );

  const renderActions = () => {
    if (isMediumSize) {
      return renderMediumSizeButtons();
    }

    if (isExtraSmallSize) {
      return renderChevronButton();
    }

    return null;
  };

  return (
    <Row
      p={6}
      width="100%"
      backgroundColor={config.background}
      borderRadius={4}
      border={borderStyle}
      gap={5}
      alignItems="center"
    >
      <Row alignItems="center" gap={5} position="relative">
        {image && renderImage(image)}
        {renderContent()}
      </Row>
      {renderActions()}
    </Row>
  );
};

export default DesktopCallout;
