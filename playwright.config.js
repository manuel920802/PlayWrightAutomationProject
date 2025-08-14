// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests', 
  /* Maximum time one test can run in current project */
  timeout: 30 * 1000,
  
   /* Maximum time for assertions in current project */
  expect : {
   timeout: 5000
  },

  reporter : 'html',

  use: {
    browserName : 'chromium',
    headless : false

  },

});
module.exports = config

