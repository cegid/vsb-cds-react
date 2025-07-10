import path from 'path';
import { version } from '../package.json';

const config = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],

  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-docs'
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  parameters: {
    version: version
  },

  viteFinal: async (config, { configType }) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      'sb-original/image-context': path.resolve(__dirname, 'empty-module.js'),
    };
    return config;
  }
};
export default config;
