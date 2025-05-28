import React from "react";
import Column from "../Column";
import Row from "../Row";
import Typography from "../Typography";
import Button from "../Button";
import IconButton from "../IconButton";
import { Close } from "@cegid/icons-react";
import Box from "../Box";

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

const Callout: React.FC<CalloutProps> = (props) => {
  const {
    title,
    description,
    buttonLabel,
    buttonActionClick,
    variant,
    image,
    onClose,
  } = props;

  const renderImage = (image: CalloutImage) => {
    if (typeof image === "string") {
      return (
        <img
          src={image}
          alt={title}
          style={{
            width: "50px",
            height: "50px",
            objectFit: "contain",
          }}
        />
      );
    } else {
      return React.cloneElement(image, {
        width: 50,
        height: 50,
        style: { width: "50px", height: "50px", ...image.props.style },
      });
    }
  };

  return (
    <Column
      p={6}
      width="100%"
      backgroundColor="critical/99"
      borderRadius={2}
      border={{
        color: "critical/35",
        width: 1.5,
        style: "solid",
      }}
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
        <Box minWidth="16px" sx={{ cursor: "pointer" }} onClick={onClose}>
          <Box position="absolute" top={0} right={0}>
            <Close sx={{ fontSize: "16px" }} />
          </Box>
        </Box>
      </Row>
      <Button variant="tonal" onClick={buttonActionClick} color={variant}>
        {buttonLabel}
      </Button>
    </Column>
  );
};

export default Callout;
