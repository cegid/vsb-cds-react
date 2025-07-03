import { Shadows } from "@mui/material";
import { neutral, primary, secondary } from "./colors";

const shadows: Shadows = [
  "none",
  "0px 1px 3px rgba(0, 0, 0, 0.12)",
  "0px 2px 6px rgba(0, 0, 0, 0.14)",
  "0px 3px 8px rgba(0, 0, 0, 0.16)",
  "0px 4px 10px rgba(0, 0, 0, 0.18)",
  "0px 6px 14px rgba(0, 0, 0, 0.20)",
  "0px 8px 16px rgba(0, 0, 0, 0.22)",
  "0px 10px 18px rgba(0, 0, 0, 0.24)",
  "0px 12px 20px rgba(0, 0, 0, 0.26)",
  "0px 14px 22px rgba(0, 0, 0, 0.28)",
  "0px 16px 24px rgba(0, 0, 0, 0.30)",
  "0px 18px 26px rgba(0, 0, 0, 0.32)",
  "0px 20px 28px rgba(0, 0, 0, 0.34)",
  "0px 22px 30px rgba(0, 0, 0, 0.36)",
  "0px 24px 32px rgba(0, 0, 0, 0.38)",
  "0px 26px 34px rgba(0, 0, 0, 0.40)",
  "0px 28px 36px rgba(0, 0, 0, 0.42)",
  "0px 30px 38px rgba(0, 0, 0, 0.44)",
  "0px 32px 40px rgba(0, 0, 0, 0.46)",
  "0px 34px 42px rgba(0, 0, 0, 0.48)",
  "0px 36px 44px rgba(0, 0, 0, 0.50)",
  "0px 38px 46px rgba(0, 0, 0, 0.52)",
  "0px 40px 48px rgba(0, 0, 0, 0.54)",
  "0px 42px 50px rgba(0, 0, 0, 0.56)",
  "0px 44px 52px rgba(0, 0, 0, 0.58)",
];

export const ELEVATION = {
  LEVEL_0: 0, // 0dp - Text button
  LEVEL_1: 1, // 1dp - Card
  LEVEL_2: 2, // 2dp - Contained button
  LEVEL_3: 3, // 3dp - Snackbar
  LEVEL_4: 4, // 4dp - Menu
  LEVEL_5: 5, // 8dp - Navigation drawer
  LEVEL_6: 6, // 16dp - Dialog

  TOP_SMOOTH: `0px -5px 20px 0px ${neutral[99]}`,
  TOP_DEEP: `0px -15px 25px 0px ${neutral[95]}`,
  BOTTOM_SMOOTH: `0px 5px 20px 0px ${neutral[99]}`,
  BOTTOM_DEEP: `0px 15px 25px 0px ${neutral[95]}`,
  FULL_SMOOTH: `0px 0px 25px 0px ${neutral[99]}`,
  FULL_DEEP: `0px 0px 25px 0px ${neutral[95]}`,
};

export const ELEVATION_IA = {
  TOP_SMOOTH: `0px -5px 20px 0px ${primary[99]}`,
  TOP_DEEP: `0px -15px 25px 0px ${primary[99]}`,
  BOTTOM_SMOOTH: `0px 5px 20px 0px ${primary[99]}`,
  BOTTOM_DEEP: `0px 15px 20px 0px ${primary[99]}`,
  FULL_SMOOTH: `0px 1px 3px 0px ${primary[90]}, 0px -1px 4px 0px ${secondary[90]}`,
  FULL_DEEP: `0px 2px 6px 0px ${secondary[90]}, 0px -2px 6px 0px ${primary[90]}`,
};

export const ELEVATION_CSS = {
  LEVEL_0: "none",
  LEVEL_1: "0px 1px 3px rgba(0, 0, 0, 0.12)",
  LEVEL_2: "0px 2px 6px rgba(0, 0, 0, 0.14)",
  LEVEL_3: "0px 3px 8px rgba(0, 0, 0, 0.16)",
  LEVEL_4: "0px 4px 10px rgba(0, 0, 0, 0.18)",
  LEVEL_5: "0px 6px 14px rgba(0, 0, 0, 0.20)",
  LEVEL_6: "0px 8px 16px rgba(0, 0, 0, 0.22)",
};

export default shadows;
