import React from "react";
import { CalloutImage, CalloutProps, VARIANT_CONFIG } from "./Callout";
import Button from "../Button";
import Column from "../Column";
import Typography from "../Typography";
import Row from "../Row";
import Box, { BorderProps } from "../Box";
import { ChevronRight } from "@cegid/icons-react";

const DesktopCallout: React.FC<CalloutProps> = ({
    title,
    description,
    buttonLabel,
    buttonActionClick,
    variant = "info",
    image,
    onClose,
    size
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

    const renderChevronButton = () => (
        <Box
            sx={{ cursor: "pointer" }}
            onClick={buttonActionClick}
            display="flex"
            alignItems="center"
        >
            <ChevronRight sx={{ fontSize: "16px" }} />
        </Box>
    );

    return (
        <Row
            p={6}
            width="100%"
            backgroundColor={config.background}
            borderRadius={2}
            border={borderStyle}
            gap={5}
            alignItems="center"
        >
            <Row alignItems="center" gap={5} position="relative">
                {image && renderImage(image)}
                <Column>
                    {
                        size === "M" &&
                        <Typography variant="bodySSemiBold" color="neutral/10">
                            {title}
                        </Typography>
                    }
                    <Typography variant={size === "M" ? "captionRegular" : "bodyMRegular"} color={size === "M" ? "neutral/50" : "neutral/10"}>
                        {description}
                    </Typography>
                </Column>
            </Row>
            {
                size === "M" &&
                <>
                    <Button variant="tonal" onClick={buttonActionClick} color={variant}>
                        {buttonLabel}
                    </Button>
                    <Button variant="outlined" onClick={onClose} color={variant}>
                        Fermer
                    </Button>
                </>
            }
            {
                size === "XS" && renderChevronButton()
            }

        </Row>
    );
};

export default DesktopCallout;