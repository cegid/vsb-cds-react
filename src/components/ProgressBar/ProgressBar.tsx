import React from "react";
import Box from "../Box";
import {
  PaletteNames,
  primary,
  secondary,
  neutral,
  success,
  yellow,
  banana,
  critical,
  pink,
  purple,
  plum,
  beige,
  info,
} from "../../theme";

/**
 * Available shapes for the progress bar component.
 * @typedef {"bar" | "circle"} ProgressBarShape
 */
export type ProgressBarShape = "bar" | "circle";

/**
 * Props for the ProgressBar component.
 * @interface ProgressBarProps
 */
export interface ProgressBarProps {
  /** The progress value as a percentage (0-100). If undefined, shows indeterminate animation */
  progress?: number;
  /** The color variant from available palette names */
  color?: PaletteNames;
  /** The visual shape of the progress bar */
  shape?: ProgressBarShape;
  /** The size in pixels for circle shape (width and height) */
  size?: number;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (props, ref) => {
    const { progress, color = "primary", shape = "bar", size = 24 } = props;
    const isIndeterminate = progress === undefined;

    const getProgressColor = () => {
      const colorPalettes = {
        primary,
        secondary,
        neutral,
        success,
        yellow,
        banana,
        critical,
        pink,
        purple,
        plum,
        beige,
        info,
      };
      return colorPalettes[color] || primary;
    };

    const getProgressBackgroundColor = () => {
      const palette = getProgressColor();
      return `linear-gradient(90deg, ${palette[50]} 0%, ${palette[90]} 100%)`;
    };

    if (shape === "circle") {
      const circleSize = size;
      const strokeWidth = Math.max(2, Math.min(3, circleSize * 0.15));
      const radius = (circleSize - strokeWidth) / 2;
      const circumference = 2 * Math.PI * radius;
      const palette = getProgressColor();
      const gradientId = `gradient-${color}-${Math.random().toString(36).substr(2, 9)}`;

      if (isIndeterminate) {
        return (
          <Box
            ref={ref}
            width={circleSize}
            height={circleSize}
            display="flex"
            sx={{
              "& svg": {
                "@keyframes spin": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
                animation: "spin 1.5s linear infinite",
              },
            }}
          >
            <svg width={circleSize} height={circleSize}>
              <defs>
                <linearGradient
                  id={gradientId}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={palette[50]} />
                  <stop offset="100%" stopColor={palette[90]} />
                </linearGradient>
              </defs>
              <circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                fill="transparent"
                stroke={palette[95]}
                strokeWidth={strokeWidth}
              />
              <circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                fill="transparent"
                stroke={`url(#${gradientId})`}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference * 0.25} ${circumference * 0.75}`}
                strokeLinecap="round"
                transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
              />
            </svg>
          </Box>
        );
      }

      const strokeDashoffset =
        circumference - ((progress || 0) / 100) * circumference;

      return (
        <Box
          ref={ref}
          width={circleSize}
          height={circleSize}
          sx={{
            display: "inline-block",
          }}
        >
          <svg width={circleSize} height={circleSize}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={palette[50]} />
                <stop offset="100%" stopColor={palette[90]} />
              </linearGradient>
            </defs>
            <circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={radius}
              fill="transparent"
              stroke={palette[95]}
              strokeWidth={strokeWidth}
            />
            <circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={radius}
              fill="transparent"
              stroke={`url(#${gradientId})`}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
            />
          </svg>
        </Box>
      );
    }

    if (isIndeterminate) {
      return (
        <Box
          ref={ref}
          height={3}
          width="100%"
          borderRadius={4}
          backgroundColor={`${color}/95`}
          sx={{
            overflow: "hidden",
          }}
        >
          <Box
            height={3}
            width="25%"
            borderRadius={4}
            sx={{
              background: getProgressBackgroundColor(),
              "@keyframes slide": {
                "0%": { transform: "translateX(-100%)" },
                "100%": { transform: "translateX(400%)" },
              },
              animation: "slide 1.5s ease-in-out infinite",
            }}
          ></Box>
        </Box>
      );
    }

    return (
      <Box
        ref={ref}
        height={3}
        width="100%"
        borderRadius={4}
        backgroundColor={`${color}/95`}
      >
        <Box
          height={3}
          width={`${progress || 0}%`}
          maxWidth="100%"
          borderRadius={4}
          sx={{
            background: getProgressBackgroundColor(),
          }}
        ></Box>
      </Box>
    );
  }
);

export default ProgressBar;
