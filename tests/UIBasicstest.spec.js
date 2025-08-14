const {test, expect} = require('@playwright/test');


test.only('First Playwright test',async ({browser})=>
{
    //Chrome - plugins / cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //get title
    console.log(await page.title());
    // css locator for username/password fields and type provided text
    await page.locator('#username').fill("rahulshetty");
    await page.locator('[type=password]').fill("learning");
    // css locator for sign in button and click on it
    await page.locator('#signInBtn').click();
    // css locator for error message and get text and print it in console
    console.log (await page.locator('[style*=block]').textContent());
    
    // Assertion to check if error text matches current text
    await expect(page.locator('[style*=block]')).toContainText("Incorrect");

});

test('Page Playwright test',async ({page})=>
{
    await page.goto("https://www.google.com/");
    //get title 
    console.log(await page.title());
    // Assertion to check if title matches
    await expect(page).toHaveTitle("Google");
});