const {test, expect} = require('@playwright/test');


test('First Playwright test',async ({browser})=>
{
    //Chrome - plugins / cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //get title
    console.log(await page.title());
    // Assertion to check if title matches
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

});

test('Page Playwright test',async ({page})=>
{
    await page.goto("https://www.google.com/");
    //get title 
    console.log(await page.title());
    // Assertion to check if title matches
    await expect(page).toHaveTitle("Google");
});