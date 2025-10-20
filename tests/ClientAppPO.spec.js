const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');

test('Client App Login Test', async ({page})=>
{
    //Local variables to store values
    const username = "manuel76046@hotmail.com";
    const password = "Playwright123";
    const productName = 'ADIDAS ORIGINAL';

    //Create Object of POManager class
    const poManager = new POManager(page);

    //Create object of LoginPage class using POManager getter method
    const loginPage = poManager.getLoginPage();
    //Go to login page
    await loginPage.goToLoginPage(); 
    //Login with provided credentials
    await loginPage.validLogin(username,password);

    //Create object of DashBoardPage class using POManager getter method
    const dashBoardPage = poManager.getDashBoardPage();
    //Go to dashboard page and add provided product to cart
    await dashBoardPage.searchProductAddCart(productName);
    //Go to cart page
    await dashBoardPage.goToCart();

    //Create object of CartPage class using POManager getter method
    const cartPage = poManager.getCartPage();
    //Check if added to cart product provided name is displayed
    cartPage.verifyProductIsDisplayed(productName);
    //Go to dashboard page
    cartPage.checkOut();


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