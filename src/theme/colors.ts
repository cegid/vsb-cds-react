// Primary (Brand)
export const primary: IColorPalettes = {
  10: "#0A225C",
  20: "#103D9F",
  30: "#0640CD",
  40: "#0046FE",
  50: "#0C51FF",
  60: "#2F7EFF",
  70: "#56A4FF",
  80: "#85CAFF",
  90: "#B3E1FF",
  95: "#D5F0FF",
  99: "#E8F7FF",
};

// Secondary (Brand)
export const secondary: IColorPalettes = {
  10: "#441106",
  20: "#7E2710",
  30: "#9C2D10",
  40: "#C53809",
  50: "#ED4D09",
  60: "#FC6813",
  70: "#FE8A39",
  80: "#FFB26E",
  90: "#FFD3A9",
  95: "#FFEBD4",
  99: "#FFEBD4",
};

// Neutral
export const neutral: IColorPalettes = {
  10: "#232529",
  20: "#393B40",
  30: "#40444A",
  40: "#494E56",
  50: "#555B66",
  60: "#636C77",
  70: "#7E8892",
  80: "#A9B1B7",
  90: "#CCD1D5",
  95: "#E4E6E9",
  99: "#F5F6F6",
};

// Success
export const success: IColorPalettes = {
  10: "#022C1F",
  20: "#064E36",
  30: "#065F40",
  40: "#04784F",
  50: "#04975F",
  60: "#10C27B",
  70: "#33D48E",
  80: "#6EE7AF",
  90: "#A7F3CB",
  95: "#D1FAE2",
  99: "#ECFDF4",
};

// Yellow
export const yellow: IColorPalettes = {
  10: "#472201",
  20: "#7B420C",
  30: "#96500A",
  40: "#B96804",
  50: "#DF9300",
  60: "#F5B903",
  70: "#FFDE1E",
  80: "#FFED48",
  90: "#FFF787",
  95: "#FFFBC5",
  99: "#FFFEEA",
};

// Banana
export const banana: IColorPalettes = {
  10: "#271900",
  20: "#422C00",
  30: "#5F4100",
  40: "#7D5800",
  50: "#9C6F02",
  60: "#B98823",
  70: "#D7A23D",
  80: "#FEC55C",
  90: "#FFDEA9",
  95: "#FFEED8",
  99: "#FFFBFF",
};

// Critical
export const critical: IColorPalettes = {
  10: "#480907",
  20: "#841B18",
  30: "#A01714",
  40: "#C11814",
  50: "#E5221D",
  60: "#F8403B",
  70: "#FF5C58",
  80: "#FFA2A0",
  90: "#FFC8C7",
  95: "#FFE2E1",
  99: "#FFF1F1",
};

// Pink
export const pink: IColorPalettes = {
  10: "#4C051F",
  20: "#871441",
  30: "#9E1346",
  40: "#BD134B",
  50: "#E01E5B",
  60: "#F4507B",
  70: "#FA7292",
  80: "#FDA4B7",
  90: "#FECDD7",
  95: "#FFE4E8",
  99: "#FFF1F3",
};

// Purple
export const purple: IColorPalettes = {
  10: "#411042",
  20: "#662966",
  30: "#7A2C7C",
  40: "#943398",
  50: "#AF42B7",
  60: "#C95DD3",
  70: "#DD8DE5",
  80: "#E9B8EF",
  90: "#F2D7F7",
  95: "#F9ECFB",
  99: "#FCF6FD",
};

// Plum
export const plum: IColorPalettes = {
  10: "#2A2E41",
  20: "#3F4969",
  30: "#4B5682",
  40: "#57679E",
  50: "#6076AD",
  60: "#758EBC",
  70: "#8FA8CB",
  80: "#B4C6DC",
  90: "#D2DCEB",
  95: "#E6ECF3",
  99: "#F4F7FA",
};

export const white = "#ffffff";

// Info
export const info: IColorPalettes = {
  20: '#124C68',
  30: '#0F5C7D',
  40: '#0D6D97',
  50: '#0F89BA',
  60: '#27B2E3',
  70: '#45C0EB',
  80: '#85D6F4',
  90: '#BEE8F9',
  95: '#E2F3FC',
  99: '#F1FAFE',
};

// Beige
export const beige: IColorPalettes = {
  20: '#5B4F3E',
  30: '#817159',
  40: '#9A8D74',
  50: '#B4A98F',
  60: '#CEC6AB',
  70: '#DBD4BE',
  80: '#E8E3D1',
  90: '#F6F2E4',
  95: '#F9F6ED',
  99: '#FCFAF6',
};

export interface IColorPalettes {
  10?: string;
  20: string;
  30: string;
  40: string;
  50: string;
  60: string;
  70: string;
  80: string;
  90: string;
  95: string;
  99: string;
}

export const colorPalettes = {
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

export type PaletteNames = keyof typeof colorPalettes;

type ShadeKey = keyof IColorPalettes;

export type CustomColorString = `${PaletteNames}/${ShadeKey}` | 'white' | 'transparent';

export default colorPalettes;

export const parseCustomColor = (colorValue: string): string | undefined => {
  if (!colorValue || typeof colorValue !== "string") {
    return undefined;
  }

  if (colorValue === "white") {
    return "#FFFFFF";
  }
  const matches = colorValue.match(/^([a-z]+)\/(\d+)$/);

  if (!matches) {
    return undefined;
  }

  const [, paletteName, shade] = matches;

  if (!colorPalettes[paletteName as keyof typeof colorPalettes]) {
    return undefined;
  }

  const palette = colorPalettes[paletteName as keyof typeof colorPalettes];
  const shadeKey = shade as unknown as ShadeKey;

  if (!palette[shadeKey]) {
    return undefined;
  }

  return palette[shadeKey];
};