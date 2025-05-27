/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
