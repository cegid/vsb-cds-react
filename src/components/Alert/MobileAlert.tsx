import React from "react";
import Column from "../Column";
import Row from "../Row";
import Typography from "../Typography";
import Button from "../Button";
import Box, { BorderProps } from "../Box";
import {
  AlertImage,
  AlertProps,
  getButtonColor,
  VARIANT_CONFIG,
} from "./Alert";
import Icon from "../Icon";
import { neutral } from "../../theme/colors";

const MobileAlert: React.FC<AlertProps> = ({
  title,
  description,
  buttonLabel,
  onActionClick,
  variant = "info",
  image,
  onClose,
  size = "M",
  actionDisabled = false,
}) => {
  const config = VARIANT_CONFIG[variant];
  const isMediumSize = size === "M";
  const isExtraSmallSize = size === "XS";

  const getBorderStyle = (): BorderProps | undefined =>
    variant === "white"
      ? undefined
      : {
          style: "solid",
          width: 1,
          color: config.border,
          opacity: 30,
        };

  const getImageDimensions = () => ({
    width: isMediumSize ? 50 : 40,
    height: isMediumSize ? 50 : 40,
    style: {
      width: isMediumSize ? "50px" : "40px",
      height: isMediumSize ? "50px" : "40px",
    },
  });

  const getDescriptionColor = () => {
    if (isMediumSize) {
      return "neutral/50";
    } else {
      return variant === "error" ? "critical/50" : "neutral/10";
    }
  };
  const renderImage = (image: AlertImage) => {
    const imageProps = getImageDimensions();
    const altText = typeof title === "string" ? title : "Alert image";

    if (typeof image === "string") {
      return (
        <img
          src={image}
          alt={altText}
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

  const renderCloseButton = () => (
    <Box
      position="absolute"
      top={0}
      right={0}
      sx={{ cursor: "pointer" }}
      onClick={onClose}
      height={16}
      width={16}
      display="flex"
    >
      <Icon size={16} color="primary/10">
        cancel-01
      </Icon>
    </Box>
  );

  const renderChevronButton = () => (
    <Box
      sx={{ cursor: "pointer" }}
      onClick={onActionClick}
      display="flex"
      alignItems="center"
    >
      <Icon
        size={14}
        color={variant === "error" ? "critical/50" : "neutral/10"}
      >
        greater-than
      </Icon>
    </Box>
  );

  const renderTitle = () =>
    isMediumSize &&
    (typeof title === "string" ? (
      <Typography variant="bodySSemiBold" color="neutral/10">
        {title}
      </Typography>
    ) : (
      title
    ));

  const renderDescription = () =>
    typeof description === "string" ? (
      <Typography
        variant={isMediumSize ? "captionRegular" : "bodySRegular"}
        color={getDescriptionColor()}
      >
        {description}
      </Typography>
    ) : (
      description
    );

  const renderActionButton = () =>
    isMediumSize &&
    onActionClick && (
      <Button
        variant={variant === "white" ? "tonal" : "contained"}
        onClick={onActionClick}
        color={getButtonColor(variant)}
        disabled={actionDisabled}
        fullWidth
      >
        {buttonLabel}
      </Button>
    );

  return (
    <Column
      p={isMediumSize ? 6 : 4}
      width="100%"
      backgroundColor={config.background}
      borderRadius={4}
      border={getBorderStyle()}
      gap={5}
      sx={
        variant === "white"
          ? { boxShadow: `0px 0px 25px 0px ${neutral[95]}` }
          : undefined
      }
    >
      <Row alignItems="center" gap={5} position="relative">
        {image && renderImage(image)}

        <Column>
          {renderTitle()}
          {description && renderDescription()}
        </Column>

        {isMediumSize && onClose && renderCloseButton()}
        {isExtraSmallSize && onActionClick && renderChevronButton()}
      </Row>

      {renderActionButton()}
    </Column>
  );
};

export default MobileAlert;
