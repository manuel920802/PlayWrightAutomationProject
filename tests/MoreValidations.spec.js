const {test,expect} = require('@playwright/test')

//Run tests in same test file in parallel instead of sequentially(default)
//test.describe.configure({mode:'parallel'});

//Run tests in same test file when one test depends on the result of the previous test
//test.describe.configure({mode:'serial'});

test("@Web Popup Validations", async ({page})=>
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

test("Screenshot & Visual Comparison", async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    //Take screenshot of an specific locator
    await page.locator('#displayed-text').screenshot({path: 'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    //Take screenshot of the whole page
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
})

test("Visual Testing", async ({page})=>
{
    await page.goto("https://www.google.com/");
    //Take screenshot of landing page and compare against previously taken screenshot to see if they match
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})

