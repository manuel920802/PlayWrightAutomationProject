const {test, expect} = require('@playwright/test');

test('Client App Login Test', async ({page})=>
{
    //Open login page
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    //Locators
    const cardTitles = page.locator(".card-body b");
    const email = "manuel76046@hotmail.com";
    
    //Enter user credentials and login
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Playwright123");
    await page.getByRole("button", {name: 'Login'}).click();

    //Wait for all API calls to be made in the page after login
    await page.waitForLoadState("networkidle");
    //Wait for first element of provided locator is loaded
    await cardTitles.first().waitFor();
    //Filter for specified product name and click on "Add to cart" button
    page.locator(".card-body").filter({hasText: 'ZARA COAT 3'}).getByRole("button", {name: 'Add To Cart'}).click();
    //Click "Cart" button
    await page.getByRole("listitem").getByRole("button", {name: 'Cart'}).click();
    //Wait for first element of provided locator is loaded
    await page.locator("div li").first().waitFor();
    //Check for product name is visible on page
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    //Click on "Checkout" button
    await page.getByRole("button",{name: 'Checkout'}).click();
    //Type country in text selected field slowly
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    //Click on provided option
    await page.getByRole("button", {name: 'India'}).nth(1).click();
    
   /*  //Type in "CCV code" text field
    await page.getByText("CVV Code").fill("123");
    //Type in "Name on card" text field
    await page.getByText("Name on Card").fill("Manuel Paez");
    //Type in "Coupon" text field 
    await page.getByText("Apply Coupon").first().fill("rahulshettyacademy");
    //Click on "Apply coupon" button
    await page.getByRole("button", {name: 'Apply Coupon'}).click();
    //Wait for coupon applied text to appear
    const couponApplied = page.locator("p[class='mt-1 ng-star-inserted']");
    await couponApplied.waitFor();
    //Select expiry month dropdown field
    await page.getByLabel("Expiry Date").first().selectOption("08");
    //Select expiry day dropdown field
    await page.getByLabel("Expiry Date").last().selectOption("20"); */

    //Click on "Place order" button
    await page.getByText("Place Order").click();
    //Assert order was placed successfully by checking for "Thank you for the order" title
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});