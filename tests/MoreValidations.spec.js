const {test,expect} = require('@playwright/test')

test("Popup Validations", async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //Assert if elements are visible/hidden on page
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //Click on Javascript dialog window
    page.on("dialog", dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    //Hover on page element
    await page.locator("#mousehover").hover();

    //Handle iFrames in page
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

    //Go back and forth to navigate between pages
    /* await page.goto("https://www.google.com/");
    await page.goBack();
    await page.goForward(); */
})