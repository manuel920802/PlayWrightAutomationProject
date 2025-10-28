// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests', 
  /* Maximum time one test can run in current project */
  timeout: 50 * 1000,
  
   /* Maximum time for assertions in current project */
  expect : {
   timeout: 5000
  },

  //Html report: playwright-report/index.html file (default)
  //Line report: Generate html input to be able to generate allure report
  //Alure report: allure-report/index.html file 
  //Generate using cmd: 
  //npx playwright test --reporter=line,allure-playwright
  //allure generate ./allure-results
  //Open using cmd: allure open ./allure-report
  reporter: [['html'], ['line'], ['allure-playwright']],

  use: {
    browserName : 'chromium',
    headless : false,
    screenshot : 'on',
    trace : 'retain-on-failure', //off, on

  },

});
module.exports = config

