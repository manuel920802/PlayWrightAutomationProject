const {test, expect} = require('@playwright/test');

test('Client App Login Test', async ({page})=>
{
    //Open login page
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    //Locators
    const username = page.locator("#userEmail");
    const password = page.locator("[formcontrolname='userPassword']");
    const loginButton = page.locator("[name='login']");
    const cardTitles = page.locator(".card-body b");
    const products = page.locator(".card-body");
    const productName = 'ADIDAS ORIGINAL'
    const cartButton = page.locator("[routerlink*='cart']");
    
    //Enter user credentials and login
    await username.fill("manuel76046@hotmail.com");
    await password.fill("Playwright123");
    await loginButton.click();

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

});