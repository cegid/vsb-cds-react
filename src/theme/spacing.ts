import Tokens from '@cegid/design-tokens';

const spacingValues = [0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80];

/**
 * In the cds-react library the spacing is defined with Tokens.CdsSizeSpacing
 */
const cdsReactLibrarySpacing = parseInt(Tokens.CdsSizeSpacing, 10);

const spacing = (factor: number): number => {
  if (Number.isInteger(factor) && factor >= 0 && factor < spacingValues.length) {
    return spacingValues[factor];
  }

  return cdsReactLibrarySpacing;
};

export default spacing;
