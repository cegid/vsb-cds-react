const radiusPixel: Record<number, number> = {
    0: 0,
    4: 4,
    8: 8,
    12: 12,
    16: 16,
    24: 24,
    9999: 9999,
  };
  
  export const RADIUS = {
    NONE: 0,
    XS: 4,
    S: 8,
    M: 12,
    L: 16,
    XL: 24,
    FULL: 9999,
  };
  
  const radius = (factor: number) => {
    if (factor in radiusPixel) {
      return `${radiusPixel[factor]}px`;
    }
    return `${factor}px`;
  };
  
  export default radius;