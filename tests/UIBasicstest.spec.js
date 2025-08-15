const {test, expect} = require('@playwright/test');


test('First Playwright test',async ({browser})=>
{
    //Chrome - plugins / cookies
    const context = await browser.newContext();
    const page = await context.newPage();

    //Locators
    const username = page.locator('#username');
    const password = page.locator('[type=password]');
    const signIn = page.locator('#signInBtn');
    const errorMessage = page.locator('[style*=block]');
    const cardTitles = page.locator(".card-body a");

    //Go to provided page
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //get title of current page
    console.log(await page.title());

    //Go to username/password fields and type provided text
    await username.fill("rahulshetty");
    await password.fill("learning");
    //Go to Sign in button and click on it
    await signIn.click();

    //Wait for error message and get text and print it in console
    console.log (await page.locator('[style*=block]').textContent());
    
    // Assertion to check if error text matches current text
    await expect(errorMessage).toContainText("Incorrect");

    //Clear username field and sign in
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signIn.click();

    //Get text for first item and print it in console
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    
    //Get text for all items and print in console
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

});

test('Page Playwright test',async ({page})=>
{
    await page.goto("https://www.google.com/");
    //get title 
    console.log(await page.title());
    // Assertion to check if title matches
    await expect(page).toHaveTitle("Google");
});