const { test,expect } = require("@playwright/test");

test("Security test request interceipt", async ({ page }) => {
  //Login and reach orders
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  //Locators
  const username = page.locator("#userEmail");
  const password = page.locator("[formcontrolname='userPassword']");
  const loginButton = page.locator("[name='login']");
  const cardTitles = page.locator(".card-body b");
  const ordersButton = page.getByRole("button", { name: "ORDERS" });
  const email = "manuel76046@hotmail.com";

  //Enter user credentials and login
  await username.fill(email);
  await password.fill("Playwright123");
  await loginButton.click();

  //Wait for all API calls to be made in the page after login
  await page.waitForLoadState("networkidle");
  //Wait for first element of provided locator is loaded
  await cardTitles.first().waitFor();
  //Click on "Orders" menu item
  await ordersButton.click();
  //Wait for table to appear
  await page.locator("tbody").waitFor();

  //Intercept request calls
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=68c8960cf669d6cb0acfc0a4",
      })
  );
  //Click on "View" button on first order
  await page.locator("button:has-text('View')").first().click();
  //Assert error is displayed when user is NOT authorized to see order
  const errorTitle = page.locator(".blink_me");
  await expect(errorTitle).toHaveText("You are not authorize to view this order");
});
