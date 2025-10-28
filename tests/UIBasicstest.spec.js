const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');


test('@Web First Playwright test',async ({browser})=>
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

test('@Web UI controls',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
     //Locators
    const username = page.locator('#username');
    const password = page.locator('[type=password]');
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator("select.form-control");
    const radioButton = page.locator(".radiotextsty");
    const okButton = page.locator("#okayBtn");
    const checkBox = page.locator("#terms");
    const documentLink = page.locator("[href*='documents-request']");

    //Select radio button and click on last option
    await radioButton.last().click();
    //Select dropdown option
    await dropdown.selectOption("Consultant");
    //Click OK button in popup
    await okButton.click();

    //Print in console if radiobutton is checked
    //console.log(await radioButton.last().isChecked());

    //Assert if radio button is checked
    await expect(radioButton.last()).toBeChecked();
    //Click on checkbox
    await checkBox.click();
    //Assert if checkbox is checked
    await expect(checkBox).toBeChecked();
    //Uncheck the checkbox
    await checkBox.uncheck();
    //Assert checkbox is unchecked
    expect(await checkBox.isChecked()).toBeFalsy();
    //Assert if link text is blinking
    await expect(documentLink).toHaveAttribute("class","blinkingText");

    //Pause current execution
    //await page.pause();
});

test('Child windows handle',async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Locators
    const documentLink = page.locator("[href*='documents-request']");
    const username = page.locator('#username');

    const [newPage] = await Promise.all(
    [
        context.waitForEvent('page'), //Wait for new page event using listener - listen for any new page pending,rejected,filfilled
        documentLink.click(), //New page is opened
    ])

    //Get text from page
    const textCont = await newPage.locator(".red").textContent();
    //Split text from page
    const arrayText = textCont.split("@")
    //Split only email text
    const emailText = arrayText[1].split(" ") [0]
    //Go back to parent page and type extracted email from child page
    await username.fill(emailText);
    //Get typed text in username field and print in console
    console.log(await username.inputValue());
});