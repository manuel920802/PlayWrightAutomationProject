import {test, expect} from '@playwright/test';


test('Playwright Special Locators', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    //GetByLabel - Works when there is a "label" tag - Recommended for click actions
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");

    //GetByPlaceholder - Works when there is a "Placeholder" attribute
    await page.getByPlaceholder("Password").fill("abc123")

    //GetByRole - Works for functionality type
    await page.getByRole("button", {name: 'Submit'}).click();

    //GetByText - Works for text items
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await page.getByRole("link", {name: 'Shop'}).click();

    //Apply filter on page
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

    



});