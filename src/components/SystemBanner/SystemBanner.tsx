"use client";

import React from "react";
import Row from "../Row";
import Icon from "../Icon";
import IconButton from "../IconButton";
import { CustomColorString } from "../../theme";

export type SystemBannerColor = "critical" | "warning";
export interface SystemBannerProps {
  color?: SystemBannerColor;
  children?: React.ReactNode;
  onClose?: () => void;
}

const SystemBanner: React.FC<SystemBannerProps> = (props) => {
  const { color = "critical", children, onClose } = props;
  const paletteColor = color === "warning" ? "yellow" : color;
  return (
    <Row
      width="100%"
      p={4}
      gap={4}
      alignItems="center"
      backgroundColor={`${paletteColor}/99` as CustomColorString}
      justifyContent="space-between"
    >
      <Icon
        color={`${paletteColor}/50` as CustomColorString}
        variant="solid"
        size={16}
      >
        {color === "warning" ? "alert-02" : "alert-circle"}
      </Icon>
      {children}
      <IconButton variant="iconOnly" color="neutral" onClick={onClose}>
        <Icon size={16} variant="solid">
          cancel-01
        </Icon>
      </IconButton>
    </Row>
  );
};

export default SystemBanner;
