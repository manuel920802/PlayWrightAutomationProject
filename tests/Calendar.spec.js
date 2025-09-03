const {test, expect} = require("@playwright/test");

test("Calendar validations", async({page})=>
{
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expedtedList = [monthNumber,date,year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();

    //Assertions
    /* await expect(page.locator("input[name='month']")).toHaveText(monthNumber);
    await expect(page.locator("input[name='day']")).toHaveText(date);
    await expect(page.locator("input[name='year']")).toHaveText(year); */

    const inputs = page.locator(".react-date-picker__inputGroup__input");
    
    for(let i=0; i<expedtedList.length; i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expedtedList[i]);
    }


});
