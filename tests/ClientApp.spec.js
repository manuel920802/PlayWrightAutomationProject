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
    const email = "manuel76046@hotmail.com";
    
    //Enter user credentials and login
    await username.fill(email);
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
    //Assert email is correct
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    //Select expiry month dropdown field
    const monthDropdown = page.locator("select.ddl").first();
    await monthDropdown.waitFor();
    await monthDropdown.click();
    const optionsMonth = await monthDropdown.locator("option").count();
    for(let i=0; i<optionsMonth; ++i)
    {
        const monthText = await monthDropdown.locator("option").nth(i).textContent();
        if(monthText === "08")
        {
            //Click month option which matches provided text
            await monthDropdown.locator("option").nth(i).click();
            break;
        } 
    }
    await page.pause();
    //Click on Place order button
    //await page.locator(".action__submit").click();


});