"use client";

import React from "react";
import {
  Drawer as CegidDrawer,
  DrawerProps as CegidDrawerProps,
  styled,
} from "@cegid/cds-react";
import { neutral } from "../../theme";
import Box from "../Box";

export interface DrawerProps extends Omit<CegidDrawerProps, 'anchor'> {
  /**
   * Side from which the drawer will appear.
   * @default "right"
   */
  anchor?: "top" | "bottom" | "left" | "right";
  /**
   * If true, the drawer is open.
   */
  open: boolean;
  /**
   * Callback fired when the component requests to be closed.
   */
  onClose?: () => void;
  /**
   * The content of the drawer.
   */
  children?: React.ReactNode;
}

const StyledDrawer = styled(CegidDrawer)<{ anchor?: "top" | "bottom" | "left" | "right" }>(
  ({ anchor }) => ({
    "& .MuiDrawer-paper": {
      backgroundColor: neutral[99],
      padding: "16px",
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      ...(anchor === "bottom" && {
        borderTopLeftRadius: "24px",
        borderTopRightRadius: "24px",
      }),
      ...(anchor === "top" && {
        borderBottomLeftRadius: "24px",
        borderBottomRightRadius: "24px",
      }),
      ...(anchor === "left" && {
        borderTopRightRadius: "24px",
        borderBottomRightRadius: "24px",
      }),
      ...(anchor === "right" && {
        borderTopLeftRadius: "24px",
        borderBottomLeftRadius: "24px",
      }),
    },
    "& .MuiBackdrop-root": {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  })
);

const Drawer: React.FC<DrawerProps> = ({
  anchor = "right",
  open,
  onClose,
  children,
  ...props
}) => {
  const showHandle = anchor === "top" || anchor === "bottom";
  const [isDragging, setIsDragging] = React.useState(false);
  const [startY, setStartY] = React.useState(0);
  const [currentHeight, setCurrentHeight] = React.useState<number | null>(null);
  const drawerRef = React.useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!showHandle) return;
    setIsDragging(true);
    setStartY(e.touches[0].clientY);

    // Get current drawer height
    const drawerPaper = drawerRef.current?.querySelector('.MuiDrawer-paper') as HTMLElement;
    if (drawerPaper) {
      setCurrentHeight(drawerPaper.offsetHeight);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !showHandle || currentHeight === null) return;

    const deltaY = e.touches[0].clientY - startY;
    const drawerPaper = drawerRef.current?.querySelector('.MuiDrawer-paper') as HTMLElement;

    if (drawerPaper) {
      let newHeight: number;

      if (anchor === "bottom") {
        // For bottom drawer, moving down increases height (dragging down)
        newHeight = currentHeight - deltaY;
      } else {
        // For top drawer, moving down decreases height (dragging down)
        newHeight = currentHeight + deltaY;
      }

      // Limit min and max height
      const minHeight = 100;
      const maxHeight = window.innerHeight * 0.9;
      newHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));

      drawerPaper.style.height = `${newHeight}px`;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    const drawerPaper = drawerRef.current?.querySelector('.MuiDrawer-paper') as HTMLElement;

    if (drawerPaper) {
      const finalHeight = drawerPaper.offsetHeight;

      // If dragged to less than 30% of current height, close the drawer
      if (currentHeight && finalHeight < currentHeight * 0.3) {
        onClose?.();
      }

      setCurrentHeight(finalHeight);
    }
  };

  return (
    <StyledDrawer
      ref={drawerRef}
      anchor={anchor}
      open={open}
      onClose={onClose}
      {...props}
    >
      {showHandle && (
        <Box
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          sx={{
            position: "absolute",
            top: "8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "50px",
            height: "4px",
            backgroundColor: "#E6E7EA",
            borderRadius: "2px",
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "none",
            zIndex: 1,
          }}
        />
      )}
      {children}
    </StyledDrawer>
  );
};

export default Drawer;
