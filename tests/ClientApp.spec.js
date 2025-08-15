const {test, expect} = require('@playwright/test');

test('Client Page Login Register and Login Test', async ({page})=>
{
    //Open login page
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    //Locators
    const username = page.locator("#userEmail");
    const password = page.locator("[formcontrolname='userPassword']");
    const loginButton = page.locator("[name='login']");
    const cardTitles = page.locator(".card-body b");
    const registerLink = page.locator(".login-wrapper-footer-text");
    const firstName = page.locator("#firstName");
    const lastName = page.locator("#lastName");
    const email = page.locator("#userEmail");
    const phoneNumber = page.locator("#userMobile");
    
    //Enter user credentials and login
    await username.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await loginButton.click();

    //Wait for all API calls to be made in the page after login
    await page.waitForLoadState("networkidle");
    //await page.cardTitles.first().waitFor();

    //Get all page card titles
    console.log(await cardTitles.allTextContents());
    console.log(cardTitles);


});