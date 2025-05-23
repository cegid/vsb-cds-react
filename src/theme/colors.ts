// Primary (Brand)
export const primary: IColorPalettes = {
  10: "#000E33",
  20: "#001C66",
  30: "#002EAA",
  40: "#0038CC",
  50: "#0046FE",
  55: "#1454FF",
  60: "#3169FF",
  65: "#5482FD",
  70: "#6690FF",
  80: "#99B5FF",
  90: "#CCDAFF",
  95: "#E5EDFF",
  99: "#F7F9FE",
};

// Secondary (Brand)
export const secondary: IColorPalettes = {
  10: "#88301C",
  20: "#B13F24",
  30: "#CC492A",
  40: "#E6502C",
  50: "#FF5C35",
  60: "#FF8466",
  65: "#E78E78",
  70: "#FEAE99",
  80: "#FED6CC",
  90: "#FEEAE5",
  95: "#FBF2F0",
  99: "#FCF7F6",
};

// Neutral
export const neutral: IColorPalettes = {
  10: "#001D36",
  20: "#002C52",
  30: "#1A4163",
  40: "#335674",
  50: "#4D6B86",
  60: "#668097",
  70: "#8095A8",
  80: "#B3C0CB",
  90: "#CCD4DC",
  95: "#E6EAEE",
  99: "#F7F8F9",
};

// Success
export const success: IColorPalettes = {
  10: "#072100",
  20: "#103900",
  30: "#1F5106",
  40: "#376A1F",
  50: "#4F8436",
  60: "#689F4D",
  70: "#81BA64",
  80: "#9CD67D",
  90: "#C6E6B5",
  95: "#E6FBD9",
  99: "#F7FFEC",
};

// Yellow
export const yellow: IColorPalettes = {
  10: "#231B00",
  20: "#3C2F00",
  30: "#564500",
  40: "#725C03",
  50: "#8D7520",
  60: "#A88E38",
  70: "#C5A94F",
  80: "#E2C468",
  90: "#FFE081",
  95: "#FFF0C9",
  99: "#FFFBF1",
};

// Banana/Tread
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
  10: "#4E000E",
  20: "#680013",
  30: "#92001F",
  35: "#AB0D2A",
  40: "#BC0E2E",
  45: "#D22141",
  50: "#E03043",
  60: "#FF525D",
  70: "#FF8889",
  80: "#FFA8AE",
  90: "#FFD4D6",
  95: "#FFE9EB",
  99: "#FFF4F5",
};

// Pink
export const pink: IColorPalettes = {
  10: "#400014",
  20: "#660025",
  30: "#900038",
  40: "#BC004B",
  50: "#E61A61",
  60: "#FF4E7C",
  70: "#FF869D",
  80: "#FFB2BE",
  90: "#FFDFE4",
  95: "#FFF7F8",
  99: "#FFFBFF",
};

// Purple
export const purple: IColorPalettes = {
  10: "#250059",
  20: "#3F008D",
  30: "#5727A7",
  40: "#6F43C0",
  50: "#895EDB",
  60: "#A378F8",
  70: "#BB99FF",
  80: "#D3BBFF",
  90: "#EBDDFF",
  95: "#F7EDFF",
  99: "#FFFBFF",
};

// Plum
export const plum: IColorPalettes = {
  10: "#001946",
  20: "#152E61",
  30: "#2E4579",
  40: "#475D93",
  50: "#6076AD",
  60: "#7A90C9",
  70: "#95ABE6",
  80: "#B1C5FF",
  90: "#DAE2FF",
  95: "#EEF0FF",
  99: "#FAFBFF",
};

export const white = "#ffffff";

// Info
export const info: IColorPalettes = {
  20: '#04325E',
  30: '#054480',
  40: '#0657A4',
  50: '#076AC8',
  60: '#097DEB',
  70: '#479EEF',
  80: '#83BDF4',
  90: '#A3CEF7',
  95: '#C1DEFA',
  99: '#E7F2FD',
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
  35?: string;
  40: string;
  45?: string;
  50: string;
  55?: string;
  60: string;
  65?: string;
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

export type CustomColorString = `${PaletteNames}/${ShadeKey}` | 'white';

export default colorPalettes;
