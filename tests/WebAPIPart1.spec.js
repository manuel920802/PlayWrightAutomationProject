const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginPayload = {userEmail:"manuel76046@hotmail.com",userPassword:"Playwright123"};
const orderPayload = {orders: [{country: "Colombia", productOrderedId: "68a961459320a140fe1ca57a"}]};
let response;

test.beforeAll( async ()=> 
{
   const apiContext = await request.newContext();
   const apiUtils = new APIUtils(apiContext, loginPayload);
   response = await apiUtils.createOrder(orderPayload);
})

//Create order is successful
test('Place the order', async ({page})=>
{
    //Set token (inject) in local storage
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    //Open dashboard page
    await page.goto("https://rahulshettyacademy.com/client/");

    //Locators
    const ordersButton = page.getByRole("button", {name: "ORDERS"})

    //Click on "Orders" menu item
    await ordersButton.click();
    //Wait for table to appear
    await page.locator("tbody").waitFor();
    //Assert orders are loaded sucessfully by checking for "Your orders" title
    const yourOrdersTitle = page.locator(".container h1");
    await expect(yourOrdersTitle).toHaveText("Your Orders");
    //Iterate through the table
    const rows = page.locator("tbody tr");
    for(let i=0; i<await rows.count(); ++i)
    {
        //Find all rows in table and get text from orderId
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        //If found orderId matches the provided one for our order
        if(response.orderId.includes(rowOrderId))
        {   
            //The find the first button in row and click on it
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    //Assert orderId in summary page matches with provided orderId from previous order
    const orderIdSummaryText = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdSummaryText)).toBeTruthy(); 
});