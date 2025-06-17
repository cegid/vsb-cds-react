import { neutral, white } from "../src/theme/colors";
import { VSBThemeProvider } from "../src/theme/theme";
import { version } from "../package.json";
import "../src/theme/fonts/fonts.css";
import "../src/theme/icons/hugeicons-font.css";

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: white },
        { name: "light", value: neutral[99] },
        { name: "dark", value: neutral[10] },
      ],
    },
    docs: {
      subtitle: `Version ${version}`,
    },
    version: version,
  },
  decorators: [
    (Story) => (
      <VSBThemeProvider>
        <Story />
      </VSBThemeProvider>
    ),
  ],
};

export default preview;
