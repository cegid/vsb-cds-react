import { neutral, white } from '../src/theme/colors';
import { VSBThemeProvider } from '../src/theme/theme';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'white',
      values: [
        { name: "white", value: white },
        { name: "light", value: neutral[99] },
        { name: "dark", value: neutral[10] },
      ],
    },
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
