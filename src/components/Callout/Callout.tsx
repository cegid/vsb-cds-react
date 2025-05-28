import React from "react";
import Column from "../Column";
import Row from "../Row";
import Typography from "../Typography";
import Button from "../Button";
import { Close } from "@cegid/icons-react";
import Box, { BorderProps } from "../Box";

export type CalloutVariants = "warning" | "error" | "info" | "success";
export type CalloutImage = React.ReactElement | string;

export interface CalloutProps {
  variant?: CalloutVariants;
  title: string;
  description: string;
  buttonLabel: string;
  image: CalloutImage;
  buttonActionClick: () => void;
  onClose: () => void;
}

const VARIANT_CONFIG = {
  warning: {
    background: "yellow/99",
    border: "yellow/30"
  },
  error: {
    background: "critical/99",
    border: "critical/35"
  },
  info: {
    background: "info/99",
    border: "info/30"
  },
  success: {
    background: "success/99",
    border: "success/30"
  }
} as const;

const Callout: React.FC<CalloutProps> = ({
  title,
  description,
  buttonLabel,
  buttonActionClick,
  variant = "info",
  image,
  onClose,
}) => {
  const config = VARIANT_CONFIG[variant];

  const borderStyle: BorderProps = {
    style: "solid",
    width: 1.5,
    color: config.border
  };

  const renderImage = (image: CalloutImage) => {
    const imageProps = {
      width: 50,
      height: 50,
      style: { width: "50px", height: "50px" }
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

  return (
    <Column
      p={6}
      width="100%"
      backgroundColor={config.background}
      borderRadius={2}
      border={borderStyle}
      gap={5}
    >
      <Row alignItems="center" gap={5} position="relative">
        {renderImage(image)}
        <Column>
          <Typography variant="bodySSemiBold" color="neutral/10">
            {title}
          </Typography>
          <Typography variant="captionRegular" color="neutral/50">
            {description}
          </Typography>
        </Column>
        <Box
          minWidth="16px"
          position="absolute"
          top={0}
          right={0}
          sx={{ cursor: "pointer" }}
          onClick={onClose}
        >
          <Close sx={{ fontSize: "16px" }} />
        </Box>
      </Row>
      <Button variant="tonal" onClick={buttonActionClick} color={variant}>
        {buttonLabel}
      </Button>
    </Column>
  );
};

export default Callout;