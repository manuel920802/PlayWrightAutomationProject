const { When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given(
  "a login to Ecommerce application with {string} and {string}",
  { timeout: 100 * 1000 },
  async function (username, password) {
    //Create object of LoginPage class using POManager getter method
    const loginPage = this.poManager.getLoginPage();
    //Go to login page
    await loginPage.goToLoginPage();
    //Login with provided credentials
    await loginPage.validLogin(username, password);
  }
);

When("Add {string} to Cart", async function (productName) {
  //Create object of DashBoardPage class using POManager getter method
  this.dashBoardPage = this.poManager.getDashBoardPage();
  //Go to dashboard page and add provided product to cart
  await this.dashBoardPage.searchProductAddCart(productName);
  //Go to cart page
  await this.dashBoardPage.goToCart();
});

Then("Verify {string} is displayed in the Cart", async function (productName) {
  //Create object of CartPage class using POManager getter method
  const cartPage = this.poManager.getCartPage();
  //Check if added to cart product provided name is displayed
  await cartPage.verifyProductIsDisplayed(productName);
  //Go to dashboard page
  await cartPage.checkOut();
});

When("Enter valid details and Place the Order", async function () {
  //Create object of CartPage class using POManager getter method
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
  //Type provided country characters in country field and select provided country name
  await ordersReviewPage.selectCountry("ind", "India");
  //Get orderId
  this.orderId = await ordersReviewPage.placeOrderAndDisplayOrderId();
  //Print orderID on console
  console.log(this.orderId);
});

Then("Verify order is present in OrderHistory", async function () {
  //Go to Order history page
  await this.dashBoardPage.goToOrders();
  //Create object of OrdersHistoryPage class using POManager getter method
  const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  //Select the first order and click on "View" button
  await ordersHistoryPage.selectOrderByOrderID(this.orderId);
  //Compare the current orderId in order summary page against the placed orderId
  expect(
    this.orderId.includes(await ordersHistoryPage.getOrderId())
  ).toBeTruthy();
});

Given(
  "a login to Ecommerce2 application with {string} and {string}",
  async function (username, password) {
    //CSS Locators
    const usernameField = this.page.locator("#username");
    const passwordField = this.page.locator("[type=password]");
    const signInButton = this.page.locator("#signInBtn");
    //Go to provided page
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //get title of current page
    console.log(await this.page.title());
    //Go to username/password fields and type provided text
    await usernameField.fill(username);
    await passwordField.fill(password);
    //Go to Sign in button and click on it
    await signInButton.click();
  }
);

Then("Verify Error message is displayed", async function () {
  //CSS Locator
  const errorMessage = this.page.locator("[style*=block]");
  //Wait for error message and get text and print it in console
  console.log(await this.page.locator("[style*=block]").textContent());
  // Assertion to check if error text matches current text
  await expect(errorMessage).toContainText("Incorrect");
});
