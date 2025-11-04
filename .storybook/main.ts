import path from 'path';
import { version } from '../package.json';

const config = {
  stories: [
    '../src/stories/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'
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

    // Configure proxy for Jira API to avoid CORS issues
    config.server = config.server || {};
    config.server.proxy = {
      '/api/jira': {
        target: 'https://jira-internal-api.boby.tech',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/jira/, '/v1/api/issue'),
        secure: false,
      }
    };

    return config;
  }
};
export default config;
