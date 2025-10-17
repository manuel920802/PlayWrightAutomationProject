const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');

test('Client App Login Test', async ({page})=>
{
    //Create object of LoginPage class
    const loginPage = new LoginPage(page);

    //Local variables to store username and password
    const username = "manuel76046@hotmail.com";
    const password = "Playwright123";

    //Locators
    
    const products = page.locator(".card-body");
    const productName = 'ADIDAS ORIGINAL'
    const cartButton = page.locator("[routerlink*='cart']");
    const ordersButton = page.getByRole("button", {name: "ORDERS"})

    loginPage.goToLoginPage(); 
    loginPage.validLogin(username,password);

    //Wait for all API calls to be made in the page after login
    await page.waitForLoadState("networkidle");
    //Wait for first element of provided locator is loaded
    await cardTitles.first().waitFor();

    //Get all page card titles
    console.log(await cardTitles.allTextContents());
    //Iterate between all existing products and search for specified one
    const count = await products.count();
    for(let i =0; i<count; ++i)
    {
        if(await products.nth(i).locator("b").textContent() === productName)
        {
            //Add product to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    //Click cart button
    await cartButton.click();
    //Wait for first element of provided locator is loaded
    await page.locator("div li").first().waitFor();
    //Check for product name is visible on page
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    //Assert if product name is visible
    expect(bool).toBeTruthy();

    //Click on "Checkout" button
    await page.locator("text=Checkout").click();
    //Type country in text selected field slowly and provide delay of 150 mls between each key press
    await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay: 150});
    //Click on suggested option by iterating on each one
    const countryDropdown = page.locator(".ta-results");
    await countryDropdown.waitFor();
    const optionsCount = await countryDropdown.locator("button").count();
    for(let i=0; i<optionsCount; ++i)
    {
        const text = await countryDropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
            //Click option which matches provided text
            await countryDropdown.locator("button").nth(i).click();
            break;
        }
    }
    //Assert email username is correct
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
    //Type in "CCV code" text field
    await page.locator("input[type='text']").nth(1).fill("123");
    //Type in "Name on card" text field
    await page.locator("input[type='text']").nth(2).fill("Manuel Paez");
    //Type in "Coupon" text field 
    await page.locator("input[name='coupon']").fill("rahulshettyacademy");
    //Click on "Apply coupon" button
    await page.locator("button[type='submit']").click();
    //Wait for coupon applied text to appear
    const couponApplied = page.locator("p[class='mt-1 ng-star-inserted']");
    await couponApplied.waitFor();
    //Assert coupon was applied
    const isCouponApplied = await couponApplied.isVisible();
    expect(isCouponApplied).toBeTruthy();
    //Select expiry month dropdown field
    const monthDropdown = page.locator("select").first();
    await monthDropdown.waitFor();
    await monthDropdown.selectOption("08");
    //Select expiry day dropdown field
    const dayDropdown = page.locator("select").last();
    await dayDropdown.waitFor();
    await dayDropdown.selectOption("20");

    //Click on "Place order" button
    await page.locator(".action__submit").click();
    //Assert order was placed successfully by checking for "Thank you for the order" title
    const thankYouTitle = page.locator(".hero-primary");
    await expect(thankYouTitle).toHaveText(" Thankyou for the order. ");
    //Get order ID text
    const orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    const orderIdText = await orderId.textContent();
    //Print orderId in console
    console.log(orderIdText);

    //Click on "Orders" menu item
    await ordersButton.click();
    //Wait for table to appear
    await page.locator("tbody").waitFor();
    //Assert orders are loaded sucessfully by checking for "Your orders" title
    const yourOrdersTitle = page.locator(".container h1");
    await expect(yourOrdersTitle).toHaveText("Your Orders");
    //Iterate through the table
    const rows = page.locator("tbody tr");
    for(let i=0; i<await rows.count(); ++i)
    {
        //Find all rows in table and get text from orderId
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        //If found orderId matches the provided one for our order
        if(orderIdText.includes(rowOrderId))
        {   
            //The find the first button in row and click on it
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    //Assert orderId in summary page matches with provided orderId from previous order
    const orderIdSummaryText = await page.locator(".col-text").textContent();
    expect(orderIdText.includes(orderIdSummaryText)).toBeTruthy();  
    await page.pause();


});