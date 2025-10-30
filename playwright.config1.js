// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests', 
  //How many times you want the fail tests to be re-run
  retries :1,
  //Parallel testing workers
  workers :3,
  /* Maximum time one test can run in current project */
  timeout: 50 * 1000,
  
   /* Maximum time for assertions in current project */
  expect : {
   timeout: 5000
  },

  reporter : 'html',
  projects : [
    {
      name: 'chrome',
      use: {
      browserName : 'chromium',
      headless : false,
      screenshot : 'only-on-failure',
      //Accept SSL certificate
      ignoreHTTPSErrors : true,
      //Allow location,etc permissions
      permissions : ['geolocation'],
      trace : 'retain-on-failure', //off, on
      video: 'retain-on-failure',  //on/off/on-first-retry
      viewport : {width:720,height:720}
      //...devices['Galaxy S24']
      }
      },
      {
      name: 'safari',
      use: {
      browserName : 'webkit',
      headless : true,
      screenshot : 'off',
      trace : 'on', //off, on
      ...devices['iPhone 15 Plus']
      }
    }
  ]
});
module.exports = config

