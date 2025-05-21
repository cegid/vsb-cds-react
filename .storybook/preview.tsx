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
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#f5f5f5',
        },
        {
          name: 'dark',
          value: '#333333',
        },
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
