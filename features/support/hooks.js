const {
  Before,
  After,
  BeforeStep,
  AfterStep,
  Status,
  BeforeAll,
  AfterAll,
} = require("@cucumber/cucumber");
const playwright = require("@playwright/test");
const { POManager } = require("../../pageobjects/POManager");

BeforeAll(function () {
  //This hook will be executed only once before all scenarios are executed
});

Before(async function () {
  //This hook will be executed before each scenario
  //Get browser object from playwright
  const browser = await playwright.chromium.launch({ headless: false });
  //Get context object from browser
  const context = await browser.newContext();
  //Get page object from context
  this.page = await context.newPage();

  //Create Object of POManager class using world constructor
  this.poManager = new POManager(this.page);
});

Before({tags: "@foo"}, async function () {
  //This hook will be executed before each scenario with tag @foo, and/or can be used when two tags
  //Get browser object from playwright
  const browser = await playwright.chromium.launch({ headless: false });
  //Get context object from browser
  const context = await browser.newContext();
  //Get page object from context
  this.page = await context.newPage();

  //Create Object of POManager class using world constructor
  this.poManager = new POManager(this.page);
});

BeforeStep(async function () {
  //This hook will be executed before all steps in a scenario
});

AfterStep(async function ({ result }) {
  //This hook will be executed after all steps in a scenario
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: "screenshot1.png" });
  }
});

After(async function () {
  //This hook will be executed after each scenario
  console.log("Last function to execute");
});

AfterAll(function () {
  //This hook will be executed only once after all scenarios are executed
});
