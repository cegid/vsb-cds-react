import { Shadows } from "@mui/material";

export {
  ELEVATION,
  ELEVATION_CSS,
} from '@cegid/vsb-cds-tokens/shadows';

import shadowsFromTokens from '@cegid/vsb-cds-tokens/shadows';
const shadows: Shadows = shadowsFromTokens as Shadows;

export default shadows;